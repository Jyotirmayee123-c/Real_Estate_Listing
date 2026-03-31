import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  Users, Building2, MessageSquare, ClipboardList,
  IndianRupee, Activity, ArrowUpRight, ArrowDownRight,
  Bell, Plus, Trash2, Eye, RefreshCw, TrendingUp,
  Home, Phone, Mail, MapPin, CheckCircle, AlertCircle,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt    = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n ?? 0);
const fmtPrice = (n) => {
  if (!n) return "₹0";
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(1) + " Cr";
  if (n >= 100000)   return "₹" + (n / 100000).toFixed(1) + " L";
  return "₹" + n.toLocaleString();
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color, trend, onClick, delay }) {
  const palette = {
    purple: { border: "border-purple-500/40", icon: "bg-purple-600/20 text-purple-400", glow: "from-purple-600/10", val: "text-purple-400" },
    blue:   { border: "border-blue-500/40",   icon: "bg-blue-600/20 text-blue-400",     glow: "from-blue-600/10",   val: "text-blue-400"   },
    green:  { border: "border-emerald-500/40",icon: "bg-emerald-600/20 text-emerald-400",glow:"from-emerald-600/10",val: "text-emerald-400" },
    yellow: { border: "border-yellow-500/40", icon: "bg-yellow-600/20 text-yellow-400", glow: "from-yellow-600/10", val: "text-yellow-400" },
    pink:   { border: "border-pink-500/40",   icon: "bg-pink-600/20 text-pink-400",     glow: "from-pink-600/10",   val: "text-pink-400"   },
    indigo: { border: "border-indigo-500/40", icon: "bg-indigo-600/20 text-indigo-400", glow: "from-indigo-600/10", val: "text-indigo-400" },
  };
  const p = palette[color] || palette.purple;

  return (
    <motion.div
      onClick={onClick}
      className={`relative bg-[#252544] border ${p.border} rounded-2xl p-5 overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${p.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl ${p.icon} flex items-center justify-center`}>
            {icon}
          </div>
          {trend !== undefined && (
            <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full ${trend >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
              {trend >= 0 ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
              {Math.abs(trend)}%
            </span>
          )}
        </div>
        <p className="text-2xl font-black text-white mb-0.5">{value}</p>
        <p className="text-xs font-semibold text-gray-300">{label}</p>
        {sub && <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ title, linkLabel, onClick, color = "text-purple-400" }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-white font-bold text-sm">{title}</h3>
      {onClick && (
        <button onClick={onClick} className={`${color} hover:opacity-70 text-xs font-semibold flex items-center gap-1 transition-opacity`}>
          {linkLabel} <ArrowUpRight size={12} />
        </button>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats]                   = useState({ users: 0, properties: 0, contacts: 0, enquiries: 0, revenue: 0, active: 0 });
  const [recentUsers, setRecentUsers]       = useState([]);
  const [recentProps, setRecentProps]       = useState([]);
  const [recentEnqs, setRecentEnqs]         = useState([]);
  const [recentCons, setRecentCons]         = useState([]);
  const [loading, setLoading]               = useState(true);
  const [refreshing, setRefreshing]         = useState(false);
  const [lastUpdated, setLastUpdated]       = useState(new Date());

  const fetchAll = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const [uR, pR, cR, eR] = await Promise.allSettled([
        api.get("/auth/users"),
        api.get("/property"),
        api.get("/contact"),
        api.get("/enquiry"),
      ]);
      const users  = uR.status === "fulfilled" ? (uR.value.data.users  || uR.value.data.data  || []) : [];
      const props  = pR.status === "fulfilled" ? (pR.value.data.data   || pR.value.data       || []) : [];
      const cons   = cR.status === "fulfilled" ? (cR.value.data.data   || cR.value.data       || []) : [];
      const enqs   = eR.status === "fulfilled" ? (eR.value.data.enquiries || eR.value.data.data || []) : [];

      setStats({
        users:      users.length,
        properties: props.length,
        contacts:   cons.length,
        enquiries:  enqs.length,
        revenue:    props.reduce((s, p) => s + (p.price || 0), 0),
        active:     props.filter(p => !p.status || p.status === "active").length,
      });
      setRecentUsers([...users].reverse().slice(0, 5));
      setRecentProps([...props].reverse().slice(0, 4));
      setRecentEnqs([...enqs].reverse().slice(0, 4));
      setRecentCons([...cons].reverse().slice(0, 4));
      setLastUpdated(new Date());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // ── Loading screen ────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-[#1a1a2e] px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <div className="max-w-7xl mx-auto space-y-7">

        {/* Top bar skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-3 w-28 rounded bg-[#252544] animate-pulse" />
            <div className="h-8 w-56 rounded bg-[#252544] animate-pulse" />
            <div className="h-2.5 w-72 rounded bg-[#252544] animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#252544] animate-pulse" />
            <div className="w-10 h-10 rounded-xl bg-[#252544] animate-pulse" />
            <div className="w-32 h-10 rounded-xl bg-[#252544] animate-pulse" />
          </div>
        </div>

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#252544] rounded-2xl p-5 space-y-4 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="w-11 h-11 rounded-xl bg-white/5" />
                <div className="w-10 h-5 rounded-full bg-white/5" />
              </div>
              <div className="h-7 w-16 rounded bg-white/5" />
              <div className="h-2.5 w-24 rounded bg-white/5" />
              <div className="h-2 w-16 rounded bg-white/5" />
            </div>
          ))}
        </div>

        {/* Quick actions skeleton */}
        <div className="bg-[#252544] rounded-2xl p-5 animate-pulse">
          <div className="h-4 w-28 rounded bg-white/5 mb-4" />
          <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#1a1a2e]">
                <div className="w-10 h-10 rounded-xl bg-white/5" />
                <div className="h-2.5 w-20 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 1: Properties + Users skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-[#252544] rounded-2xl p-5 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="h-4 w-36 rounded bg-white/5" />
                <div className="h-4 w-16 rounded bg-white/5" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1a2e]">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-3/4 rounded bg-white/5" />
                      <div className="h-2.5 w-1/2 rounded bg-white/5" />
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="h-3 w-14 rounded bg-white/5" />
                      <div className="h-4 w-12 rounded-full bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Enquiries + Contacts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-[#252544] rounded-2xl p-5 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="h-4 w-36 rounded bg-white/5" />
                <div className="h-4 w-16 rounded bg-white/5" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-[#1a1a2e]">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <div className="h-3 w-28 rounded bg-white/5" />
                        <div className="h-4 w-10 rounded-full bg-white/5" />
                      </div>
                      <div className="h-2.5 w-4/5 rounded bg-white/5" />
                      <div className="h-2 w-2/3 rounded bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Site overview skeleton */}
        <div className="bg-[#252544] rounded-2xl p-5 animate-pulse">
          <div className="h-4 w-28 rounded bg-white/5 mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#1a1a2e] space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-3 w-20 rounded bg-white/5" />
                  <div className="h-7 w-10 rounded bg-white/5" />
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5" />
                <div className="h-2 w-24 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a2e] px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <div className="max-w-7xl mx-auto space-y-7">

        {/* ── Top bar ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          <div>
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">{greeting} 👋</p>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Welcome, <span className="text-purple-500">{user?.name || "Admin"}</span>
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              {" · "}Last updated {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchAll(true)}
              className={`w-10 h-10 rounded-xl bg-[#252544] border border-purple-900/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all ${refreshing ? "animate-spin" : ""}`}
            >
              <RefreshCw size={16} />
            </button>
            <div className="relative">
              <button className="w-10 h-10 rounded-xl bg-[#252544] border border-purple-900/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all">
                <Bell size={16} />
              </button>
              {stats.enquiries > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {Math.min(stats.enquiries, 9)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 bg-[#252544] border border-purple-900/30 rounded-xl px-3 py-2">
              <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-xs font-semibold leading-tight">{user?.name || "Admin"}</p>
                <p className="text-gray-500 text-[10px]">Administrator</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard icon={<Users size={18} />}        label="Total Users"      value={fmt(stats.users)}       sub="Registered"        color="purple" trend={12}  onClick={() => navigate("/admin/users")}    delay={0}    />
          <StatCard icon={<Building2 size={18} />}    label="Properties"       value={fmt(stats.properties)}  sub="Total listed"      color="blue"   trend={8}   onClick={() => navigate("/admin/property")} delay={0.05} />
          <StatCard icon={<Activity size={18} />}     label="Active Listings"  value={fmt(stats.active)}      sub="Live on site"      color="green"  trend={5}   onClick={() => navigate("/admin/property")} delay={0.1}  />
          <StatCard icon={<ClipboardList size={18} />}label="Enquiries"        value={fmt(stats.enquiries)}   sub="Property enquiries"color="yellow" trend={-3}  onClick={() => navigate("/admin/enquiry")}  delay={0.15} />
          <StatCard icon={<MessageSquare size={18} />}label="Contacts"         value={fmt(stats.contacts)}    sub="Form submissions"  color="pink"   trend={20}  onClick={() => navigate("/admin/contact")}  delay={0.2}  />
          <StatCard icon={<IndianRupee size={18} />}  label="Portfolio Value"  value={fmtPrice(stats.revenue)}sub="All listings"      color="indigo" trend={15}  delay={0.25} />
        </div>

        {/* ── Quick Actions ── */}
        <motion.div
          className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3 className="text-white font-bold text-sm mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
            {[
              { icon: <Plus size={18} className="text-purple-400" />,        label: "Add Property",   border: "border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-600/10", nav: "/admin/property" },
              { icon: <Users size={18} className="text-blue-400" />,         label: "Manage Users",   border: "border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-600/10",       nav: "/admin/users"    },
              { icon: <MessageSquare size={18} className="text-pink-400" />, label: "View Contacts",  border: "border-pink-500/20 hover:border-pink-500/50 hover:bg-pink-600/10",       nav: "/admin/contact"  },
              { icon: <ClipboardList size={18} className="text-yellow-400" />, label: "Enquiries",    border: "border-yellow-500/20 hover:border-yellow-500/50 hover:bg-yellow-600/10",nav: "/admin/enquiry"  },
            ].map((a, i) => (
              <button
                key={i}
                onClick={() => navigate(a.nav)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border bg-[#1a1a2e] ${a.border} transition-all duration-200 hover:-translate-y-0.5 group`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {a.icon}
                </div>
                <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">{a.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Row 1: Properties + Users ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Properties */}
          <motion.div
            className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
          >
            <SectionHeader title="Recent Properties" linkLabel="Manage" onClick={() => navigate("/admin/property")} />
            <div className="space-y-3">
              {recentProps.length > 0 ? recentProps.map((p, i) => (
                <div key={p._id || i} className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1a2e] border border-purple-900/20 hover:border-purple-500/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-purple-900/30">
                    {p.thumbnail && (
                      <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" onError={e => { e.currentTarget.style.display = "none"; }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{p.title}</p>
                    <p className="text-gray-500 text-xs">{p.city} · {p.propertyType}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-purple-400 text-sm font-bold">{fmtPrice(p.price)}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                  </div>
                </div>
              )) : <p className="text-gray-500 text-sm text-center py-6">No properties yet</p>}
            </div>
          </motion.div>

          {/* Recent Users */}
          <motion.div
            className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
          >
            <SectionHeader title="Recent Users" linkLabel="Manage" onClick={() => navigate("/admin/users")} color="text-blue-400" />
            <div className="space-y-3">
              {recentUsers.length > 0 ? recentUsers.map((u, i) => (
                <div key={u._id || i} className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1a2e] border border-purple-900/20 hover:border-blue-500/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {u.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{u.name}</p>
                    <p className="text-gray-500 text-xs truncate">{u.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${u.role === "admin" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                      {u.role || "user"}
                    </span>
                    <span className="text-gray-600 text-[10px]">{new Date(u.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              )) : <p className="text-gray-500 text-sm text-center py-6">No users yet</p>}
            </div>
          </motion.div>
        </div>

        {/* ── Row 2: Enquiries + Contacts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Enquiries */}
          <motion.div
            className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
          >
            <SectionHeader title="Recent Enquiries" linkLabel="View all" onClick={() => navigate("/admin/enquiry")} color="text-yellow-400" />
            <div className="space-y-3">
              {recentEnqs.length > 0 ? recentEnqs.map((e, i) => (
                <div key={e._id || i} className="flex items-start gap-3 p-3 rounded-xl bg-[#1a1a2e] border border-purple-900/20 hover:border-yellow-500/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-yellow-600/20 flex items-center justify-center flex-shrink-0">
                    <ClipboardList size={15} className="text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white text-sm font-semibold truncate">{e.name}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex-shrink-0">New</span>
                    </div>
                    <p className="text-gray-500 text-xs truncate">{e.message || "No message"}</p>
                    <p className="text-gray-600 text-[10px] mt-0.5">{e.property?.title || "Property"} · {new Date(e.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              )) : <p className="text-gray-500 text-sm text-center py-6">No enquiries yet</p>}
            </div>
          </motion.div>

          {/* Recent Contacts */}
          <motion.div
            className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}
          >
            <SectionHeader title="Recent Contact Forms" linkLabel="View all" onClick={() => navigate("/admin/contact")} color="text-pink-400" />
            <div className="space-y-3">
              {recentCons.length > 0 ? recentCons.map((c, i) => (
                <div key={c._id || i} className="flex items-start gap-3 p-3 rounded-xl bg-[#1a1a2e] border border-purple-900/20 hover:border-pink-500/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-pink-600/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={15} className="text-pink-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white text-sm font-semibold truncate">{c.fullName}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 capitalize
                        ${c.lookingTo === "buy"  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : c.lookingTo === "rent" ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                        {c.lookingTo || "inquiry"}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs truncate">{c.email} · {c.phone}</p>
                    <p className="text-gray-600 text-[10px] mt-0.5 truncate">{c.description || "No description"}</p>
                  </div>
                </div>
              )) : <p className="text-gray-500 text-sm text-center py-6">No contacts yet</p>}
            </div>
          </motion.div>
        </div>

        {/* ── Site Overview Progress Bars ── */}
        <motion.div
          className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h3 className="text-white font-bold text-sm mb-5">Site Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              { label: "Users",      value: stats.users,      max: Math.max(stats.users, 100),      bar: "bg-purple-500", nav: "/admin/users"    },
              { label: "Properties", value: stats.properties, max: Math.max(stats.properties, 50),  bar: "bg-blue-500",   nav: "/admin/property" },
              { label: "Enquiries",  value: stats.enquiries,  max: Math.max(stats.enquiries, 50),   bar: "bg-yellow-500", nav: "/admin/enquiry"  },
              { label: "Contacts",   value: stats.contacts,   max: Math.max(stats.contacts, 50),    bar: "bg-pink-500",   nav: "/admin/contact"  },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.nav)}
                className="text-left p-4 rounded-xl bg-[#1a1a2e] border border-purple-900/20 hover:border-purple-500/30 transition-all group"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-xs font-semibold group-hover:text-white transition-colors">{item.label}</span>
                  <span className="text-white font-black text-xl">{fmt(item.value)}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${item.bar} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                  />
                </div>
                <p className="text-gray-600 text-[10px] mt-2">{Math.round((item.value / item.max) * 100)}% of target</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <motion.p
          className="text-center text-gray-600 text-xs pb-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        >
          Kalinga Homes Admin Panel · {new Date().getFullYear()}
        </motion.p>

      </div>
    </div>
  );
}
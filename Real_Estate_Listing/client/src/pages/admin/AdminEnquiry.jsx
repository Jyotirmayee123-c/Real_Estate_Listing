import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import {
  ClipboardList, Search, Trash2, RefreshCw,
  X, CheckCircle, AlertTriangle, MapPin,
  Phone, Mail, MessageSquare, Calendar,
  Building2, IndianRupee, Eye, ChevronDown, ChevronUp,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtPrice = (n) => {
  if (!n) return "₹0";
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(1) + " Cr";
  if (n >= 100000)   return "₹" + (n / 100000).toFixed(1) + " L";
  return "₹" + n?.toLocaleString();
};

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

// ── Skeleton Pulse ─────────────────────────────────────────────────────────────
function SkeletonBox({ className }) {
  return (
    <div
      className={`rounded-xl bg-purple-900/20 animate-pulse ${className}`}
    />
  );
}

// ── Skeleton Mini Stat ─────────────────────────────────────────────────────────
function SkeletonMiniStat() {
  return (
    <div className="flex items-center gap-3 border border-purple-900/20 rounded-2xl px-4 py-3 bg-purple-600/5">
      <SkeletonBox className="w-9 h-9 flex-shrink-0" />
      <div className="space-y-2 flex-1">
        <SkeletonBox className="h-5 w-10" />
        <SkeletonBox className="h-3 w-20" />
      </div>
    </div>
  );
}

// ── Skeleton Enquiry Card ──────────────────────────────────────────────────────
function SkeletonEnquiryCard({ delay = 0 }) {
  return (
    <motion.div
      className="bg-[#252544] border border-purple-900/20 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Property skeleton */}
        <div className="flex gap-3">
          <SkeletonBox className="w-20 h-20 flex-shrink-0" />
          <div className="space-y-2 flex-1 min-w-0">
            <SkeletonBox className="h-4 w-36" />
            <SkeletonBox className="h-4 w-20" />
            <SkeletonBox className="h-3 w-24" />
            <SkeletonBox className="h-5 w-16 rounded-full" />
          </div>
        </div>

        {/* Enquirer skeleton */}
        <div className="space-y-2.5">
          <SkeletonBox className="h-3 w-16 rounded-full" />
          <div className="flex items-center gap-2">
            <SkeletonBox className="w-6 h-6 rounded-full flex-shrink-0" />
            <SkeletonBox className="h-4 w-28" />
          </div>
          <SkeletonBox className="h-3 w-44" />
          <SkeletonBox className="h-3 w-28" />
        </div>

        {/* Date + actions skeleton */}
        <div className="flex flex-col justify-between items-start md:items-end gap-3">
          <div className="space-y-2 md:items-end flex flex-col">
            <SkeletonBox className="h-3 w-28" />
            <SkeletonBox className="h-3 w-16" />
            <SkeletonBox className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex gap-2">
            <SkeletonBox className="h-8 w-24 rounded-xl" />
            <SkeletonBox className="h-8 w-20 rounded-xl" />
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ── Mini Stat ─────────────────────────────────────────────────────────────────
function MiniStat({ icon, label, value, color }) {
  const c = {
    purple: "border-purple-500/30 bg-purple-600/10 text-purple-400",
    yellow: "border-yellow-500/30 bg-yellow-600/10 text-yellow-400",
    blue:   "border-blue-500/30 bg-blue-600/10 text-blue-400",
    green:  "border-emerald-500/30 bg-emerald-600/10 text-emerald-400",
  };
  return (
    <div className={`flex items-center gap-3 border rounded-2xl px-4 py-3 ${c[color]}`}>
      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-white font-black text-lg leading-tight">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-semibold
        ${type === "success" ? "bg-emerald-900/90 border-emerald-500/40 text-emerald-300" : "bg-red-900/90 border-red-500/40 text-red-300"}`}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
    >
      {type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
      {msg}
    </motion.div>
  );
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteConfirmModal({ enquiry, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[#1a1a2e] border border-red-500/30 rounded-3xl p-7 max-w-sm w-full shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-400" />
        </div>
        <h3 className="text-white font-black text-lg text-center mb-1">Delete Enquiry?</h3>
        <p className="text-gray-400 text-sm text-center mb-1">Enquiry from</p>
        <p className="text-white font-bold text-center mb-1">{enquiry?.name}</p>
        <p className="text-gray-500 text-xs text-center mb-4">for {enquiry?.property?.title || "a property"}</p>
        <p className="text-red-400 text-xs text-center mb-6 bg-red-900/20 border border-red-500/20 rounded-xl px-4 py-2">
          ⚠️ This action cannot be undone
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-purple-900/30 text-gray-400 hover:text-white hover:border-purple-500/50 text-sm font-semibold transition-all"
          >Cancel</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            {loading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Deleting...</>
              : <><Trash2 size={14} />Delete</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Enquiry Card ──────────────────────────────────────────────────────────────
function EnquiryCard({ enquiry, onDelete, delay }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-[#252544] border border-purple-900/30 hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {/* Top: Property + User + Actions */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Property */}
        <div className="flex gap-3">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-purple-900/30 flex-shrink-0">
            {enquiry.property?.thumbnail ? (
              <img
                src={enquiry.property.thumbnail}
                alt={enquiry.property.title}
                className="w-full h-full object-cover"
                onError={e => { e.currentTarget.style.display = "none"; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">🏠</div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">{enquiry.property?.title || "Unknown Property"}</p>
            <p className="text-purple-400 font-bold text-sm mt-0.5">{fmtPrice(enquiry.property?.price)}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={10} className="text-gray-500 flex-shrink-0" />
              <p className="text-gray-500 text-xs truncate">{enquiry.property?.city || "—"}</p>
            </div>
            <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20 capitalize">
              {enquiry.property?.propertyType || "Property"}
            </span>
          </div>
        </div>

        {/* User details */}
        <div className="space-y-1.5">
          <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2">Enquirer</p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 text-[10px] font-bold">{enquiry.name?.charAt(0)?.toUpperCase()}</span>
            </div>
            <p className="text-white text-sm font-semibold">{enquiry.name}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Mail size={11} className="text-purple-400 flex-shrink-0" />
            <span className="truncate">{enquiry.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Phone size={11} className="text-purple-400 flex-shrink-0" />
            <span>{enquiry.phone}</span>
          </div>
        </div>

        {/* Date + actions */}
        <div className="flex flex-col justify-between items-start md:items-end gap-3">
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs md:justify-end">
              <Calendar size={11} className="text-purple-400" />
              <span>{fmtDate(enquiry.createdAt)}</span>
            </div>
            <p className="text-gray-600 text-[10px] mt-0.5 md:text-right">{fmtTime(enquiry.createdAt)}</p>
            <span className="inline-block mt-2 text-[10px] px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-semibold">
              New Enquiry
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 text-xs font-semibold transition-all"
            >
              <Eye size={12} />
              {expanded ? "Hide" : "Message"}
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
            <button
              onClick={() => onDelete(enquiry)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-semibold transition-all"
            >
              <Trash2 size={12} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Expandable message */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-purple-900/20 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={13} className="text-purple-400" />
                <p className="text-purple-400 text-xs font-bold uppercase tracking-wider">Message</p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed bg-[#1a1a2e] border border-purple-900/20 rounded-xl px-4 py-3">
                {enquiry.message || "No message provided."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminEnquiry = () => {
  const [enquiries,     setEnquiries]     = useState([]);
  const [filtered,      setFiltered]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [refreshing,    setRefreshing]    = useState(false);
  const [search,        setSearch]        = useState("");
  const [sortBy,        setSortBy]        = useState("newest");
  const [toast,         setToast]         = useState(null);
  const [deleteTarget,  setDeleteTarget]  = useState(null);
  const [deleting,      setDeleting]      = useState(false);

  // ── Fetch ──
  const fetchEnquiries = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const res = await api.get("/enquiry");
      setEnquiries(res.data.enquiries || res.data.data || []);
    } catch (error) {
      console.error("Error fetching enquiries", error);
      showToast("Failed to fetch enquiries", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchEnquiries(); }, []);

  // ── Filter + Sort ──
  useEffect(() => {
    let result = [...enquiries];
    if (search.trim()) result = result.filter(e =>
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.property?.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.property?.city?.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === "newest")   result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "oldest")   result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "name-az")  result.sort((a, b) => a.name?.localeCompare(b.name));
    setFiltered(result);
  }, [enquiries, search, sortBy]);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  // ── Delete ──
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/enquiry/${deleteTarget._id}`);
      setEnquiries(prev => prev.filter(e => e._id !== deleteTarget._id));
      showToast("Enquiry deleted successfully");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete error", error);
      showToast("Failed to delete enquiry", "error");
    } finally {
      setDeleting(false);
    }
  };

  // ── Stats ──
  const thisMonth = enquiries.filter(e => {
    const d = new Date(e.createdAt), now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const uniqueProps = new Set(enquiries.map(e => e.property?._id).filter(Boolean)).size;

  // ── Skeleton Loading ──
  if (loading) return (
    <div className="min-h-screen bg-[#1a1a2e] px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <SkeletonBox className="h-3 w-24 rounded-full" />
            <SkeletonBox className="h-8 w-64" />
            <SkeletonBox className="h-3 w-40" />
          </div>
          <SkeletonBox className="w-10 h-10 rounded-xl self-start sm:self-auto" />
        </div>

        {/* Mini stats skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonMiniStat key={i} />)}
        </div>

        {/* Search bar skeleton */}
        <div className="bg-[#252544] border border-purple-900/20 rounded-2xl p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <SkeletonBox className="h-10 flex-1 rounded-xl" />
            <SkeletonBox className="h-10 w-36 rounded-xl" />
          </div>
        </div>

        {/* Enquiry card skeletons */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonEnquiryCard key={i} delay={i * 0.07} />
          ))}
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a2e] px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Header ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          <div>
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-1">Admin Panel</p>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Enquiry <span className="text-purple-500">Management</span>
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">{enquiries.length} total enquiries received</p>
          </div>
          <button
            onClick={() => fetchEnquiries(true)}
            className={`w-10 h-10 rounded-xl bg-[#252544] border border-purple-900/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all self-start sm:self-auto ${refreshing ? "animate-spin" : ""}`}
          >
            <RefreshCw size={16} />
          </button>
        </motion.div>

        {/* ── Mini Stats ── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        >
          <MiniStat icon={<ClipboardList size={16} />} label="Total Enquiries"   value={enquiries.length} color="purple" />
          <MiniStat icon={<Calendar size={16} />}      label="This Month"        value={thisMonth}        color="yellow" />
          <MiniStat icon={<Building2 size={16} />}     label="Properties Enquired" value={uniqueProps}    color="blue"   />
          <MiniStat icon={<MessageSquare size={16} />} label="With Message"      value={enquiries.filter(e => e.message).length} color="green" />
        </motion.div>

        {/* ── Search + Filters ── */}
        <motion.div
          className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                className="w-full bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-white placeholder-gray-500 rounded-xl pl-9 pr-9 py-2.5 text-sm outline-none transition-colors"
                placeholder="Search by name, email or property..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              className="bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-az">Name A → Z</option>
            </select>
          </div>

          {/* Active filters */}
          {search && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-gray-500 text-xs">Filters:</span>
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
                "{search}" <button onClick={() => setSearch("")}><X size={10} /></button>
              </span>
              <span className="text-gray-500 text-xs">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </motion.div>

        {/* ── Enquiries ── */}
        {filtered.length === 0 ? (
          <motion.div
            className="bg-[#252544] border border-purple-900/30 rounded-2xl p-16 text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div className="text-5xl mb-4">📋</div>
            <p className="text-white font-bold text-lg mb-2">No enquiries found</p>
            <p className="text-gray-400 text-sm">
              {search ? "Try adjusting your search" : "No enquiries received yet"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filtered.map((enquiry, i) => (
              <EnquiryCard
                key={enquiry._id}
                enquiry={enquiry}
                onDelete={setDeleteTarget}
                delay={i * 0.04}
              />
            ))}
          </div>
        )}

        {/* ── Delete Confirm Modal ── */}
        <AnimatePresence>
          {deleteTarget && (
            <DeleteConfirmModal
              enquiry={deleteTarget}
              onConfirm={handleDeleteConfirm}
              onCancel={() => setDeleteTarget(null)}
              loading={deleting}
            />
          )}
        </AnimatePresence>

        {/* ── Toast ── */}
        <AnimatePresence>
          {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AdminEnquiry;
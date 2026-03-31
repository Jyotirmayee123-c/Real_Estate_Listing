import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import CreatePropertyModal from "../../components/admin/CreatePropertyModal";
import ViewPropertyModal from "../../components/admin/ViewPropertyModal";
import {
  Plus, Search, Trash2, Eye, Pencil, Building2,
  IndianRupee, MapPin, LayoutGrid, List, RefreshCw,
  Home, TrendingUp, CheckCircle, Filter, X,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtPrice = (n) => {
  if (!n) return "₹0";
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(1) + " Cr";
  if (n >= 100000)   return "₹" + (n / 100000).toFixed(1) + " L";
  return "₹" + n?.toLocaleString();
};

const TYPES = ["All", "Apartment", "Villa", "Independent House", "Plot", "Commercial"];

// ── Skeleton Pulse ─────────────────────────────────────────────────────────────
function SkeletonBox({ className }) {
  return (
    <div className={`rounded-xl bg-purple-900/20 animate-pulse ${className}`} />
  );
}

// ── Skeleton Mini Stat ─────────────────────────────────────────────────────────
function SkeletonMiniStat() {
  return (
    <div className="flex items-center gap-3 border border-purple-900/20 rounded-2xl px-4 py-3 bg-purple-600/5">
      <SkeletonBox className="w-9 h-9 flex-shrink-0" />
      <div className="space-y-2 flex-1">
        <SkeletonBox className="h-5 w-10" />
        <SkeletonBox className="h-3 w-24" />
      </div>
    </div>
  );
}

// ── Skeleton Property Grid Card ────────────────────────────────────────────────
function SkeletonPropertyCard({ delay = 0 }) {
  return (
    <motion.div
      className="bg-[#252544] border border-purple-900/20 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      {/* Image area */}
      <SkeletonBox className="h-44 w-full rounded-none" />
      {/* Info */}
      <div className="p-4 space-y-3">
        <SkeletonBox className="h-4 w-3/4" />
        <SkeletonBox className="h-3 w-1/2" />
        <div className="flex gap-3 pb-3 border-b border-purple-900/20">
          <SkeletonBox className="h-3 w-16" />
          <SkeletonBox className="h-3 w-16" />
          <SkeletonBox className="h-3 w-16" />
        </div>
        <div className="flex gap-2">
          <SkeletonBox className="h-8 flex-1 rounded-xl" />
          <SkeletonBox className="h-8 flex-1 rounded-xl" />
          <SkeletonBox className="h-8 flex-1 rounded-xl" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Skeleton Property List Row ─────────────────────────────────────────────────
function SkeletonPropertyRow({ delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-4 bg-[#252544] border border-purple-900/20 rounded-2xl p-4"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <SkeletonBox className="w-16 h-16 flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <SkeletonBox className="h-4 w-48" />
        <div className="flex gap-2">
          <SkeletonBox className="h-3 w-20" />
          <SkeletonBox className="h-5 w-24 rounded-full" />
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-end gap-1.5 flex-shrink-0">
        <SkeletonBox className="h-4 w-20" />
        <SkeletonBox className="h-5 w-14 rounded-full" />
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <SkeletonBox className="w-8 h-8 rounded-lg" />
        <SkeletonBox className="w-8 h-8 rounded-lg" />
        <SkeletonBox className="w-8 h-8 rounded-lg" />
      </div>
    </motion.div>
  );
}

// ── Stat Mini Card ────────────────────────────────────────────────────────────
function MiniStat({ icon, label, value, color }) {
  const c = {
    purple: "border-purple-500/30 bg-purple-600/10 text-purple-400",
    blue:   "border-blue-500/30 bg-blue-600/10 text-blue-400",
    green:  "border-emerald-500/30 bg-emerald-600/10 text-emerald-400",
    yellow: "border-yellow-500/30 bg-yellow-600/10 text-yellow-400",
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

// ── Property Grid Card ────────────────────────────────────────────────────────
function PropertyCard({ property, onView, onEdit, onDelete, delay }) {
  return (
    <motion.div
      className="group bg-[#252544] border border-purple-900/30 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={property.thumbnail}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.currentTarget.parentElement.innerHTML = `<div class="w-full h-full bg-purple-900/30 flex items-center justify-center"><span class="text-purple-400 text-4xl">🏠</span></div>`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#252544] via-transparent to-transparent" />
        {/* Type badge */}
        <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-600/80 text-white backdrop-blur-sm">
          {property.propertyType || "Property"}
        </span>
        {/* Price badge */}
        <span className="absolute bottom-3 right-3 text-sm font-black text-white bg-[#1a1a2e]/80 backdrop-blur-sm px-3 py-1 rounded-xl border border-purple-500/30">
          {fmtPrice(property.price)}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white font-bold text-sm mb-1 truncate">{property.title}</h3>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <MapPin size={11} className="text-purple-400 flex-shrink-0" />
          <span className="truncate">{property.city}{property.state ? `, ${property.state}` : ""}</span>
        </div>

        {/* Meta row */}
        {(property.bedrooms || property.bathrooms || property.area) && (
          <div className="flex items-center gap-3 text-gray-500 text-xs mb-3 pb-3 border-b border-purple-900/20">
            {property.bedrooms  && <span>🛏 {property.bedrooms} Beds</span>}
            {property.bathrooms && <span>🚿 {property.bathrooms} Baths</span>}
            {property.area      && <span>📐 {property.area} sq.ft</span>}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(property)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 text-xs font-semibold transition-all"
          >
            <Eye size={13} /> View
          </button>
          <button
            onClick={() => onEdit(property)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 text-xs font-semibold transition-all"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            onClick={() => onDelete(property._id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/40 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-semibold transition-all"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Property List Row ─────────────────────────────────────────────────────────
function PropertyRow({ property, onView, onEdit, onDelete, delay }) {
  return (
    <motion.div
      className="group flex items-center gap-4 bg-[#252544] border border-purple-900/30 hover:border-purple-500/40 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-purple-900/30">
        <img
          src={property.thumbnail}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm truncate">{property.title}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-gray-400 text-xs flex items-center gap-1">
            <MapPin size={10} className="text-purple-400" />{property.city}
          </span>
          <span className="text-gray-600 text-xs">·</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
            {property.propertyType}
          </span>
        </div>
      </div>
      <div className="hidden sm:block text-right flex-shrink-0">
        <p className="text-purple-400 font-black text-sm">{fmtPrice(property.price)}</p>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={() => onView(property)}  className="w-8 h-8 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/20 flex items-center justify-center text-blue-400 transition-all"><Eye size={13} /></button>
        <button onClick={() => onEdit(property)}  className="w-8 h-8 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400 transition-all"><Pencil size={13} /></button>
        <button onClick={() => onDelete(property._id)} className="w-8 h-8 rounded-lg bg-red-600/20 hover:bg-red-600/40 border border-red-500/20 flex items-center justify-center text-red-400 transition-all"><Trash2 size={13} /></button>
      </div>
    </motion.div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-semibold
        ${type === "success" ? "bg-emerald-900/80 border-emerald-500/40 text-emerald-300" : "bg-red-900/80 border-red-500/40 text-red-300"}`}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
    >
      {type === "success" ? <CheckCircle size={16} /> : <X size={16} />}
      {msg}
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const AdminProperty = () => {
  const [openModal,       setOpenModal]       = useState(false);
  const [viewModal,       setViewModal]       = useState(false);
  const [editMode,        setEditMode]        = useState(false);
  const [selectedProp,    setSelectedProp]    = useState(null);
  const [properties,      setProperties]      = useState([]);
  const [filtered,        setFiltered]        = useState([]);
  const [loading,         setLoading]         = useState(false);
  const [refreshing,      setRefreshing]      = useState(false);
  const [viewMode,        setViewMode]        = useState("grid"); // grid | list
  const [search,          setSearch]          = useState("");
  const [typeFilter,      setTypeFilter]      = useState("All");
  const [sortBy,          setSortBy]          = useState("newest");
  const [toast,           setToast]           = useState(null);

  // ── Fetch ──
  const fetchProperties = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const res = await api.get("/property");
      setProperties(res.data.data || []);
    } catch (error) {
      console.error(error);
      showToast("Failed to fetch properties", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchProperties(); }, []);

  // ── Filter + Sort ──
  useEffect(() => {
    let result = [...properties];
    if (search.trim())        result = result.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()) || p.city?.toLowerCase().includes(search.toLowerCase()));
    if (typeFilter !== "All") result = result.filter(p => p.propertyType === typeFilter);
    if (sortBy === "newest")  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "oldest")  result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "price-hi")result.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortBy === "price-lo")result.sort((a, b) => (a.price || 0) - (b.price || 0));
    setFiltered(result);
  }, [properties, search, typeFilter, sortBy]);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  // ── Delete ──
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await api.delete(`/property/${id}`);
      setProperties(prev => prev.filter(p => p._id !== id));
      showToast("Property deleted successfully ✅");
    } catch {
      showToast("Failed to delete property ❌", "error");
    }
  };

  const handleView = (p) => { setSelectedProp(p); setViewModal(true); };
  const handleEdit = (p) => { setSelectedProp(p); setEditMode(true); setOpenModal(true); };

  // ── Stats ──
  const totalRevenue = properties.reduce((s, p) => s + (p.price || 0), 0);
  const typeCount    = [...new Set(properties.map(p => p.propertyType))].length;

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
          <div className="flex items-center gap-3">
            <SkeletonBox className="w-10 h-10 rounded-xl" />
            <SkeletonBox className="h-10 w-36 rounded-xl" />
          </div>
        </div>

        {/* Mini stats skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonMiniStat key={i} />)}
        </div>

        {/* Search bar skeleton */}
        <div className="bg-[#252544] border border-purple-900/20 rounded-2xl p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <SkeletonBox className="h-10 flex-1 rounded-xl" />
            <SkeletonBox className="h-10 w-40 rounded-xl" />
            <SkeletonBox className="h-10 w-40 rounded-xl" />
            <SkeletonBox className="h-10 w-20 rounded-xl" />
          </div>
        </div>

        {/* Property grid skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <SkeletonPropertyCard key={i} delay={i * 0.06} />
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
            <h1 className="text-2xl sm:text-3xl font-black text-white">Property <span className="text-purple-500">Management</span></h1>
            <p className="text-gray-500 text-xs mt-0.5">{properties.length} total properties listed</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchProperties(true)}
              className={`w-10 h-10 rounded-xl bg-[#252544] border border-purple-900/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all ${refreshing ? "animate-spin" : ""}`}
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={() => { setSelectedProp(null); setEditMode(false); setOpenModal(true); }}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-purple-900/30"
            >
              <Plus size={16} /> Create Property
            </button>
          </div>
        </motion.div>

        {/* ── Mini Stats ── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        >
          <MiniStat icon={<Building2 size={16} />}   label="Total Properties" value={properties.length}      color="purple" />
          <MiniStat icon={<CheckCircle size={16} />}  label="Active Listings"  value={properties.length}      color="green"  />
          <MiniStat icon={<IndianRupee size={16} />}  label="Portfolio Value"  value={fmtPrice(totalRevenue)} color="blue"   />
          <MiniStat icon={<Home size={16} />}         label="Property Types"   value={typeCount}              color="yellow" />
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
                className="w-full bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-white placeholder-gray-500 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-colors"
                placeholder="Search by title or city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Type Filter */}
            <select
              className="bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer transition-colors"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* Sort */}
            <select
              className="bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer transition-colors"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-hi">Price: High to Low</option>
              <option value="price-lo">Price: Low to High</option>
            </select>

            {/* View toggle */}
            <div className="flex items-center bg-[#1a1a2e] border border-purple-900/30 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-white"}`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-white"}`}
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Active filters */}
          {(search || typeFilter !== "All") && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-gray-500 text-xs">Filters:</span>
              {search && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
                  "{search}" <button onClick={() => setSearch("")}><X size={10} /></button>
                </span>
              )}
              {typeFilter !== "All" && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
                  {typeFilter} <button onClick={() => setTypeFilter("All")}><X size={10} /></button>
                </span>
              )}
              <span className="text-gray-500 text-xs">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </motion.div>

        {/* ── Properties Grid / List ── */}
        {filtered.length === 0 ? (
          <motion.div
            className="bg-[#252544] border border-purple-900/30 rounded-2xl p-16 text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div className="text-5xl mb-4">🏠</div>
            <p className="text-white font-bold text-lg mb-2">No properties found</p>
            <p className="text-gray-400 text-sm mb-6">
              {search || typeFilter !== "All" ? "Try adjusting your filters" : "Start by creating your first property"}
            </p>
            {!(search || typeFilter !== "All") && (
              <button
                onClick={() => { setSelectedProp(null); setEditMode(false); setOpenModal(true); }}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 mx-auto"
              >
                <Plus size={16} /> Create First Property
              </button>
            )}
          </motion.div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <PropertyCard
                key={p._id}
                property={p}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                delay={i * 0.05}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p, i) => (
              <PropertyRow
                key={p._id}
                property={p}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                delay={i * 0.04}
              />
            ))}
          </div>
        )}

        {/* ── Modals ── */}
        <AnimatePresence>
          {openModal && (
            <CreatePropertyModal
              closeModal={() => { setOpenModal(false); setEditMode(false); fetchProperties(); }}
              editMode={editMode}
              propertyData={selectedProp}
            />
          )}
          {viewModal && (
            <ViewPropertyModal
              property={selectedProp}
              closeModal={() => setViewModal(false)}
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

export default AdminProperty;
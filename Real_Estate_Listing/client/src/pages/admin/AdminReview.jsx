import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import {
  Star, Search, Trash2, RefreshCw, X,
  CheckCircle, AlertTriangle, Calendar,
  Eye, ChevronDown, ChevronUp,
  ThumbsUp, ThumbsDown, MessageSquare,
  ArrowLeft, Mail, Home, Clock,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

// ── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ rating, size = 13 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
        />
      ))}
    </div>
  );
}

// ── Mini Stat ─────────────────────────────────────────────────────────────────
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

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
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
function DeleteConfirmModal({ review, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[#1a1a2e] border border-red-500/30 rounded-3xl p-7 max-w-sm w-full shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-400" />
        </div>
        <h3 className="text-white font-black text-lg text-center mb-1">Delete Review?</h3>
        <p className="text-gray-400 text-sm text-center mb-1">Review by</p>
        <p className="text-white font-bold text-center mb-4">{review?.userName}</p>
        <p className="text-red-400 text-xs text-center mb-6 bg-red-900/20 border border-red-500/20 rounded-xl px-4 py-2">
          ⚠️ This action cannot be undone
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-purple-900/30 text-gray-400 hover:text-white hover:border-purple-500/50 text-sm font-semibold transition-all">
            Cancel
          </button>
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

// ── Review Detail Page ────────────────────────────────────────────────────────
function ReviewDetail({ review, onBack, onDelete }) {
  const ratingColor =
    review.rating >= 4 ? "from-emerald-900/30 to-emerald-900/10 border-emerald-500/30" :
    review.rating === 3 ? "from-yellow-900/30 to-yellow-900/10 border-yellow-500/30" :
    "from-red-900/30 to-red-900/10 border-red-500/30";

  const ratingLabel =
    review.rating === 5 ? "Excellent" :
    review.rating === 4 ? "Good" :
    review.rating === 3 ? "Okay" :
    review.rating === 2 ? "Poor" : "Terrible";

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back + Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Reviews
        </button>
        <button
          onClick={() => onDelete(review)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 hover:border-red-500/40 text-red-400 text-sm font-semibold transition-all"
        >
          <Trash2 size={13} /> Delete Review
        </button>
      </div>

      {/* Hero Card */}
      <motion.div
        className={`bg-gradient-to-br ${ratingColor} border rounded-3xl p-8`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-2xl flex-shrink-0 shadow-lg">
            {review.userName?.charAt(0)?.toUpperCase() || "?"}
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-black text-2xl">{review.userName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Mail size={12} className="text-gray-400" />
              <p className="text-gray-400 text-sm">{review.userEmail}</p>
            </div>
            {review.propertyName && (
              <div className="flex items-center gap-2 mt-1">
                <Home size={12} className="text-purple-400" />
                <p className="text-purple-400 text-sm font-semibold">{review.propertyName}</p>
              </div>
            )}
          </div>
          {/* Rating Badge */}
          <div className="flex-shrink-0 text-center">
            <div className="text-white font-black text-5xl leading-none">{review.rating}</div>
            <div className="text-gray-400 text-xs mt-1">out of 5</div>
            <div className="mt-2">
              <StarRating rating={review.rating} size={16} />
            </div>
            <p className={`text-xs font-bold mt-1 ${
              review.rating >= 4 ? "text-emerald-400" :
              review.rating === 3 ? "text-yellow-400" : "text-red-400"
            }`}>{ratingLabel}</p>
          </div>
        </div>
      </motion.div>

      {/* Comment */}
      <motion.div
        className="bg-[#252544] border border-purple-900/30 rounded-2xl p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={14} className="text-purple-400" />
          <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">Full Review Comment</p>
        </div>
        {review.comment ? (
          <p className="text-gray-200 text-base leading-relaxed">
            "{review.comment}"
          </p>
        ) : (
          <p className="text-gray-500 italic text-sm">No comment was provided with this review.</p>
        )}
      </motion.div>

      {/* Meta */}
      <motion.div
        className="bg-[#252544] border border-purple-900/30 rounded-2xl p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">Review Details</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {[
            { icon: <Calendar size={14} />, label: "Date",     value: fmtDate(review.createdAt) },
            { icon: <Clock size={14} />,    label: "Time",     value: fmtTime(review.createdAt) },
            { icon: <Mail size={14} />,     label: "Email",    value: review.userEmail },
            { icon: <Home size={14} />,     label: "Property", value: review.propertyName || "—" },
            { icon: <Star size={14} />,     label: "Rating",   value: `${review.rating} / 5 Stars` },
          ].map((item, i) => (
            <div key={i} className="bg-[#1a1a2e] border border-purple-900/20 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                {item.icon}
                <span className="text-[10px] uppercase tracking-wider font-semibold">{item.label}</span>
              </div>
              <p className="text-white text-sm font-semibold truncate">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Review Card ───────────────────────────────────────────────────────────────
function ReviewCard({ review, onDelete, onView, delay }) {
  const [expanded, setExpanded] = useState(false);

  const ratingColor =
    review.rating >= 4 ? "border-emerald-500/30 bg-emerald-600/10" :
    review.rating === 3 ? "border-yellow-500/30 bg-yellow-600/10" :
    "border-red-500/30 bg-red-600/10";

  return (
    <motion.div
      className={`bg-[#252544] border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/30 ${ratingColor}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Col 1 — User */}
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            {review.userName?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm">{review.userName}</p>
            <p className="text-gray-400 text-xs truncate mt-0.5">{review.userEmail}</p>
            {review.propertyName && (
              <p className="text-purple-400 text-[11px] mt-0.5">{review.propertyName}</p>
            )}
          </div>
        </div>

        {/* Col 2 — Rating + Comment */}
        <div className="space-y-2">
          <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">Rating</p>
          <StarRating rating={review.rating} />
          <p className="text-gray-400 text-xs line-clamp-2">{review.comment || "No comment."}</p>
        </div>

        {/* Col 3 — Date + Actions */}
        <div className="flex flex-col justify-between items-start md:items-end gap-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Calendar size={11} className="text-purple-400" />
            <span>{fmtDate(review.createdAt)}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onView(review)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 text-xs font-semibold transition-all"
            >
              <Eye size={12} /> View Detail
            </button>
            <button
              onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 text-xs font-semibold transition-all"
            >
              <MessageSquare size={12} />
              Msg
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
            <button
              onClick={() => onDelete(review)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-semibold transition-all"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Comment */}
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
                <p className="text-purple-400 text-xs font-bold uppercase tracking-wider">Full Comment</p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed bg-[#1a1a2e] border border-purple-900/20 rounded-xl px-4 py-3">
                {review.comment || "No comment provided."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function AdminReview() {
  const [reviews,      setReviews]      = useState([]);
  const [filtered,     setFiltered]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [refreshing,   setRefreshing]   = useState(false);
  const [search,       setSearch]       = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy,       setSortBy]       = useState("newest");
  const [toast,        setToast]        = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null); // ← detail view
  const [deleting,     setDeleting]     = useState(false);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const fetchReviews = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const res = await api.get("/review");
      setReviews(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching reviews", error);
      showToast("Failed to fetch reviews", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  useEffect(() => {
    let result = [...reviews];
    if (search.trim()) result = result.filter(r =>
      r.userName?.toLowerCase().includes(search.toLowerCase()) ||
      r.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
      r.comment?.toLowerCase().includes(search.toLowerCase()) ||
      r.propertyName?.toLowerCase().includes(search.toLowerCase())
    );
    if (ratingFilter !== "all") result = result.filter(r => r.rating === Number(ratingFilter));
    if (sortBy === "newest")      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "oldest")      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "rating-high") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "rating-low")  result.sort((a, b) => a.rating - b.rating);
    if (sortBy === "name-az")     result.sort((a, b) => a.userName?.localeCompare(b.userName));
    setFiltered(result);
  }, [reviews, search, ratingFilter, sortBy]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/review/${deleteTarget._id}`);
      setReviews(prev => prev.filter(r => r._id !== deleteTarget._id));
      showToast(`Review by ${deleteTarget.userName} deleted`);
      setDeleteTarget(null);
      // If we're on the detail page of deleted review, go back
      if (selectedReview?._id === deleteTarget._id) setSelectedReview(null);
    } catch (error) {
      showToast("Failed to delete review", "error");
    } finally {
      setDeleting(false);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : "0.0";
  const fiveStars  = reviews.filter(r => r.rating === 5).length;
  const lowRatings = reviews.filter(r => r.rating <= 2).length;

  if (loading) return (
    <div className="min-h-screen bg-[#1a1a2e] px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-[#252544] animate-pulse" />
            <div className="h-8 w-64 rounded bg-[#252544] animate-pulse" />
            <div className="h-2.5 w-48 rounded bg-[#252544] animate-pulse" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#252544] animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 border border-purple-900/20 rounded-2xl px-4 py-3 bg-[#252544] animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex-shrink-0" />
              <div className="space-y-2">
                <div className="h-5 w-8 rounded bg-white/5" />
                <div className="h-2.5 w-20 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5 animate-pulse h-28" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a2e] px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header — always visible */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          <div>
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-1">Admin Panel</p>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Review <span className="text-purple-500">Management</span>
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">
              {selectedReview
                ? `Viewing review by ${selectedReview.userName}`
                : `${reviews.length} total reviews received`}
            </p>
          </div>
          {!selectedReview && (
            <button
              onClick={() => fetchReviews(true)}
              className={`w-10 h-10 rounded-xl bg-[#252544] border border-purple-900/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all self-start sm:self-auto ${refreshing ? "animate-spin" : ""}`}
            >
              <RefreshCw size={16} />
            </button>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedReview ? (
            /* ── Detail View ── */
            <ReviewDetail
              key="detail"
              review={selectedReview}
              onBack={() => setSelectedReview(null)}
              onDelete={setDeleteTarget}
            />
          ) : (
            /* ── List View ── */
            <motion.div key="list" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* Mini Stats */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
              >
                <MiniStat icon={<MessageSquare size={16} />} label="Total Reviews"  value={reviews.length} color="purple" />
                <MiniStat icon={<Star size={16} />}          label="Avg Rating"     value={avgRating}      color="yellow" />
                <MiniStat icon={<ThumbsUp size={16} />}      label="5 Star Reviews" value={fiveStars}      color="green"  />
                <MiniStat icon={<ThumbsDown size={16} />}    label="Low Ratings"    value={lowRatings}     color="blue"   />
              </motion.div>

              {/* Search + Filters */}
              <motion.div
                className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      className="w-full bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-white placeholder-gray-500 rounded-xl pl-9 pr-9 py-2.5 text-sm outline-none transition-colors"
                      placeholder="Search by name, email, property or comment..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                      <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <select
                    className="bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer"
                    value={ratingFilter}
                    onChange={e => setRatingFilter(e.target.value)}
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                    <option value="3">⭐⭐⭐ 3 Stars</option>
                    <option value="2">⭐⭐ 2 Stars</option>
                    <option value="1">⭐ 1 Star</option>
                  </select>
                  <select
                    className="bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="rating-high">Rating: High → Low</option>
                    <option value="rating-low">Rating: Low → High</option>
                    <option value="name-az">Name A → Z</option>
                  </select>
                </div>
                {(search || ratingFilter !== "all") && (
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-gray-500 text-xs">Filters:</span>
                    {search && (
                      <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
                        "{search}" <button onClick={() => setSearch("")}><X size={10} /></button>
                      </span>
                    )}
                    {ratingFilter !== "all" && (
                      <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
                        {ratingFilter} Stars <button onClick={() => setRatingFilter("all")}><X size={10} /></button>
                      </span>
                    )}
                    <span className="text-gray-500 text-xs">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
                  </div>
                )}
              </motion.div>

              {/* Review Cards */}
              {filtered.length === 0 ? (
                <motion.div
                  className="bg-[#252544] border border-purple-900/30 rounded-2xl p-16 text-center"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                  <div className="text-5xl mb-4">⭐</div>
                  <p className="text-white font-bold text-lg mb-2">No reviews found</p>
                  <p className="text-gray-400 text-sm">
                    {search || ratingFilter !== "all" ? "Try adjusting your filters" : "No reviews yet"}
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((review, i) => (
                    <ReviewCard
                      key={review._id}
                      review={review}
                      onDelete={setDeleteTarget}
                      onView={setSelectedReview}   // ← opens detail page
                      delay={i * 0.04}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Modal */}
        <AnimatePresence>
          {deleteTarget && (
            <DeleteConfirmModal
              review={deleteTarget}
              onConfirm={handleDeleteConfirm}
              onCancel={() => setDeleteTarget(null)}
              loading={deleting}
            />
          )}
        </AnimatePresence>

        {/* Toast */}
        <AnimatePresence>
          {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default AdminReview;
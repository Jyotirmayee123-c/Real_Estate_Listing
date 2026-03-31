import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import {
  Users, Search, Trash2, RefreshCw, Shield,
  UserCheck, UserX, X, CheckCircle, AlertTriangle,
  Mail, Phone, Calendar, Crown, User, Filter,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────
const getInitials = (name) =>
  name ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "U";

const avatarColor = (name) => {
  const colors = [
    "from-purple-600 to-blue-600",
    "from-pink-600 to-purple-600",
    "from-blue-600 to-cyan-600",
    "from-emerald-600 to-teal-600",
    "from-orange-600 to-pink-600",
    "from-indigo-600 to-purple-600",
  ];
  const i = (name?.charCodeAt(0) || 0) % colors.length;
  return colors[i];
};

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

// ── Skeleton User Card (Grid) ──────────────────────────────────────────────────
function SkeletonUserCard({ delay = 0 }) {
  return (
    <motion.div
      className="bg-[#252544] border border-purple-900/20 rounded-2xl p-5"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <SkeletonBox className="w-11 h-11 rounded-2xl flex-shrink-0" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <SkeletonBox className="h-4 w-28" />
              <SkeletonBox className="h-5 w-14 rounded-full" />
            </div>
            <SkeletonBox className="h-3 w-40" />
          </div>
        </div>
        <SkeletonBox className="w-8 h-8 rounded-xl flex-shrink-0" />
      </div>
      <div className="mt-4 pt-3 border-t border-purple-900/20 grid grid-cols-2 gap-2">
        <SkeletonBox className="h-3 w-28" />
        <SkeletonBox className="h-3 w-20 ml-auto" />
      </div>
    </motion.div>
  );
}

// ── Skeleton User Row (List) ───────────────────────────────────────────────────
function SkeletonUserRow({ delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-4 bg-[#252544] border border-purple-900/20 rounded-2xl px-5 py-4"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay }}
    >
      <SkeletonBox className="w-10 h-10 rounded-xl flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <SkeletonBox className="h-4 w-36" />
        <SkeletonBox className="h-3 w-48" />
      </div>
      <SkeletonBox className="hidden sm:block h-6 w-16 rounded-full flex-shrink-0" />
      <SkeletonBox className="hidden md:block h-3 w-20 flex-shrink-0" />
      <SkeletonBox className="w-8 h-8 rounded-xl flex-shrink-0" />
    </motion.div>
  );
}

// ── Mini Stat Card ────────────────────────────────────────────────────────────
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
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-semibold
        ${type === "success"
          ? "bg-emerald-900/90 border-emerald-500/40 text-emerald-300"
          : "bg-red-900/90 border-red-500/40 text-red-300"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
      {msg}
    </motion.div>
  );
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteConfirmModal({ user, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[#1a1a2e] border border-red-500/30 rounded-3xl p-7 max-w-sm w-full shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-400" />
        </div>
        <h3 className="text-white font-black text-lg text-center mb-1">Delete User?</h3>
        <p className="text-gray-400 text-sm text-center mb-1">
          You are about to delete
        </p>
        <p className="text-white font-bold text-center mb-5">
          {user?.name} <span className="text-gray-400 font-normal text-xs">({user?.email})</span>
        </p>
        <p className="text-red-400 text-xs text-center mb-6 bg-red-900/20 border border-red-500/20 rounded-xl px-4 py-2">
          ⚠️ This action cannot be undone
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-purple-900/30 text-gray-400 hover:text-white hover:border-purple-500/50 text-sm font-semibold transition-all"
          >
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

// ── User Card ─────────────────────────────────────────────────────────────────
function UserCard({ user, onDelete, delay }) {
  return (
    <motion.div
      className="group bg-[#252544] border border-purple-900/30 hover:border-purple-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Avatar + info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${avatarColor(user.name)} flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-lg`}>
            {getInitials(user.name)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-white font-bold text-sm truncate">{user.name}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold flex-shrink-0
                ${user.role === "admin"
                  ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                  : "bg-gray-500/15 text-gray-400 border-gray-500/20"}`}>
                {user.role === "admin" ? "👑 Admin" : "👤 User"}
              </span>
            </div>
            <p className="text-gray-400 text-xs truncate mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(user)}
          className="w-8 h-8 rounded-xl bg-red-600/10 hover:bg-red-600/30 border border-red-500/10 hover:border-red-500/40 flex items-center justify-center text-red-400 transition-all flex-shrink-0 opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Details row */}
      <div className="mt-4 pt-3 border-t border-purple-900/20 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
          <Calendar size={11} className="text-purple-400 flex-shrink-0" />
          <span>Joined {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs justify-end">
          <div className={`w-1.5 h-1.5 rounded-full ${user.role === "admin" ? "bg-purple-400" : "bg-emerald-400"}`} />
          <span>{user.role === "admin" ? "Administrator" : "Member"}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── User Row (List view) ──────────────────────────────────────────────────────
function UserRow({ user, onDelete, delay }) {
  return (
    <motion.div
      className="group flex items-center gap-4 bg-[#252544] border border-purple-900/30 hover:border-purple-500/40 rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay }}
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColor(user.name)} flex items-center justify-center text-white font-black text-xs flex-shrink-0`}>
        {getInitials(user.name)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm truncate">{user.name}</p>
        <p className="text-gray-500 text-xs truncate">{user.email}</p>
      </div>
      <div className="hidden sm:block flex-shrink-0">
        <span className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold
          ${user.role === "admin"
            ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
            : "bg-gray-500/15 text-gray-400 border-gray-500/20"}`}>
          {user.role === "admin" ? "👑 Admin" : "👤 User"}
        </span>
      </div>
      <div className="hidden md:block text-gray-600 text-xs flex-shrink-0">
        {new Date(user.createdAt).toLocaleDateString("en-IN")}
      </div>
      <button
        onClick={() => onDelete(user)}
        className="w-8 h-8 rounded-xl bg-red-600/10 hover:bg-red-600/30 border border-red-500/10 hover:border-red-500/40 flex items-center justify-center text-red-400 transition-all flex-shrink-0"
      >
        <Trash2 size={13} />
      </button>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminUsers = () => {
  const [users,      setUsers]      = useState([]);
  const [filtered,   setFiltered]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search,     setSearch]     = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy,     setSortBy]     = useState("newest");
  const [viewMode,   setViewMode]   = useState("grid");
  const [toast,      setToast]      = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting,   setDeleting]   = useState(false);

  // ── Fetch ──
  const fetchUsers = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const res = await api.get("/auth/users");
      setUsers(res.data.users || res.data.data || []);
    } catch (error) {
      console.error("Error fetching users", error);
      showToast("Failed to fetch users", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // ── Filter + Sort ──
  useEffect(() => {
    let result = [...users];
    if (search.trim())        result = result.filter(u => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));
    if (roleFilter !== "all") result = result.filter(u => u.role === roleFilter);
    if (sortBy === "newest")  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "oldest")  result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "name-az") result.sort((a, b) => a.name?.localeCompare(b.name));
    if (sortBy === "name-za") result.sort((a, b) => b.name?.localeCompare(a.name));
    setFiltered(result);
  }, [users, search, roleFilter, sortBy]);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  // ── Delete ──
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/users/${deleteTarget._id}`);
      setUsers(prev => prev.filter(u => u._id !== deleteTarget._id));
      showToast(`${deleteTarget.name} deleted successfully`);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete error", error);
      showToast("Failed to delete user", "error");
    } finally {
      setDeleting(false);
    }
  };

  // ── Stats ──
  const adminCount = users.filter(u => u.role === "admin").length;
  const userCount  = users.filter(u => u.role !== "admin").length;
  const thisMonth  = users.filter(u => {
    const d = new Date(u.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  // ── Skeleton Loading ──
  if (loading) return (
    <div className="min-h-screen bg-[#1a1a2e] px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <SkeletonBox className="h-3 w-24 rounded-full" />
            <SkeletonBox className="h-8 w-60" />
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
            <SkeletonBox className="h-10 w-36 rounded-xl" />
            <SkeletonBox className="h-10 w-24 rounded-xl" />
          </div>
        </div>

        {/* User card skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonUserCard key={i} delay={i * 0.06} />
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
              User <span className="text-purple-500">Management</span>
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">{users.length} total registered users</p>
          </div>
          <button
            onClick={() => fetchUsers(true)}
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
          <MiniStat icon={<Users size={16} />}     label="Total Users"    value={users.length}  color="purple" />
          <MiniStat icon={<Crown size={16} />}      label="Admins"         value={adminCount}    color="yellow" />
          <MiniStat icon={<UserCheck size={16} />}  label="Regular Users"  value={userCount}     color="blue"   />
          <MiniStat icon={<Calendar size={16} />}   label="Joined This Month" value={thisMonth}  color="green"  />
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
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Role filter */}
            <select
              className="bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins only</option>
              <option value="user">Users only</option>
            </select>

            {/* Sort */}
            <select
              className="bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-az">Name A → Z</option>
              <option value="name-za">Name Z → A</option>
            </select>

            {/* View toggle */}
            <div className="flex items-center bg-[#1a1a2e] border border-purple-900/30 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-white"}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-white"}`}
              >
                List
              </button>
            </div>
          </div>

          {/* Active filters */}
          {(search || roleFilter !== "all") && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-gray-500 text-xs">Filters:</span>
              {search && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
                  "{search}" <button onClick={() => setSearch("")}><X size={10} /></button>
                </span>
              )}
              {roleFilter !== "all" && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
                  {roleFilter} <button onClick={() => setRoleFilter("all")}><X size={10} /></button>
                </span>
              )}
              <span className="text-gray-500 text-xs">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </motion.div>

        {/* ── Users ── */}
        {filtered.length === 0 ? (
          <motion.div
            className="bg-[#252544] border border-purple-900/30 rounded-2xl p-16 text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div className="text-5xl mb-4">👤</div>
            <p className="text-white font-bold text-lg mb-2">No users found</p>
            <p className="text-gray-400 text-sm">
              {search || roleFilter !== "all" ? "Try adjusting your filters" : "No registered users yet"}
            </p>
          </motion.div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((user, i) => (
              <UserCard
                key={user._id}
                user={user}
                onDelete={setDeleteTarget}
                delay={i * 0.04}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {/* List header */}
            <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-2">
              <span className="text-gray-600 text-xs font-semibold uppercase tracking-wider">User</span>
              <span className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Role</span>
              <span className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Joined</span>
              <span className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Action</span>
            </div>
            {filtered.map((user, i) => (
              <UserRow
                key={user._id}
                user={user}
                onDelete={setDeleteTarget}
                delay={i * 0.03}
              />
            ))}
          </div>
        )}

        {/* ── Delete confirm modal ── */}
        <AnimatePresence>
          {deleteTarget && (
            <DeleteConfirmModal
              user={deleteTarget}
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

export default AdminUsers;
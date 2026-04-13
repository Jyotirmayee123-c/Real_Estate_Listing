import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import {
  MessageSquare, Search, Trash2, RefreshCw,
  X, CheckCircle, AlertTriangle, Mail, Phone,
  Calendar, Eye, ChevronDown, ChevronUp,
  Home, Users, Clock, Filter, Send, Reply,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const lookingToBadge = (val) => {
  const map = {
    buy:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    sell: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };
  return map[val] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
};

const methodBadge = (val) => {
  const map = {
    call:     "📞 Phone Call",
    whatsApp: "💬 WhatsApp",
    email:    "✉️ Email",
  };
  return map[val] || val || "—";
};

const timeBadge = (val) => {
  const map = {
    morning:   "🌅 Morning",
    afternoon: "☀️ Afternoon",
    evening:   "🌆 Evening",
  };
  return map[val] || val || "—";
};

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

// ── Reply Modal ───────────────────────────────────────────────────────────────
function ReplyModal({ contact, onClose, showToast }) {
  const [replyMethod, setReplyMethod] = useState("email");
  const [subject, setSubject]         = useState(`Re: Your Property Enquiry`);
  const [message, setMessage]         = useState(
    `Hi ${contact?.fullName},\n\nThank you for reaching out to us regarding your property enquiry.\n\n`
  );
  const [sending, setSending]         = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    try {
      if (replyMethod === "email") {
        // Opens default mail client
        const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.open(mailto, "_blank");
        showToast("Email client opened successfully", "success");
      } else if (replyMethod === "whatsapp") {
        const phone = (contact.whatsApp || contact.phone || "").replace(/\D/g, "");
        const wa = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(wa, "_blank");
        showToast("WhatsApp opened successfully", "success");
      } else if (replyMethod === "call") {
        window.open(`tel:${contact.phone}`, "_self");
        showToast("Initiating call...", "success");
      }
      onClose();
    } catch (err) {
      showToast("Failed to open reply. Try again.", "error");
    } finally {
      setSending(false);
    }
  };

  const methods = [
    { id: "email",     label: "Email",     icon: "✉️",  color: "blue",   available: !!contact?.email },
    { id: "whatsapp",  label: "WhatsApp",  icon: "💬",  color: "green",  available: !!(contact?.whatsApp || contact?.phone) },
    { id: "call",      label: "Call",      icon: "📞",  color: "purple", available: !!contact?.phone },
  ];

  const colorMap = {
    blue:   { btn: "border-blue-500/40 bg-blue-600/20 text-blue-400",   active: "border-blue-500 bg-blue-600/30 text-blue-300 ring-1 ring-blue-500/40" },
    green:  { btn: "border-emerald-500/40 bg-emerald-600/20 text-emerald-400", active: "border-emerald-500 bg-emerald-600/30 text-emerald-300 ring-1 ring-emerald-500/40" },
    purple: { btn: "border-purple-500/40 bg-purple-600/20 text-purple-400", active: "border-purple-500 bg-purple-600/30 text-purple-300 ring-1 ring-purple-500/40" },
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[#1a1a2e] border border-purple-500/30 rounded-3xl p-7 max-w-lg w-full shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">Reply To</p>
            <h3 className="text-white font-black text-xl">{contact?.fullName}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{contact?.email}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Reply Method Selector */}
        <div className="mb-5">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Reply Via</p>
          <div className="grid grid-cols-3 gap-2">
            {methods.map(m => (
              <button
                key={m.id}
                onClick={() => m.available && setReplyMethod(m.id)}
                disabled={!m.available}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border text-xs font-semibold transition-all
                  ${!m.available ? "opacity-30 cursor-not-allowed border-gray-700 bg-gray-800/20 text-gray-600" :
                    replyMethod === m.id ? colorMap[m.color].active : colorMap[m.color].btn + " hover:opacity-90"
                  }`}
              >
                <span className="text-lg">{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Email subject (only for email) */}
        {replyMethod === "email" && (
          <div className="mb-4">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-2">Subject</label>
            <input
              className="w-full bg-[#252544] border border-purple-900/30 focus:border-purple-500 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>
        )}

        {/* Call — show number, no message box */}
        {replyMethod === "call" ? (
          <div className="mb-5 bg-purple-600/10 border border-purple-500/20 rounded-2xl px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
              <Phone size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Calling</p>
              <p className="text-white font-bold text-sm">{contact?.phone}</p>
            </div>
          </div>
        ) : (
          /* Message Box */
          <div className="mb-5">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-2">Message</label>
            <textarea
              rows={5}
              className="w-full bg-[#252544] border border-purple-900/30 focus:border-purple-500 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none leading-relaxed"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your reply..."
            />
            <p className="text-gray-600 text-xs mt-1 text-right">{message.length} chars</p>
          </div>
        )}

        {/* Contact info chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {contact?.email && (
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <Mail size={10} /> {contact.email}
            </span>
          )}
          {contact?.phone && (
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-purple-600/10 text-purple-400 border border-purple-500/20">
              <Phone size={10} /> {contact.phone}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-purple-900/30 text-gray-400 hover:text-white hover:border-purple-500/50 text-sm font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending || (replyMethod !== "call" && !message.trim())}
            className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            {sending
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
              : replyMethod === "call"
                ? <><Phone size={14} />Call Now</>
                : <><Send size={14} />Send Reply</>
            }
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteConfirmModal({ contact, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[#1a1a2e] border border-red-500/30 rounded-3xl p-7 max-w-sm w-full shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-400" />
        </div>
        <h3 className="text-white font-black text-lg text-center mb-1">Delete Contact?</h3>
        <p className="text-gray-400 text-sm text-center mb-1">Contact from</p>
        <p className="text-white font-bold text-center mb-1">{contact?.fullName}</p>
        <p className="text-gray-500 text-xs text-center mb-4">{contact?.email}</p>
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

// ── View Modal ────────────────────────────────────────────────────────────────
function ViewModal({ contact, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[#1a1a2e] border border-purple-500/30 rounded-3xl p-7 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">Contact Details</p>
            <h3 className="text-white font-black text-xl">{contact.fullName}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5 space-y-3">
            <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-3">Contact Info</p>
            {[
              { icon: <Mail size={13} />, label: "Email",     value: contact.email },
              { icon: <Phone size={13} />, label: "Phone",    value: contact.phone },
              { icon: <MessageSquare size={13} />, label: "WhatsApp", value: contact.whatsApp || "—" },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400 flex-shrink-0">{row.icon}</div>
                <div>
                  <p className="text-gray-500 text-[10px]">{row.label}</p>
                  <p className="text-white text-sm font-semibold">{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5">
            <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-3">Property Interest</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Looking To",   value: contact.lookingTo },
                { label: "Property Type",value: contact.propertyType },
                { label: "Best Time",    value: timeBadge(contact.bestTimeToContact) },
                { label: "Contact Via",  value: methodBadge(contact.preferredContactMethod) },
              ].map((row, i) => (
                <div key={i}>
                  <p className="text-gray-500 text-[10px]">{row.label}</p>
                  <p className="text-white text-sm font-semibold capitalize">{row.value || "—"}</p>
                </div>
              ))}
            </div>
          </div>

          {contact.description && (
            <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5">
              <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2">Message</p>
              <p className="text-gray-300 text-sm leading-relaxed">{contact.description}</p>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Calendar size={12} />
            Received on {fmtDate(contact.createdAt)} at {fmtTime(contact.createdAt)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Contact Card ──────────────────────────────────────────────────────────────
function ContactCard({ contact, onDelete, onView, onReply, delay }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-[#252544] border border-purple-900/30 hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Left — Person */}
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            {contact.fullName?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm">{contact.fullName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Mail size={10} className="text-purple-400 flex-shrink-0" />
              <p className="text-gray-400 text-xs truncate">{contact.email}</p>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Phone size={10} className="text-purple-400 flex-shrink-0" />
              <p className="text-gray-400 text-xs">{contact.phone}</p>
            </div>
          </div>
        </div>

        {/* Middle — Property interest */}
        <div className="space-y-2">
          <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">Interest</p>
          <div className="flex flex-wrap gap-2">
            {contact.lookingTo && (
              <span className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold capitalize ${lookingToBadge(contact.lookingTo)}`}>
                {contact.lookingTo}
              </span>
            )}
            {contact.propertyType && (
              <span className="text-[11px] px-2.5 py-1 rounded-full border bg-purple-500/10 text-purple-400 border-purple-500/20 font-semibold capitalize">
                {contact.propertyType}
              </span>
            )}
          </div>
          <div className="text-gray-500 text-xs space-y-0.5">
            {contact.preferredContactMethod && <p>{methodBadge(contact.preferredContactMethod)}</p>}
            {contact.bestTimeToContact && <p>{timeBadge(contact.bestTimeToContact)}</p>}
          </div>
        </div>

        {/* Right — Date + actions */}
        <div className="flex flex-col justify-between items-start md:items-end gap-3">
          <div className="md:text-right">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs md:justify-end">
              <Calendar size={11} className="text-purple-400" />
              <span>{fmtDate(contact.createdAt)}</span>
            </div>
            <p className="text-gray-600 text-[10px] mt-0.5">{fmtTime(contact.createdAt)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Reply */}
            <button
              onClick={() => onReply(contact)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 text-xs font-semibold transition-all"
            >
              <Reply size={12} /> Reply
            </button>
            {/* View */}
            <button
              onClick={() => onView(contact)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 text-xs font-semibold transition-all"
            >
              <Eye size={12} /> View
            </button>
            {/* Message expand */}
            <button
              onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 text-xs font-semibold transition-all"
            >
              <MessageSquare size={12} />
              {expanded ? "Hide" : "Msg"}
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
            {/* Delete */}
            <button
              onClick={() => onDelete(contact)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-semibold transition-all"
            >
              <Trash2 size={12} /> Delete
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
                {contact.description || "No message provided."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function AdminContact() {
  const [contacts,      setContacts]      = useState([]);
  const [filtered,      setFiltered]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [refreshing,    setRefreshing]    = useState(false);
  const [search,        setSearch]        = useState("");
  const [lookingFilter, setLookingFilter] = useState("all");
  const [sortBy,        setSortBy]        = useState("newest");
  const [toast,         setToast]         = useState(null);
  const [deleteTarget,  setDeleteTarget]  = useState(null);
  const [viewTarget,    setViewTarget]    = useState(null);
  const [replyTarget,   setReplyTarget]   = useState(null);   // ← NEW
  const [deleting,      setDeleting]      = useState(false);

  const fetchContacts = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const res = await api.get("/contact");
      setContacts(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching contacts", error);
      showToast("Failed to fetch contacts", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  useEffect(() => {
    let result = [...contacts];
    if (search.trim()) result = result.filter(c =>
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
    );
    if (lookingFilter !== "all") result = result.filter(c => c.lookingTo === lookingFilter);
    if (sortBy === "newest")  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "oldest")  result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "name-az") result.sort((a, b) => a.fullName?.localeCompare(b.fullName));
    setFiltered(result);
  }, [contacts, search, lookingFilter, sortBy]);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/contact/${deleteTarget._id}`);
      setContacts(prev => prev.filter(c => c._id !== deleteTarget._id));
      showToast(`Contact from ${deleteTarget.fullName} deleted`);
      setDeleteTarget(null);
    } catch (error) {
      showToast("Failed to delete contact", "error");
    } finally {
      setDeleting(false);
    }
  };

  const thisMonth = contacts.filter(c => {
    const d = new Date(c.createdAt), now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const buyCount  = contacts.filter(c => c.lookingTo === "buy").length;
  const rentCount = contacts.filter(c => c.lookingTo === "rent").length;

  if (loading) return (
    <div className="min-h-screen bg-[#1a1a2e] px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-[#252544] animate-pulse" />
            <div className="h-8 w-64 rounded bg-[#252544] animate-pulse" />
            <div className="h-2.5 w-48 rounded bg-[#252544] animate-pulse" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#252544] animate-pulse self-start sm:self-auto" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 border border-purple-900/20 rounded-2xl px-4 py-3 bg-[#252544] animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex-shrink-0" />
              <div className="space-y-2"><div className="h-5 w-8 rounded bg-white/5" /><div className="h-2.5 w-20 rounded bg-white/5" /></div>
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

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          <div>
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-1">Admin Panel</p>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Contact <span className="text-purple-500">Management</span>
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">{contacts.length} total contact enquiries received</p>
          </div>
          <button
            onClick={() => fetchContacts(true)}
            className={`w-10 h-10 rounded-xl bg-[#252544] border border-purple-900/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all self-start sm:self-auto ${refreshing ? "animate-spin" : ""}`}
          >
            <RefreshCw size={16} />
          </button>
        </motion.div>

        {/* Mini Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        >
          <MiniStat icon={<MessageSquare size={16} />} label="Total Contacts"  value={contacts.length} color="purple" />
          <MiniStat icon={<Calendar size={16} />}      label="This Month"      value={thisMonth}       color="yellow" />
          <MiniStat icon={<Home size={16} />}          label="Looking to Buy"  value={buyCount}        color="green"  />
          <MiniStat icon={<Users size={16} />}         label="Looking to Rent" value={rentCount}       color="blue"   />
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
                placeholder="Search by name, email, phone or message..."
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
              value={lookingFilter}
              onChange={e => setLookingFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
              <option value="sell">Sell</option>
            </select>
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
          {(search || lookingFilter !== "all") && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-gray-500 text-xs">Filters:</span>
              {search && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
                  "{search}" <button onClick={() => setSearch("")}><X size={10} /></button>
                </span>
              )}
              {lookingFilter !== "all" && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20 capitalize">
                  {lookingFilter} <button onClick={() => setLookingFilter("all")}><X size={10} /></button>
                </span>
              )}
              <span className="text-gray-500 text-xs">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </motion.div>

        {/* Contact Cards */}
        {filtered.length === 0 ? (
          <motion.div
            className="bg-[#252544] border border-purple-900/30 rounded-2xl p-16 text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div className="text-5xl mb-4">📬</div>
            <p className="text-white font-bold text-lg mb-2">No contacts found</p>
            <p className="text-gray-400 text-sm">
              {search || lookingFilter !== "all" ? "Try adjusting your filters" : "No contact enquiries yet"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filtered.map((contact, i) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                onDelete={setDeleteTarget}
                onView={setViewTarget}
                onReply={setReplyTarget}
                delay={i * 0.04}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        <AnimatePresence>
          {replyTarget && (
            <ReplyModal
              contact={replyTarget}
              onClose={() => setReplyTarget(null)}
              showToast={showToast}
            />
          )}
          {deleteTarget && (
            <DeleteConfirmModal
              contact={deleteTarget}
              onConfirm={handleDeleteConfirm}
              onCancel={() => setDeleteTarget(null)}
              loading={deleting}
            />
          )}
          {viewTarget && (
            <ViewModal
              contact={viewTarget}
              onClose={() => setViewTarget(null)}
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

export default AdminContact;
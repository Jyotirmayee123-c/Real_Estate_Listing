import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import {
  Search, Trash2, RefreshCw, X, CheckCircle, AlertTriangle,
  Home, Calendar, Eye, ChevronDown, ChevronUp, Clock,
  BadgeCheck, AlertCircle, Building2, Receipt, Wallet,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const fmtAmount = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount || 0);

// ── UPI Sub-method mapping ────────────────────────────────────────────────────
// When a payment has paymentMethod:"upi" (legacy), we need to know which UPI app was used.
// This helper resolves it: if upiApp is set (phonepe/gpay/paytm), use that; else default to phonepe.
const resolveUpiMethod = (payment) => {
  const method = payment?.paymentMethod?.toLowerCase();
  if (method !== "upi") return method; // Not a UPI payment, return as-is
  // If upiApp sub-field is present, use it; fallback to phonepe
  const sub = payment?.upiApp?.toLowerCase();
  if (sub === "gpay" || sub === "googlepay" || sub === "google_pay") return "gpay";
  if (sub === "paytm") return "paytm";
  return "phonepe"; // default UPI → PhonePe
};

const statusConfig = {
  success: {
    label: "Paid",
    icon: <BadgeCheck size={12} />,
    card: "border-emerald-500/30 bg-emerald-600/10",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    dot: "bg-emerald-400",
  },
  pending: {
    label: "Pending",
    icon: <Clock size={12} />,
    card: "border-yellow-500/30 bg-yellow-600/10",
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    dot: "bg-yellow-400",
  },
  failed: {
    label: "Failed",
    icon: <AlertCircle size={12} />,
    card: "border-red-500/30 bg-red-600/10",
    badge: "bg-red-500/15 text-red-400 border-red-500/25",
    dot: "bg-red-400",
  },
};

// ── Payment Method Config (Branded) ──────────────────────────────────────────
const paymentMethodConfig = {
  phonepe: {
    label: "PhonePe",
    emoji: "📱",
    logo: "PE",
    bg: "bg-[#5f259f]",
    text: "text-white",
    border: "border-[#7b35cc]/40",
    badge: "bg-[#5f259f]/20 text-purple-300 border-[#7b35cc]/40",
    glow: "shadow-[0_0_12px_#5f259f55]",
    dot: "bg-[#7b35cc]",
  },
  gpay: {
    label: "Google Pay",
    emoji: "🔵",
    logo: "G",
    bg: "bg-[#1a73e8]",
    text: "text-white",
    border: "border-blue-500/40",
    badge: "bg-blue-600/20 text-blue-300 border-blue-500/40",
    glow: "shadow-[0_0_12px_#1a73e855]",
    dot: "bg-blue-400",
  },
  paytm: {
    label: "Paytm",
    emoji: "💙",
    logo: "PT",
    bg: "bg-[#00baf2]",
    text: "text-white",
    border: "border-cyan-400/40",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
    glow: "shadow-[0_0_12px_#00baf255]",
    dot: "bg-cyan-400",
  },
  card: {
    label: "Card",
    emoji: "💳",
    logo: "CARD",
    bg: "bg-gradient-to-br from-gray-700 to-gray-900",
    text: "text-white",
    border: "border-gray-500/40",
    badge: "bg-gray-600/20 text-gray-300 border-gray-500/40",
    glow: "shadow-[0_0_12px_#55555555]",
    dot: "bg-gray-400",
  },
  netbanking: {
    label: "Net Banking",
    emoji: "🏦",
    logo: "NB",
    bg: "bg-[#b45309]",
    text: "text-white",
    border: "border-yellow-600/40",
    badge: "bg-yellow-700/20 text-yellow-300 border-yellow-600/40",
    glow: "shadow-[0_0_12px_#b4530955]",
    dot: "bg-yellow-400",
  },
  cash: {
    label: "Cash",
    emoji: "💵",
    logo: "₹",
    bg: "bg-[#166534]",
    text: "text-white",
    border: "border-green-700/40",
    badge: "bg-green-800/20 text-green-300 border-green-700/40",
    glow: "shadow-[0_0_12px_#16653455]",
    dot: "bg-green-500",
  },
  wallet: {
    label: "Wallet",
    emoji: "👜",
    logo: "W",
    bg: "bg-[#be185d]",
    text: "text-white",
    border: "border-pink-500/40",
    badge: "bg-pink-600/20 text-pink-300 border-pink-500/40",
    glow: "shadow-[0_0_12px_#be185d55]",
    dot: "bg-pink-400",
  },
  emi: {
    label: "EMI",
    emoji: "📅",
    logo: "EMI",
    bg: "bg-[#c2410c]",
    text: "text-white",
    border: "border-orange-500/40",
    badge: "bg-orange-600/20 text-orange-300 border-orange-500/40",
    glow: "shadow-[0_0_12px_#c2410c55]",
    dot: "bg-orange-400",
  },
  // ── REMOVED generic "upi" entry ──
  // Legacy "upi" records are now resolved to phonepe/gpay/paytm via resolveUpiMethod()
};

const getMethodConfig = (val) =>
  paymentMethodConfig[val?.toLowerCase()] || {
    label: val || "Unknown",
    emoji: "💰",
    logo: "?",
    bg: "bg-gray-700",
    text: "text-white",
    border: "border-gray-500/40",
    badge: "bg-gray-600/20 text-gray-300 border-gray-500/40",
    glow: "",
    dot: "bg-gray-400",
  };

// ── Payment Method Filter Options ─────────────────────────────────────────────
// "upi" is NOT a standalone option. PhonePe, Google Pay, Paytm are separate.
const METHOD_FILTER_OPTIONS = [
  { value: "all",        label: "All Methods" },
  { value: "phonepe",    label: "📱 PhonePe" },
  { value: "gpay",       label: "🔵 Google Pay" },
  { value: "paytm",      label: "💙 Paytm" },
  { value: "card",       label: "💳 Card" },
  { value: "netbanking", label: "🏦 Net Banking" },
  { value: "cash",       label: "💵 Cash" },
  { value: "wallet",     label: "👜 Wallet" },
  { value: "emi",        label: "📅 EMI" },
];

// ── UPI Sub-Method Selector (shown when method is "upi" and no upiApp set) ───
const UPI_OPTIONS = [
  { value: "phonepe", label: "📱 PhonePe",   bg: "bg-[#5f259f]", text: "text-white" },
  { value: "gpay",    label: "🔵 Google Pay", bg: "bg-[#1a73e8]", text: "text-white" },
  { value: "paytm",   label: "💙 Paytm",      bg: "bg-[#00baf2]", text: "text-white" },
];

// ── Payment Method Badge (inline pill) ───────────────────────────────────────
function PaymentMethodPill({ method, size = "sm" }) {
  const cfg = getMethodConfig(method);
  const sz = size === "lg"
    ? "text-[13px] px-3.5 py-1.5 gap-2"
    : "text-[11px] px-2.5 py-1 gap-1.5";
  return (
    <span className={`inline-flex items-center rounded-full border font-bold ${sz} ${cfg.badge} ${cfg.border}`}>
      <span>{cfg.emoji}</span>
      <span>{cfg.label}</span>
    </span>
  );
}

// ── UPI App Selector Component ────────────────────────────────────────────────
// Shows 3 branded buttons for PhonePe / Google Pay / Paytm
function UpiAppSelector({ currentApp, onSelect, label = "UPI via" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {UPI_OPTIONS.map((opt) => {
          const isActive = currentApp === opt.value;
          const cfg = getMethodConfig(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 border text-xs font-bold transition-all
                ${isActive
                  ? `${cfg.badge} ${cfg.border} ${cfg.glow} scale-105`
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              <div className={`w-5 h-5 rounded-md ${cfg.bg} flex items-center justify-center text-[8px] font-black ${cfg.text} shadow`}>
                {cfg.logo}
              </div>
              {cfg.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const propertyTypeBadge = (val) => {
  const map = {
    apartment:  "bg-blue-500/10 text-blue-400 border-blue-500/20",
    villa:      "bg-purple-500/10 text-purple-400 border-purple-500/20",
    plot:       "bg-orange-500/10 text-orange-400 border-orange-500/20",
    commercial: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    house:      "bg-green-500/10 text-green-400 border-green-500/20",
  };
  return map[val] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
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
function DeleteConfirmModal({ payment, onConfirm, onCancel, loading }) {
  const resolvedMethod = resolveUpiMethod(payment);
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[#1a1a2e] border border-red-500/30 rounded-3xl p-7 max-w-sm w-full shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-400" />
        </div>
        <h3 className="text-white font-black text-lg text-center mb-1">Delete Payment Record?</h3>
        <p className="text-gray-400 text-sm text-center mb-1">Payment by</p>
        <p className="text-white font-bold text-center mb-1">{payment?.userName}</p>
        <p className="text-gray-500 text-xs text-center mb-1">{payment?.propertyName}</p>
        <p className="text-purple-400 text-sm font-bold text-center mb-1">{fmtAmount(payment?.amount)}</p>

        {resolvedMethod && (
          <div className="flex justify-center mb-4">
            <PaymentMethodPill method={resolvedMethod} />
          </div>
        )}

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

// ── View Modal ────────────────────────────────────────────────────────────────
function ViewModal({ payment, onClose, onUpiAppChange }) {
  const status = statusConfig[payment?.paymentStatus] || statusConfig.pending;
  const resolvedMethod = resolveUpiMethod(payment);
  const cfg = getMethodConfig(resolvedMethod);
  const isUpi = payment?.paymentMethod?.toLowerCase() === "upi";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[#1a1a2e] border border-purple-500/30 rounded-3xl p-7 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">Payment Details</p>
            <h3 className="text-white font-black text-xl">{payment?.userName}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{payment?.userEmail}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Status Banner */}
        <div className={`flex items-center justify-between px-5 py-4 rounded-2xl border mb-4 ${status.card}`}>
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${status.dot} animate-pulse`} />
            <span className="text-white font-bold text-sm">Payment Status</span>
          </div>
          <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-bold ${status.badge}`}>
            {status.icon} {status.label}
          </span>
        </div>

        {/* Payment Method Hero Block */}
        {payment?.paymentMethod && (
          <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl border mb-4 ${cfg.badge} ${cfg.border} ${cfg.glow}`}>
            <div className={`w-14 h-14 rounded-2xl ${cfg.bg} flex items-center justify-center font-black text-lg ${cfg.text} shadow-xl flex-shrink-0`}>
              {cfg.logo}
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Payment Method</p>
              <p className="text-white font-black text-xl">{cfg.emoji} {cfg.label}</p>
              <p className="text-gray-400 text-xs mt-0.5">Used by {payment?.userName}</p>
            </div>
          </div>
        )}

        {/* ── UPI Sub-App Selector (shown for legacy upi records) ── */}
        {isUpi && (
          <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4 mb-4">
            <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2">UPI App Used</p>
            <UpiAppSelector
              currentApp={resolvedMethod}
              label="Select UPI App"
              onSelect={(app) => onUpiAppChange && onUpiAppChange(payment._id, app)}
            />
            <p className="text-gray-600 text-[10px] mt-2">* Select the UPI app actually used for this payment</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5">
            <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-3">Amount Breakdown</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Total Amount",   value: fmtAmount(payment?.amount) },
                { label: "Amount Paid",    value: fmtAmount(payment?.amountPaid) },
                { label: "Amount Pending", value: fmtAmount((payment?.amount || 0) - (payment?.amountPaid || 0)) },
              ].map((row, i) => (
                <div key={i}>
                  <p className="text-gray-500 text-[10px]">{row.label}</p>
                  <p className="text-white text-sm font-semibold">{row.value || "—"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5">
            <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-3">Property Info</p>
            <div className="space-y-2">
              {[
                { icon: <Building2 size={13} />, label: "Property", value: payment?.propertyName },
                { icon: <Home size={13} />,      label: "Type",     value: payment?.propertyType },
                { icon: <Receipt size={13} />,   label: "Txn ID",   value: payment?.transactionId || "—" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400 flex-shrink-0">{row.icon}</div>
                  <div>
                    <p className="text-gray-500 text-[10px]">{row.label}</p>
                    <p className="text-white text-sm font-semibold capitalize">{row.value || "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5">
            <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-3">User Info</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Name",  value: payment?.userName },
                { label: "Email", value: payment?.userEmail },
                { label: "Phone", value: payment?.userPhone || "—" },
              ].map((row, i) => (
                <div key={i}>
                  <p className="text-gray-500 text-[10px]">{row.label}</p>
                  <p className="text-white text-sm font-semibold">{row.value || "—"}</p>
                </div>
              ))}
            </div>
          </div>

          {payment?.notes && (
            <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5">
              <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2">Notes</p>
              <p className="text-gray-300 text-sm leading-relaxed">{payment.notes}</p>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Calendar size={12} />
            Paid on {fmtDate(payment?.createdAt)} at {fmtTime(payment?.createdAt)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Payment Card ──────────────────────────────────────────────────────────────
function PaymentCard({ payment, onDelete, onView, onUpiAppChange, delay }) {
  const [expanded, setExpanded] = useState(false);
  const status  = statusConfig[payment?.paymentStatus] || statusConfig.pending;
  const pending = (payment?.amount || 0) - (payment?.amountPaid || 0);
  const paidPct = payment?.amount
    ? Math.min(100, Math.round((payment.amountPaid / payment.amount) * 100))
    : 0;

  // Resolve UPI → PhonePe/GPay/Paytm
  const resolvedMethod = resolveUpiMethod(payment);
  const cfg = getMethodConfig(resolvedMethod);
  const isUpi = payment?.paymentMethod?.toLowerCase() === "upi";

  return (
    <motion.div
      className={`bg-[#252544] border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/30 ${status.card}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-5">

        {/* Col 1 — User */}
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            {payment.userName?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm">{payment.userName}</p>
            <p className="text-gray-400 text-xs truncate mt-0.5">{payment.userEmail}</p>
            {payment.userPhone && <p className="text-gray-500 text-[11px] mt-0.5">{payment.userPhone}</p>}
          </div>
        </div>

        {/* Col 2 — Property */}
        <div className="space-y-2">
          <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">Property</p>
          <div className="flex items-center gap-2">
            <Building2 size={12} className="text-purple-400 flex-shrink-0" />
            <p className="text-white text-sm font-semibold truncate">{payment.propertyName}</p>
          </div>
          {payment.propertyType && (
            <span className={`inline-block text-[11px] px-2.5 py-1 rounded-full border font-semibold capitalize ${propertyTypeBadge(payment.propertyType)}`}>
              {payment.propertyType}
            </span>
          )}
          {payment.transactionId && (
            <p className="text-gray-600 text-[10px] font-mono">#{payment.transactionId}</p>
          )}
        </div>

        {/* Col 3 — Amount + Progress + Payment Method */}
        <div className="space-y-2">
          <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">Payment</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-black text-base">{fmtAmount(payment.amountPaid)}</span>
            <span className="text-gray-600 text-xs">/ {fmtAmount(payment.amount)}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${payment.paymentStatus === "success" ? "bg-emerald-400" : payment.paymentStatus === "failed" ? "bg-red-400" : "bg-yellow-400"}`}
              initial={{ width: 0 }}
              animate={{ width: `${paidPct}%` }}
              transition={{ duration: 0.8, delay: delay + 0.2 }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-gray-500">Paid: <span className="text-white font-semibold">{paidPct}%</span></span>
            {pending > 0 && <span className="text-yellow-500">Due: {fmtAmount(pending)}</span>}
          </div>

          {/* BRANDED Payment Method — UPI auto-resolved to PhonePe/GPay/Paytm */}
          {payment.paymentMethod && (
            <div className={`flex items-center gap-2 mt-1 rounded-xl px-3 py-2 border ${cfg.badge} ${cfg.border} ${cfg.glow}`}>
              <div className={`w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center font-black text-[10px] ${cfg.text} shadow-md flex-shrink-0`}>
                {cfg.logo}
              </div>
              <div className="flex-1">
                <p className="text-[9px] text-gray-500 uppercase tracking-wider">Paid via</p>
                <p className="text-white text-xs font-bold">{cfg.emoji} {cfg.label}</p>
              </div>
              {/* Inline UPI app switcher on card — 3 tiny buttons */}
              {isUpi && (
                <div className="flex gap-1">
                  {UPI_OPTIONS.map((opt) => {
                    const oc = getMethodConfig(opt.value);
                    const active = resolvedMethod === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        title={oc.label}
                        onClick={(e) => { e.stopPropagation(); onUpiAppChange(payment._id, opt.value); }}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-[8px] font-black transition-all
                          ${active ? `${oc.bg} ${oc.text} shadow-md scale-110` : "bg-white/10 text-gray-400 hover:bg-white/20"}`}
                      >
                        {oc.logo}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Col 4 — Status + Actions */}
        <div className="flex flex-col justify-between items-start md:items-end gap-3">
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-bold ${status.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Calendar size={11} className="text-purple-400" />
              <span>{fmtDate(payment.createdAt)}</span>
            </div>
            <p className="text-gray-600 text-[10px]">{fmtTime(payment.createdAt)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => onView(payment)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 text-xs font-semibold transition-all">
              <Eye size={12} /> View
            </button>
            <button onClick={() => setExpanded(e => !e)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/20 hover:border-purple-500/40 text-purple-400 text-xs font-semibold transition-all">
              <Receipt size={12} />
              Info
              {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>
            <button onClick={() => onDelete(payment)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-semibold transition-all">
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Details */}
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
              {/* UPI app selector in expanded panel */}
              {isUpi && (
                <div className="mb-4 bg-[#1a1a2e] border border-purple-900/20 rounded-xl px-4 py-3">
                  <UpiAppSelector
                    currentApp={resolvedMethod}
                    label="UPI App Used"
                    onSelect={(app) => onUpiAppChange(payment._id, app)}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    label: "Method",
                    node: payment.paymentMethod ? (
                      <div className={`flex items-center gap-2 mt-1 rounded-xl px-3 py-2 border ${cfg.badge} ${cfg.border}`}>
                        <div className={`w-6 h-6 rounded-lg ${cfg.bg} flex items-center justify-center font-black text-[9px] ${cfg.text} shadow-md`}>
                          {cfg.logo}
                        </div>
                        <span className="text-white text-xs font-bold">{cfg.emoji} {cfg.label}</span>
                      </div>
                    ) : <span className="text-gray-500 text-sm">—</span>,
                  },
                  { label: "Total",   text: fmtAmount(payment.amount) },
                  { label: "Cleared", text: fmtAmount(payment.amountPaid) },
                  { label: "Pending", text: fmtAmount(pending) },
                ].map((item, i) => (
                  <div key={i} className="bg-[#1a1a2e] border border-purple-900/20 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">{item.label}</p>
                    {item.node
                      ? item.node
                      : <p className="text-white text-sm font-bold">{item.text}</p>
                    }
                  </div>
                ))}
              </div>
              {payment.notes && (
                <div className="mt-3 bg-[#1a1a2e] border border-purple-900/20 rounded-xl px-4 py-3">
                  <p className="text-purple-400 text-[10px] uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{payment.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Method Stats Bar ──────────────────────────────────────────────────────────
// Uses resolveUpiMethod so "upi" records show as phonepe/gpay/paytm in the stats
function MethodStatsBar({ payments }) {
  const counts = payments.reduce((acc, p) => {
    const key = resolveUpiMethod(p) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return null;

  return (
    <motion.div
      className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4"
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
    >
      <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-3">Payment Methods Used</p>
      <div className="flex flex-wrap gap-2">
        {sorted.map(([method, count]) => {
          const cfg = getMethodConfig(method);
          return (
            <div key={method} className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${cfg.badge} ${cfg.border}`}>
              <div className={`w-6 h-6 rounded-lg ${cfg.bg} flex items-center justify-center font-black text-[9px] ${cfg.text} shadow-md flex-shrink-0`}>
                {cfg.logo}
              </div>
              <span className="text-white text-xs font-semibold">{cfg.emoji} {cfg.label}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/10">{count}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function AdminPayment() {
  const [payments,     setPayments]     = useState([]);
  const [filtered,     setFiltered]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [refreshing,   setRefreshing]   = useState(false);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [sortBy,       setSortBy]       = useState("newest");
  const [toast,        setToast]        = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewTarget,   setViewTarget]   = useState(null);
  const [deleting,     setDeleting]     = useState(false);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const fetchPayments = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const res = await api.get("/payment");
      setPayments(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching payments", error);
      showToast("Failed to fetch payments", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  // ── Handle UPI app change (local state only; optionally call API to persist) ──
  const handleUpiAppChange = (paymentId, newApp) => {
    setPayments(prev =>
      prev.map(p =>
        p._id === paymentId
          ? { ...p, upiApp: newApp }
          : p
      )
    );
    // If you want to persist this to the backend, uncomment:
    // api.patch(`/payment/${paymentId}`, { upiApp: newApp }).catch(console.error);
    showToast(`UPI app updated to ${getMethodConfig(newApp).label}`, "success");
  };

  useEffect(() => {
    let result = [...payments];
    if (search.trim()) result = result.filter(p =>
      p.userName?.toLowerCase().includes(search.toLowerCase()) ||
      p.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
      p.propertyName?.toLowerCase().includes(search.toLowerCase()) ||
      p.transactionId?.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "all") result = result.filter(p => p.paymentStatus === statusFilter);

    // ── Method filter: resolve UPI records to their sub-app before filtering ──
    if (methodFilter !== "all") {
      result = result.filter(p => resolveUpiMethod(p) === methodFilter);
    }

    if (sortBy === "newest")      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "oldest")      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "amount-high") result.sort((a, b) => (b.amount || 0) - (a.amount || 0));
    if (sortBy === "amount-low")  result.sort((a, b) => (a.amount || 0) - (b.amount || 0));
    if (sortBy === "name-az")     result.sort((a, b) => a.userName?.localeCompare(b.userName));
    setFiltered(result);
  }, [payments, search, statusFilter, methodFilter, sortBy]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/payment/${deleteTarget._id}`);
      setPayments(prev => prev.filter(p => p._id !== deleteTarget._id));
      showToast(`Payment record of ${deleteTarget.userName} deleted`);
      setDeleteTarget(null);
    } catch (error) {
      showToast("Failed to delete payment", "error");
    } finally {
      setDeleting(false);
    }
  };

  const totalRevenue = payments.reduce((s, p) => s + (p.amountPaid || 0), 0);
  const totalPending = payments.reduce((s, p) => s + Math.max(0, (p.amount || 0) - (p.amountPaid || 0)), 0);
  const successCount = payments.filter(p => p.paymentStatus === "success").length;
  const pendingCount = payments.filter(p => p.paymentStatus === "pending").length;

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
            <div key={i} className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5 animate-pulse h-32" />
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
              Payment <span className="text-purple-500">Management</span>
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">{payments.length} total payment records</p>
          </div>
          <button
            onClick={() => fetchPayments(true)}
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
          <MiniStat icon={<Wallet size={16} />}      label="Total Cleared"   value={fmtAmount(totalRevenue)} color="green"  />
          <MiniStat icon={<Clock size={16} />}       label="Total Pending"   value={fmtAmount(totalPending)} color="yellow" />
          <MiniStat icon={<BadgeCheck size={16} />}  label="Paid"            value={successCount}            color="purple" />
          <MiniStat icon={<AlertCircle size={16} />} label="Pending Records" value={pendingCount}            color="blue"   />
        </motion.div>

        {/* Method Stats Bar — UPI resolved to sub-apps */}
        <MethodStatsBar payments={payments} />

        {/* Search + Filters */}
        <motion.div
          className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                className="w-full bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-white placeholder-gray-500 rounded-xl pl-9 pr-9 py-2.5 text-sm outline-none transition-colors"
                placeholder="Search by name, email, property or transaction ID..."
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
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="success">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            {/* ── METHOD FILTER: PhonePe / Google Pay / Paytm shown separately (no generic UPI) ── */}
            <select
              className="bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer"
              value={methodFilter}
              onChange={e => setMethodFilter(e.target.value)}
            >
              {METHOD_FILTER_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <select
              className="bg-[#1a1a2e] border border-purple-900/30 focus:border-purple-500 text-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Amount: High → Low</option>
              <option value="amount-low">Amount: Low → High</option>
              <option value="name-az">Name A → Z</option>
            </select>
          </div>
          {(search || statusFilter !== "all" || methodFilter !== "all") && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-gray-500 text-xs">Filters:</span>
              {search && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
                  "{search}" <button onClick={() => setSearch("")}><X size={10} /></button>
                </span>
              )}
              {statusFilter !== "all" && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20 capitalize">
                  {statusFilter} <button onClick={() => setStatusFilter("all")}><X size={10} /></button>
                </span>
              )}
              {methodFilter !== "all" && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/20">
                  {getMethodConfig(methodFilter).emoji} {getMethodConfig(methodFilter).label}
                  <button onClick={() => setMethodFilter("all")}><X size={10} /></button>
                </span>
              )}
              <span className="text-gray-500 text-xs">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </motion.div>

        {/* Payment Cards */}
        {filtered.length === 0 ? (
          <motion.div
            className="bg-[#252544] border border-purple-900/30 rounded-2xl p-16 text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div className="text-5xl mb-4">💳</div>
            <p className="text-white font-bold text-lg mb-2">No payments found</p>
            <p className="text-gray-400 text-sm">
              {search || statusFilter !== "all" || methodFilter !== "all" ? "Try adjusting your filters" : "No payment records yet"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filtered.map((payment, i) => (
              <PaymentCard
                key={payment._id}
                payment={payment}
                onDelete={setDeleteTarget}
                onView={setViewTarget}
                onUpiAppChange={handleUpiAppChange}
                delay={i * 0.04}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        <AnimatePresence>
          {deleteTarget && (
            <DeleteConfirmModal
              payment={deleteTarget}
              onConfirm={handleDeleteConfirm}
              onCancel={() => setDeleteTarget(null)}
              loading={deleting}
            />
          )}
          {viewTarget && (
            <ViewModal
              payment={viewTarget}
              onClose={() => setViewTarget(null)}
              onUpiAppChange={handleUpiAppChange}
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

export default AdminPayment;
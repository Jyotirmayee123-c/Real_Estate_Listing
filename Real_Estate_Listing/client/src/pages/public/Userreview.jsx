import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import { Star, Send, CheckCircle, AlertTriangle, Home } from "lucide-react";

// ── Star Picker ───────────────────────────────────────────────────────────────
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const labels = ["", "Terrible", "Poor", "Okay", "Good", "Excellent"];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-125 focus:outline-none"
          >
            <Star
              size={36}
              className={
                star <= (hovered || value)
                  ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                  : "text-gray-600"
              }
            />
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {(hovered || value) > 0 && (
          <motion.span
            key={hovered || value}
            className="text-yellow-400 text-sm font-bold tracking-widest uppercase"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {labels[hovered || value]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
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

// ── Success Screen ─────────────────────────────────────────────────────────────
function SuccessScreen({ onReset }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="w-24 h-24 rounded-full bg-emerald-600/20 border-2 border-emerald-500/40 flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <CheckCircle size={44} className="text-emerald-400" />
      </motion.div>
      <h2 className="text-white font-black text-2xl mb-2">Review Submitted!</h2>
      <p className="text-gray-400 text-sm mb-8 max-w-xs">
        Thank you for sharing your experience. Your review helps others make better decisions.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-all"
      >
        Submit Another Review
      </button>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const INITIAL = { userName: "", userEmail: "", propertyName: "", rating: 0, comment: "" };

function UserReview() {
  const [form,       setForm]       = useState(INITIAL);
  const [errors,     setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [toast,      setToast]      = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const validate = () => {
    const e = {};
    if (!form.userName.trim())  e.userName  = "Name is required";
    if (!form.userEmail.trim()) e.userEmail  = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.userEmail)) e.userEmail = "Enter a valid email";
    if (!form.rating)           e.rating    = "Please select a rating";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    try {
      await api.post("/review", form);
      setSubmitted(true);
    } catch (err) {
      showToast("Failed to submit. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-[#1a1a2e] border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 outline-none transition-colors
    ${errors[field] ? "border-red-500/60 focus:border-red-400" : "border-purple-900/30 focus:border-purple-500"}`;

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Card */}
        <motion.div
          className="bg-[#252544] border border-purple-900/30 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/30 border-b border-purple-900/30 px-8 py-7">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center">
                <Home size={16} className="text-purple-400" />
              </div>
              <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">Property Review</p>
            </div>
            <h1 className="text-white font-black text-2xl mt-2">Share Your Experience</h1>
            <p className="text-gray-400 text-sm mt-1">Help others by leaving an honest review</p>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessScreen onReset={() => { setForm(INITIAL); setSubmitted(false); }} />
              ) : (
                <motion.div
                  key="form"
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        className={inputClass("userName")}
                        placeholder="John Doe"
                        value={form.userName}
                        onChange={(e) => handleChange("userName", e.target.value)}
                      />
                      {errors.userName && <p className="text-red-400 text-xs mt-1">{errors.userName}</p>}
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        className={inputClass("userEmail")}
                        placeholder="you@example.com"
                        type="email"
                        value={form.userEmail}
                        onChange={(e) => handleChange("userEmail", e.target.value)}
                      />
                      {errors.userEmail && <p className="text-red-400 text-xs mt-1">{errors.userEmail}</p>}
                    </div>
                  </div>

                  {/* Property Name */}
                  <div>
                    <label className="text-gray-400 text-xs font-semibold mb-1.5 block">
                      Property Name <span className="text-gray-600 font-normal">(optional)</span>
                    </label>
                    <input
                      className={inputClass("propertyName")}
                      placeholder="e.g. Sunset Villa, Block C Apt 4"
                      value={form.propertyName}
                      onChange={(e) => handleChange("propertyName", e.target.value)}
                    />
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="text-gray-400 text-xs font-semibold mb-3 block">
                      Your Rating <span className="text-red-400">*</span>
                    </label>
                    <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl py-5 px-4">
                      <StarPicker
                        value={form.rating}
                        onChange={(v) => handleChange("rating", v)}
                      />
                    </div>
                    {errors.rating && <p className="text-red-400 text-xs mt-1">{errors.rating}</p>}
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="text-gray-400 text-xs font-semibold mb-1.5 block">
                      Your Review <span className="text-gray-600 font-normal">(optional)</span>
                    </label>
                    <textarea
                      className={`${inputClass("comment")} resize-none`}
                      rows={4}
                      placeholder="Tell us about your experience with the property, staff, or anything else..."
                      value={form.comment}
                      onChange={(e) => handleChange("comment", e.target.value)}
                    />
                    <p className="text-gray-600 text-xs mt-1 text-right">{form.comment.length} / 500</p>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Submit Review
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default UserReview;
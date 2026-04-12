import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import { Send, CheckCircle, AlertTriangle } from "lucide-react";

const inputCls =
  "w-full px-4 py-3 xs:py-3.5 rounded-xl bg-[#1a1a2e] border border-purple-900/30 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition text-sm xs:text-base";
const selectCls = inputCls + " cursor-pointer";

// ── Fixed: added TypeScript prop types ────────────────────────────────────────
interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, required = false, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-300 text-xs xs:text-sm font-semibold">
        {label}
        {required && <span className="text-purple-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

// ── Form state type ───────────────────────────────────────────────────────────
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  lookingTo: string;
  propertyType: string;
  bestTime: string;
  contactMethod: string;
  description: string;
}

const INITIAL: FormData = {
  fullName: "",
  email: "",
  phone: "",
  whatsapp: "",
  lookingTo: "",
  propertyType: "",
  bestTime: "",
  contactMethod: "",
  description: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/contact", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        whatsApp: formData.whatsapp,
        lookingTo: formData.lookingTo,
        propertyType: formData.propertyType,
        bestTimeToContact: formData.bestTime,
        preferredContactMethod: formData.contactMethod,
        description: formData.description,
      });
      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        setFormData(INITIAL);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Contact Us
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Send Us a <span className="text-purple-500">Message</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg max-w-2xl mx-auto px-2">
            Fill out the form below and we&apos;ll get back to you as soon as possible
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6" />
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-purple-900/30 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

          {/* Success overlay */}
          <AnimatePresence>
            {success && (
              <motion.div
                className="absolute inset-0 bg-[#252544] flex flex-col items-center justify-center z-20 rounded-2xl sm:rounded-3xl px-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-20 h-20 rounded-full bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center mb-5">
                  <CheckCircle size={36} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-black text-2xl mb-2">
                  Message Sent! 🎉
                </h3>
                <p className="text-gray-400 text-sm max-w-xs mb-6">
                  Thank you for reaching out. Our team will contact you within
                  24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-5 sm:space-y-6"
          >
            {/* Row 1 — Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <Field label="Full Name" required>
                <input
                  className={inputCls}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Jyotirmayee Panda"
                  required
                />
              </Field>
              <Field label="Email Address" required>
                <input
                  className={inputCls}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </Field>
            </div>

            {/* Row 2 — Phone & WhatsApp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <Field label="Phone Number" required>
                <input
                  className={inputCls}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </Field>
              <Field label="WhatsApp Number">
                <input
                  className={inputCls}
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Same as phone or different"
                />
              </Field>
            </div>

            {/* Row 3 — Looking To & Property Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <Field label="Looking To" required>
                <select
                  className={selectCls}
                  name="lookingTo"
                  value={formData.lookingTo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select option</option>
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                  <option value="sell">Sell</option>
                </select>
              </Field>
              <Field label="Property Type" required>
                <select
                  className={selectCls}
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select property type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                </select>
              </Field>
            </div>

            {/* Row 4 — Best Time & Contact Method */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <Field label="Best Time to Contact">
                <select
                  className={selectCls}
                  name="bestTime"
                  value={formData.bestTime}
                  onChange={handleChange}
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (9:30 AM – 12:00 PM)</option>
                  <option value="afternoon">Afternoon (12:00 PM – 4:00 PM)</option>
                  <option value="evening">Evening (4:00 PM – 7:30 PM)</option>
                </select>
              </Field>
              <Field label="Preferred Contact Method">
                <select
                  className={selectCls}
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                >
                  <option value="">Select method</option>
                  <option value="call">Phone Call</option>
                  <option value="whatsApp">WhatsApp</option>
                  <option value="email">Email</option>
                </select>
              </Field>
            </div>

            {/* Message */}
            <Field label="Your Message">
              <textarea
                className={inputCls + " resize-none h-32"}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us more about your requirements — location, budget, preferences..."
              />
            </Field>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                <AlertTriangle size={15} />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 xs:py-3.5 sm:py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] text-sm xs:text-base sm:text-lg min-h-[44px] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User, Phone, Mail, MapPin, Home, IndianRupee,
  CreditCard, Smartphone, Building2, CheckCircle,
  ChevronRight, ChevronLeft, Star, Shield, Clock, Headphones,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1 – Client Info
  fullName: string;
  email: string;
  phone: string;
  address: string;
  // Step 2 – Property
  propertyType: string;
  budget: string;
  location: string;
  bedrooms: string;
  requirements: string;
  // Step 3 – Payment
  paymentMethod: string;
  upiId: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  bankName: string;
}

const INITIAL: FormData = {
  fullName: "", email: "", phone: "", address: "",
  propertyType: "", budget: "", location: "", bedrooms: "", requirements: "",
  paymentMethod: "upi",
  upiId: "", cardNumber: "", cardName: "", cardExpiry: "", cardCvv: "", bankName: "",
};

const PREMIUM_FEATURES = [
  "Dedicated property consultant",
  "Complete legal assistance",
  "Home loan facilitation",
  "Interior design consultation",
  "Post-sale support (6 months)",
  "Priority customer service",
];

const STEPS = ["Your Details", "Property Needs", "Payment", "Confirm"];

const PROPERTY_TYPES = ["Apartment", "Villa", "Independent House", "Plot", "Commercial"];
const BUDGET_RANGES = ["Under ₹20L", "₹20L – ₹50L", "₹50L – ₹1Cr", "₹1Cr – ₹2Cr", "Above ₹2Cr"];
const BEDROOM_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];

// ─── Step indicators ──────────────────────────────────────────────────────────
function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300
              ${i < current ? "bg-purple-600 border-purple-600 text-white"
                : i === current ? "bg-[#252544] border-purple-500 text-purple-400"
                : "bg-[#252544] border-purple-900/40 text-gray-500"}`}
            >
              {i < current ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className={`text-[10px] xs:text-xs mt-1 font-medium whitespace-nowrap
              ${i === current ? "text-purple-400" : i < current ? "text-purple-300" : "text-gray-500"}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-px w-10 xs:w-14 sm:w-20 mb-4 transition-all duration-300
              ${i < current ? "bg-purple-600" : "bg-purple-900/30"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Input helpers ────────────────────────────────────────────────────────────
function Field({ label, icon, error, children }: { label: string; icon?: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-300 text-xs xs:text-sm font-medium flex items-center gap-1.5">
        {icon}<span>{label}</span>
      </label>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

const inputCls = "w-full bg-[#1a1a2e] border border-purple-900/40 focus:border-purple-500 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors";
const selectCls = inputCls + " cursor-pointer";

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({ data, set, errors }: { data: FormData; set: (k: keyof FormData, v: string) => void; errors: Partial<FormData> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Full Name" icon={<User size={14} className="text-purple-400" />} error={errors.fullName}>
        <input className={inputCls} placeholder="Suryakanta Das" value={data.fullName} onChange={e => set("fullName", e.target.value)} />
      </Field>
      <Field label="Phone Number" icon={<Phone size={14} className="text-purple-400" />} error={errors.phone}>
        <input className={inputCls} placeholder="+91 98765 43210" value={data.phone} onChange={e => set("phone", e.target.value)} />
      </Field>
      <Field label="Email Address" icon={<Mail size={14} className="text-purple-400" />} error={errors.email}>
        <input className={inputCls} type="email" placeholder="you@example.com" value={data.email} onChange={e => set("email", e.target.value)} />
      </Field>
      <Field label="Current Address" icon={<MapPin size={14} className="text-purple-400" />} error={errors.address}>
        <input className={inputCls} placeholder="Bhubaneswar, Odisha" value={data.address} onChange={e => set("address", e.target.value)} />
      </Field>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────
function Step2({ data, set, errors }: { data: FormData; set: (k: keyof FormData, v: string) => void; errors: Partial<FormData> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Property Type" icon={<Home size={14} className="text-purple-400" />} error={errors.propertyType}>
        <select className={selectCls} value={data.propertyType} onChange={e => set("propertyType", e.target.value)}>
          <option value="">Select type</option>
          {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Budget Range" icon={<IndianRupee size={14} className="text-purple-400" />} error={errors.budget}>
        <select className={selectCls} value={data.budget} onChange={e => set("budget", e.target.value)}>
          <option value="">Select budget</option>
          {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </Field>
      <Field label="Preferred Location" icon={<MapPin size={14} className="text-purple-400" />} error={errors.location}>
        <input className={inputCls} placeholder="e.g. Patia, Khandagiri..." value={data.location} onChange={e => set("location", e.target.value)} />
      </Field>
      <Field label="Bedrooms" icon={<Building2 size={14} className="text-purple-400" />} error={errors.bedrooms}>
        <select className={selectCls} value={data.bedrooms} onChange={e => set("bedrooms", e.target.value)}>
          <option value="">Select BHK</option>
          {BEDROOM_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field label="Additional Requirements" error={errors.requirements}>
          <textarea
            className={inputCls + " resize-none h-24"}
            placeholder="Any specific requirements, amenities, or preferences..."
            value={data.requirements}
            onChange={e => set("requirements", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────
function Step3({ data, set, errors }: { data: FormData; set: (k: keyof FormData, v: string) => void; errors: Partial<FormData> }) {
  const methods = [
    { id: "upi", label: "UPI", icon: <Smartphone size={18} /> },
    { id: "card", label: "Card", icon: <CreditCard size={18} /> },
    { id: "bank", label: "Bank Transfer", icon: <Building2 size={18} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Method selector */}
      <div className="flex gap-3">
        {methods.map(m => (
          <button
            key={m.id}
            type="button"
            onClick={() => set("paymentMethod", m.id)}
            className={`flex-1 flex flex-col xs:flex-row items-center justify-center gap-2 py-3 px-3 rounded-xl border font-semibold text-xs xs:text-sm transition-all
              ${data.paymentMethod === m.id
                ? "bg-purple-600/20 border-purple-500 text-purple-400"
                : "bg-[#1a1a2e] border-purple-900/40 text-gray-400 hover:border-purple-500/40"}`}
          >
            {m.icon}{m.label}
          </button>
        ))}
      </div>

      {/* UPI */}
      {data.paymentMethod === "upi" && (
        <div className="space-y-4">
          <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-5 text-center">
            {/* Fake QR */}
            <div className="w-36 h-36 mx-auto mb-4 bg-white rounded-xl p-2">
              <div className="w-full h-full grid grid-cols-5 gap-0.5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? "bg-gray-900" : "bg-white"}`} />
                ))}
              </div>
            </div>
            <p className="text-gray-400 text-xs mb-1">Scan with any UPI app</p>
            <p className="text-purple-400 text-sm font-semibold">kalingahomes@upi</p>
          </div>
          <p className="text-gray-400 text-xs text-center">— or enter UPI ID manually —</p>
          <Field label="Your UPI ID" icon={<Smartphone size={14} className="text-purple-400" />} error={errors.upiId}>
            <input className={inputCls} placeholder="yourname@upi" value={data.upiId} onChange={e => set("upiId", e.target.value)} />
          </Field>
        </div>
      )}

      {/* Card */}
      {data.paymentMethod === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Card Number" icon={<CreditCard size={14} className="text-purple-400" />} error={errors.cardNumber}>
              <input className={inputCls} placeholder="1234 5678 9012 3456" maxLength={19}
                value={data.cardNumber}
                onChange={e => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                  set("cardNumber", v.replace(/(.{4})/g, "$1 ").trim());
                }} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Name on Card" icon={<User size={14} className="text-purple-400" />} error={errors.cardName}>
              <input className={inputCls} placeholder="Full name" value={data.cardName} onChange={e => set("cardName", e.target.value)} />
            </Field>
          </div>
          <Field label="Expiry Date" error={errors.cardExpiry}>
            <input className={inputCls} placeholder="MM / YY" maxLength={7}
              value={data.cardExpiry}
              onChange={e => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                set("cardExpiry", v.length > 2 ? v.slice(0, 2) + " / " + v.slice(2) : v);
              }} />
          </Field>
          <Field label="CVV" error={errors.cardCvv}>
            <input className={inputCls} placeholder="•••" maxLength={3} type="password"
              value={data.cardCvv} onChange={e => set("cardCvv", e.target.value.replace(/\D/g, "").slice(0, 3))} />
          </Field>
        </div>
      )}

      {/* Bank Transfer */}
      {data.paymentMethod === "bank" && (
        <div className="space-y-4">
          <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-5 space-y-3">
            {[
              { label: "Account Name", value: "Kalinga Homes Pvt. Ltd." },
              { label: "Account Number", value: "1234 5678 9012 3456" },
              { label: "IFSC Code", value: "SBIN0001234" },
              { label: "Bank", value: "State Bank of India" },
              { label: "Branch", value: "Bhubaneswar Main" },
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center border-b border-purple-900/20 pb-2 last:border-0 last:pb-0">
                <span className="text-gray-400 text-xs xs:text-sm">{row.label}</span>
                <span className="text-white font-semibold text-xs xs:text-sm">{row.value}</span>
              </div>
            ))}
          </div>
          <Field label="Your Bank Name (for reference)" error={errors.bankName}>
            <input className={inputCls} placeholder="e.g. HDFC Bank" value={data.bankName} onChange={e => set("bankName", e.target.value)} />
          </Field>
          <p className="text-gray-400 text-xs text-center">After transfer, our team will verify within 24 hours.</p>
        </div>
      )}
    </div>
  );
}

// ─── Step 4 – Confirm ────────────────────────────────────────────────────────
function Step4({ data }: { data: FormData }) {
  return (
    <div className="space-y-5">
      {/* Client summary */}
      <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-5">
        <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">Your Details</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            ["Name", data.fullName],
            ["Phone", data.phone],
            ["Email", data.email],
            ["Address", data.address],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-gray-500 text-xs">{k}</p>
              <p className="text-white text-sm font-medium truncate">{v || "—"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Property summary */}
      <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-5">
        <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">Property Requirements</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            ["Type", data.propertyType],
            ["Budget", data.budget],
            ["Location", data.location],
            ["Bedrooms", data.bedrooms],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-gray-500 text-xs">{k}</p>
              <p className="text-white text-sm font-medium">{v || "—"}</p>
            </div>
          ))}
        </div>
        {data.requirements && (
          <div className="mt-3 border-t border-purple-900/20 pt-3">
            <p className="text-gray-500 text-xs mb-1">Additional Notes</p>
            <p className="text-white text-sm">{data.requirements}</p>
          </div>
        )}
      </div>

      {/* Payment summary */}
      <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-5">
        <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">Payment Method</p>
        <p className="text-white text-sm font-semibold capitalize">{data.paymentMethod === "upi" ? "UPI" : data.paymentMethod === "card" ? "Credit / Debit Card" : "Bank Transfer"}</p>
      </div>

      {/* What you get */}
      <div className="bg-purple-600/10 border border-purple-500/30 rounded-2xl p-5">
        <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">Premium Package Includes</p>
        <ul className="space-y-2">
          {PREMIUM_FEATURES.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-300 text-xs xs:text-sm">
              <CheckCircle size={14} className="text-purple-500 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PremiumCheckout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof FormData, v: string) => {
    setData(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: "" }));
  };

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (step === 0) {
      if (!data.fullName.trim()) e.fullName = "Name is required";
      if (!data.phone.trim()) e.phone = "Phone is required";
      if (!data.email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Invalid email";
      if (!data.address.trim()) e.address = "Address is required";
    }
    if (step === 1) {
      if (!data.propertyType) e.propertyType = "Select a property type";
      if (!data.budget) e.budget = "Select a budget range";
      if (!data.location.trim()) e.location = "Location is required";
      if (!data.bedrooms) e.bedrooms = "Select bedrooms";
    }
    if (step === 2) {
      if (data.paymentMethod === "upi" && !data.upiId.trim()) e.upiId = "UPI ID is required";
      if (data.paymentMethod === "card") {
        if (!data.cardNumber.trim()) e.cardNumber = "Card number is required";
        if (!data.cardName.trim()) e.cardName = "Name is required";
        if (!data.cardExpiry.trim()) e.cardExpiry = "Expiry is required";
        if (!data.cardCvv.trim()) e.cardCvv = "CVV is required";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const submit = () => {
    setSubmitted(true);
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#252544] flex items-center justify-center px-4 py-20">
        <motion.div
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-purple-600/20 border-2 border-purple-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-purple-400" />
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-3">
            You're All Set! 🎉
          </h2>
          <p className="text-gray-400 text-sm xs:text-base mb-2">
            Welcome to <span className="text-purple-400 font-semibold">Kalinga Homes Premium</span>.
          </p>
          <p className="text-gray-400 text-sm xs:text-base mb-8">
            Our dedicated consultant will contact you at{" "}
            <span className="text-white font-medium">{data.phone}</span> within{" "}
            <span className="text-white font-medium">2 hours</span> to get started.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: <Shield size={18} />, label: "Verified" },
              { icon: <Clock size={18} />, label: "2hr Response" },
              { icon: <Headphones size={18} />, label: "24/7 Support" },
            ].map((item, i) => (
              <div key={i} className="bg-[#252544] border border-purple-900/30 rounded-xl p-3 flex flex-col items-center gap-1">
                <div className="text-purple-400">{item.icon}</div>
                <span className="text-gray-300 text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-full font-semibold text-sm xs:text-base transition-all hover:scale-105 shadow-lg"
          >
            Back to Home
          </button>
        </motion.div>
      </section>
    );
  }

  // ── Main checkout ──
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#252544] px-4 sm:px-6 md:px-8 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

          {/* ── Left: Form ── */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-900/30 rounded-full px-4 py-1.5 mb-4">
                <Star size={13} className="text-purple-400" />
                <span className="text-purple-400 text-xs font-semibold tracking-widest uppercase">Premium Package</span>
              </div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-2">
                Complete Your <span className="text-purple-500">Enrollment</span>
              </h1>
              <p className="text-gray-400 text-sm xs:text-base">
                Fill in the details below — it takes less than 3 minutes.
              </p>
            </motion.div>

            {/* Step bar */}
            <StepBar current={step} />

            {/* Form card */}
            <motion.div
              className="bg-[#252544] border border-purple-900/30 rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-lg xs:text-xl font-bold text-white mb-6">
                {STEPS[step]}
              </h3>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 0 && <Step1 data={data} set={set} errors={errors} />}
                  {step === 1 && <Step2 data={data} set={set} errors={errors} />}
                  {step === 2 && <Step3 data={data} set={set} errors={errors} />}
                  {step === 3 && <Step4 data={data} />}
                </motion.div>
              </AnimatePresence>

              {/* Nav buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-purple-900/30">
                {step > 0 ? (
                  <button
                    onClick={back}
                    className="flex items-center gap-2 border border-purple-900/30 hover:border-purple-500/50 text-gray-400 hover:text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                  >
                    <ChevronLeft size={15} /> Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    onClick={next}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg"
                  >
                    Continue <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-purple-900/40"
                  >
                    <CheckCircle size={15} /> Confirm & Pay
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Summary sidebar ── */}
          <div className="lg:col-span-1 space-y-5">
            {/* Package card */}
            <motion.div
              className="bg-[#252544] border border-purple-500/40 rounded-2xl sm:rounded-3xl p-6 sm:p-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                  <Star size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Premium Package</p>
                  <p className="text-purple-400 text-xs">Most Popular</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                {PREMIUM_FEATURES.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={9} className="text-white" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <div className="border-t border-purple-900/30 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Consultation Fee</span>
                  <span className="text-purple-400 font-bold text-base">Best Value</span>
                </div>
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { icon: <Shield size={15} className="text-purple-400" />, text: "100% Secure & Encrypted" },
                { icon: <Clock size={15} className="text-purple-400" />, text: "Response within 2 hours" },
                { icon: <Headphones size={15} className="text-purple-400" />, text: "24/7 dedicated support" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-gray-300 text-xs xs:text-sm">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Step progress note */}
            <motion.div
              className="bg-[#252544] border border-purple-900/30 rounded-2xl p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-400 text-xs text-center">
                Step <span className="text-purple-400 font-bold">{step + 1}</span> of {STEPS.length} — {STEPS[step]}
              </p>
              <div className="mt-3 h-1.5 bg-purple-900/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-600 rounded-full"
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
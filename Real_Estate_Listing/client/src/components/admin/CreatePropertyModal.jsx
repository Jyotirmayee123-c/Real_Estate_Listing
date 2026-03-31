import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import {
  X, ChevronRight, ChevronLeft, CheckCircle,
  Home, IndianRupee, MapPin, Image, Star,
  BedDouble, Bath, Maximize2, AlertTriangle,
} from "lucide-react";

// ── Steps ─────────────────────────────────────────────────────────────────────
const STEPS = ["Basic Info", "Location", "Media", "Details", "Confirm"];

// ── Input / Select helpers ────────────────────────────────────────────────────
const inputCls = "w-full bg-[#1a1a2e] border border-purple-900/40 focus:border-purple-500 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors";
const selectCls = inputCls + " cursor-pointer";

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-300 text-xs font-semibold flex items-center gap-1">
        {label}{required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs flex items-center gap-1"><AlertTriangle size={10} />{error}</p>}
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────
function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 px-2">
      {STEPS.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
              ${i < current  ? "bg-purple-600 border-purple-600 text-white"
              : i === current ? "bg-[#1a1a2e] border-purple-500 text-purple-400"
              : "bg-[#1a1a2e] border-purple-900/40 text-gray-600"}`}
            >
              {i < current ? <CheckCircle size={14} /> : i + 1}
            </div>
            <span className={`text-[10px] mt-1 font-medium hidden sm:block
              ${i === current ? "text-purple-400" : i < current ? "text-purple-300" : "text-gray-600"}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-px w-8 sm:w-14 mb-4 transition-all duration-300 ${i < current ? "bg-purple-600" : "bg-purple-900/30"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Confirm Row ───────────────────────────────────────────────────────────────
function ConfirmRow({ label, value }) {
  if (!value && value !== false) return null;
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-purple-900/20 last:border-0">
      <span className="text-gray-500 text-xs flex-shrink-0">{label}</span>
      <span className="text-white text-xs font-semibold text-right break-all">{String(value)}</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const CreatePropertyModal = ({ closeModal, editMode = false, propertyData }) => {
  const [step,    setStep]    = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "", price: "", listingType: "", propertyType: "",
    city: "", address: "",
    description: "",
    thumbnail: "", propertyImages: "",
    bedrooms: "", bathrooms: "", area: "",
    isFeatured: false,
  });

  // Pre-fill for edit mode
  useEffect(() => {
    if (editMode && propertyData) {
      setFormData({
        title:          propertyData.title          || "",
        price:          propertyData.price          || "",
        listingType:    propertyData.listingType    || "",
        propertyType:   propertyData.propertyType   || "",
        city:           propertyData.city           || "",
        address:        propertyData.address        || "",
        description:    propertyData.description    || "",
        thumbnail:      propertyData.thumbnail      || "",
        propertyImages: propertyData.images?.join(", ") || "",
        bedrooms:       propertyData.bedrooms       || "",
        bathrooms:      propertyData.bathrooms      || "",
        area:           propertyData.area           || "",
        isFeatured:     propertyData.isFeatured     || false,
      });
    }
  }, [editMode, propertyData]);

  const set = (k, v) => {
    setFormData(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: "" }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    set(name, type === "checkbox" ? checked : value);
  };

  // ── Validate per step ─────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!formData.title.trim())       e.title       = "Title is required";
      if (!formData.price)              e.price       = "Price is required";
      if (!formData.listingType)        e.listingType = "Listing type is required";
      if (!formData.propertyType)       e.propertyType= "Property type is required";
      if (!formData.description.trim()) e.description = "Description is required";
    }
    if (step === 1) {
      if (!formData.city.trim())    e.city    = "City is required";
      if (!formData.address.trim()) e.address = "Address is required";
    }
    if (step === 2) {
      if (!editMode && !formData.thumbnail.trim()) e.thumbnail = "Thumbnail URL is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        images: formData.propertyImages
          ? formData.propertyImages.split(",").map(u => u.trim()).filter(Boolean)
          : [],
      };
      delete payload.propertyImages;

      if (editMode) {
        await api.put(`/property/${propertyData._id}`, payload);
      } else {
        await api.post("/property", payload);
      }
      setSuccess(true);
      setTimeout(() => { closeModal(); }, 1800);
    } catch (error) {
      console.error(error);
      setErrors({ submit: editMode ? "Failed to update property" : "Failed to create property" });
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (success) return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[#252544] border border-purple-500/40 rounded-3xl p-10 text-center max-w-sm w-full"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={30} className="text-emerald-400" />
        </div>
        <h3 className="text-white font-black text-xl mb-2">
          {editMode ? "Property Updated!" : "Property Created!"}
        </h3>
        <p className="text-gray-400 text-sm">Closing automatically...</p>
      </motion.div>
    </div>
  );

  const previewImages = formData.propertyImages.split(",").map(u => u.trim()).filter(Boolean);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[#1a1a2e] border border-purple-900/40 rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-purple-900/30 flex-shrink-0">
          <div>
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">
              {editMode ? "Edit Property" : "New Property"}
            </p>
            <h2 className="text-white font-black text-xl mt-0.5">
              {editMode ? "Update Property" : "Create Property"}
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/40 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Step bar ── */}
        <div className="px-6 py-4 border-b border-purple-900/30 flex-shrink-0">
          <StepBar current={step} />
        </div>

        {/* ── Form body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >

              {/* ── Step 0: Basic Info ── */}
              {step === 0 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                      <Home size={15} className="text-purple-400" />
                    </div>
                    <p className="text-white font-bold text-sm">Basic Information</p>
                  </div>
                  <Field label="Property Title" required error={errors.title}>
                    <input className={inputCls} name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Modern 3BHK Apartment in Patia" />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Price (₹)" required error={errors.price}>
                      <input className={inputCls} type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 4500000" />
                    </Field>
                    <Field label="Listing Type" required error={errors.listingType}>
                      <select className={selectCls} name="listingType" value={formData.listingType} onChange={handleChange}>
                        <option value="">Select type</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                        <option value="sell">Sell</option>
                        <option value="other">Other</option>
                      </select>
                    </Field>
                  </div>
                  <Field label="Property Type" required error={errors.propertyType}>
                    <select className={selectCls} name="propertyType" value={formData.propertyType} onChange={handleChange}>
                      <option value="">Select property type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                  <Field label="Description" required error={errors.description}>
                    <textarea className={inputCls + " resize-none h-28"} name="description" value={formData.description} onChange={handleChange} placeholder="Describe the property in detail..." />
                  </Field>
                </>
              )}

              {/* ── Step 1: Location ── */}
              {step === 1 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <MapPin size={15} className="text-blue-400" />
                    </div>
                    <p className="text-white font-bold text-sm">Location Details</p>
                  </div>
                  <Field label="City" required error={errors.city}>
                    <input className={inputCls} name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Bhubaneswar" />
                  </Field>
                  <Field label="Full Address" required error={errors.address}>
                    <textarea className={inputCls + " resize-none h-24"} name="address" value={formData.address} onChange={handleChange} placeholder="Enter the complete property address..." />
                  </Field>
                </>
              )}

              {/* ── Step 2: Media ── */}
              {step === 2 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-pink-600/20 flex items-center justify-center">
                      <Image size={15} className="text-pink-400" />
                    </div>
                    <p className="text-white font-bold text-sm">Property Images</p>
                  </div>
                  <Field label={`Thumbnail URL${editMode ? " (optional)" : ""}`} required={!editMode} error={errors.thumbnail}>
                    <input className={inputCls} name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="https://example.com/thumbnail.jpg" />
                  </Field>
                  {formData.thumbnail && (
                    <div className="rounded-xl overflow-hidden border border-purple-900/30 h-40">
                      <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" onError={e => { e.currentTarget.style.display = "none"; }} />
                    </div>
                  )}
                  <Field label="Additional Image URLs" error={errors.propertyImages}>
                    <input className={inputCls} name="propertyImages" value={formData.propertyImages} onChange={handleChange} placeholder="https://img1.jpg, https://img2.jpg, ..." />
                    <p className="text-gray-600 text-[11px]">Separate multiple URLs with commas</p>
                  </Field>
                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {previewImages.map((url, i) => (
                        <div key={i} className="rounded-xl overflow-hidden border border-purple-900/30 h-24">
                          <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" onError={e => { e.currentTarget.parentElement.innerHTML = `<div class="w-full h-full bg-purple-900/30 flex items-center justify-center text-xs text-gray-500">Invalid URL</div>`; }} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* ── Step 3: Details ── */}
              {step === 3 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center">
                      <Maximize2 size={15} className="text-emerald-400" />
                    </div>
                    <p className="text-white font-bold text-sm">Property Details</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Field label="Bedrooms" error={errors.bedrooms}>
                      <input className={inputCls} type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="e.g. 3" min="0" />
                    </Field>
                    <Field label="Bathrooms" error={errors.bathrooms}>
                      <input className={inputCls} type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="e.g. 2" min="0" />
                    </Field>
                    <Field label="Area (sq.ft)" error={errors.area}>
                      <input className={inputCls} type="number" name="area" value={formData.area} onChange={handleChange} placeholder="e.g. 1200" min="0" />
                    </Field>
                  </div>

                  {/* Featured toggle */}
                  <div
                    onClick={() => set("isFeatured", !formData.isFeatured)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${formData.isFeatured ? "bg-yellow-600/10 border-yellow-500/40" : "bg-[#252544] border-purple-900/30 hover:border-purple-500/40"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${formData.isFeatured ? "bg-yellow-600/30" : "bg-white/5"}`}>
                        <Star size={16} className={formData.isFeatured ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">Featured Property</p>
                        <p className="text-gray-500 text-xs">Show this property in featured listings</p>
                      </div>
                    </div>
                    <div className={`w-11 h-6 rounded-full border-2 transition-all relative ${formData.isFeatured ? "bg-yellow-500 border-yellow-500" : "bg-white/10 border-white/20"}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${formData.isFeatured ? "left-5" : "left-0.5"}`} />
                    </div>
                  </div>
                </>
              )}

              {/* ── Step 4: Confirm ── */}
              {step === 4 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                      <CheckCircle size={15} className="text-purple-400" />
                    </div>
                    <p className="text-white font-bold text-sm">Review & Confirm</p>
                  </div>

                  {/* Thumbnail preview */}
                  {formData.thumbnail && (
                    <div className="rounded-2xl overflow-hidden border border-purple-900/30 h-36 mb-2">
                      <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Basic */}
                    <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4 space-y-1">
                      <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2">Basic Info</p>
                      <ConfirmRow label="Title"         value={formData.title} />
                      <ConfirmRow label="Price"         value={formData.price ? `₹${Number(formData.price).toLocaleString()}` : ""} />
                      <ConfirmRow label="Listing Type"  value={formData.listingType} />
                      <ConfirmRow label="Property Type" value={formData.propertyType} />
                    </div>

                    {/* Location */}
                    <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4 space-y-1">
                      <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2">Location</p>
                      <ConfirmRow label="City"    value={formData.city} />
                      <ConfirmRow label="Address" value={formData.address} />
                    </div>

                    {/* Details */}
                    <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4 space-y-1">
                      <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2">Details</p>
                      <ConfirmRow label="Bedrooms"  value={formData.bedrooms} />
                      <ConfirmRow label="Bathrooms" value={formData.bathrooms} />
                      <ConfirmRow label="Area"      value={formData.area ? `${formData.area} sq.ft` : ""} />
                      <ConfirmRow label="Featured"  value={formData.isFeatured ? "Yes ⭐" : "No"} />
                    </div>

                    {/* Media */}
                    <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4 space-y-1">
                      <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2">Media</p>
                      <ConfirmRow label="Thumbnail"    value={formData.thumbnail ? "✅ Set" : "Not set"} />
                      <ConfirmRow label="Extra Images" value={previewImages.length > 0 ? `${previewImages.length} image(s)` : "None"} />
                    </div>
                  </div>

                  {/* Description */}
                  {formData.description && (
                    <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-4">
                      <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2">Description</p>
                      <p className="text-gray-300 text-xs leading-relaxed">{formData.description}</p>
                    </div>
                  )}

                  {errors.submit && (
                    <div className="flex items-center gap-2 bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                      <AlertTriangle size={15} /> {errors.submit}
                    </div>
                  )}
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Footer navigation ── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-purple-900/30 flex-shrink-0">
          <button
            onClick={step === 0 ? closeModal : back}
            className="flex items-center gap-2 border border-purple-900/30 hover:border-purple-500/50 text-gray-400 hover:text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            <ChevronLeft size={15} />
            {step === 0 ? "Cancel" : "Back"}
          </button>

          <div className="flex items-center gap-2">
            {/* Dot indicators */}
            {STEPS.map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${i === step ? "w-4 h-2 bg-purple-500" : i < step ? "w-2 h-2 bg-purple-600" : "w-2 h-2 bg-purple-900/40"}`} />
            ))}
          </div>

          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-purple-900/30"
            >
              Continue <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-purple-900/30"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
              ) : (
                <><CheckCircle size={15} /> {editMode ? "Update Property" : "Create Property"}</>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CreatePropertyModal;
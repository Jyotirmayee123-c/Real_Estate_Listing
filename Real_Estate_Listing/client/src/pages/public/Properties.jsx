import React, { useEffect, useState } from "react";
import { MapPin, BedDouble, Bath, Ruler, Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import Footer from "../../components/Footer";

// ── Normalize suitableFor: always returns array of trimmed lowercase strings ──
// Handles ALL formats: "Bachelor,Family", ["Bachelor","Family"], "bachelor", nested arrays
const normalizeSuitableFor = (val) => {
  if (!val) return [];

  // If it's an array, flatten and split each element by comma
  if (Array.isArray(val)) {
    return val
      .flatMap((v) => {
        if (typeof v === "string") return v.split(",").map((s) => s.trim().toLowerCase());
        if (Array.isArray(v))      return v.flatMap((s) => typeof s === "string" ? s.split(",").map((x) => x.trim().toLowerCase()) : []);
        return [];
      })
      .filter(Boolean);
  }

  // If it's a plain string, split by comma
  if (typeof val === "string") {
    return val.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  }

  return [];
};

// ── Match helper: checks if a property's suitableFor tags include the target ──
const matchesSuitableFor = (propertyVal, target) => {
  if (!target) return true; // no filter active → show all
  const tags = normalizeSuitableFor(propertyVal);
  const t    = target.toLowerCase().trim();

  if (t === "others") {
    // "Others" = anything that is NOT bachelor or family
    return tags.some((tag) => tag !== "bachelor" && tag !== "family");
  }

  // Direct / partial match for bachelor, family
  return tags.some(
    (tag) =>
      tag === t ||
      tag.startsWith(t) ||   // "bachelor's" starts with "bachelor"
      t.startsWith(tag)      // "fam" matches "family" (unlikely but safe)
  );
};

const getSuitableLabel = (val) => {
  if (!val) return "";
  const v = val.toLowerCase().trim();
  if (v === "bachelor") return "🧑 Bachelor";
  if (v === "family")   return "👨‍👩‍👧‍👦 Family";
  return "🏘️ Others";
};

const PROPERTY_TYPE_VALUES = ["apartment", "house", "commercial"];

const PURPOSE_BUTTONS = [
  { val: "buy",  icon: "🏠", label: "Buy"  },
  { val: "rent", icon: "🔑", label: "Rent" },
  { val: "sell", icon: "💰", label: "Sell" },
];

const SUITABLE_BUTTONS = [
  { value: "bachelor", label: "🧑 Bachelor"      },
  { value: "family",   label: "👨‍👩‍👧‍👦 Family"      },
  { value: "others",   label: "🏘️ Others"        },
];

const Properties = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [properties,    setProperties]    = useState([]);
  const [filtered,      setFiltered]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [showAdvanced,  setShowAdvanced]  = useState(false);

  const urlCategory    = searchParams.get("category") || "";
  const initialPurpose = ["buy", "rent", "sell"].includes(urlCategory.toLowerCase()) ? urlCategory.toLowerCase() : "";
  const initialType    = PROPERTY_TYPE_VALUES.includes(urlCategory.toLowerCase()) ? urlCategory.toLowerCase() : "";

  const [search,      setSearch]      = useState(searchParams.get("location") || "");
  const [category,    setCategory]    = useState(initialType);
  const [purpose,     setPurpose]     = useState(initialPurpose);
  const [sortBy,      setSortBy]      = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [minPrice,    setMinPrice]    = useState("");
  const [maxPrice,    setMaxPrice]    = useState("");
  const [minBeds,     setMinBeds]     = useState("");
  const [furnishing,  setFurnishing]  = useState("");

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/property`);
      let data = [];
      if (Array.isArray(res.data))                        data = res.data;
      else if (Array.isArray(res.data?.properties))       data = res.data.properties;
      else if (Array.isArray(res.data?.data))             data = res.data.data;
      else if (Array.isArray(res.data?.data?.properties)) data = res.data.data.properties;
      else console.warn("Unexpected API response shape:", res.data);

      // Debug: log all unique suitableFor raw values to console
      const unique = [...new Set(data.map((p) => JSON.stringify(p.suitableFor)))];
      console.log(`✅ Fetched ${data.length} properties`);
      console.log("🏷️ Unique suitableFor raw values:", unique);

      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error?.response?.data || error.message);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProperties(); }, []);

  // ── Filter / Sort ──────────────────────────────────────────────────────────
  useEffect(() => {
    let result = [...properties];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.city?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q)
      );
    }

    // Purpose
    if (purpose) {
      result = result.filter((p) => {
        const val = (p.purpose || p.propertyPurpose || p.listingType || "").toLowerCase().trim();
        return val === purpose;
      });
    }

    // Property type
    if (category) {
      result = result.filter((p) =>
        (p.propertyType || "").toLowerCase() === category.toLowerCase()
      );
    }

    // ── Suitable For — using robust matchesSuitableFor helper ──
    if (suitableFor) {
      result = result.filter((p) => matchesSuitableFor(p.suitableFor, suitableFor));
    }

    // Furnishing
    if (furnishing) {
      result = result.filter((p) =>
        p.furnishing?.toLowerCase() === furnishing.toLowerCase()
      );
    }

    // Price
    if (minPrice !== "") result = result.filter((p) => (p.price || 0) >= Number(minPrice));
    if (maxPrice !== "") result = result.filter((p) => (p.price || 0) <= Number(maxPrice));

    // Beds
    if (minBeds) result = result.filter((p) => (p.bedrooms || 0) >= Number(minBeds));

    // Sort
    if (sortBy === "price-asc")  result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "newest")     result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFiltered(result);
  }, [search, category, purpose, sortBy, suitableFor, minPrice, maxPrice, minBeds, furnishing, properties]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const clearFilters = () => {
    setSearch(""); setCategory(""); setPurpose(""); setSortBy("");
    setSuitableFor(""); setMinPrice(""); setMaxPrice(""); setMinBeds(""); setFurnishing("");
  };

  const hasFilters          = search || category || purpose || sortBy || suitableFor || minPrice || maxPrice || minBeds || furnishing;
  const activeAdvancedCount = [suitableFor, minPrice, maxPrice, minBeds, furnishing].filter(Boolean).length;
  const purposeLabel        = PURPOSE_BUTTONS.find((b) => b.val === purpose);

  const pageTitle =
    purpose === "buy"  ? <>Buy <span className="text-purple-400">Properties</span></> :
    purpose === "rent" ? <>Rent <span className="text-purple-400">Properties</span></> :
    purpose === "sell" ? <>Sell <span className="text-purple-400">Properties</span></> :
                         <>Explore <span className="text-purple-400">Properties</span></>;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0d0d1a]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-700/20 rounded-full blur-[100px] pointer-events-none" />

      {/* PAGE HEADER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-medium tracking-widest uppercase text-purple-400 mb-2">Browse Listings</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {pageTitle}
          </h1>
          <p className="text-white/45 text-sm sm:text-base max-w-md">
            Find your dream home from our premium verified listings in Bhubaneswar.
          </p>
        </motion.div>

        {/* FILTER BAR */}
        <motion.div className="mt-8 flex flex-col gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-wrap">

            {/* Search */}
            <div className="flex items-center gap-2 flex-1 bg-white/[0.05] border border-white/10 rounded-full px-5 py-3 backdrop-blur-sm min-w-[200px]">
              <Search size={15} className="text-white/35 shrink-0" />
              <input type="text" placeholder="Search by location or title..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-white/35 text-sm w-full" />
            </div>

            {/* Buy / Rent / Sell */}
            <div className="flex gap-2">
              {PURPOSE_BUTTONS.map(({ val, icon, label }) => (
                <button key={val} type="button" onClick={() => setPurpose(purpose === val ? "" : val)}
                  className={`px-4 py-3 rounded-full border text-sm font-medium transition-all duration-200
                    ${purpose === val
                      ? val === "sell"
                        ? "bg-emerald-600/30 border-emerald-500/50 text-emerald-300"
                        : "bg-purple-600/30 border-purple-500/50 text-purple-300"
                      : "bg-white/[0.05] border-white/10 text-white/55 hover:border-purple-500/30 hover:text-purple-300"}`}>
                  {icon} {label}
                </button>
              ))}
            </div>

            {/* Property Type */}
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="bg-white/[0.05] border border-white/10 rounded-full px-5 py-3 text-white/65 text-sm outline-none cursor-pointer backdrop-blur-sm">
              <option value=""           className="bg-[#1a1a2e]">All Types</option>
              <option value="apartment"  className="bg-[#1a1a2e]">Apartment</option>
              <option value="house"      className="bg-[#1a1a2e]">House</option>
              <option value="commercial" className="bg-[#1a1a2e]">Commercial</option>
            </select>

            {/* Sort */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/[0.05] border border-white/10 rounded-full px-5 py-3 text-white/65 text-sm outline-none cursor-pointer backdrop-blur-sm">
              <option value=""           className="bg-[#1a1a2e]">Sort By</option>
              <option value="price-asc"  className="bg-[#1a1a2e]">Price: Low → High</option>
              <option value="price-desc" className="bg-[#1a1a2e]">Price: High → Low</option>
              <option value="newest"     className="bg-[#1a1a2e]">Newest First</option>
            </select>

            {/* Advanced toggle */}
            <button type="button" onClick={() => setShowAdvanced((v) => !v)}
              className={`flex items-center gap-2 border rounded-full px-5 py-3 text-sm transition-all duration-200 backdrop-blur-sm
                ${showAdvanced || activeAdvancedCount > 0
                  ? "bg-purple-600/20 border-purple-500/40 text-purple-300"
                  : "bg-white/[0.05] border-white/10 text-white/55 hover:border-purple-500/30 hover:text-purple-300"}`}>
              <SlidersHorizontal size={14} />
              Filters
              {activeAdvancedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeAdvancedCount}
                </span>
              )}
              <ChevronDown size={13} className={`transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`} />
            </button>

            {/* Clear */}
            {hasFilters && (
              <button type="button" onClick={clearFilters}
                className="flex items-center gap-2 bg-white/[0.05] border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 rounded-full px-5 py-3 text-white/55 hover:text-red-400 text-sm transition-all duration-200">
                <X size={14} /> Clear
              </button>
            )}
          </div>

          {/* ADVANCED FILTERS */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  {/* ── Suitable For ── */}
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Suitable For</p>
                    <div className="flex gap-2 flex-wrap">
                      {SUITABLE_BUTTONS.map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setSuitableFor((prev) => (prev === value ? "" : value))}
                          className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all duration-200
                            ${suitableFor === value
                              ? "bg-purple-600/30 border-purple-500/50 text-purple-300 shadow-md shadow-purple-900/30"
                              : "bg-white/[0.04] border-white/10 text-white/50 hover:border-purple-500/30 hover:text-white/75"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Min Bedrooms */}
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Min. Bedrooms</p>
                    <div className="flex gap-2">
                      {["1", "2", "3", "4"].map((n) => (
                        <button key={n} type="button" onClick={() => setMinBeds(minBeds === n ? "" : n)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all duration-200
                            ${minBeds === n
                              ? "bg-purple-600/30 border-purple-500/50 text-purple-300"
                              : "bg-white/[0.04] border-white/10 text-white/50 hover:border-purple-500/30 hover:text-white/75"}`}>
                          {n}+
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Price Range (₹)</p>
                    <div className="flex gap-2">
                      <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2.5 text-white/65 text-sm outline-none placeholder-white/25 focus:border-purple-500/40 transition-colors" />
                      <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2.5 text-white/65 text-sm outline-none placeholder-white/25 focus:border-purple-500/40 transition-colors" />
                    </div>
                  </div>

                  {/* Furnishing
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Furnishing</p>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { value: "furnished",      label: "✅ Furnished"    },
                        { value: "semi-furnished", label: "🪑 Semi"         },
                        { value: "unfurnished",    label: "🏠 Unfurnished"  },
                      ].map(({ value, label }) => (
                        <button key={value} type="button" onClick={() => setFurnishing(furnishing === value ? "" : value)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all duration-200
                            ${furnishing === value
                              ? "bg-purple-600/30 border-purple-500/50 text-purple-300"
                              : "bg-white/[0.04] border-white/10 text-white/50 hover:border-purple-500/30 hover:text-white/75"}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div> */}

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/30 text-xs">Active:</span>
              {purpose && (
                <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border capitalize
                  ${purpose === "sell" ? "bg-emerald-600/15 text-emerald-400 border-emerald-500/20" : "bg-purple-600/15 text-purple-400 border-purple-500/20"}`}>
                  {purposeLabel?.icon} {purposeLabel?.label}
                  <button type="button" onClick={() => setPurpose("")}><X size={10} /></button>
                </span>
              )}
              {search && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20">
                  "{search}" <button type="button" onClick={() => setSearch("")}><X size={10} /></button>
                </span>
              )}
              {category && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20 capitalize">
                  {category} <button type="button" onClick={() => setCategory("")}><X size={10} /></button>
                </span>
              )}
              {suitableFor && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20 capitalize">
                  {getSuitableLabel(suitableFor)}
                  <button type="button" onClick={() => setSuitableFor("")}><X size={10} /></button>
                </span>
              )}
              {furnishing && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20 capitalize">
                  {furnishing} <button type="button" onClick={() => setFurnishing("")}><X size={10} /></button>
                </span>
              )}
              {minBeds && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20">
                  {minBeds}+ Beds <button type="button" onClick={() => setMinBeds("")}><X size={10} /></button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20">
                  ₹{minPrice || "0"} – ₹{maxPrice || "∞"}
                  <button type="button" onClick={() => { setMinPrice(""); setMaxPrice(""); }}><X size={10} /></button>
                </span>
              )}
            </div>
          )}
        </motion.div>

        {!loading && (
          <p className="mt-5 text-white/35 text-sm">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
            {suitableFor && (
              <span className="ml-2 text-purple-400 font-medium">
                · {getSuitableLabel(suitableFor)}
              </span>
            )}
          </p>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20">

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-white/[0.05]" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-white/[0.07] rounded-full w-3/4" />
                  <div className="h-3 bg-white/[0.05] rounded-full w-1/2" />
                  <div className="h-4 bg-white/[0.07] rounded-full w-1/3" />
                  <div className="h-10 bg-white/[0.05] rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <motion.div className="flex flex-col items-center justify-center py-24 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-5xl mb-4">🏚️</div>
            <h3 className="text-white text-xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No properties found
            </h3>
            <p className="text-white/40 text-sm mb-6">
              {suitableFor
                ? `No properties marked as suitable for ${getSuitableLabel(suitableFor)}. Try clearing this filter.`
                : "Try adjusting your filters or search term."}
            </p>
            <button type="button" onClick={clearFilters}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition">
              Clear Filters
            </button>
          </motion.div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property, index) => {
              const suitableTags = normalizeSuitableFor(property.suitableFor);
              const propPurpose  = (property.purpose || property.propertyPurpose || property.listingType || "").toLowerCase();
              const isSell       = propPurpose === "sell";

              return (
                <motion.div key={property._id}
                  className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/[0.04] hover:-translate-y-1 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => navigate(`/property/${property._id}`)}>

                  <div className="relative overflow-hidden h-52">
                    <img src={property.thumbnail || "/placeholder.jpg"} alt={property.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => { e.target.src = "/placeholder.jpg"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Left badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {property.isFeatured && (
                        <span className="bg-yellow-400/90 text-black text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm self-start">⭐ Featured</span>
                      )}
                      {suitableTags.map((tag) => (
                        <span key={tag} className="bg-black/60 text-white text-xs font-medium px-2.5 py-0.5 rounded-full backdrop-blur-sm self-start capitalize">
                          {getSuitableLabel(tag)}
                        </span>
                      ))}
                    </div>

                    {/* Right badges */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                      {property.propertyType && (
                        <span className="bg-purple-600/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm capitalize">
                          {property.propertyType}
                        </span>
                      )}
                      {propPurpose && (
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm capitalize
                          ${isSell ? "bg-emerald-500/80 text-white" : "bg-white/10 text-white/80"}`}>
                          {isSell ? "💰 " : propPurpose === "buy" ? "🏠 " : "🔑 "}
                          {propPurpose}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-4">
                      <span className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                        ₹ {property.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h2 className="text-base font-semibold text-white leading-snug line-clamp-1">{property.title}</h2>
                    <div className="flex items-center text-white/45 text-sm gap-1.5">
                      <MapPin size={13} className="shrink-0" />
                      <span className="truncate">{property.city}</span>
                    </div>
                    {property.furnishing && (
                      <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/45 capitalize">
                        {property.furnishing}
                      </span>
                    )}
                    <div className="flex justify-between text-white/45 text-xs pt-3 border-t border-white/[0.07]">
                      <span className="flex items-center gap-1.5"><BedDouble size={13} />{property.bedrooms} Beds</span>
                      <span className="flex items-center gap-1.5"><Bath size={13} />{property.bathrooms} Baths</span>
                      <span className="flex items-center gap-1.5"><Ruler size={13} />{property.area} sqft</span>
                    </div>
                    <button type="button"
                      onClick={(e) => { e.stopPropagation(); navigate(`/property/${property._id}`); }}
                      className="w-full mt-1 bg-purple-600/15 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-600 text-purple-300 hover:text-white py-2.5 rounded-xl text-sm font-medium transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
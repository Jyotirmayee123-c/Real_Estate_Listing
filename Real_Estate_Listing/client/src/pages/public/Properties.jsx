import React, { useEffect, useState } from "react";
import { MapPin, BedDouble, Bath, Ruler, Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import Footer from "../../components/Footer";

const Properties = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [search, setSearch] = useState(searchParams.get("location") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState("");
  const [suitableFor, setSuitableFor] = useState(""); // bachelor | family | ""
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [furnishing, setFurnishing] = useState(""); // furnished | semi-furnished | unfurnished

  const fetchProperties = async () => {
    try {
      const res = await api.get(`/property`);
      const data = res.data.properties || res.data.data || [];
      setProperties(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    let result = [...properties];

    if (search) {
      result = result.filter(
        (p) =>
          p.city?.toLowerCase().includes(search.toLowerCase()) ||
          p.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(
        (p) => p.propertyType?.toLowerCase() === category.toLowerCase()
      );
    }

    if (suitableFor) {
      result = result.filter(
        (p) => p.suitableFor?.toLowerCase() === suitableFor.toLowerCase()
      );
    }

    if (furnishing) {
      result = result.filter(
        (p) => p.furnishing?.toLowerCase() === furnishing.toLowerCase()
      );
    }

    if (minPrice) {
      result = result.filter((p) => (p.price || 0) >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter((p) => (p.price || 0) <= Number(maxPrice));
    }

    if (minBeds) {
      result = result.filter((p) => (p.bedrooms || 0) >= Number(minBeds));
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "newest")
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFiltered(result);
  }, [search, category, sortBy, suitableFor, minPrice, maxPrice, minBeds, furnishing, properties]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSortBy("");
    setSuitableFor("");
    setMinPrice("");
    setMaxPrice("");
    setMinBeds("");
    setFurnishing("");
  };

  const hasFilters = search || category || sortBy || suitableFor || minPrice || maxPrice || minBeds || furnishing;
  const activeAdvancedCount = [suitableFor, minPrice, maxPrice, minBeds, furnishing].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#0d0d1a]">

      {/* Purple glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-700/20 rounded-full blur-[100px] pointer-events-none" />

      {/* ── PAGE HEADER ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium tracking-widest uppercase text-purple-400 mb-2">
            Browse Listings
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Explore <span className="text-purple-400">Properties</span>
          </h1>
          <p className="text-white/45 text-sm sm:text-base max-w-md">
            Find your dream home from our premium verified listings in
            Bhubaneswar.
          </p>
        </motion.div>

        {/* ── FILTER BAR ── */}
        <motion.div
          className="mt-8 flex flex-col gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Main filter row */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="flex items-center gap-2 flex-1 bg-white/[0.05] border border-white/10 rounded-full px-5 py-3 backdrop-blur-sm">
              <Search size={15} className="text-white/35 shrink-0" />
              <input
                type="text"
                placeholder="Search by location or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-white/35 text-sm w-full"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white/[0.05] border border-white/10 rounded-full px-5 py-3 text-white/65 text-sm outline-none cursor-pointer backdrop-blur-sm"
            >
              <option value="" className="bg-[#1a1a2e]">All Types</option>
              <option value="apartment" className="bg-[#1a1a2e]">Apartment</option>
              <option value="house" className="bg-[#1a1a2e]">House</option>
              <option value="commercial" className="bg-[#1a1a2e]">Commercial</option>
              <option value="land" className="bg-[#1a1a2e]">Land</option>
              <option value="other" className="bg-[#1a1a2e]">Other</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/[0.05] border border-white/10 rounded-full px-5 py-3 text-white/65 text-sm outline-none cursor-pointer backdrop-blur-sm"
            >
              <option value="" className="bg-[#1a1a2e]">Sort By</option>
              <option value="price-asc" className="bg-[#1a1a2e]">Price: Low → High</option>
              <option value="price-desc" className="bg-[#1a1a2e]">Price: High → Low</option>
              <option value="newest" className="bg-[#1a1a2e]">Newest First</option>
            </select>

            {/* Advanced filters toggle */}
            <button
              onClick={() => setShowAdvanced(v => !v)}
              className={`flex items-center gap-2 border rounded-full px-5 py-3 text-sm transition-all duration-200 backdrop-blur-sm
                ${showAdvanced || activeAdvancedCount > 0
                  ? "bg-purple-600/20 border-purple-500/40 text-purple-300"
                  : "bg-white/[0.05] border-white/10 text-white/55 hover:border-purple-500/30 hover:text-purple-300"}`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeAdvancedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeAdvancedCount}
                </span>
              )}
              <ChevronDown size={13} className={`transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`} />
            </button>

            {/* Clear filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 bg-white/[0.05] border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 rounded-full px-5 py-3 text-white/55 hover:text-red-400 text-sm transition-all duration-200"
              >
                <X size={14} /> Clear
              </button>
            )}
          </div>

          {/* ── ADVANCED FILTERS ── */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  {/* Suitable For */}
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Suitable For</p>
                    <div className="flex gap-2">
                      {["bachelor", "family"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSuitableFor(suitableFor === opt ? "" : opt)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-semibold capitalize transition-all duration-200
                            ${suitableFor === opt
                              ? "bg-purple-600/30 border-purple-500/50 text-purple-300"
                              : "bg-white/[0.04] border-white/10 text-white/50 hover:border-purple-500/30 hover:text-white/75"}`}
                        >
                          {opt === "bachelor" ? "🧑 Bachelor" : "👨‍👩‍👧 Family"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Furnishing */}
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Furnishing</p>
                    <select
                      value={furnishing}
                      onChange={(e) => setFurnishing(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-white/65 text-sm outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#1a1a2e]">Any</option>
                      <option value="furnished" className="bg-[#1a1a2e]">Furnished</option>
                      <option value="semi-furnished" className="bg-[#1a1a2e]">Semi-Furnished</option>
                      <option value="unfurnished" className="bg-[#1a1a2e]">Unfurnished</option>
                    </select>
                  </div>

                  {/* Min Bedrooms */}
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Min. Bedrooms</p>
                    <div className="flex gap-2">
                      {["1", "2", "3", "4"].map((n) => (
                        <button
                          key={n}
                          onClick={() => setMinBeds(minBeds === n ? "" : n)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all duration-200
                            ${minBeds === n
                              ? "bg-purple-600/30 border-purple-500/50 text-purple-300"
                              : "bg-white/[0.04] border-white/10 text-white/50 hover:border-purple-500/30 hover:text-white/75"}`}
                        >
                          {n}+
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Price Range (₹)</p>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2.5 text-white/65 text-sm outline-none placeholder-white/25 focus:border-purple-500/40 transition-colors"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2.5 text-white/65 text-sm outline-none placeholder-white/25 focus:border-purple-500/40 transition-colors"
                      />
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/30 text-xs">Active:</span>
              {search && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20">
                  "{search}" <button onClick={() => setSearch("")}><X size={10} /></button>
                </span>
              )}
              {category && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20 capitalize">
                  {category} <button onClick={() => setCategory("")}><X size={10} /></button>
                </span>
              )}
              {suitableFor && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20 capitalize">
                  {suitableFor === "bachelor" ? "🧑 Bachelor" : "👨‍👩‍👧 Family"} <button onClick={() => setSuitableFor("")}><X size={10} /></button>
                </span>
              )}
              {furnishing && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20 capitalize">
                  {furnishing} <button onClick={() => setFurnishing("")}><X size={10} /></button>
                </span>
              )}
              {minBeds && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20">
                  {minBeds}+ Beds <button onClick={() => setMinBeds("")}><X size={10} /></button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20">
                  ₹{minPrice || "0"} – ₹{maxPrice || "∞"} <button onClick={() => { setMinPrice(""); setMaxPrice(""); }}><X size={10} /></button>
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Result count */}
        {!loading && (
          <p className="mt-5 text-white/35 text-sm">
            {filtered.length}{" "}
            {filtered.length === 1 ? "property" : "properties"} found
          </p>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20">

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden animate-pulse"
              >
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

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-5xl mb-4">🏚️</div>
            <h3
              className="text-white text-xl font-semibold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No properties found
            </h3>
            <p className="text-white/40 text-sm mb-6">
              Try adjusting your filters or search term.
            </p>
            <button
              onClick={clearFilters}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Properties Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property, index) => (
              <motion.div
                key={property._id}
                className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/[0.04] hover:-translate-y-1 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => navigate(`/property/${property._id}`)}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={property.thumbnail || "/placeholder.jpg"}
                    alt={property.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Featured Badge */}
                  {property.isFeatured && (
                    <span className="absolute top-3 left-3 bg-yellow-400/90 text-black text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                      ⭐ Featured
                    </span>
                  )}

                  {property.propertyType && (
                    <span className="absolute top-3 right-3 bg-purple-600/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm capitalize">
                      {property.propertyType}
                    </span>
                  )}

                  {/* Suitable For badge */}
                  {property.suitableFor && (
                    <span className="absolute top-3 left-3 bg-black/50 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm capitalize mt-8">
                      {property.suitableFor === "bachelor" ? "🧑 Bachelor" : "👨‍👩‍👧 Family"}
                    </span>
                  )}

                  {/* Price on image bottom */}
                  <div className="absolute bottom-3 left-4">
                    <span
                      className="text-white font-bold text-lg"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ₹ {property.price?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <h2 className="text-base font-semibold text-white leading-snug line-clamp-1">
                    {property.title}
                  </h2>

                  <div className="flex items-center text-white/45 text-sm gap-1.5">
                    <MapPin size={13} className="shrink-0" />
                    <span className="truncate">{property.city}</span>
                  </div>

                  {/* Furnishing tag */}
                  {property.furnishing && (
                    <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/45 capitalize">
                      {property.furnishing}
                    </span>
                  )}

                  {/* Property Details */}
                  <div className="flex justify-between text-white/45 text-xs pt-3 border-t border-white/[0.07]">
                    <span className="flex items-center gap-1.5">
                      <BedDouble size={13} />
                      {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath size={13} />
                      {property.bathrooms} Baths
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Ruler size={13} />
                      {property.area} sqft
                    </span>
                  </div>

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/property/${property._id}`);
                    }}
                    className="w-full mt-1 bg-purple-600/15 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-600 text-purple-300 hover:text-white py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
};

export default Properties;
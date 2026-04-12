import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BedDouble, Bath, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const highlights = [
  {
    label: "Property Buying",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&fit=crop",
    beds: 4, baths: 3, location: "Patia, Bhubaneswar", price: "₹85L",
  },
  {
    label: "Rental",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80&fit=crop",
    beds: 2, baths: 2, location: "Saheed Nagar, Bhubaneswar", price: "₹18K/mo",
  },
  {
    label: "Legal Assistance",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=900&q=80&fit=crop",
    beds: null, baths: null, location: "All Areas", price: "Free Consult",
  },
  {
    label: "Interior Design",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&fit=crop",
    beds: null, baths: null, location: "Pan Bhubaneswar", price: "Custom Quote",
  },
  {
    label: "Renovation",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&fit=crop",
    beds: null, baths: null, location: "Pan Bhubaneswar", price: "Custom Quote",
  },
];

export default function ServicesHero() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(0);

  const active = highlights[hovered];

  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-900/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-purple-400 text-xs sm:text-sm font-medium tracking-widest uppercase">
                Full-Service Real Estate
              </span>
            </motion.div>

            <motion.h1
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Everything You
              <br />
              Need, Under
              <br />
              <span className="text-purple-500">One Roof.</span>
            </motion.h1>

            <motion.p
              className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From finding your first home to managing commercial portfolios —
              Kalinga Homes delivers end-to-end real estate services with
              transparency and expertise at every step.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={() => navigate("/Contacts")}
                className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-8 py-3.5 rounded-full font-semibold text-sm xs:text-base transition-all hover:scale-105 shadow-lg min-h-[44px] flex items-center gap-2"
              >
                Get Free Consultation
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/properties")}
                className="border border-purple-900/30 hover:border-purple-500/50 text-gray-400 hover:text-white px-8 py-3.5 rounded-full font-semibold text-sm xs:text-base transition-all min-h-[44px]"
              >
                Browse Properties
              </button>
            </motion.div>
          </div>

          {/* ── Right ── */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Preview image card */}
            <motion.div
              key={hovered}
              className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden mb-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={active.image}
                alt={active.label}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/30 to-transparent" />

              {/* Property info chips */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-white font-semibold text-base sm:text-lg leading-tight">
                    {active.label}
                  </span>
                  <div className="flex items-center gap-1 text-white/60 text-xs">
                    <MapPin size={11} />
                    <span>{active.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="bg-purple-600/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {active.price}
                  </span>
                  {active.beds && (
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <span className="flex items-center gap-1"><BedDouble size={11} />{active.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath size={11} />{active.baths} Baths</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Service tag rows */}
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                onMouseEnter={() => setHovered(i)}
                className={`border rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 hover:-translate-x-1 group cursor-pointer ${
                  hovered === i
                    ? "bg-purple-600/15 border-purple-500/50"
                    : "bg-[#252544] border-purple-900/30 hover:border-purple-500/50"
                }`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <span className="text-white font-semibold text-sm xs:text-base sm:text-lg">{h.label}</span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${
                  hovered === i
                    ? "bg-purple-600/40 border-purple-500/50"
                    : "bg-purple-600/20 border-purple-900/30 group-hover:bg-purple-600/40"
                }`}>
                  <ArrowRight size={14} className="text-purple-400" />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
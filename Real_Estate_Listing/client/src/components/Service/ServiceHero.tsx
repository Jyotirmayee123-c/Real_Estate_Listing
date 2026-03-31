import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const highlights = ["Property Buying", "Rental", "Legal Assistance", "Interior Design", "Renovation"];

export default function ServicesHero() {
  const navigate = useNavigate();

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
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

          {/* Right — service tags */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                className="bg-[#252544] border border-purple-900/30 hover:border-purple-500/50 rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 hover:-translate-x-1 group"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <span className="text-white font-semibold text-sm xs:text-base sm:text-lg">{h}</span>
                <div className="w-8 h-8 rounded-full bg-purple-600/20 group-hover:bg-purple-600/40 border border-purple-900/30 flex items-center justify-center transition-colors">
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
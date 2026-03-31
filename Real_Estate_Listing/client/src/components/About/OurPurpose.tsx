"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Zap } from "lucide-react";

const pillars = [
  {
    icon: <Target className="text-purple-400" size={26} />,
    tag: "01 · Mission",
    title: "Simplify Every Transaction",
    body: "We strip away the complexity from property buying and renting. No jargon, no hidden fees, no stress — just straightforward guidance from your first inquiry to your final handshake.",
  },
  {
    icon: <Eye className="text-purple-400" size={26} />,
    tag: "02 · Vision",
    title: "Odisha's Most Trusted Brand",
    body: "To become the go-to real estate platform across Odisha — not because we're the biggest, but because we're the most honest, responsive, and genuinely helpful partner families can find.",
  },
  {
    icon: <Zap className="text-purple-400" size={26} />,
    tag: "03 · Approach",
    title: "Technology Meets Human Touch",
    body: "We pair smart digital tools with real human relationships. Our team knows your name, your budget, and your dream — and we use every resource available to make it happen.",
  },
];

export default function OurPurpose() {
  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Our <span className="text-purple-500">Purpose</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Three pillars that define why Kalinga Homes exists and how we operate every day
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 relative">
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-purple-600/30 via-purple-500/60 to-purple-600/30" />

          {pillars.map((p, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="hidden md:flex absolute -top-[2px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-purple-600 border-4 border-[#1a1a2e] z-10" />

              <div className="mt-0 md:mt-14 bg-[#252544] rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-900/30 hover:border-purple-500/50 p-6 xs:p-7 sm:p-8">
                <div className="bg-purple-600/20 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-purple-600/30 transition-colors">
                  {p.icon}
                </div>
                <p className="text-purple-500 text-xs font-bold tracking-widest uppercase mb-2">{p.tag}</p>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-gray-400 text-xs xs:text-sm sm:text-base leading-relaxed">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ReadyToFindDreamHome() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-[#1a1a2e]">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
          Ready to Find Your Dream Home?
        </h2>
        <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
          Let our experienced team guide you through your property journey
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-6 xs:px-8 sm:px-10 md:px-12 py-3 xs:py-3.5 sm:py-4 rounded-full text-sm xs:text-base sm:text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 min-h-[44px]">
          Contact Us Today
        </button>
      </motion.div>
    </section>
  );
}
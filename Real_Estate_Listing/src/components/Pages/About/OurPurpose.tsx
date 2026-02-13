"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export default function OurPurpose() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#1a1a2e] to-[#252544]">
      <div className="max-w-6xl mx-auto">
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
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* Mission */}
          <motion.div
            className="bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 md:p-10 lg:p-12 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-purple-600/20 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6">
              <Target className="text-purple-400" size={32} />
            </div>
            <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Our Mission
            </h3>
            <p className="text-gray-300 text-sm xs:text-base sm:text-lg leading-relaxed">
              To provide transparent, reliable, and customer-centric real
              estate services that help individuals and families find their
              perfect home. We strive to make property transactions seamless,
              trustworthy, and hassle-free while maintaining the highest
              standards of integrity and professionalism.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 md:p-10 lg:p-12 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-purple-600/20 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6">
              <Eye className="text-purple-400" size={32} />
            </div>
            <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Our Vision
            </h3>
            <p className="text-gray-300 text-sm xs:text-base sm:text-lg leading-relaxed">
              To become Bhubaneswar most trusted and preferred real estate
              brand, known for innovation, transparency, and customer
              satisfaction. We envision a future where every property
              transaction is built on trust, backed by technology, and driven
              by our commitment to excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
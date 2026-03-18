import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "1000+", label: "Happy Clients" },
  { value: "500+", label: "Properties Sold" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Customer Support" },
];

export default function OurAchievement() {
  return (
    <section className="py-16 sm:py-20 bg-[#0d0d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          className="mb-10 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium tracking-widest uppercase text-purple-400 mb-2">Our Achievements</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Numbers That Speak
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-md">
            Backed by trust, driven by results.
          </p>
        </motion.div>

        {/* Stats Container */}
        <motion.div
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl sm:rounded-2xl p-6 sm:p-7 text-center transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/[0.08] hover:-translate-y-1 cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-300 mb-2 leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-white/45 text-xs sm:text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
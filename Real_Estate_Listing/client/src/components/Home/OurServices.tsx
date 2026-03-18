import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    icon: "🏠",
    label: "Buy",
    description: "Find your dream home with our expert guidance and verified property listings across Bhubaneswar.",
  },
  {
    id: 2,
    icon: "🔑",
    label: "Rent",
    description: "Premium rental properties with flexible terms, fully vetted and ready to move in.",
  },
  {
    id: 3,
    icon: "📈",
    label: "Sell",
    description: "Get the best market price for your property with our expert negotiators and wide buyer network.",
  },
];

export default function OurServices() {
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
          <p className="text-xs font-medium tracking-widest uppercase text-purple-400 mb-2">Our Services</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            What We Offer
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-md">
            End-to-end property solutions tailored to your needs in Bhubaneswar.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {services.map((item, index) => (
            <motion.div
              key={item.id}
              className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 sm:p-9 cursor-pointer transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/5 hover:-translate-y-1 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-purple-600/15 flex items-center justify-center text-2xl mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.label}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
                <span className="text-purple-400 text-xl inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
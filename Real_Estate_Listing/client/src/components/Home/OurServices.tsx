import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    icon: "🏠",
    label: "Buy",
    description: "Find your dream home with our expert guidance and verified property listings across Bhubaneswar.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop",
    tag: "500+ Properties",
  },
  {
    id: 2,
    icon: "🔑",
    label: "Rent",
    description: "Premium rental properties with flexible terms, fully vetted and ready to move in.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fit=crop",
    tag: "200+ Rentals",
  },
  {
    id: 3,
    icon: "📈",
    label: "Sell",
    description: "Get the best market price for your property with our expert negotiators and wide buyer network.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop",
    tag: "Best Market Price",
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
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
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
              className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 hover:-translate-y-1 relative overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* ── Image section ── */}
              <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-t-2xl flex-shrink-0">
                <img
                  src={item.image}
                  alt={`${item.label} property`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient fade into card body */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a]/80 via-[#0d0d1a]/20 to-transparent" />

                {/* Tag badge */}
                <div className="absolute bottom-3 left-4">
                  <span className="bg-purple-600/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

                {/* Icon badge */}
                <div className="absolute top-3 right-3">
                  <div className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* ── Card body ── */}
              <div className="relative z-10 p-6 sm:p-7 flex flex-col flex-1">
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-b-2xl pointer-events-none" />

                <h3
                  className="text-xl font-semibold text-white mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.label}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">
                  {item.description}
                </p>
                <span className="text-purple-400 text-xl inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Award, Handshake, Cpu, Heart, Star } from "lucide-react";

const values = [
  {
    icon: <Shield className="text-purple-400" size={28} />,
    title: "Radical Transparency",
    body: "Every price, every clause, every detail — shared upfront. We believe informed clients make happy clients. No fine print, no surprises.",
  },
  {
    icon: <Award className="text-purple-400" size={28} />,
    title: "Uncompromising Excellence",
    body: "From the first phone call to the final paperwork, we operate at the highest standard. Mediocrity has no place in helping someone find their home.",
  },
  {
    icon: <Handshake className="text-purple-400" size={28} />,
    title: "Long-Term Relationships",
    body: "Our clients come back for their second home, refer their siblings, and call us years later. That's the metric we actually care about.",
  },
  {
    icon: <Cpu className="text-purple-400" size={28} />,
    title: "Smart Technology",
    body: "AI-powered property matching, digital documentation, and virtual tours — we've modernized every step without losing the human connection.",
  },
  {
    icon: <Heart className="text-purple-400" size={28} />,
    title: "Client-First Always",
    body: "We've turned down commissions to steer clients toward better-fit properties. The right home for you will always beat the right sale for us.",
  },
  {
    icon: <Star className="text-purple-400" size={28} />,
    title: "Local Expertise",
    body: "We know every neighbourhood in Bhubaneswar — the flood-prone zones, the upcoming corridors, the hidden gems. That knowledge is your advantage.",
  },
];

export default function ValuesSection() {
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
            Our <span className="text-purple-500">Core Values</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            These aren&apos;t aspirational posters on a wall — they&apos;re the rules our team lives by every single day
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="group relative bg-[#252544] rounded-xl sm:rounded-2xl p-6 xs:p-7 sm:p-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-600/0 group-hover:bg-purple-600/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

              <div className="bg-purple-600/20 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-purple-600/30 transition-colors">
                {v.icon}
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{v.title}</h3>
              <p className="text-gray-400 text-xs xs:text-sm sm:text-base leading-relaxed">{v.body}</p>

              <span className="absolute top-5 right-5 text-5xl font-bold text-purple-500/5 select-none leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
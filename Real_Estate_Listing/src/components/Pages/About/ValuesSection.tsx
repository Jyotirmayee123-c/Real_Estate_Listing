"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Award, Target, Eye, Heart, Shield } from "lucide-react";

const coreValues = [
  {
    title: "Transparency",
    description:
      "We believe in complete honesty and clarity in all our dealings, ensuring you have all the information you need.",
    icon: <Shield className="text-purple-400" size={28} />,
  },
  {
    title: "Excellence",
    description:
      "We strive for excellence in every service we provide, from property selection to final handover.",
    icon: <Award className="text-purple-400" size={28} />,
  },
  {
    title: "Trust",
    description:
      "Building long-term relationships based on trust and reliability is at the heart of everything we do.",
    icon: <Target className="text-purple-400" size={28} />,
  },
  {
    title: "Innovation",
    description:
      "We leverage the latest technology and innovative approaches to make property transactions seamless.",
    icon: <Eye className="text-purple-400" size={28} />,
  },
  {
    title: "Customer First",
    description:
      "Your satisfaction and happiness are our top priorities. We go above and beyond to meet your needs.",
    icon: <Heart className="text-purple-400" size={28} />,
  },
  {
    title: "Integrity",
    description:
      "We maintain the highest standards of professional integrity and ethical business practices.",
    icon: <Users className="text-purple-400" size={28} />,
  },
];

export default function OurCoreValues() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a]">
      <div className="max-w-6xl mx-auto">
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
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              className="bg-[#252544] rounded-xl sm:rounded-2xl p-6 xs:p-7 sm:p-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <div className="bg-purple-600/20 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                {value.icon}
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                {value.title}
              </h3>
              <p className="text-gray-400 text-sm xs:text-base leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
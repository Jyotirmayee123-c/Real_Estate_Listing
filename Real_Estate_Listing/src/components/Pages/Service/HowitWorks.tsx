"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, FileCheck, Home as HomeIcon, CheckCircle } from "lucide-react";

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery & Consultation",
    description:
      "Share your requirements with us. We'll understand your needs, budget, and preferences to find the perfect match.",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Property Selection",
    description:
      "Browse our curated listings and schedule site visits. We'll provide detailed information and answer all your questions.",
  },
  {
    icon: HomeIcon,
    step: "03",
    title: "Documentation & Legal",
    description:
      "Our legal team handles all paperwork, verification, and documentation to ensure a smooth transaction.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Final Handover",
    description:
      "Complete the deal with confidence. We'll be with you from signing to receiving your keys.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#1a1a2e] to-[#252544]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            How It <span className="text-purple-500">Works</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Our simple 4-step process to make your property journey hassle-free
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                {/* Connecting Line - Desktop only */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-purple-600 to-purple-900/30 z-0" />
                )}

                <div className="relative bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 bg-purple-600 text-white w-12 h-12 xs:w-14 xs:h-14 rounded-full flex items-center justify-center font-bold text-lg xs:text-xl shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="bg-purple-600/20 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6">
                    <Icon className="text-purple-400" size={32} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm xs:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
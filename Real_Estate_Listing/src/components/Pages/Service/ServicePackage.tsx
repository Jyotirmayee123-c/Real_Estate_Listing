"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Basic Package",
    description: "Perfect for first-time buyers",
    price: "Free Consultation",
    features: [
      "Property search assistance",
      "Site visit coordination",
      "Basic legal verification",
      "Price negotiation support",
      "Documentation guidance",
    ],
    highlighted: false,
  },
  {
    name: "Premium Package",
    description: "Complete real estate solution",
    price: "Best Value",
    features: [
      "Everything in Basic Package",
      "Dedicated property consultant",
      "Complete legal assistance",
      "Home loan facilitation",
      "Interior design consultation",
      "Post-sale support (6 months)",
      "Priority customer service",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise Package",
    description: "For investors & businesses",
    price: "Custom Pricing",
    features: [
      "Everything in Premium Package",
      "Portfolio management",
      "Investment advisory",
      "Commercial property expertise",
      "Tax planning assistance",
      "Lifetime support",
      "Exclusive property access",
    ],
    highlighted: false,
  },
];

export default function ServicePackages() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#252544] to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Service <span className="text-purple-500">Packages</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Choose the package that best fits your needs
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`relative bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 border ${
                pkg.highlighted
                  ? "border-purple-500 shadow-2xl shadow-purple-500/20 scale-105 md:scale-110"
                  : "border-purple-900/30"
              } hover:border-purple-500/50 transition-all duration-300`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              {/* Popular Badge */}
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs xs:text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
                  {pkg.name}
                </h3>
                <p className="text-gray-400 text-sm xs:text-base mb-4 sm:mb-6">
                  {pkg.description}
                </p>
                <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-purple-400">
                  {pkg.price}
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Check
                      className="text-purple-400 flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-sm xs:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 xs:py-3.5 sm:py-4 rounded-lg font-semibold transition-all text-sm xs:text-base min-h-[44px] ${
                  pkg.highlighted
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-600/50"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-8 sm:mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm xs:text-base">
            Need a custom package?{" "}
            <a
              href="/contact"
              className="text-purple-400 hover:text-purple-300 underline font-medium"
            >
              Contact us
            </a>{" "}
            for personalized solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
}
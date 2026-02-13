"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Award, Users, Clock, TrendingUp, Heart } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "100% Verified Properties",
    description:
      "Every property is thoroughly inspected and verified for authenticity and legal compliance.",
  },
  {
    icon: Award,
    title: "Expert Team",
    description:
      "Experienced professionals with deep knowledge of Bhubaneswar's real estate market.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description:
      "Your satisfaction is our priority. We provide personalized service at every step.",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description:
      "Efficient processes that save your time without compromising on quality or thoroughness.",
  },
  {
    icon: TrendingUp,
    title: "Best Market Rates",
    description:
      "Competitive pricing and best deals in the market. We negotiate for your benefit.",
  },
  {
    icon: Heart,
    title: "Post-Sale Support",
    description:
      "Our relationship doesn't end at the sale. We provide ongoing support and assistance.",
  },
];

export default function WhyChooseOurServices() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Why Choose <span className="text-purple-500">Our Services</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            We go above and beyond to ensure your complete satisfaction
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
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
                  <Icon className="text-purple-400" size={28} />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm xs:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
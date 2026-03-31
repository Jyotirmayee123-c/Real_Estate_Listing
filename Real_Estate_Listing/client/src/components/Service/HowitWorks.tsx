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
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Simple Process
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            How It <span className="text-purple-500">Works</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Our simple 4-step process to make your property journey hassle-free
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-purple-600/20 via-purple-500/50 to-purple-600/20" />

          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Step dot on line */}
                <div className="hidden lg:flex absolute -top-[2px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-purple-600 border-4 border-[#1a1a2e] z-10" />

                <div className="mt-0 lg:mt-10 bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden">
                  {/* Step badge */}
                  <div className="absolute -top-3 -right-3 bg-purple-600 text-white w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center justify-center font-bold text-sm xs:text-base shadow-lg">
                    {step.step}
                  </div>
                  {/* Hover glow */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-600/0 group-hover:bg-purple-600/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                  <div className="bg-purple-600/20 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-5 group-hover:bg-purple-600/30 transition-colors">
                    <Icon className="text-purple-400" size={26} />
                  </div>
                  <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-xs xs:text-sm sm:text-base leading-relaxed">
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
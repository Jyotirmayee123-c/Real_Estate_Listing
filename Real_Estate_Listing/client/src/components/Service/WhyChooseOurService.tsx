import React from "react";
import { motion } from "framer-motion";
import { Shield, Award, Users, Clock, TrendingUp, Heart } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "100% Verified Properties",
    description:
      "Every property is thoroughly inspected and verified for authenticity and legal compliance before listing.",
  },
  {
    icon: Award,
    title: "Expert Team",
    description:
      "Experienced professionals with deep knowledge of Bhubaneswar's real estate market and growth corridors.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description:
      "Your satisfaction is our priority. We provide personalized service and honest advice at every step.",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description:
      "Efficient processes that save your time without compromising on quality or thoroughness of service.",
  },
  {
    icon: TrendingUp,
    title: "Best Market Rates",
    description:
      "Competitive pricing and the best deals in the market. We negotiate hard on your behalf, always.",
  },
  {
    icon: Heart,
    title: "Post-Sale Support",
    description:
      "Our relationship doesn't end at the sale. We provide ongoing support, guidance, and assistance.",
  },
];

export default function WhyChooseOurServices() {
  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-72 h-72 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-purple-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Why Us
            </p>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Why Choose{" "}
              <span className="text-purple-500">Our Services</span>
            </h2>
            <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600" />
          </motion.div>
          <motion.p
            className="text-gray-400 text-sm xs:text-base max-w-sm md:text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Six reasons why thousands of families in Odisha trust Kalinga Homes with their most important decisions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-[#252544] rounded-xl sm:rounded-2xl p-6 xs:p-7 sm:p-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Ghost index */}
                <span className="absolute top-4 right-5 text-5xl font-bold text-purple-500/5 select-none leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* Hover glow */}
                <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-600/0 group-hover:bg-purple-600/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                <div className="bg-purple-600/20 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-purple-600/30 transition-colors">
                  <Icon className="text-purple-400" size={26} />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-xs xs:text-sm sm:text-base leading-relaxed">
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
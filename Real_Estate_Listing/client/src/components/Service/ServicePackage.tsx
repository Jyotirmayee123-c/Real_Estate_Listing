import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Star, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const packages = [
  {
    icon: <Zap size={22} className="text-purple-400" />,
    name: "Basic",
    tagline: "Perfect for first-time buyers",
    price: "Free",
    priceNote: "No hidden charges",
    highlighted: false,
    route: "/contact",
    features: [
      "Property search assistance",
      "Site visit coordination",
      "Basic legal verification",
      "Price negotiation support",
      "Documentation guidance",
    ],
  },
  {
    icon: <Star size={22} className="text-white" />,
    name: "Premium",
    tagline: "The complete real estate solution",
    price: "Best Value",
    priceNote: "Most chosen by families",
    highlighted: true,
    route: "/premium-checkout",
    features: [
      "Everything in Basic",
      "Dedicated property consultant",
      "Complete legal assistance",
      "Home loan facilitation",
      "Interior design consultation",
      "Post-sale support (6 months)",
      "Priority customer service",
    ],
  },
  {
    icon: <Building2 size={22} className="text-purple-400" />,
    name: "Enterprise",
    tagline: "For investors & businesses",
    price: "Custom",
    priceNote: "Tailored to your portfolio",
    highlighted: false,
    route: "/contact",
    features: [
      "Everything in Premium",
      "Portfolio management",
      "Investment advisory",
      "Commercial property expertise",
      "Tax planning assistance",
      "Lifetime support",
      "Exclusive property access",
    ],
  },
];

export default function ServicePackages() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />
      <div className="absolute -left-40 top-1/4 w-80 h-80 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-40 bottom-1/4 w-80 h-80 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Choose Your <span className="text-purple-500">Package</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg max-w-2xl mx-auto px-2">
            Transparent pricing with no surprises. Pick the plan that fits your needs and upgrade anytime.
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              className={`relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 cursor-default
                ${pkg.highlighted
                  ? "border-2 border-purple-500 shadow-2xl shadow-purple-500/20"
                  : "border border-purple-900/30 hover:border-purple-500/50"
                }
                ${hovered === i && !pkg.highlighted ? "shadow-xl" : ""}
              `}
              style={{ background: "#252544" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {pkg.highlighted && (
                <div className="bg-purple-600 text-white text-xs font-bold tracking-widest uppercase text-center py-2 px-4">
                  ⭐ Most Popular
                </div>
              )}

              <div className={`p-6 xs:p-7 sm:p-8 ${pkg.highlighted ? "bg-purple-600/10" : ""}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4
                  ${pkg.highlighted ? "bg-purple-600" : "bg-purple-600/20 border border-purple-900/30"}`}>
                  {pkg.icon}
                </div>
                <h3 className="text-xl xs:text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-gray-400 text-xs xs:text-sm mb-5">{pkg.tagline}</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className={`text-3xl xs:text-4xl font-black ${pkg.highlighted ? "text-purple-500" : "text-purple-400"}`}>
                    {pkg.price}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">{pkg.priceNote}</p>
              </div>

              <div className="mx-6 xs:mx-7 sm:mx-8 h-px bg-purple-900/30" />

              <div className="p-6 xs:p-7 sm:p-8 flex-1 flex flex-col">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">
                  What's included
                </p>
                <ul className="space-y-3 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300 text-xs xs:text-sm sm:text-base">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                        ${pkg.highlighted ? "bg-purple-600" : "bg-purple-600/20 border border-purple-900/30"}`}>
                        <Check size={10} className={pkg.highlighted ? "text-white" : "text-purple-400"} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate(pkg.route)}
                  className={`mt-8 w-full py-3 xs:py-3.5 sm:py-4 rounded-xl font-semibold text-sm xs:text-base transition-all min-h-[44px] hover:scale-105
                    ${pkg.highlighted
                      ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/40"
                      : "bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-600/30 hover:border-purple-500/50"
                    }`}
                >
                  {pkg.highlighted ? "Get Premium →" : "Get Started →"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 sm:mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm xs:text-base">
            Not sure which plan fits you?{" "}
            <button
              onClick={() => navigate("/contact")}
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4 font-semibold transition-colors"
            >
              Talk to our team
            </button>{" "}
            — we'll help you decide.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
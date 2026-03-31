import React from "react";
import { motion } from "framer-motion";
import { Home, TrendingUp, Key, Paintbrush, Wrench, FileText } from "lucide-react";

const mainServices = [
  {
    icon: Home,
    title: "Property Buying",
    description:
      "Find your dream home from our extensive collection of verified properties. Expert guidance from selection to final handover.",
    features: [
      "Verified property listings",
      "Personalized property tours",
      "Price negotiation support",
      "Legal documentation assistance",
    ],
  },
  {
    icon: Key,
    title: "Property Rental",
    description:
      "Premium rental properties with flexible terms. We match you with the perfect rental home that fits your lifestyle.",
    features: [
      "Wide range of rental options",
      "Flexible lease agreements",
      "Tenant verification",
      "Maintenance support",
    ],
  },
  {
    icon: TrendingUp,
    title: "Property Selling",
    description:
      "Get the best value for your property with our expert marketing and negotiation services.",
    features: [
      "Free property valuation",
      "Professional photography",
      "Targeted marketing",
      "Quick buyer matching",
    ],
  },
  {
    icon: Wrench,
    title: "Renovation Services",
    description:
      "Transform your space with our comprehensive renovation and remodeling services.",
    features: [
      "Expert contractors",
      "Quality materials",
      "Project management",
      "Timely completion",
    ],
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description:
      "Custom interior designs that reflect your style and maximize functionality.",
    features: [
      "3D visualization",
      "Space planning",
      "Furniture selection",
      "Complete execution",
    ],
  },
  {
    icon: FileText,
    title: "Legal Assistance",
    description:
      "Complete legal support for all property transactions ensuring smooth and secure deals.",
    features: [
      "Document verification",
      "Title clearance",
      "Registration support",
      "Legal compliance",
    ],
  },
];

export default function MainServicesGrid() {
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
            What We Offer
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Our <span className="text-purple-500">Services</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Comprehensive real estate services designed to make your property journey seamless
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Ghost number */}
                <span className="absolute top-4 right-5 text-6xl font-bold text-purple-500/5 select-none leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* Hover glow */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600/0 group-hover:bg-purple-600/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                <div className="bg-purple-600/20 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-purple-600/30 transition-colors">
                  <Icon className="text-purple-400" size={28} />
                </div>

                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-xs xs:text-sm sm:text-base leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2 sm:space-y-3 border-t border-purple-900/30 pt-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300 text-xs xs:text-sm sm:text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
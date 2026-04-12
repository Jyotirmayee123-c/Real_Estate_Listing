import React from 'react';
import { Shield, Award, Users, TrendingUp, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: "Verified Properties",
    description: "Every property is thoroughly verified and inspected to ensure authenticity and quality.",
  },
  {
    icon: Award,
    title: "Trusted Platform",
    description: "Trusted by thousands of clients since 2024 for transparent and reliable service.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Our experienced team provides personalized assistance throughout your property journey.",
  },
  {
    icon: TrendingUp,
    title: "Best Market Rates",
    description: "Competitive pricing and best deals in the Bhubaneswar real estate market.",
  },
  {
    icon: Clock,
    title: "Quick Process",
    description: "Streamlined procedures ensure fast and hassle-free property transactions.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Handpicked properties in the most sought-after areas of Bhubaneswar.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0d0d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium tracking-widest uppercase text-purple-400 mb-2">Why Us</p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Choose{" "}
            <span className="text-purple-400">Kalinga Homes</span>?
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-md">
            Your trusted partner in finding the perfect property with transparency, reliability, and excellence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/[0.05] hover:-translate-y-1"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Icon box — fixed size, no flex stretch */}
                <div
                  className="transition-colors duration-300 group-hover:bg-purple-600/20 mb-5"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: "rgba(147, 51, 234, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} strokeWidth={1.8} className="text-purple-400" />
                </div>

                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
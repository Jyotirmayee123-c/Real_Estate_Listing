"use client";

import React from 'react';
import { Shield, Award, Users, TrendingUp, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUsDark() {
  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description: "Every property is thoroughly verified and inspected to ensure authenticity and quality."
    },
    {
      icon: Award,
      title: "Trusted Platform",
      description: "Trusted by thousands of clients since 2024 for transparent and reliable service."
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Our experienced team provides personalized assistance throughout your property journey."
    },
    {
      icon: TrendingUp,
      title: "Best Market Rates",
      description: "Competitive pricing and best deals in the Bhubaneswar real estate market."
    },
    {
      icon: Clock,
      title: "Quick Process",
      description: "Streamlined procedures ensure fast and hassle-free property transactions."
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Handpicked properties in the most sought-after areas of Bhubaneswar."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Why Choose <span className="text-purple-500">Kalinga Homes</span>?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            Your trusted partner in finding the perfect property with transparency, reliability, and excellence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                className="bg-[#252544] rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-900/30 hover:border-purple-500/50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
              >
                <div className="bg-purple-600/20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                  <Icon className="text-purple-400" size={28} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Bar */}
        {/* <motion.div 
          className="mt-12 sm:mt-14 md:mt-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-1 sm:space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold">1000+</div>
              <div className="text-purple-200 text-xs sm:text-sm md:text-base">Happy Clients</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold">500+</div>
              <div className="text-purple-200 text-xs sm:text-sm md:text-base">Properties</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold">100%</div>
              <div className="text-purple-200 text-xs sm:text-sm md:text-base">Verified</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold">24/7</div>
              <div className="text-purple-200 text-xs sm:text-sm md:text-base">Support</div>
            </div>
          </div>
        </motion.div> */}

        {/* CTA Section */}
        {/* <motion.div 
          className="mt-12 sm:mt-14 md:mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-5 md:mb-6 px-4">
            Ready to Find Your Dream Home?
          </h3>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition shadow-lg hover:shadow-xl transform hover:scale-105">
            Get Started Today
          </button>
        </motion.div> */}
      </div>
    </section>
  );
}
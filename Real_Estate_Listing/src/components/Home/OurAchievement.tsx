"use client";

import React from 'react'
import { motion } from 'framer-motion'

function OurAchievement() {
  return (
    <div className="py-12 sm:py-16 bg-[#1a1a2e]">
      
      {/* Stats Section with improved layout */}
      <div className="px-4 sm:px-6 lg:px-8 ">
        <motion.div 
          className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-r bg-[#1a1a2e] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Our Achievements</h2>
              <p className="text-purple-200 text-sm sm:text-base">Trusted by thousands of happy customers</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
              {[
                { value: "1000+", label: "Happy Clients", color: "from-purple-400 to-pink-400" },
                { value: "500+", label: "Properties Sold", color: "from-purple-500 to-purple-400" },
                { value: "100%", label: "Satisfaction", color: "from-purple-600 to-purple-500" },
                { value: "24/7", label: "Support", color: "from-purple-700 to-purple-600" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 border border-purple-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    borderColor: "rgba(168, 85, 247, 0.5)",
                    boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)"
                  }}
                >
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-purple-200 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-10 sm:mt-12 md:mt-16 text-center "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Ready to Find Your Dream Home?
          </h3>
          <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Join our community of satisfied clients and discover the perfect property for your needs
          </p>
           */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button 
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Started Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </motion.button>
            
            <motion.button 
              className="bg-transparent border-2 border-purple-500 hover:border-purple-400 text-purple-300 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:bg-purple-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Tour
            </motion.button>
          </div>
           */}
          {/* Trust indicators */}
          {/* <motion.div 
            className="mt-8 sm:mt-10 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Verified Properties</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>24/7 Support</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>No Hidden Fees</span>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden lg:block absolute right-10 top-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="hidden lg:block absolute left-10 bottom-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
    </div>
  )
}

export default OurAchievement
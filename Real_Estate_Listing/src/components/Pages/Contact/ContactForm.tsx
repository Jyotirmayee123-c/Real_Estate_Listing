"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    lookingTo: "",
    propertyType: "",
    bestTime: "",
    contactMethod: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#1a1a2e] to-[#252544]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Send Us a <span className="text-purple-500">Message</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg max-w-2xl mx-auto px-2">
            Fill out the form below and we will get back to you as soon as possible
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <motion.div
          className="bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-purple-900/30"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-gray-300 text-sm xs:text-base font-medium mb-2">
                  Full Name <span className="text-purple-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 xs:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-900/30 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm xs:text-base font-medium mb-2">
                  Email <span className="text-purple-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 xs:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-900/30 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base"
                  required
                />
              </div>
            </div>

            {/* Row 2: Phone & WhatsApp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-gray-300 text-sm xs:text-base font-medium mb-2">
                  Phone <span className="text-purple-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 xs:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-900/30 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm xs:text-base font-medium mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Enter your WhatsApp number"
                  className="w-full px-4 py-3 xs:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-900/30 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base"
                />
              </div>
            </div>

            {/* Row 3: Looking To & Property Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-gray-300 text-sm xs:text-base font-medium mb-2">
                  Looking To <span className="text-purple-500">*</span>
                </label>
                <select
                  name="lookingTo"
                  value={formData.lookingTo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 xs:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-900/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base cursor-pointer"
                  required
                >
                  <option value="">Select option</option>
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm xs:text-base font-medium mb-2">
                  Property Type <span className="text-purple-500">*</span>
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 xs:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-900/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base cursor-pointer"
                  required
                >
                  <option value="">Select property type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            {/* Row 4: Best Time to Contact & Preferred Contact Method */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-gray-300 text-sm xs:text-base font-medium mb-2">
                  Best Time to Contact
                </label>
                <select
                  name="bestTime"
                  value={formData.bestTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 xs:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-900/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base cursor-pointer"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="evening">Evening (4:00 PM - 7:30 PM)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm xs:text-base font-medium mb-2">
                  Preferred Contact Method
                </label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-3 xs:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-900/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base cursor-pointer"
                >
                  <option value="">Select method</option>
                  <option value="phone">Phone Call</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300 text-sm xs:text-base font-medium mb-2">
                Message
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us more about your requirements..."
                rows={5}
                className="w-full px-4 py-3 xs:py-3.5 rounded-lg bg-[#1a1a2e] border border-purple-900/30 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition resize-none text-sm xs:text-base"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-3 xs:py-3.5 sm:py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-sm xs:text-base sm:text-lg min-h-[44px]"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
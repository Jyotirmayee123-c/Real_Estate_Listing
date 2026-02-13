"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ContactMap() {
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
            Visit Our <span className="text-purple-500">Office</span>
          </h2>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto"></div>
        </motion.div>

        <motion.div
          className="bg-[#252544] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-purple-900/30"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-64 xs:h-80 sm:h-96 md:h-[500px] lg:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d59874.39288960411!2d85.73122959861149!3d20.29407584386421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgiet%20ghangapatna!5e0!3m2!1sen!2sin!4v1770494812605!5m2!1sen!2sinno-referrer-when-downgrade"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kalinga Homes Office Location"
              className="grayscale-[30%] contrast-110"
            ></iframe>
          </div>
          
          {/* Address Info Overlay */}
          <div className="p-6 xs:p-7 sm:p-8 bg-gradient-to-t from-[#252544] to-transparent">
            <div className="max-w-2xl">
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                Kalinga Homes Office
              </h3>
              <p className="text-gray-300 text-sm xs:text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                Azure Villa, Villa No-20, Ground Floor,<br />
                Kalinga Nagar, Bhubaneswar - 751030
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 xs:px-6 py-2.5 xs:py-3 rounded-lg transition-all font-medium text-sm xs:text-base hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
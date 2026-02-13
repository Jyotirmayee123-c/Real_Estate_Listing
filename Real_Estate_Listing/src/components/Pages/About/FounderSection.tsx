"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MeetOurFounder() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-[#1a1a2e]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Meet Our <span className="text-purple-500">Founder</span>
          </h2>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto"></div>
        </motion.div>

        <motion.div
          className="bg-[#252544] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Founder Image */}
            <div className="relative h-64 xs:h-72 sm:h-80 md:h-auto md:min-h-[400px] lg:min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent"></div>
              <Image
                src="/Images/Assets/tatu.jpeg"
                alt="Founder"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Founder Info */}
            <div className="p-6 xs:p-7 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
                Suryakanta Das
              </h3>
              <p className="text-purple-400 text-base xs:text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6">
                Founder & CEO
              </p>
              <p className="text-gray-300 text-sm xs:text-base sm:text-lg leading-relaxed mb-4 sm:mb-5">
                With over 15 years of experience in real estate, John founded
                Kalinga Homes with a vision to revolutionize the property market
                in Bhubaneswar. His commitment to transparency and customer
                satisfaction has made Kalinga Homes a trusted name in the
                industry.
              </p>
              <p className="text-gray-400 text-sm xs:text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 italic border-l-4 border-purple-600 pl-4 sm:pl-6">
                Our mission is simple - to help every family find their dream
                home with complete trust and transparency. We dont just sell
                properties; we build relationships and create lifetime memories.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="bg-purple-600/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                  <span className="text-purple-400 font-semibold text-sm xs:text-base">
                    15+ Years Experience
                  </span>
                </div>
                <div className="bg-purple-600/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                  <span className="text-purple-400 font-semibold text-sm xs:text-base">
                    1000+ Happy Clients
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

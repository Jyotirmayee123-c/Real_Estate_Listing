"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+91 9348185822",
    link: "tel:+919348185822",
  },
  {
    icon: Mail,
    title: "Email",
    content: "kalingahomes@gmail.com",
    link: "mailto:kalingahomes@gmail.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Monday - Sunday: 9:30 AM – 7:30 PM",
    link: null,
  },
  {
    icon: MapPin,
    title: "Address",
    content: "Azure Villa, Villa No-20, Ground Floor, Kalinga Nagar, Bhubaneswar - 751030",
    link: "https://maps.google.com",
  },
];

export default function ContactInfo() {
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
            Contact <span className="text-purple-500">Information</span>
          </h2>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const content = info.link ? (
              <a
                href={info.link}
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                {info.content}
              </a>
            ) : (
              <p className="text-gray-300">{info.content}</p>
            );

            return (
              <motion.div
                key={index}
                className="bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 text-center border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <div className="bg-purple-600/20 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Icon className="text-purple-400" size={28} />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  {info.title}
                </h3>
                <div className="text-sm xs:text-base sm:text-lg leading-relaxed">
                  {content}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
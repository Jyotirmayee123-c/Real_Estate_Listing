import React from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Phone, Clock, Navigation } from "lucide-react";

export default function ContactMap() {
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
          <p className="text-purple-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">Find Us</p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Visit Our <span className="text-purple-500">Office</span>
          </h2>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Info sidebar */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Address */}
            <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-900/30 flex items-center justify-center text-purple-400 mb-4">
                <MapPin size={18} />
              </div>
              <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">Office Address</p>
              <p className="text-white font-bold text-base mb-1">Kalinga Homes</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Azure Villa, Villa No-20,<br />
                Ground Floor, Kalinga Nagar,<br />
                Bhubaneswar – 751030
              </p>
            </div>

            {/* Phone */}
            <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Phone size={18} />
              </div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Call Us</p>
              <a href="tel:+919348185822" className="text-white font-bold text-base hover:text-purple-400 transition-colors">
                +91 9348185822
              </a>
            </div>

            {/* Hours */}
            <div className="bg-[#252544] border border-purple-900/30 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-emerald-600/20 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Clock size={18} />
              </div>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Working Hours</p>
              <p className="text-white font-bold text-base">Mon – Sun</p>
              <p className="text-gray-400 text-sm">9:30 AM – 7:30 PM</p>
            </div>

            {/* Directions button */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-purple-900/30"
            >
              <Navigation size={16} />
              Get Directions
              <ArrowUpRight size={14} />
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            className="lg:col-span-2 bg-[#252544] border border-purple-900/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="h-64 xs:h-80 sm:h-96 lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d59874.39288960411!2d85.73122959861149!3d20.29407584386421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgiet%20ghangapatna!5e0!3m2!1sen!2sin!4v1770494812605!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kalinga Homes Office Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
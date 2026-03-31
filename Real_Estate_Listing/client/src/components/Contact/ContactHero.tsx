import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const quickInfo = [
  { icon: <Phone size={16} />, label: "Call Us", value: "+91 9348185822", href: "tel:+919348185822" },
  { icon: <Mail size={16} />, label: "Email", value: "kalingahomes@gmail.com", href: "mailto:kalingahomes@gmail.com" },
  { icon: <Clock size={16} />, label: "Hours", value: "Mon–Sun: 9:30 AM – 7:30 PM", href: null },
];

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute -right-32 top-0 w-96 h-full bg-gradient-to-bl from-purple-900/15 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-900/30 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-purple-400 text-xs sm:text-sm font-medium tracking-widest uppercase">We're Here to Help</span>
            </motion.div>

            <motion.h1
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let's Find Your
              <br />
              <span className="text-purple-500">Dream Home</span>
              <br />
              Together.
            </motion.h1>

            <motion.p
              className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Whether you're buying, renting, or selling — our team is ready to guide you every step of the way with zero pressure.
            </motion.p>

            <motion.a
              href="#contact-form"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-full font-semibold text-sm xs:text-base transition-all hover:scale-105 shadow-lg min-h-[44px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Send a Message <ArrowRight size={16} />
            </motion.a>
          </div>

          {/* Right — quick info cards */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {quickInfo.map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#252544] border border-purple-900/30 hover:border-purple-500/50 rounded-2xl px-6 py-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-900/30 flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:bg-purple-600/30 transition-colors">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white font-semibold text-sm xs:text-base hover:text-purple-400 transition-colors truncate block">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-semibold text-sm xs:text-base">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Address card */}
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#252544] border border-purple-900/30 hover:border-purple-500/50 rounded-2xl px-6 py-5 flex items-start gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
            >
              <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-900/30 flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:bg-purple-600/30 transition-colors">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-0.5">Address</p>
                <p className="text-white font-semibold text-sm xs:text-base leading-snug">
                  Azure Villa, Villa No-20, Ground Floor,<br />
                  Kalinga Nagar, Bhubaneswar – 751030
                </p>
                <p className="text-purple-400 text-xs mt-1.5 flex items-center gap-1">
                  Get Directions <ArrowRight size={11} />
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
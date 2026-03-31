import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, ArrowUpRight } from "lucide-react";

const contactInfo = [
  {
    icon: <Phone size={24} />,
    title: "Phone",
    content: "+91 9348185822",
    sub: "Available during working hours",
    link: "tel:+919348185822",
    color: "purple",
  },
  {
    icon: <Mail size={24} />,
    title: "Email",
    content: "kalingahomes@gmail.com",
    sub: "We reply within 24 hours",
    link: "mailto:kalingahomes@gmail.com",
    color: "blue",
  },
  {
    icon: <Clock size={24} />,
    title: "Working Hours",
    content: "Mon – Sun",
    sub: "9:30 AM – 7:30 PM",
    link: null,
    color: "green",
  },
  {
    icon: <MapPin size={24} />,
    title: "Office",
    content: "Kalinga Nagar",
    sub: "Bhubaneswar – 751030",
    link: "https://maps.google.com",
    color: "yellow",
  },
];

const palette = {
  purple: { border: "border-purple-500/30", icon: "bg-purple-600/20 text-purple-400", hover: "hover:border-purple-500/60", glow: "group-hover:bg-purple-600/30" },
  blue:   { border: "border-blue-500/30",   icon: "bg-blue-600/20 text-blue-400",     hover: "hover:border-blue-500/60",   glow: "group-hover:bg-blue-600/30"   },
  green:  { border: "border-emerald-500/30",icon: "bg-emerald-600/20 text-emerald-400",hover:"hover:border-emerald-500/60",glow: "group-hover:bg-emerald-600/30" },
  yellow: { border: "border-yellow-500/30", icon: "bg-yellow-600/20 text-yellow-400", hover: "hover:border-yellow-500/60", glow: "group-hover:bg-yellow-600/30" },
};

export default function ContactInfo() {
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
          <p className="text-purple-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">Reach Us</p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Contact <span className="text-purple-500">Information</span>
          </h2>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {contactInfo.map((info, index) => {
            const p = palette[info.color];
            const Inner = (
              <>
                <div className={`w-14 h-14 xs:w-16 xs:h-16 rounded-2xl ${p.icon} ${p.glow} flex items-center justify-center mb-5 transition-colors`}>
                  {info.icon}
                </div>
                <h3 className="text-white font-bold text-lg xs:text-xl mb-1">{info.title}</h3>
                <p className="text-white text-sm xs:text-base font-semibold mb-1">{info.content}</p>
                <p className="text-gray-400 text-xs xs:text-sm">{info.sub}</p>
                {info.link && (
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-400">
                    {info.title === "Office" ? "Get Directions" : `Open ${info.title}`}
                    <ArrowUpRight size={12} />
                  </div>
                )}
              </>
            );

            return (
              <motion.div
                key={index}
                className={`group relative bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 border ${p.border} ${p.hover} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Ghost index */}
                <span className="absolute top-4 right-4 text-5xl font-bold text-purple-500/5 select-none leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* Hover glow */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-600/0 group-hover:bg-purple-600/8 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                {info.link ? (
                  <a href={info.link} target={info.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                    {Inner}
                  </a>
                ) : (
                  <div>{Inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
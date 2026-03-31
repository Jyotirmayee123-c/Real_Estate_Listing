import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const contacts = [
  { label: "Call Us", value: "+91 98765 43210", icon: "📞" },
  { label: "Email", value: "hello@kalingahomes.in", icon: "✉️" },
  { label: "Office", value: "Bhubaneswar, Odisha", icon: "📍" },
];

export default function CTASection() {
  const navigate = useNavigate();

  const handleScrollToContact = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleBrowseProperties = () => {
    navigate("/properties");
  };

  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-[#252544] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-purple-900/30 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[120px] bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative z-10 p-8 xs:p-10 sm:p-12 md:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
                Ready to Find Your <span className="text-purple-500">Dream Home?</span>
              </h2>
              <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
                Whether you&apos;re buying your first home, upgrading, or investing — our team is
                ready to guide you through every step with zero pressure and complete transparency.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-12">
                <button
                  onClick={handleScrollToContact}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-8 xs:px-10 sm:px-12 py-3 xs:py-3.5 sm:py-4 rounded-full text-sm xs:text-base sm:text-lg font-semibold transition-all hover:scale-105 shadow-lg min-h-[44px] flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Talk to an Expert
                </button>
                <button
                  onClick={handleBrowseProperties}
                  className="w-full sm:w-auto border border-purple-900/30 hover:border-purple-500/50 text-gray-400 hover:text-white px-8 xs:px-10 sm:px-12 py-3 xs:py-3.5 sm:py-4 rounded-full text-sm xs:text-base sm:text-lg font-semibold transition-all min-h-[44px] flex items-center justify-center gap-2"
                >
                  Browse Properties
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 pt-8 border-t border-purple-900/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {contacts.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl">{c.icon}</span>
                  <div className="text-left">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{c.label}</p>
                    <p className="text-white text-sm font-semibold">{c.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
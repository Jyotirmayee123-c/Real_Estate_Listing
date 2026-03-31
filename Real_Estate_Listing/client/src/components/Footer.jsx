import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d1a] border-t border-white/[0.07] pt-14 pb-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Kalinga <span className="text-purple-400">Homes</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Bhubaneswar's most trusted real estate platform — verified properties, transparent deals.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { label: "Facebook", href: "#", icon: "f" },
                { label: "Instagram", href: "#", icon: "in" },
                { label: "Twitter", href: "#", icon: "𝕏" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:bg-purple-600/20 hover:border-purple-500/40 hover:text-purple-300 transition-all duration-200 text-xs font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "Properties", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/40 text-sm hover:text-purple-300 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {["Buy a Property", "Rent a Property", "Sell a Property", "List Your Property"].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="text-white/40 text-sm hover:text-purple-300 transition-colors duration-200"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-purple-400 mt-0.5 shrink-0" />
                <span className="text-white/40 text-sm leading-relaxed">
                  Bhubaneswar, Odisha, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-purple-400 shrink-0" />
                <a
                  href="tel:+919438185822"
                  className="text-white/40 text-sm hover:text-purple-300 transition-colors duration-200"
                >
                  +91 9438185822
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-purple-400 shrink-0" />
                <a
                  href="mailto:info@kalingahomes.in"
                  className="text-white/40 text-sm hover:text-purple-300 transition-colors duration-200"
                >
                  info@kalingahomes.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Kalinga Homes. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/25 text-xs hover:text-purple-300 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
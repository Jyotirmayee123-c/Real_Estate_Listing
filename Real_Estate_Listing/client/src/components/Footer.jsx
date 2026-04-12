import React, { useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";

/* ✅ Scroll To Top */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ✅ Footer */
function Footer() {
  return (
    <footer className="bg-[#0d0d1a] border-t border-white/10 pt-14 pb-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Kalinga <span className="text-purple-400">Homes</span>
            </h2>

            <p className="text-white/50 text-sm mb-5">
              Bhubaneswar's trusted real estate platform — verified properties & transparent deals.
            </p>

            <div className="flex gap-3">
              {["F", "I", "X"].map((icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-purple-500 transition"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>Home</li>
              <li>Properties</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>Buy Property</li>
              <li>Rent Property</li>
              <li>Sell Property</li>
              <li>List Property</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contact</h4>

            <div className="space-y-3 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Bhubaneswar, India
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                +91 9438185822
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                info@kalingahomes.in
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-5 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Kalinga Homes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
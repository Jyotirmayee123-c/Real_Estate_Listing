import React from "react";
import { Phone } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Banner() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#0d0d1a]">

      {/* Purple glow behind hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-700/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24 text-center">

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full inline-block" />
            Bhubaneswar's Most Trusted Real Estate
          </div>

          {/* Heading */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-5 max-w-4xl mx-auto leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Discover Your{" "}
            <em className="text-purple-400 not-italic">Dream Home</em>{" "}
            in Bhubaneswar
          </h1>

          {/* Subheading */}
          <p className="text-white/55 text-base sm:text-lg md:text-xl text-center mb-10 max-w-xl mx-auto leading-relaxed">
            Verified flats, houses & rentals with trust and transparency from Kalinga Homes.
          </p>

          {/* Search Bar */}
          <SearchBar />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8 mb-14 px-2">
            {["Buy a Property", "Rent a Property", "List Your Property"].map((label) => (
              <button
                key={label}
                className="border border-white/25 text-white/80 bg-white/4 hover:bg-purple-600 hover:border-purple-600 hover:text-white cursor-pointer px-7 py-3 rounded-full transition-all duration-300 font-medium hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap backdrop-blur-sm"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 text-center text-white">
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>1000+</div>
              <div className="text-sm text-white/45">Happy Clients</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>500+</div>
              <div className="text-sm text-white/45">Verified Properties</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>2024</div>
              <div className="text-sm text-white/45">Trusted Since</div>
            </div>
          </div>
        </div>

        {/* Phone Side Button — desktop */}
        <a
          href="tel:+919438185822"
          className="hidden sm:flex fixed left-0 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-8 rounded-r-lg shadow-lg transition items-center justify-center z-20 group"
          style={{ writingMode: "vertical-rl" }}
          aria-label="Call +91 9438185822"
        >
          <Phone className="mb-2 rotate-90 group-hover:scale-110 transition-transform" size={16} />
          <span className="font-medium text-sm whitespace-nowrap">+91 9438185822</span>
        </a>

        {/* Phone FAB — mobile */}
        <a
          href="tel:+919438185822"
          className="sm:hidden fixed bottom-20 left-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg z-20 flex items-center justify-center"
          aria-label="Call +91 9438185822"
        >
          <Phone size={20} />
        </a>

        {/* WhatsApp FAB */}
        <a
          href="https://wa.me/919438185822"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-lg z-20 hover:scale-110 active:scale-95 transition-all"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
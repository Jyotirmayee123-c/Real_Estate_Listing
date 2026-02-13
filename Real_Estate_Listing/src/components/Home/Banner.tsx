"use client";

import React, { useState } from "react";
import { Search, Phone } from "lucide-react";

export default function KalingaHomesLanding() {
  const [selectedCategory, setSelectedCategory] = useState("Category");

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          // backgroundImage: "url('/Images/house-image.jpg')",
          backgroundColor: "#1a1a2e",
        }}
      >
        {/* <div className="absolute inset-0 bg-black/50"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section - Responsive padding */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          
          {/* Main Heading - Responsive text sizes */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-4 sm:mb-6 md:mb-8 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-tight md:leading-snug lg:leading-tight px-2">
            Discover Your Dream Home in Bhubaneswar
          </h1>

          {/* Subheading - Responsive text sizes */}
          <p className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto px-2 sm:px-4">
            Verified flats, houses & rentals with trust and transparency from
            Kalinga Homes
          </p>

          {/* Search Bar - Fully responsive */}
          <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto bg-white rounded-full shadow-2xl p-2 sm:p-3 md:p-3 flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-0 items-stretch mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            
            <div className="flex items-center flex-1 px-4 sm:px-6 md:px-4 py-2 sm:py-0">
              <Search className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Search by Location..."
                className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base md:text-lg"
              />
            </div>
            
            <div className="sm:border-l border-gray-300 px-4 sm:px-6 md:px-4">
              <select
                className="outline-none text-gray-700 bg-transparent cursor-pointer w-full sm:w-auto py-2 sm:py-0 text-sm sm:text-base md:text-lg"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>Category</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
                <option>Commercial</option>
              </select>
            </div>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 md:px-8 py-2 sm:py-3 md:py-2 rounded-full transition font-medium text-sm sm:text-base md:text-lg whitespace-nowrap">
              Search
            </button>
          </div>

          {/* Action Buttons - Responsive layout */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-4 mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-2">
            <button className="border-2 border-white text-white hover:bg-purple-600 hover:border-purple-600 cursor-pointer px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3 rounded-full transition-all duration-300 font-medium hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg whitespace-nowrap">
              Buy a Property
            </button>
            <button className="border-2 border-white text-white hover:bg-purple-600 hover:border-purple-600 cursor-pointer px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3 rounded-full transition-all duration-300 font-medium hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg whitespace-nowrap">
              Rent a Property
            </button>
            <button className="border-2 border-white text-white hover:bg-purple-600 hover:border-purple-600 cursor-pointer px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3 rounded-full transition-all duration-300 font-medium hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg whitespace-nowrap">
              List Your Property
            </button>
          </div>

          {/* Stats - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16 text-center text-white max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-2">1000+</div>
              <div className="text-sm sm:text-base md:text-lg text-white/80">
                Happy Clients
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-2">500+</div>
              <div className="text-sm sm:text-base md:text-lg text-white/80">
                Verified Properties
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-2">
                Trusted Since2024
              </div>
              <div className="text-sm sm:text-base md:text-lg text-white/80">
                Years of Excellence
              </div>
            </div>
          </div>
        </div>

        {/* Contact Button - Responsive for all devices */}
        <a
          href="tel:+919438185822"
          className="hidden sm:flex fixed left-0 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-2 sm:px-3 md:px-3 py-8 sm:py-10 md:py-8 lg:py-3 rounded-r-lg shadow-lg transition items-center justify-center z-20 group"
          style={{ writingMode: "vertical-rl" }}
          aria-label="Call +91 9438185822"
        >
          <Phone className="mb-2 rotate-90 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm sm:text-base md:text-base whitespace-nowrap">
            +91 9438185822
          </span>
        </a>

        {/* Mobile Contact Button - For very small screens */}
        <a
          href="tel:+919438185822"
          className="sm:hidden fixed bottom-16 left-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition z-20 flex items-center justify-center"
          aria-label="Call +91 9438185822"
        >
          <Phone size={20} />
        </a>

        {/* WhatsApp Button - Responsive sizing */}
        <a
          href="https://wa.me/919438185822"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 sm:bottom-8 md:bottom-8 right-6 sm:right-8 md:right-8 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 md:p-4 rounded-full shadow-lg transition z-20 hover:scale-110 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
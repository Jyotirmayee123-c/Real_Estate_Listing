
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AuthManager from "@/components/Auth/AuthManager/AuthManager";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup" | "forgot-password">("login");

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Buy", href: "/buy" },
    { label: "Rent", href: "/rent" },
    { label: "Sell", href: "/sell" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Service", href: "/service" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Close mobile menu on resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const openLogin = () => {
    setAuthView("login");
    setIsAuthOpen(true);
    setIsMobileMenuOpen(false);
  };

  const openSignup = () => {
    setAuthView("signup");
    setIsAuthOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo - Responsive sizing */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className={`flex items-center space-x-2 font-bold transition-colors duration-300 ${
                  isScrolled
                    ? "text-white hover:text-purple-300"
                    : "text-white hover:text-purple-300"
                }`}
              >
                <div className="flex items-center">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xs sm:text-sm">
                      K
                    </span>
                  </div>
                  <span className="ml-2 text-lg sm:text-xl">
                    <span className="hidden xs:inline">Realestate</span>
                    <span className="xs:hidden">RS</span>
                    <span className="hidden sm:inline"> Homes</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Optimized spacing */}
            <div className="hidden md:flex items-center space-x-0 lg:space-x-1">
              {/* Regular Navigation Links */}
              <div className="flex items-center space-x-0 lg:space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium rounded-md transition-all duration-300 hover:scale-105 ${
                      isScrolled
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div
                className={`h-5 lg:h-6 w-px mx-1 lg:mx-2 ${isScrolled ? "bg-white/30" : "bg-white/30"}`}
              ></div>

              {/* Login Button - Opens popup */}
              <button 
                onClick={openLogin}
                className="px-4 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all cursor-pointer active:scale-95"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-1 sm:space-x-2">
              <button 
                onClick={openLogin}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
              >
                Login
              </button>
              <button
                className={`inline-flex items-center justify-center rounded-md p-1.5 sm:p-2 transition-all duration-300 ${
                  isScrolled
                    ? "text-white hover:text-purple-300 hover:bg-white/10"
                    : "text-white hover:text-purple-300 hover:bg-white/10"
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="sm:w-6 sm:h-6" />
                ) : (
                  <Menu size={20} className="sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Animated) - Improved responsiveness */}
        <div
          className={`md:hidden fixed inset-x-0 top-14 sm:top-16 bg-[#1a1a2e]/98 backdrop-blur-lg shadow-xl transition-all duration-300 ease-in-out border-t border-white/10 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 visible h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]"
              : "opacity-0 -translate-y-4 invisible h-0"
          }`}
        >
          <div className="container mx-auto px-4 py-3 sm:py-4 h-full overflow-y-auto">
            <div className="space-y-1 sm:space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-indigo-500/20 transition-all duration-300 active:scale-95"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Additional mobile-only CTA - Opens signup popup */}
              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10">
                <button 
                  onClick={openSignup}
                  className="w-full py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu - Responsive */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible top-14 sm:top-16"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Auth Popups */}
      <AuthManager
        initialView={authView}
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
};

export default Navbar;

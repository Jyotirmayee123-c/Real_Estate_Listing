// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegClock
} from 'react-icons/fa';

const Footer = () => {
  // Quick links
  const quickLinks = [
    { label: 'Buy', href: '/buy' },
    { label: 'Rent', href: '/rent' },
    { label: 'Sell', href: '/sell' },
    { label: 'Commercial', href: '/commercial' },
    { label: 'Residential', href: '/residential' },
  ];

  // Company info
  const company = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ];

  // Contact info
  const contactInfo = [
    { icon: <FaMapMarkerAlt className="text-sm" />, text: '123 Real Estate Ave, NY 10001' },
    { icon: <FaPhone className="text-sm" />, text: '+1 (555) 123-4567' },
    { icon: <FaEnvelope className="text-sm" />, text: 'info@realestatepro.com' },
  ];

  // Social media links
  const socialLinks = [
    { icon: <FaFacebook />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  // Google Maps Embed URL
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d59874.39288960411!2d85.73122959861149!3d20.29407584386421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgiet%20ghangapatna!5e0!3m2!1sen!2sin!4v1770494812605!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade`;

  return (
    <footer className="bg-gray-900 text-white pt-8 pb-6">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Compact Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          
          {/* Brand & Social */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div>
                <span className="text-lg font-bold">RealEstatePro</span>
                <p className="text-xs text-gray-400">Trusted Property Partner</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              Your trusted partner in real estate for over 15 years.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Map */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-3">Contact</h3>
              <ul className="space-y-2">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="text-purple-400 mt-0.5">
                      {item.icon}
                    </div>
                    <span className="text-xs text-gray-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Compact Map */}
            <div className="rounded overflow-hidden border border-gray-700">
              <div className="relative pb-[56.25%] h-0"> {/* 16:9 Aspect Ratio */}
                <iframe
                  src={googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter - Compact */}
        {/* <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="mb-2 sm:mb-0 sm:flex-1">
              <h3 className="text-sm font-bold mb-1">Newsletter</h3>
              <p className="text-xs text-gray-300">Get latest property updates</p>
            </div>
            <div className="w-full sm:w-auto sm:flex-1">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-3 py-2 text-sm rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button className="px-4 py-2 text-sm bg-purple-600 text-white font-medium rounded hover:bg-purple-700 transition-colors duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar - Compact */}
        <div className="pt-4 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div>
              <p className="text-xs text-gray-400">
                &copy; {new Date().getFullYear()} RealEstatePro. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Cookies', href: '/cookies' },
                { label: 'Sitemap', href: '/sitemap' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
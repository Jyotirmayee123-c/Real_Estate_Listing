"use client";

import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Rajesh Kumar Behera",
    position: "Lead Frontend Developer",
    expertise: ["React", "Next.js", "UI Design"],
    bio: "Transforms complex property data into seamless digital experiences that clients love navigating.",
    image: "/Images/team-1.jpg",
    index: "01",
  },
  {
    name: "Satyabrata Rout",
    position: "Backend & API Engineer",
    expertise: ["Node.js", "MongoDB", "System Design"],
    bio: "The engine under the hood — ensures every search, booking, and transaction runs flawlessly.",
    image: "/Images/team-2.jpg",
    index: "02",
  },
  {
    name: "Ashutosh Khuntia",
    position: "Full Stack Developer",
    expertise: ["MERN", "DevOps", "Integrations"],
    bio: "Bridges product and infrastructure, keeping the platform fast, reliable, and always evolving.",
    image: "/Images/team-3.jpg",
    index: "03",
  },
  {
    name: "Suryakanta Das",
    position: "Founder & Tech Lead",
    expertise: ["Architecture", "Strategy", "Vision"],
    bio: "Sets the technical direction and ensures every feature serves one goal: making home buying easier.",
    image: "/Images/team-4.jpg",
    index: "04",
  },
];

export default function TeamSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Meet Our <span className="text-purple-500">Team</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Dedicated professionals committed to helping you find your dream property
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {teamMembers.map((m, i) => (
            <motion.div
              key={i}
              className="group bg-[#252544] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-900/30 hover:border-purple-500/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative h-56 xs:h-60 sm:h-72 md:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#252544] via-transparent to-transparent z-10" />
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute top-4 right-4 text-5xl font-bold text-purple-500/10 leading-none select-none z-20">
                  {m.index}
                </span>
              </div>

              <div className="p-5 xs:p-6 sm:p-7">
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{m.name}</h3>
                <p className="text-purple-400 text-sm xs:text-base sm:text-lg font-medium mb-3">{m.position}</p>

                <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                  {m.expertise.map((tag, j) => (
                    <span
                      key={j}
                      className="text-[11px] font-semibold text-purple-400 bg-purple-600/20 border border-purple-900/30 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-400 text-xs xs:text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">{m.bio}</p>

                <div className="flex gap-3 sm:gap-4">
                  <a href="#" aria-label="LinkedIn" className="bg-purple-600/20 hover:bg-purple-600/40 p-2 sm:p-2.5 rounded-full transition-all hover:scale-110">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="bg-purple-600/20 hover:bg-purple-600/40 p-2 sm:p-2.5 rounded-full transition-all hover:scale-110">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
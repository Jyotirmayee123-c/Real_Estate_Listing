"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const achievements = [
  { number: "15+", detail: "Years in Odisha Real Estate" },
  { number: "₹200Cr+", detail: "Worth of Properties Handled" },
  { number: "3", detail: "City Expansions Planned by 2026" },
];

function FounderAvatar() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-purple-900/40">
      <div className="flex flex-col items-center gap-3">
        <div
          style={{ width: 120, height: 120, borderRadius: "50%" }}
          className="flex items-center justify-center bg-purple-600/30 border-2 border-purple-500/50 text-purple-300 font-bold text-5xl select-none"
        >
          JP
        </div>
        <p className="text-purple-400 text-sm tracking-widest uppercase">Founder & CEO</p>
      </div>
    </div>
  );
}

export default function FounderSection() {
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
            Meet Our <span className="text-purple-500">Founder</span>
          </h2>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto" />
        </motion.div>

        <motion.div
          className="bg-[#252544] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-purple-900/30"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Avatar / Image area */}
            <div className="lg:col-span-4 relative">
              <div className="absolute top-4 left-4 w-14 h-14 border-t-2 border-l-2 border-purple-600/50 rounded-tl-xl z-10" />
              <div className="absolute bottom-4 right-4 w-14 h-14 border-b-2 border-r-2 border-purple-600/50 rounded-br-xl z-10" />

              <div className="relative h-64 xs:h-72 sm:h-80 lg:h-full min-h-[420px]">
                {/* Monogram placeholder — replace the block below with <img> once you have the photo */}
                <FounderAvatar />

                {/* Uncomment and replace src when photo is ready:
                <img
                  src="/path/to/jyotirmayee-panda.jpg"
                  alt="Jyotirmayee Panda"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252544] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#252544]/60" />
                */}

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:hidden">
                  <p className="text-white font-bold text-xl sm:text-2xl">Jyotirmayee Panda</p>
                  <p className="text-purple-400 text-sm font-medium mt-1">Founder &amp; CEO</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-8 p-6 xs:p-8 sm:p-10 md:p-12 flex flex-col justify-center">
              <div className="hidden lg:block mb-5">
                <p className="text-white font-bold text-2xl sm:text-3xl">JYOTIRMAYEE PANDA</p>
                <p className="text-purple-400 text-base font-medium mt-1">Founder &amp; CEO, Kalinga Homes</p>
              </div>

              <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
                {achievements.map((a, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 bg-purple-600/20 border border-purple-900/30 rounded-full px-4 py-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <span className="text-lg font-bold text-purple-500">{a.number}</span>
                    <span className="text-gray-400 text-xs sm:text-sm">{a.detail}</span>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4 text-gray-400 text-sm xs:text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                <p>
                  Jyotirmayee Panda didn&apos;t enter real estate to build a company — he entered it to
                  solve a problem he saw every day: families being misled, overcharged, and
                  underserved in one of the most important decisions of their lives.
                </p>
                <p>
                  With a background in property law and urban development, he spent over a decade
                  studying Bhubaneswar&apos;s growth corridors before founding Kalinga Homes in 2024.
                  Every decision rooted in one question:{" "}
                  <span className="text-white font-medium">
                    &ldquo;Would I recommend this to my own family?&rdquo;
                  </span>
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4 sm:pl-6 py-2">
                <Quote className="text-purple-500/50 mb-2" size={20} />
                <p className="text-white text-sm xs:text-base sm:text-lg font-semibold leading-snug italic">
                  &ldquo;We don&apos;t just sell properties. We protect people&apos;s life savings
                  and build their most important memories.&rdquo;
                </p>
                <p className="text-purple-400 text-sm mt-3 font-medium">— JYOTIRMAYEE PANDA</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
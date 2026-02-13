"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Amit Patel",
    role: "Property Buyer",
    image: "/Images/testimonial-1.jpg",
    rating: 5,
    review:
      "Kalinga Homes made buying my first home a breeze. Their team was professional, patient, and guided me through every step. Highly recommend!",
  },
  {
    name: "Priya Sharma",
    role: "Interior Design Client",
    image: "/Images/testimonial-2.jpg",
    rating: 5,
    review:
      "The interior design team transformed my apartment into a beautiful space. They understood my vision perfectly and delivered beyond expectations.",
  },
  {
    name: "Rajesh Kumar",
    role: "Property Seller",
    image: "/Images/testimonial-3.jpg",
    rating: 5,
    review:
      "Sold my property within 2 weeks at the best price! The team's market knowledge and negotiation skills are exceptional. Thank you!",
  },
  {
    name: "Ananya Das",
    role: "Rental Client",
    image: "/Images/testimonial-4.jpg",
    rating: 5,
    review:
      "Found my perfect rental apartment through Kalinga Homes. The process was smooth, transparent, and hassle-free. Great service!",
  },
];

export default function ServiceTestimonials() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            What Our <span className="text-purple-500">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Real experiences from real people who trusted us with their property needs
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="text-purple-400" size={40} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 sm:mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-500 fill-yellow-500"
                    size={18}
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-300 text-sm xs:text-base leading-relaxed mb-5 sm:mb-6 relative z-10">
                {testimonial.review}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-600/20 flex items-center justify-center overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerHTML = `<span class="text-purple-400 text-xl font-bold">${testimonial.name.charAt(0)}</span>`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm xs:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-xs xs:text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-purple-400 mb-2">
              1000+
            </div>
            <div className="text-gray-400 text-sm xs:text-base">
              Happy Clients
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-purple-400 mb-2">
              500+
            </div>
            <div className="text-gray-400 text-sm xs:text-base">
              Properties Sold
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-purple-400 mb-2">
              98%
            </div>
            <div className="text-gray-400 text-sm xs:text-base">
              Satisfaction Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-purple-400 mb-2">
              24/7
            </div>
            <div className="text-gray-400 text-sm xs:text-base">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
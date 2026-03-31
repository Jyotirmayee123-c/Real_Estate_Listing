import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

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

const trustStats = [
  { value: "1000+", label: "Happy Clients" },
  { value: "500+", label: "Properties Sold" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support" },
];

export default function ClientSay() {
  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            What Our <span className="text-purple-500">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Real experiences from real people who trusted us with their property needs
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Hover glow */}
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-600/0 group-hover:bg-purple-600/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-10">
                <Quote className="text-purple-400" size={36} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-yellow-500" size={16} />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-300 text-xs xs:text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 relative z-10">
                {testimonial.review}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-purple-900/30 pt-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600/20 border border-purple-900/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML = `<span class="text-purple-400 text-lg font-bold">${testimonial.name.charAt(0)}</span>`;
                      }
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm xs:text-base">{testimonial.name}</h4>
                  <p className="text-purple-400 text-xs xs:text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust stats */}
        <motion.div
          className="mt-12 sm:mt-16 bg-[#252544] border border-purple-900/30 rounded-2xl sm:rounded-3xl p-6 xs:p-8 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {trustStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-purple-500 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm xs:text-base">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
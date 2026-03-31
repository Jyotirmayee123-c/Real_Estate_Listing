import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What areas do you serve in Bhubaneswar?",
    answer: "We cover all major areas in Bhubaneswar including Kalinga Nagar, Patia, Chandrasekharpur, Nayapalli, and surrounding regions. We also assist with properties in nearby areas.",
  },
  {
    question: "Do you charge for property consultations?",
    answer: "No, our initial consultation is completely free. We believe in understanding your needs first and providing personalized guidance without any upfront charges.",
  },
  {
    question: "How long does the property buying process take?",
    answer: "The timeline varies depending on property type and documentation. Typically, it takes 30–60 days from property selection to final handover. We ensure a smooth and hassle-free process.",
  },
  {
    question: "Do you assist with home loans?",
    answer: "Yes, we have partnerships with major banks and financial institutions. Our team will help you with loan processing, documentation, and getting the best interest rates.",
  },
  {
    question: "Can I sell my property through Kalinga Homes?",
    answer: "Absolutely! We provide complete property selling services including valuation, marketing, legal verification, and finding the right buyers. Contact us for a free property assessment.",
  },
  {
    question: "What makes Kalinga Homes different from other real estate agencies?",
    answer: "Our commitment to transparency, verified properties, personalized service, and post-sale support sets us apart. We focus on building long-term relationships rather than just transactions.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="relative bg-gradient-to-b from-[#252544] to-[#1a1a2e] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">FAQ</p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Frequently Asked <span className="text-purple-500">Questions</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg max-w-2xl mx-auto px-2">
            Have questions? We've got answers
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6" />
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`bg-[#252544] rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300
                ${openIndex === index ? "border-purple-500/50 shadow-lg shadow-purple-900/20" : "border-purple-900/30 hover:border-purple-500/30"}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-5 xs:px-6 sm:px-7 py-4 xs:py-5 text-left flex items-center justify-between gap-4 hover:bg-purple-600/5 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center transition-colors
                    ${openIndex === index ? "bg-purple-600 text-white" : "bg-purple-600/20 text-purple-400 group-hover:bg-purple-600/30"}`}>
                    <HelpCircle size={14} />
                  </div>
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-white">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    size={20}
                    className={`transition-colors ${openIndex === index ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300"}`}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 xs:px-6 sm:px-7 pb-5 pt-0 ml-10">
                      <div className="h-px bg-purple-900/30 mb-4" />
                      <p className="text-gray-400 text-sm xs:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 sm:mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm xs:text-base">
            Still have questions?{" "}
            <a href="#contact-form" className="text-purple-400 hover:text-purple-300 underline underline-offset-4 font-semibold transition-colors">
              Send us a message
            </a>{" "}
            — we reply within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
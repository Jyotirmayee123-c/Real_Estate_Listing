"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What areas do you serve in Bhubaneswar?",
    answer:
      "We cover all major areas in Bhubaneswar including Kalinga Nagar, Patia, Chandrasekharpur, Nayapalli, and surrounding regions. We also assist with properties in nearby areas.",
  },
  {
    question: "Do you charge for property consultations?",
    answer:
      "No, our initial consultation is completely free. We believe in understanding your needs first and providing personalized guidance without any upfront charges.",
  },
  {
    question: "How long does the property buying process take?",
    answer:
      "The timeline varies depending on property type and documentation. Typically, it takes 30-60 days from property selection to final handover. We ensure a smooth and hassle-free process.",
  },
  {
    question: "Do you assist with home loans?",
    answer:
      "Yes, we have partnerships with major banks and financial institutions. Our team will help you with loan processing, documentation, and getting the best interest rates.",
  },
  {
    question: "Can I sell my property through Kalinga Homes?",
    answer:
      "Absolutely! We provide complete property selling services including valuation, marketing, legal verification, and finding the right buyers. Contact us for a free property assessment.",
  },
  {
    question: "What makes Kalinga Homes different from other real estate agencies?",
    answer:
      "Our commitment to transparency, verified properties, personalized service, and post-sale support sets us apart. We focus on building long-term relationships rather than just transactions.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#252544] to-[#1a1a2e]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Frequently Asked <span className="text-purple-500">Questions</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg max-w-2xl mx-auto px-2">
            Have questions? We have got answers
          </p>
          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[#252544] rounded-xl sm:rounded-2xl overflow-hidden border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 xs:px-6 sm:px-8 py-4 xs:py-5 sm:py-6 text-left flex items-center justify-between gap-4 hover:bg-purple-600/5 transition-colors"
              >
                <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-white pr-2">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="text-purple-400" size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 xs:px-6 sm:px-8 pb-4 xs:pb-5 sm:pb-6 pt-0">
                      <p className="text-gray-400 text-sm xs:text-base sm:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
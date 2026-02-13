"use client";

import React from "react";
import ContactHero from "@/components/Pages/Contact/ContactHero";
import ContactInfo from "@/components/Pages/Contact/ContactInfo";
import ContactForm from "@/components/Pages/Contact/ContactForm";
import ContactMap from "@/components/Pages/Contact/ContactMap";
import ContactFaq from "@/components/Pages/Contact/ContactFaq";


export default function ContactPage() {
  return (
    <div className="bg-[#1a1a2e] min-h-screen">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
      <ContactFaq />
    </div>
  );
}
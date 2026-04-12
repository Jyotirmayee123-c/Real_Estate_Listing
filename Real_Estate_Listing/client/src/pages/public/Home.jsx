import React from "react";
import Banner from "../../components/Home/Banner";
import OurServices from "../../components/Home/OurServices";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import OurAchievement from "../../components/Home/OurAchievement";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0d0d1a] min-h-screen">
      <Banner />
      <OurServices />
      <WhyChooseUs />
      <OurAchievement />
      <Footer/>
    </main>
  );
}
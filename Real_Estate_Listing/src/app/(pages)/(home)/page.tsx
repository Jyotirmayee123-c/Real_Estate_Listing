import React from 'react';
import Banner from '@/components/Home/Banner';
import OurService from '@/components/Home/OurServices';
import WhyChooseUs from '@/components/Home/WhyChooseUs';
import OurAchievement from '@/components/Home/OurAchievement';
import CTASection from '@/components/Pages/About/CTASection'

function page() {
  return (
    <div>
      <Banner/>
      <OurService/>
      <WhyChooseUs/>
      <OurAchievement/> 
      <CTASection/>
    </div>
  )
}

export default page

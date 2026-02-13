import React from 'react';
import ServicesHero from '@/components/Pages/Service/ServiceHero';
import MainServicesGrid from '@/components/Pages/Service/MainServiceGrid';
import HowItWorks from '@/components/Pages/Service/HowitWorks';
import WhyChooseOurServices from '@/components/Pages/Service/WhyChooseOurService';
import ServicePackages from '@/components/Pages/Service/ServicePackage';
import ClientSay from '@/components/Pages/Service/ClientSay';

export default function page() {
  return (
    <div>
      <ServicesHero/>
      <MainServicesGrid/>
      <HowItWorks/>
      <WhyChooseOurServices/>
      <ServicePackages/>
      <ClientSay/>
    </div>
  )
}

import React from 'react'
import ServicesHero from '../../components/Service/ServiceHero'
import ClientSay from '../../components/Service/ClientSay'
import HowItWorks from '../../components/Service/HowItWorks'
import MainServicesGrid from '../../components/Service/MainServiceGrid'
import ServicePackages from '../../components/Service/ServicePackage'
import WhyChooseOurServices from '../../components/Service/WhyChooseOurService'
import Footer from '../../components/Footer'

export default function Services() {
  return (
    <div>
        <ServicesHero/>
        <ClientSay/>
        <HowItWorks/>
        <MainServicesGrid/>
        <ServicePackages/>
        <WhyChooseOurServices/>
        <Footer/>
    </div>
  )
}

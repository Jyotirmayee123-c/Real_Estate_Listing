import React from 'react'
import ContactHero from '../../components/Contact/ContactHero'
import ContactForm from '../../components/Contact/ContactForm'
import ContactFAQ from '../../components/Contact/ContactFAQ'
import ContactInfo from '../../components/Contact/ContactInfo'
import ContactMap from '../../components/Contact/ContactMap'

export default function Contacts() {
  return (
    <div>
        <ContactHero/>
        <ContactForm/>
        <ContactFAQ/>
        <ContactInfo/>
        <ContactMap/>
    </div>
  )
}

import AboutHero from "../../components/About/AboutHero"
import CTASection from "../../components/About/CTASection"
import FounderSection from "../../components/About/FounderSection"
import OurPurpose from "../../components/About/OurPurpose"
import TeamSection from "../../components/About/TeamSection"
import ValuesSection from "../../components/About/ValuesSection"

const About = () => {
  return (
    <div >
      <AboutHero />
      <FounderSection />
      <CTASection />
      <OurPurpose />
      <TeamSection />
      <ValuesSection />

    </div>
  );
};

export default About;
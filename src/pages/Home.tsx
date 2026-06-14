import { useEffect } from 'react';
import Hero from '../components/sections/Hero';
import AboutPreview from '../components/sections/AboutPreview';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ImpactStats from '../components/sections/ImpactStats';
import SuccessStories from '../components/sections/SuccessStories';
import LoanProcessSection from '../components/sections/LoanProcessSection';
import CTABanner from '../components/sections/CTABanner';

const Home = () => {
  useEffect(() => {
    document.title = 'Aadarsh Vision Micro Finance Foundation | Empowering Today, Prosperous Tomorrow';
  }, []);

  return (
    <main>
      <Hero />
      <AboutPreview />
      <ServicesSection limit={3} />
      <WhyChooseUs />
      <ImpactStats />
      <SuccessStories limit={2} />
      <LoanProcessSection />
      <CTABanner />
    </main>
  );
};

export default Home;

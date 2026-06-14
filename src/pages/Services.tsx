import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import CTABanner from '../components/sections/CTABanner';
import servicesData from '../data/services.json';
import type { ServicesData } from '../types/data';

const services = servicesData as ServicesData;

const Services = () => {
  useEffect(() => {
    document.title = 'Our Services | Aadarsh Vision Micro Finance Foundation';
  }, []);

  return (
    <main>
      <PageHero
        eyebrow={services.sectionIntro.eyebrow}
        title={services.sectionIntro.title}
        description={services.sectionIntro.description}
      />
      <ServicesSection showDetails />
      <WhyChooseUs />
      <CTABanner />
    </main>
  );
};

export default Services;

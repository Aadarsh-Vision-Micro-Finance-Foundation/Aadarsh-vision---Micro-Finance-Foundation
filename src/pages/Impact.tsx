import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import ImpactStats from '../components/sections/ImpactStats';
import SuccessStories from '../components/sections/SuccessStories';
import CTABanner from '../components/sections/CTABanner';
import impactData from '../data/impact.json';
import type { ImpactData } from '../types/data';

const impact = impactData as ImpactData;

const Impact = () => {
  useEffect(() => {
    document.title = 'Our Impact | Aadarsh Vision Micro Finance Foundation';
  }, []);

  return (
    <main>
      <PageHero
        eyebrow={impact.sectionIntro.eyebrow}
        title={impact.sectionIntro.title}
        description={impact.sectionIntro.description}
      />
      <ImpactStats />
      <SuccessStories />
      <CTABanner
        title="Be part of the next success story"
        description="Every number on this page started with a single application. Apply today and take the first step toward your own growth story."
      />
    </main>
  );
};

export default Impact;

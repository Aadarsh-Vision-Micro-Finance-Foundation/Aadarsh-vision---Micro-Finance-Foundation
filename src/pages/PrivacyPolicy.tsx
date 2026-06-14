import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import siteData from '../data/site.json';
import type { SiteData } from '../types/data';

const site = siteData as SiteData;

const sections = [
  {
    title: 'Information We Collect',
    body: 'When you apply for a loan, contact us, or interact with our website, we may collect your name, contact details, address, income information, and any details you choose to share through our forms.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Information collected is used solely to process loan applications, verify eligibility, communicate with you about your application or programmes, and improve our services. We do not sell personal information to third parties.',
  },
  {
    title: 'Data Security',
    body: 'We follow industry-standard practices to protect your data, including secure storage and restricted access to borrower records. Field staff are trained on data confidentiality protocols.',
  },
  {
    title: 'Your Rights',
    body: 'You may request to review, correct, or delete personal information held about you by contacting us at the details listed on our Contact page.',
  },
  {
    title: 'Updates to This Policy',
    body: 'This policy may be updated periodically to reflect changes in our practices or legal requirements. The latest version will always be available on this page.',
  },
];

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Aadarsh Vision Micro Finance Foundation';
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How ${site.organization.name} collects, uses, and protects your information.`}
      />
      <section className="section-pad bg-white">
        <div className="container-px mx-auto max-w-3xl space-y-10">
          {sections.map((section, idx) => (
            <AnimatedSection key={section.title} delay={idx * 0.05}>
              <h2 className="font-display text-xl font-bold text-navy-800 sm:text-2xl">{section.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-navy-500">{section.body}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;

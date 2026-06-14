import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import CTABanner from '../components/sections/CTABanner';
import aboutData from '../data/about.json';
import type { AboutData } from '../types/data';

const about = aboutData as AboutData;

const About = () => {
  useEffect(() => {
    document.title = 'About Us | Aadarsh Vision Micro Finance Foundation';
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="About The Foundation"
        title={about.intro.title}
        description={about.intro.description}
      />

      {/* Mission & Vision */}
      <section className="section-pad bg-white">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <AnimatedSection className="rounded-xl2 border border-navy-100 bg-cream p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-forest-50 text-forest-600">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-navy-800">{about.mission.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-navy-500">{about.mission.description}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="rounded-xl2 border border-navy-100 bg-cream p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-gold-50 text-gold-600">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-navy-800">{about.vision.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-navy-500">{about.vision.description}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-cream">
        <div className="container-px mx-auto max-w-7xl">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">What Guides Us</p>
            <h2 className="section-title mt-3">Our Core Values</h2>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {about.values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card-surface p-7"
              >
                <CheckCircle2 className="h-8 w-8 text-forest-500" />
                <h3 className="mt-4 font-display text-lg font-bold text-navy-800">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community impact narrative */}
      <section className="section-pad bg-white">
        <div className="container-px mx-auto max-w-5xl text-center">
          <AnimatedSection>
            <p className="eyebrow justify-center">Community Impact</p>
            <h2 className="section-title mt-3">{about.impactHighlight.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-navy-500 sm:text-lg">
              {about.impactHighlight.description}
            </p>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-6 rounded-xl2 border border-navy-100 bg-cream p-8">
              {about.impactHighlight.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-extrabold text-forest-600">{stat.value}</p>
                  <p className="mt-2 text-xs font-medium text-navy-500 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner
        title="Want to learn more about how we work?"
        description="From field methodology to financial transparency — our team is happy to walk you through how Aadarsh Vision operates."
      />
    </main>
  );
};

export default About;

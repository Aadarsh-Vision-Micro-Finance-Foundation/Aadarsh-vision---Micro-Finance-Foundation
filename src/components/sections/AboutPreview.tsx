import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import aboutData from '../../data/about.json';
import type { AboutData } from '../../types/data';

const about = aboutData as AboutData;

const AboutPreview = () => {
  return (
    <section className="section-pad bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <AnimatedSection className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-xl2 bg-forest-100" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 bg-navy-700 shadow-card-hover">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-navy-800 via-navy-700 to-forest-700 p-8 text-center text-white">
                  <Target className="h-10 w-10 text-gold-300" />
                  <p className="font-display text-xl font-bold sm:text-2xl">
                    {about.impactHighlight.title}
                  </p>
                  <p className="max-w-sm text-sm text-navy-100 sm:text-base">
                    {about.impactHighlight.description}
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-6 border-t border-white/15 pt-6">
                    {about.impactHighlight.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="font-display text-xl font-bold text-gold-300 sm:text-2xl">{stat.value}</p>
                        <p className="mt-1 text-[11px] text-navy-200 sm:text-xs">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.1} className="order-1 lg:order-2">
            <p className="eyebrow">{about.intro.eyebrow}</p>
            <h2 className="section-title mt-3">{about.intro.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-navy-500 sm:text-lg">
              {about.intro.description}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl2 border border-navy-100 bg-cream p-5">
                <Target className="h-6 w-6 text-forest-600" />
                <h3 className="mt-3 font-display text-base font-bold text-navy-800">{about.mission.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{about.mission.description}</p>
              </div>
              <div className="rounded-xl2 border border-navy-100 bg-cream p-5">
                <Eye className="h-6 w-6 text-forest-600" />
                <h3 className="mt-3 font-display text-base font-bold text-navy-800">{about.vision.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{about.vision.description}</p>
              </div>
            </div>

            <Link to="/about" className="btn-secondary mt-8">
              More About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;

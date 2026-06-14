import { motion } from 'framer-motion';
import { Quote, MapPin } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import impactData from '../../data/impact.json';
import type { ImpactData } from '../../types/data';

const impact = impactData as ImpactData;

interface SuccessStoriesProps {
  limit?: number;
}

const SuccessStories = ({ limit }: SuccessStoriesProps) => {
  const stories = limit ? impact.testimonials.slice(0, limit) : impact.testimonials;

  return (
    <section className="section-pad bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{impact.successStoriesIntro.eyebrow}</p>
          <h2 className="section-title mt-3">{impact.successStoriesIntro.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-500 sm:text-lg">
            {impact.successStoriesIntro.description}
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {stories.map((story, idx) => (
            <motion.figure
              key={story.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
              className="card-surface flex flex-col p-7"
            >
              <Quote className="h-8 w-8 text-gold-400" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-navy-600">
                “{story.quote}”
              </blockquote>
              <div className="mt-5 flex items-center justify-between gap-4 border-t border-navy-100 pt-4">
                <figcaption>
                  <p className="font-display text-sm font-bold text-navy-800">{story.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-navy-400">
                    <MapPin className="h-3.5 w-3.5" />
                    {story.location}
                  </p>
                </figcaption>
                <span className="rounded-full bg-forest-50 px-3 py-1.5 text-xs font-semibold text-forest-700">
                  {story.program}
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gold-600">{story.result}</p>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

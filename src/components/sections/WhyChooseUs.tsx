import { motion } from 'framer-motion';
import AnimatedSection from '../AnimatedSection';
import DynamicIcon from '../DynamicIcon';
import whyData from '../../data/whyChooseUs.json';
import type { WhyChooseUsData } from '../../types/data';

const why = whyData as WhyChooseUsData;

const WhyChooseUs = () => {
  return (
    <section className="section-pad bg-navy-800 text-white">
      <div className="container-px mx-auto max-w-7xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-gold-300">{why.sectionIntro.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
            {why.sectionIntro.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-100 sm:text-lg">
            {why.sectionIntro.description}
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {why.reasons.map((reason, idx) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
              className={`rounded-xl2 border border-white/10 bg-white/5 p-7 transition-colors duration-300 hover:bg-white/10 ${
                idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-gold-400/15 text-gold-300">
                <DynamicIcon name={reason.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-100">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

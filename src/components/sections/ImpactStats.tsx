import { motion } from 'framer-motion';
import AnimatedSection from '../AnimatedSection';
import DynamicIcon from '../DynamicIcon';
import CountUp from '../CountUp';
import GrowthArc from '../GrowthArc';
import impactData from '../../data/impact.json';
import type { ImpactData } from '../../types/data';

const impact = impactData as ImpactData;

const ImpactStats = () => {
  return (
    <section className="relative overflow-hidden section-pad bg-forest-700 text-white">
      <GrowthArc className="pointer-events-none absolute -right-20 -top-16 h-64 w-96 text-gold-300 opacity-20" />
      <GrowthArc className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-96 rotate-180 text-white opacity-10" />

      <div className="container-px relative mx-auto max-w-7xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-gold-200">{impact.sectionIntro.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
            {impact.sectionIntro.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-forest-50 sm:text-lg">
            {impact.sectionIntro.description}
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {impact.stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-xl2 border border-white/15 bg-white/10 p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-gold-200">
                <DynamicIcon name={stat.icon} className="h-6 w-6" />
              </div>
              <p className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
                <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-forest-50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;

import { motion } from 'framer-motion';
import GrowthArc from './GrowthArc';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

const PageHero = ({ eyebrow, title, description }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-navy-800 py-20 text-white sm:py-24">
      <GrowthArc className="pointer-events-none absolute -left-16 -top-8 h-56 w-80 text-gold-400 opacity-20 sm:-left-10" />
      <GrowthArc className="pointer-events-none absolute -bottom-20 right-0 h-56 w-80 rotate-180 text-forest-400 opacity-10" />

      <div className="container-px relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow justify-center text-gold-300"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 font-display text-4xl font-bold sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-base text-navy-100 sm:text-lg"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default PageHero;

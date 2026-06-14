import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import DynamicIcon from '../DynamicIcon';
import loanData from '../../data/loanProcess.json';
import type { LoanProcessData } from '../../types/data';

const loan = loanData as LoanProcessData;

interface LoanProcessSectionProps {
  showCta?: boolean;
}

const LoanProcessSection = ({ showCta = true }: LoanProcessSectionProps) => {
  return (
    <section className="section-pad bg-cream">
      <div className="container-px mx-auto max-w-7xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{loan.sectionIntro.eyebrow}</p>
          <h2 className="section-title mt-3">{loan.sectionIntro.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-500 sm:text-lg">
            {loan.sectionIntro.description}
          </p>
        </AnimatedSection>

        {/* Progress arc strip */}
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-navy-100 sm:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            className="absolute left-0 top-8 hidden h-0.5 w-full bg-gradient-to-r from-forest-500 via-gold-400 to-forest-500 sm:block"
          />

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {loan.steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-cream bg-navy-700 text-white shadow-card">
                  <DynamicIcon name={step.icon} className="h-6 w-6" />
                </div>
                <span className="mt-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                  Step {step.number}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-navy-800">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{step.description}</p>
                <span className="mt-3 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">
                  {step.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {showCta && (
          <AnimatedSection delay={0.2} className="mt-14 text-center">
            <Link to="/loan-process" className="btn-primary">
              Start Your Application
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default LoanProcessSection;

import { motion } from 'framer-motion';
import AnimatedSection from '../AnimatedSection';
import DynamicIcon from '../DynamicIcon';
import servicesData from '../../data/services.json';
import type { ServicesData } from '../../types/data';

const services = servicesData as ServicesData;

interface ServicesSectionProps {
  showDetails?: boolean;
  limit?: number;
}

const ServicesSection = ({ showDetails = false, limit }: ServicesSectionProps) => {
  const items = limit ? services.services.slice(0, limit) : services.services;

  return (
    <section className="section-pad bg-cream">
      <div className="container-px mx-auto max-w-7xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{services.sectionIntro.eyebrow}</p>
          <h2 className="section-title mt-3">{services.sectionIntro.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-500 sm:text-lg">
            {services.sectionIntro.description}
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
              className="card-surface flex flex-col p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-forest-50 text-forest-600">
                <DynamicIcon name={service.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-navy-800">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">{service.summary}</p>

              {showDetails && (
                <ul className="mt-5 space-y-2 border-t border-navy-100 pt-4">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex gap-2 text-sm text-navy-600">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-400" />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

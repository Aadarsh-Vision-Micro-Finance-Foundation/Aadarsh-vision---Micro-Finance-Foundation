import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import GrowthArc from '../GrowthArc';

interface CTABannerProps {
  title?: string;
  description?: string;
}

const CTABanner = ({
  title = 'Ready to take the next step toward financial growth?',
  description = 'Whether you need a loan to start a small business or want to join one of our financial literacy programs, our team is here to guide you.',
}: CTABannerProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest-600 to-forest-700 text-white">
      <GrowthArc className="pointer-events-none absolute -right-10 -top-10 h-56 w-80 text-gold-300 opacity-25" />
      <div className="container-px relative mx-auto max-w-5xl py-16 text-center sm:py-20">
        <AnimatedSection>
          <h2 className="font-display text-2xl font-bold sm:text-3xl lg:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-forest-50 sm:text-lg">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/loan-process"
              className="btn-primary-light w-full sm:w-auto"
            >
              Apply for Loan
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost-light w-full sm:w-auto">
              <Phone className="h-4 w-4" />
              Contact Us
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTABanner;

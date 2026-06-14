import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'section' | 'div';
}

const AnimatedSection = ({ children, className = '', delay = 0, as = 'div' }: AnimatedSectionProps) => {
  const transition = { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const };
  const animationProps = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition,
    className,
  };

  if (as === 'section') {
    return <motion.section {...animationProps}>{children}</motion.section>;
  }

  return <motion.div {...animationProps}>{children}</motion.div>;
};

export default AnimatedSection;

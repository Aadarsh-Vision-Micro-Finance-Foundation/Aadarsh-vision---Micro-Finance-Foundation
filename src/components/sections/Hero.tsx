import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import siteData from '../../data/site.json';
import logo from '../../assets/images/logo.jpeg';
import GrowthArc from '../GrowthArc';
import type { SiteData } from '../../types/data';

const site = siteData as SiteData;

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-800 via-navy-700 to-navy-800 text-white">
      {/* Decorative arcs echoing the logo */}
      <GrowthArc className="pointer-events-none absolute -left-24 top-10 h-64 w-96 text-gold-400 opacity-25 sm:left-[-10%]" />
      <GrowthArc className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-[28rem] rotate-180 text-forest-400 opacity-15 animate-float-slow" />

      <div className="container-px relative mx-auto grid max-w-7xl items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:py-28">
        {/* Text column */}
        <div className="text-center lg:text-left">
          {/* <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow justify-center text-gold-300 lg:justify-start"
          >
            {site.hero.eyebrow}
          </motion.p> */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.4rem]"
          >
            {site.hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base text-navy-100 sm:text-lg lg:mx-0"
          >
            {site.hero.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link to={site.hero.primaryCta.path} className="btn-primary w-full sm:w-auto">
              {site.hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to={site.hero.secondaryCta.path} className="btn-ghost-light w-full sm:w-auto">
              <Phone className="h-4 w-4" />
              {site.hero.secondaryCta.label}
            </Link>
          </motion.div>
        </div>

        {/* Logo / visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]"
        >
          <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm" />
          <div className="absolute inset-4 rounded-full border border-gold-300/30" />
          <div className="absolute inset-12 rounded-full border border-forest-300/20" />
          <img
            src={logo}
            alt="Aadarsh Vision Micro Finance Foundation logo"
            className="relative z-10 h-3/4 w-3/4 object-cover drop-shadow-2xl rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

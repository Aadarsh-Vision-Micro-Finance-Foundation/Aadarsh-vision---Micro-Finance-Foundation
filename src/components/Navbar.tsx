import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import siteData from '../data/site.json';
import logo from '../assets/images/logo.jpeg';
import type { SiteData } from '../types/data';

const site = siteData as SiteData;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-card backdrop-blur-sm' : 'bg-white/0'
      }`}
    >

      {/* Main nav */}
      <nav className="container-px mx-auto flex max-w-7xl items-center justify-between py-3" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-3" aria-label={`${site.organization.name} home`}>
          <img src={logo} alt="" className="h-12 w-12 rounded-full object-cover shadow-sm sm:h-14 sm:w-14" />
          <div className="leading-tight">
            <p className="font-display text-base font-bold text-navy-800 sm:text-lg">{site.organization.shortName}</p>
            <p className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-gold-700 sm:block">
              Micro Finance Foundation
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {site.nav.links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive ? 'text-forest-600' : 'text-navy-700 hover:text-forest-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link to={site.nav.cta.path} className="btn-primary">
            {site.nav.cta.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full border border-navy-100 p-2.5 text-navy-700 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-navy-100 bg-white lg:hidden"
          >
            <div className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
              {site.nav.links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-base font-semibold ${
                      isActive ? 'bg-forest-50 text-forest-700' : 'text-navy-700'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to={site.nav.cta.path} className="btn-primary mt-2 w-full">
                {site.nav.cta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

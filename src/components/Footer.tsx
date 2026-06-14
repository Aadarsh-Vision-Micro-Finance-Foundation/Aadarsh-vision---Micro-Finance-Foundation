import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import siteData from '../data/site.json';
import logo from '../assets/images/logo.jpeg';
import GrowthArc from './GrowthArc';
import type { SiteData } from '../types/data';

const site = siteData as SiteData;

const socialIcons: Record<string, typeof Facebook> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-800 text-navy-100">
      <GrowthArc className="pointer-events-none absolute -right-10 -top-10 h-48 w-72 text-gold-400 opacity-30" />

      <div className="container-px relative mx-auto max-w-7xl py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-12 w-12 rounded-full object-cover" />
              <p className="font-display text-lg font-bold text-white">{site.organization.shortName}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-navy-200">
              {site.organization.registrationNote}, working since {site.organization.founded} to bring
              fair credit and financial literacy to underserved communities across India.
            </p>
            <div className="mt-5 flex gap-3">
              {Object.entries(site.contact.social).map(([key, url]) => {
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${key} page`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 text-white transition-colors duration-200 hover:bg-forest-500"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-gold-300">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {site.footer.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-navy-100 transition-colors hover:text-gold-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-gold-300">Our Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-100">
              <li>Micro Loans</li>
              <li>Women Empowerment Programs</li>
              <li>Financial Literacy</li>
              <li>Small Business Support</li>
              <li>Savings & Development</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-gold-300">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-navy-100">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-300" />
                <span>
                  {site.contact.address.line1}
                  <br />
                  {site.contact.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 flex-shrink-0 text-gold-300" />
                <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="hover:text-gold-300">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-shrink-0 text-gold-300" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-gold-300">
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.footer.copyrightName}. All rights reserved.</p>
          <p>Designed for financial inclusion — built with care for communities across India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

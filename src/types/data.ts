export interface NavLink {
  label: string;
  path: string;
}

export interface CTALink {
  label: string;
  path: string;
}

export interface SiteData {
  organization: {
    name: string;
    shortName: string;
    tagline: string;
    registrationNote: string;
    founded: string;
  };
  nav: {
    links: NavLink[];
    cta: CTALink;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheading: string;
    primaryCta: CTALink;
    secondaryCta: CTALink;
    highlights: { label: string; value: string }[];
  };
  contact: {
    phone: string;
    phoneSecondary: string;
    email: string;
    supportEmail: string;
    address: { line1: string; line2: string };
    officeHours: string;
    mapEmbedUrl: string;
    social: Record<string, string>;
  };
  footer: {
    quickLinks: NavLink[];
    copyrightName: string;
  };
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface AboutData {
  intro: SectionIntro;
  mission: { title: string; description: string };
  vision: { title: string; description: string };
  values: { title: string; description: string }[];
  impactHighlight: {
    title: string;
    description: string;
    stats: { label: string; value: string }[];
  };
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  summary: string;
  details: string[];
}

export interface ServicesData {
  sectionIntro: SectionIntro;
  services: ServiceItem[];
}

export interface WhyChooseReason {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsData {
  sectionIntro: SectionIntro;
  reasons: WhyChooseReason[];
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  program: string;
  quote: string;
  result: string;
}

export interface ImpactData {
  sectionIntro: SectionIntro;
  stats: ImpactStat[];
  successStoriesIntro: SectionIntro;
  testimonials: Testimonial[];
}

export interface LoanStep {
  number: string;
  title: string;
  icon: string;
  description: string;
  duration: string;
}

export interface LoanProcessData {
  sectionIntro: SectionIntro;
  steps: LoanStep[];
  form: {
    loanTypes: string[];
    amountRanges: string[];
  };
}

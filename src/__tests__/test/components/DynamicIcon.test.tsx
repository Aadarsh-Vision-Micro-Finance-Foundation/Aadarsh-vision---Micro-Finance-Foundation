import { describe, expect, it } from 'vitest';
import { iconMap } from '../../../components/DynamicIcon';

import aboutData from '../../../data/about.json';
import impactData from '../../../data/impact.json';
import loanProcessData from '../../../data/loanProcess.json';
import servicesData from '../../../data/services.json';
import whyChooseUsData from '../../../data/whyChooseUs.json';
import siteData from '../../../data/site.json';

const collectIcons = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.flatMap(collectIcons);
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => {
      if (key === 'icon' && typeof child === 'string') {
        return [child];
      }

      return collectIcons(child);
    });
  }

  return [];
};

describe('data icon mappings', () => {
  it('all icon names used in data files exist in iconMap', () => {
    const icons = new Set(
      collectIcons([
        aboutData,
        impactData,
        loanProcessData,
        servicesData,
        whyChooseUsData,
        siteData,
      ])
    );

    expect(icons.size).toBeGreaterThan(0);

    for (const icon of icons) {
      expect(
        iconMap[icon],
        `Missing icon mapping for "${icon}"`
      ).toBeDefined();
    }
  });
});
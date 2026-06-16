import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import Navbar from '../../../components/Navbar';
import siteData from '../../../data/site.json';

const renderNavbar = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
    </MemoryRouter>
  );

describe('Navbar', () => {
  beforeEach(() => {
    // Reset scroll position before each test.
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('renders the organisation name and all nav links', () => {
    renderNavbar();

    expect(screen.getByText(siteData.organization.shortName)).toBeInTheDocument();

    siteData.nav.links.forEach((link) => {
      // Each link appears once in the desktop nav and once in the mobile menu markup.
      expect(screen.getAllByRole('link', { name: link.label }).length).toBeGreaterThan(0);
    });
  });

  it('renders the primary call-to-action button', () => {
    renderNavbar();
    expect(screen.getAllByRole('link', { name: siteData.nav.cta.label }).length).toBeGreaterThan(0);
  });

  it('marks the current page link as active', () => {
    renderNavbar('/about');
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    expect(aboutLinks[0]).toHaveAttribute('aria-current', 'page');
  });

  it('toggles the mobile menu open and closed', async () => {
    renderNavbar();
    const user = userEvent.setup();

    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);

    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(screen.getByRole('button', { name: /close menu/i }));

    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(document.body.style.overflow).toBe('');
  });

  it('applies a solid background once the page is scrolled', () => {
    const { container } = renderNavbar();
    const header = container.querySelector('header')!;

    expect(header.className).toContain('bg-white/0');

    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(header.className).toContain('bg-white/95');
  });
});
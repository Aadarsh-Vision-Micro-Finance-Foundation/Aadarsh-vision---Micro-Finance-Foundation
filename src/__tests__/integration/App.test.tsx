import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../../App';

// App.tsx wires up its own BrowserRouter, so route changes are driven via
// the History API rather than wrapping with MemoryRouter.
const renderAtPath = (path: string) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

describe('App routing', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders the Home page at "/"', () => {
    renderAtPath('/');
    expect(
      screen.getByRole('heading', { level: 1, name: /empowering today, prosperous tomorrow/i })
    ).toBeInTheDocument();
  });

  it('renders the About page at "/about"', () => {
    renderAtPath('/about');
    expect(
      screen.getByRole('heading', { level: 1, name: /building ladders, not handouts/i })
    ).toBeInTheDocument();
  });

  it('renders the Services page at "/services"', () => {
    renderAtPath('/services');
    expect(
      screen.getByRole('heading', { level: 1, name: /services built around real livelihoods/i })
    ).toBeInTheDocument();
  });

  it('renders the Impact page at "/impact"', () => {
    renderAtPath('/impact');
    expect(
      screen.getByRole('heading', { level: 1, name: /a decade of measurable change/i })
    ).toBeInTheDocument();
  });

  it('renders the Loan Process page at "/loan-process"', () => {
    renderAtPath('/loan-process');
    expect(
      screen.getByRole('heading', { level: 1, name: /start your application in minutes/i })
    ).toBeInTheDocument();
  });

  it('renders the Contact page at "/contact"', () => {
    renderAtPath('/contact');
    expect(screen.getByRole('heading', { level: 1, name: /we're here to help/i })).toBeInTheDocument();
  });

  it('renders the Privacy Policy page at "/privacy-policy"', () => {
    renderAtPath('/privacy-policy');
    expect(screen.getByRole('heading', { level: 1, name: /privacy policy/i })).toBeInTheDocument();
  });

  it('renders the 404 page for an unknown route', () => {
    renderAtPath('/this-route-does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  });

  it('always renders the Navbar and Footer around the page content', () => {
    renderAtPath('/about');
    expect(screen.getByRole('banner')).toBeInTheDocument();

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText(/quick links/i)).toBeInTheDocument();
  });
});
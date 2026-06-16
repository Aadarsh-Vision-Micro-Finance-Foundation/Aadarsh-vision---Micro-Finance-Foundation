import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Framer Motion uses IntersectionObserver.
// jsdom doesn't provide it, so we mock it.
class MockIntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly scrollMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];

  observe() {}
  unobserve() {}
  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// ScrollToTop and smooth scrolling
window.scrollTo = vi.fn();

// matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,

    addListener: vi.fn(),
    removeListener: vi.fn(),

    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),

    dispatchEvent: vi.fn(),
  })),
});
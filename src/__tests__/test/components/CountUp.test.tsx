import { act, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CountUp from '../../../components/CountUp';

// CountUp's animation only starts once the element is "in view". Mock
// framer-motion's useInView so it reports true immediately in jsdom
// (which has no real IntersectionObserver-driven layout).
vi.mock('framer-motion', () => ({
  useInView: () => true,
}));

describe('CountUp', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'performance'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts at 0', () => {
    render(<CountUp end={48000} suffix="+" />);
    expect(screen.getByText('0+')).toBeInTheDocument();
  });

  it('counts up to the end value once the animation completes', () => {
    render(<CountUp end={612} duration={1} />);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('612')).toBeInTheDocument();
  });

  it('formats large numbers using Indian digit grouping and applies prefix/suffix', () => {
    render(<CountUp end={48000} prefix="₹" suffix=" Cr" duration={1} />);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('₹48,000 Cr')).toBeInTheDocument();
  });
});
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollToTop from '../../../components/ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    vi.mocked(window.scrollTo).mockClear();
  });

  it('scrolls the window to the top on initial render', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0 })
    );
  });

  it('scrolls to the top again when the route changes', async () => {
    const App = () => (
      <>
        <ScrollToTop />
        <Link to="/about">About</Link>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About page</div>} />
        </Routes>
      </>
    );

    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const callsBeforeNavigation = vi.mocked(window.scrollTo).mock.calls.length;
    const user = userEvent.setup();

    await user.click(getByText('About'));

    expect(vi.mocked(window.scrollTo).mock.calls.length).toBeGreaterThan(
      callsBeforeNavigation
    );
  });
});
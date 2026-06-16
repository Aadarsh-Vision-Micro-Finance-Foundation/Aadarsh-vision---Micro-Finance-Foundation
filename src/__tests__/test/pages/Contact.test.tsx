import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import Contact from '../../../pages/Contact';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderContact = () =>
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

describe('Contact page', () => {
  it('shows validation errors when required fields are missing', async () => {
    renderContact();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/message should be at least 10 characters/i)).toBeInTheDocument();
  });

  it('rejects an invalid email address', async () => {
    renderContact();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), 'Meena Devi');
    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/message/i), 'I would like more information.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument();
  });

  it('clears a field error as soon as the user edits that field', async () => {
    renderContact();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/name/i), 'M');

    expect(screen.queryByText(/please enter your name/i)).not.toBeInTheDocument();
  });

  it('submits successfully with valid data and allows sending another message', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Message sent successfully.' }),
    } as Response);

    renderContact();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), 'Meena Devi');
    await user.type(screen.getByLabelText(/email/i), 'meena@example.com');
    await user.type(
      screen.getByLabelText(/message/i),
      'I would like to know more about your loan programmes.'
    );

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(globalThis.fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Meena Devi',
        email: 'meena@example.com',
        phone: '',
        subject: '',
        message: 'I would like to know more about your loan programmes.',
      }),
    });

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
    expect(screen.getByText(/meena@example\.com/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /send another message/i }));

    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
  });
});
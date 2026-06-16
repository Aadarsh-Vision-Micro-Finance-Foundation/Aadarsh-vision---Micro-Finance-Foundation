import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import LoanProcess from '../../../pages/LoanProcess';
import loanData from '../../../data/loanProcess.json';

// AnimatePresence's exit/enter transitions don't resolve in jsdom (there's
// no real animation frame loop), which would otherwise leave the component
// stuck showing the outgoing element. Render children directly instead.
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

const renderLoanProcess = () =>
  render(
    <MemoryRouter>
      <LoanProcess />
    </MemoryRouter>
  );

afterEach(() => {
  vi.restoreAllMocks();
});

describe('LoanProcess page', () => {
  it('shows validation errors when required fields are missing', async () => {
    renderLoanProcess();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /submit application/i }));

    expect(await screen.findByText(/please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid 10-digit mobile number/i)).toBeInTheDocument();
    expect(screen.getByText(/describe the purpose of the loan/i)).toBeInTheDocument();
  });

  it('rejects a mobile number that does not start with 6-9', async () => {
    renderLoanProcess();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/full name/i), 'Ramesh Yadav');
    await user.type(screen.getByLabelText(/mobile number/i), '5123456789');
    await user.type(
      screen.getByLabelText(/purpose of loan/i),
      'Working capital to buy more cattle for my dairy farm.'
    );
    await user.click(screen.getByRole('button', { name: /submit application/i }));

    expect(await screen.findByText(/enter a valid 10-digit mobile number/i)).toBeInTheDocument();
  });

  it('does not require email, but validates it if provided', async () => {
    renderLoanProcess();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/full name/i), 'Ramesh Yadav');
    await user.type(screen.getByLabelText(/mobile number/i), '9876543210');
    await user.type(screen.getByLabelText(/email address/i), 'not-an-email');
    await user.type(
      screen.getByLabelText(/purpose of loan/i),
      'Working capital to buy more cattle for my dairy farm.'
    );
    await user.click(screen.getByRole('button', { name: /submit application/i }));

    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument();
  });

  it('submits successfully with valid data, including the selected loan type and amount range', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        message: 'Loan application submitted successfully.',
      }),
    } as Response);

    renderLoanProcess();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/full name/i), 'Ramesh Yadav');
    await user.type(screen.getByLabelText(/mobile number/i), '9876543210');
    await user.selectOptions(screen.getByLabelText(/loan type/i), loanData.form.loanTypes[1]);
    await user.selectOptions(screen.getByLabelText(/loan amount range/i), loanData.form.amountRanges[2]);
    await user.type(
      screen.getByLabelText(/purpose of loan/i),
      'Working capital to buy more cattle for my dairy farm.'
    );

    await user.click(screen.getByRole('button', { name: /submit application/i }));

    expect(globalThis.fetch).toHaveBeenCalledWith('/api/loan-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Ramesh Yadav',
        phone: '9876543210',
        email: '',
        loanType: loanData.form.loanTypes[1],
        amountRange: loanData.form.amountRanges[2],
        purpose: 'Working capital to buy more cattle for my dairy farm.',
      }),
    });

    expect(await screen.findByText(/application received/i)).toBeInTheDocument();
    expect(screen.getByText(loanData.form.loanTypes[1])).toBeInTheDocument();
    expect(screen.getByText(loanData.form.amountRanges[2])).toBeInTheDocument();
    expect(screen.getByText(/9876543210/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /submit another application/i }));

    expect(screen.getByRole('button', { name: /submit application/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
  });
});
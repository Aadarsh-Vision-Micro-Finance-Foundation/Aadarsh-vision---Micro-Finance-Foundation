import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import PageHero from '../components/PageHero';
import LoanProcessSection from '../components/sections/LoanProcessSection';
import AnimatedSection from '../components/AnimatedSection';
import loanData from '../data/loanProcess.json';
import type { LoanProcessData } from '../types/data';

const loan = loanData as LoanProcessData;

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  loanType: string;
  amountRange: string;
  purpose: string;
}

const initialForm: FormState = {
  fullName: '',
  phone: '',
  email: '',
  loanType: loan.form.loanTypes[0],
  amountRange: loan.form.amountRanges[0],
  purpose: '',
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const LoanProcess = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Apply for Loan | Aadarsh Vision Micro Finance Foundation';
  }, []);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit mobile number.';
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.purpose.trim() || form.purpose.trim().length < 10) {
      newErrors.purpose = 'Please describe the purpose of the loan (at least 10 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <main>
      <PageHero
        eyebrow="Apply for a Loan"
        title="Start your application in minutes"
        description="Fill in your details below and a field officer from your nearest centre will contact you within 2 working days to begin the verification process."
      />

      <LoanProcessSection showCta={false} />

      {/* Application form */}
      <section className="section-pad bg-white">
        <div className="container-px mx-auto max-w-3xl">
          <AnimatedSection className="text-center">
            <p className="eyebrow justify-center">Loan Application</p>
            <h2 className="section-title mt-3">Tell us about your need</h2>
            <p className="mt-4 text-base leading-relaxed text-navy-500 sm:text-lg">
              This form is the first step — Step 01: Apply. There's no fee to apply, and submitting
              this form does not commit you to anything.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="mt-10 rounded-xl2 border border-navy-100 bg-cream p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-600">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-navy-800">Application received</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-navy-500 sm:text-base">
                    Thank you, {form.fullName.split(' ')[0]}. We've recorded your request for a{' '}
                    <span className="font-semibold text-navy-700">{form.loanType}</span> in the{' '}
                    <span className="font-semibold text-navy-700">{form.amountRange}</span> range. A field
                    officer will call you at {form.phone} within 2 working days to schedule a verification visit.
                  </p>
                  <button type="button" onClick={handleReset} className="btn-secondary mt-6">
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-navy-700">
                        Full Name <span className="text-forest-600">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={form.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-forest-500"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        placeholder="e.g. Meena Devi"
                      />
                      {errors.fullName && (
                        <p id="fullName-error" className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy-700">
                        Mobile Number <span className="text-forest-600">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-forest-500"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-700">
                      Email Address <span className="text-navy-400">(optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-forest-500"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="loanType" className="mb-1.5 block text-sm font-semibold text-navy-700">
                        Loan Type
                      </label>
                      <select
                        id="loanType"
                        value={form.loanType}
                        onChange={(e) => handleChange('loanType', e.target.value)}
                        className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-forest-500"
                      >
                        {loan.form.loanTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="amountRange" className="mb-1.5 block text-sm font-semibold text-navy-700">
                        Loan Amount Range
                      </label>
                      <select
                        id="amountRange"
                        value={form.amountRange}
                        onChange={(e) => handleChange('amountRange', e.target.value)}
                        className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-forest-500"
                      >
                        {loan.form.amountRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="purpose" className="mb-1.5 block text-sm font-semibold text-navy-700">
                      Purpose of Loan <span className="text-forest-600">*</span>
                    </label>
                    <textarea
                      id="purpose"
                      rows={4}
                      value={form.purpose}
                      onChange={(e) => handleChange('purpose', e.target.value)}
                      className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-forest-500"
                      aria-invalid={!!errors.purpose}
                      aria-describedby={errors.purpose ? 'purpose-error' : undefined}
                      placeholder="e.g. Working capital to expand my tailoring shop and purchase a second sewing machine."
                    />
                    {errors.purpose && (
                      <p id="purpose-error" className="mt-1.5 text-xs text-red-600">{errors.purpose}</p>
                    )}
                  </div>

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Submit Application
                    <Send className="h-4 w-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default LoanProcess;

import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import siteData from '../data/site.json';
import type { SiteData } from '../types/data';

const site = siteData as SiteData;

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

type FormErrors = Partial<Record<keyof ContactFormState, string>>;

const Contact = () => {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    document.title = 'Contact Us | Aadarsh Vision Micro Finance Foundation';
  }, []);

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Message could not be sent. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    setSubmitError('');
  };

  const infoCards = [
    {
      icon: Phone,
      title: 'Call Us',
      lines: [site.contact.phone, site.contact.phoneSecondary],
      href: `tel:${site.contact.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: [site.contact.email, site.contact.supportEmail],
      href: `mailto:${site.contact.email}`,
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: [site.contact.address.line1, site.contact.address.line2],
    },
    {
      icon: Clock,
      title: 'Office Hours',
      lines: [site.contact.officeHours],
    },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Get In Touch"
        title="We're here to help"
        description="Have a question about loans, programmes, or partnerships? Reach out through any of the channels below — our team responds within one working day."
      />

      <section className="section-pad bg-cream">
        <div className="container-px mx-auto max-w-7xl">
          {/* Info cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {infoCards.map((card, idx) => {
              const Icon = card.icon;
              const content = (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-forest-50 text-forest-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-navy-800">{card.title}</h3>
                  {card.lines.map((line) => (
                    <p key={line} className="mt-1 text-sm text-navy-500">{line}</p>
                  ))}
                </>
              );
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="card-surface p-6"
                >
                  {card.href ? (
                    <a href={card.href} className="block focus-visible:outline-gold-400">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Form + Map */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <AnimatedSection className="rounded-xl2 border border-navy-100 bg-white p-6 sm:p-10">
              <p className="eyebrow">Send a Message</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy-800 sm:text-3xl">Drop us a line</h2>

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
                    <h3 className="mt-5 font-display text-xl font-bold text-navy-800">Message sent</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy-500">
                      Thanks, {form.name.split(' ')[0]}. We've received your message and will get back to you at{' '}
                      {form.email} soon.
                    </p>
                    <button type="button" onClick={handleReset} className="btn-secondary mt-6">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy-700">
                          Name <span className="text-forest-600">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-forest-500"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          placeholder="Your full name"
                        />
                        {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy-700">
                          Phone <span className="text-navy-400">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          inputMode="numeric"
                          value={form.phone}
                          onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-forest-500"
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-700">
                        Email <span className="text-forest-600">*</span>
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
                      {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-navy-700">
                        Subject <span className="text-navy-400">(optional)</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={form.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-forest-500"
                        placeholder="What is this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy-700">
                        Message <span className="text-forest-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-forest-500"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        placeholder="How can we help you?"
                      />
                      {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
                    </div>
                    {submitError && (
                      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {submitError}
                      </p>
                    )}

                    <button type="submit" className="btn-primary w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="h-4 w-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection delay={0.1} className="overflow-hidden rounded-xl2 border border-navy-100 shadow-card">
              <iframe
                title="Aadarsh Vision Micro Finance Foundation office location"
                src={site.contact.mapEmbedUrl}
                className="h-full min-h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

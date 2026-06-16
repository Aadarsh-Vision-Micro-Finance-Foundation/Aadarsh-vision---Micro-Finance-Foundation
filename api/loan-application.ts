
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  try {
    const organizationEmail = process.env.ORGANIZATION_EMAIL;
    const fromEmail = process.env.FROM_EMAIL || 'Aadarsh Vision <onboarding@resend.dev>';

    if (!process.env.RESEND_API_KEY || !organizationEmail) {
      return res.status(500).json({ message: 'Server email configuration missing.' });
    }

    const {
      fullName,
      phone,
      email = '',
      loanType,
      amountRange,
      purpose,
    } = req.body ?? {};

    const cleanFullName = String(fullName || '').trim();
    const cleanPhone = String(phone || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanLoanType = String(loanType || '').trim();
    const cleanAmountRange = String(amountRange || '').trim();
    const cleanPurpose = String(purpose || '').trim();

    if (!cleanFullName || !cleanPhone || !cleanLoanType || !cleanAmountRange || !cleanPurpose) {
      return res.status(400).json({
        message: 'Name, phone, loan type, amount range and purpose are required.',
      });
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({ message: 'Enter a valid 10-digit mobile number.' });
    }

    if (cleanEmail && !isValidEmail(cleanEmail)) {
      return res.status(400).json({ message: 'Enter a valid email address.' });
    }

    if (
      cleanFullName.length > 50 ||
      cleanPhone.length > 10 ||
      cleanEmail.length > 100 ||
      cleanLoanType.length > 80 ||
      cleanAmountRange.length > 80
    ) {
      return res.status(400).json({ message: 'Input too long.' });
    }

    if (cleanPurpose.length < 10 || cleanPurpose.length > 1000) {
      return res.status(400).json({
        message: 'Purpose must be between 10 and 1000 characters.',
      });
    }

    const safeFullName = escapeHtml(cleanFullName);
    const safePhone = escapeHtml(cleanPhone);
    const safeEmail = escapeHtml(cleanEmail || 'N/A');
    const safeLoanType = escapeHtml(cleanLoanType);
    const safeAmountRange = escapeHtml(cleanAmountRange);
    const safePurpose = escapeHtml(cleanPurpose).replace(/\n/g, '<br/>');

    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    await resend.emails.send({
      from: fromEmail,
      to: [organizationEmail],
      replyTo: cleanEmail || organizationEmail,
      subject: `New Loan Application: ${cleanFullName}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;background:#f5f5f5;">
          <div style="max-width:650px;margin:auto;background:white;border-radius:12px;padding:24px;border:1px solid #ddd;">
            <h2 style="color:#12372a;margin-top:0;">New Loan Application</h2>

            <p style="color:#666;">Submitted on ${submittedAt}</p>

            <hr />

            <p><strong>Full Name:</strong> ${safeFullName}</p>
            <p><strong>Mobile Number:</strong> ${safePhone}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Loan Type:</strong> ${safeLoanType}</p>
            <p><strong>Amount Range:</strong> ${safeAmountRange}</p>

            <h3>Purpose of Loan</h3>

            <div style="background:#f9fafb;padding:16px;border-radius:8px;border:1px solid #e5e7eb;line-height:1.7;">
              ${safePurpose}
            </div>

            <div style="margin-top:20px;padding:12px;background:#ecfdf5;border-left:4px solid #10b981;">
              Contact the applicant using the phone number above. If email is available, reply directly to this email.
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Loan application submitted successfully.' });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Loan application could not be submitted. Please try again later.',
    });
  }
}
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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed.',
    });
  }

  try {
    const organizationEmail = process.env.ORGANIZATION_EMAIL;
    const fromEmail =
      process.env.FROM_EMAIL ||
      'Aadarsh Vision <onboarding@resend.dev>';

    if (!process.env.RESEND_API_KEY || !organizationEmail) {
      return res.status(500).json({
        message: 'Server email configuration missing.',
      });
    }

    const {
      name,
      email,
      phone = '',
      subject = '',
      message,
    } = req.body ?? {};

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();
    const cleanSubject = String(subject).trim();
    const cleanMessage = String(message).trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({
        message: 'Name, email and message are required.',
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        message: 'Invalid email address.',
      });
    }

    if (
      cleanName.length > 100 ||
      cleanEmail.length > 150 ||
      cleanPhone.length > 20 ||
      cleanSubject.length > 150
    ) {
      return res.status(400).json({
        message: 'Input too long.',
      });
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
      return res.status(400).json({
        message: 'Message must be between 10 and 2000 characters.',
      });
    }

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safePhone = escapeHtml(cleanPhone || 'N/A');
    const safeSubject = escapeHtml(
      cleanSubject || 'Website Contact Form'
    );
    const safeMessage = escapeHtml(cleanMessage).replace(
      /\n/g,
      '<br/>'
    );

    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    await resend.emails.send({
      from: fromEmail,
      to: [organizationEmail],
      replyTo: cleanEmail,
      subject: `New Contact Enquiry: ${cleanSubject || 'Website Contact Form'}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;background:#f5f5f5;">
          <div style="max-width:650px;margin:auto;background:white;border-radius:12px;padding:24px;border:1px solid #ddd;">

            <h2 style="color:#12372a;margin-top:0;">
              New Contact Form Submission
            </h2>

            <p style="color:#666;">
              Submitted on ${submittedAt}
            </p>

            <hr />

            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>

            <h3>Message</h3>

            <div
              style="
                background:#f9fafb;
                padding:16px;
                border-radius:8px;
                border:1px solid #e5e7eb;
                line-height:1.7;
              "
            >
              ${safeMessage}
            </div>

            <div
              style="
                margin-top:20px;
                padding:12px;
                background:#ecfdf5;
                border-left:4px solid #10b981;
              "
            >
              Reply to this email to respond directly to the sender.
            </div>

          </div>
        </div>
      `,
    });

    return res.status(200).json({
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Email sending failed.',
    });
  }
}
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY!);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  orderNumber?: string;
  company?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Honeypot check - company field should be empty
    if (body.company && body.company.trim() !== '') {
      // Silently fail for honeypot spam
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const contactTo = process.env.CONTACT_TO_EMAIL || 'andy@peptideapex.com';
    const timestamp = new Date().toLocaleString('en-AU', {
      timeZone: 'Australia/Melbourne',
    });

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e293b; margin-bottom: 24px;">New Contact Form Submission</h2>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0 0 12px 0; color: #333;">
            <strong>From:</strong> ${body.name} (${body.email})
          </p>
          <p style="margin: 0 0 12px 0; color: #333;">
            <strong>Subject:</strong> ${body.subject}
          </p>
          ${body.orderNumber ? `<p style="margin: 0; color: #333;"><strong>Order Number:</strong> ${body.orderNumber}</p>` : ''}
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="color: #1e293b; margin-top: 0; margin-bottom: 12px;">Message:</h3>
          <p style="color: #475569; line-height: 1.6; white-space: pre-wrap; margin: 0;">
            ${body.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </p>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; color: #64748b; font-size: 12px;">
          <p style="margin: 0;">Timestamp: ${timestamp}</p>
          <p style="margin: 0;">Reply-To: ${body.email}</p>
        </div>
      </div>
    `;

    // Send email to site owner
    try {
      const result = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL!,
        to: contactTo,
        replyTo: body.email,
        subject: `New Contact Form: ${body.subject}`,
        html: emailHtml,
      });

      if (result?.error) {
        console.error('Resend error (contact):', result.error);
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        );
      }
    } catch (err) {
      console.error('Resend send threw (contact):', err);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

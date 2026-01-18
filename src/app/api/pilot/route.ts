import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // ✅ BUILD-SAFE GUARD
    if (!apiKey) {
      console.warn('RESEND_API_KEY not set — skipping email send');
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(apiKey);

    const data = await req.json();

    await resend.emails.send({
      from: 'PilotRoom <onboarding@resend.dev>',
      to: ['info@cryptocardia.ca'],
      subject: 'New Pilot Submission',
      html: `<pre>${JSON.stringify(data, null, 2)}</pre>`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const emailHtml = `
      <h2>New Pilot Submission</h2>
      <pre>${JSON.stringify(body, null, 2)}</pre>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: '🚀 New PilotRoom Submission',
      html: emailHtml,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return new Response('Error sending email', { status: 500 });
  }
}

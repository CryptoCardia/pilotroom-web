import { Resend } from 'resend';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const data = await req.json();

  await resend.emails.send({
    from: 'PilotRoom <onboarding@resend.dev>',
    to: ['jory2339@gmail.com'],
    subject: 'New Pilot Submission',
    html: `<pre>${JSON.stringify(data, null, 2)}</pre>`
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

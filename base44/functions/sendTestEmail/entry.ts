import { secrets } from 'base44:runtime';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
// Mittente di prova Resend: consegna solo all'email con cui ti sei iscritto a Resend.
// Sostituire con un indirizzo del dominio verificato (es. prenotazioni@arco-tuodominio.it) quando pronto.
const FROM = 'onboarding@resend.dev';

export default async function(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const to = body.to || 'angelomaffeis55@gmail.com';
    const subject = body.subject || 'Arco — email di prova';
    const html = body.html || `<p>Test di consegna email dal sito <strong>Arco Trattoria con Vista</strong>.</p><p>Se ricevi questo messaggio, l'integrazione Resend funziona correttamente.</p>`;

    const apiKey = secrets.get('RESEND_API_KEY');
    if (!apiKey) return Response.json({ error: 'RESEND_API_KEY non impostata' }, { status: 500 });

    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ from: FROM, to, subject, html })
    });

    const data = await res.json();
    if (!res.ok) return Response.json({ error: 'Resend error', details: data }, { status: res.status });
    return Response.json({ ok: true, to, id: data.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
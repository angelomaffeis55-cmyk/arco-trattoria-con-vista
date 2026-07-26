import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
// Mittente di prova Resend: consegna solo all'email con cui ti sei iscritto a Resend.
// Sostituire con un indirizzo del dominio verificato (es. prenotazioni@arco-tuodominio.it) quando pronti.
const FROM = 'onboarding@resend.dev';
const OWNER_EMAIL = 'angelomaffeis55@gmail.com';

async function sendEmail(apiKey, payload) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, ...payload })
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export default async function(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, phone, date, time, guests, notes } = body;
    if (!name || !email || !phone || !date || !time || !guests) {
      return Response.json({ error: 'Dati prenotazione incompleti' }, { status: 400 });
    }

    const apiKey = secrets.get('RESEND_API_KEY');
    if (!apiKey) return Response.json({ error: 'RESEND_API_KEY non impostata' }, { status: 500 });

    const base44 = createClientFromRequest(req);
    const reservation = await base44.asServiceRole.entities.Reservation.create({
      name, email, phone, date, time, guests, notes: notes || '', status: 'pending'
    });

    const prettyDate = new Date(date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });

    // Notifica al proprietario
    const ownerHtml = `
      <div style="font-family: Georgia, serif; max-width:560px; margin:auto; color:#1c1a18;">
        <h2 style="color:#a1491d;">Nuova richiesta di prenotazione</h2>
        <p>Hai ricevuto una nuova richiesta di prenotazione dal sito di <strong>Arco Trattoria con Vista</strong>.</p>
        <table style="border-collapse:collapse; font-family:sans-serif; font-size:14px;">
          ${row('Cliente', name)}
          ${row('Email', email)}
          ${row('Telefono', phone)}
          ${row('Data', prettyDate)}
          ${row('Ora', time)}
          ${row('Ospiti', guests)}
          ${row('Note', notes || '—')}
        </table>
        <p style="margin-top:24px; font-size:13px; color:#6b6356;">Ricordati di confermare la prenotazione contattando il cliente.</p>
      </div>`;

    // Conferma al cliente
    const clientHtml = `
      <div style="font-family: Georgia, serif; max-width:560px; margin:auto; color:#1c1a18;">
        <h2 style="color:#a1491d;">Grazie ${name}!</h2>
        <p>Abbiamo ricevuto la tua richiesta di prenotazione ad <strong>Arco Trattoria con Vista</strong>.</p>
        <p style="font-family:sans-serif; font-size:14px;">
          <strong>${guests} persone</strong> · ${prettyDate} alle <strong>${time}</strong>
        </p>
        <p>Ti contatteremo al più presto al numero ${phone} per confermare il tavolo.</p>
        <p style="margin-top:24px; font-size:13px; color:#6b63556;">Per conferme immediate: +39 335 5845810</p>
      </div>`;

    const ownerRes = await sendEmail(apiKey, { to: OWNER_EMAIL, subject: 'Nuova prenotazione — Arco', html: ownerHtml });
    const clientRes = await sendEmail(apiKey, { to: email, subject: 'Conferma richiesta prenotazione — Arco', html: clientHtml });

    return Response.json({
      ok: ownerRes.ok,
      reservationId: reservation.id,
      ownerSent: ownerRes.ok,
      clientSent: clientRes.ok,
      clientError: clientRes.ok ? null : clientRes.data
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function row(label, value) {
  return `<tr><td style="padding:6px 16px 6px 0; color:#a1491d; font-weight:bold; vertical-align:top;">${label}</td><td style="padding:6px 0;">${value}</td></tr>`;
}
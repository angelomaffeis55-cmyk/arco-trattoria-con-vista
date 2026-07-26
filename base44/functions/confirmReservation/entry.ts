import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';
import { verifyReservationId } from '../../shared/reservationToken.ts';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const FROM = 'onboarding@resend.dev';

async function sendEmail(apiKey, payload) {
  return await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, ...payload })
  });
}

function page(title, message, color) {
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} — Arco</title></head>
<body style="margin:0; background:#f9f7f2; font-family: Georgia, serif;">
<div style="max-width:480px; margin:60px auto; background:#fff; border-radius:16px; padding:48px 40px; text-align:center; box-shadow:0 8px 30px rgba(0,0,0,0.06);">
  <p style="font-size:11px; letter-spacing:0.4em; text-transform:uppercase; color:${color}; margin:0 0 8px;">Arco Trattoria con Vista</p>
  <h1 style="color:${color}; font-size:30px; margin:0 0 16px;">${title}</h1>
  <p style="font-family: Montserrat, sans-serif; font-size:15px; line-height:1.6; color:#3f3a33; margin:0;">${message}</p>
</div>
</body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

export default async function(req) {
  try {
    const url = new URL(req.url);
    let id = url.searchParams.get('id');
    let token = url.searchParams.get('t');
    let action = url.searchParams.get('action');
    if (!id || !token) {
      const body = await req.json().catch(() => ({}));
      id = id || body.id;
      token = token || body.t;
      action = action || body.action;
    }
    action = action === 'cancel' ? 'cancel' : 'confirm';

    if (!id || !token) return page('Link non valido', 'Il link non contiene i dati necessari.', '#a1491d');
    if (!(await verifyReservationId(id, token))) {
      return page('Link non valido', 'Il link di conferma non è valido o è stato manomesso.', '#a1491d');
    }

    const base44 = createClientFromRequest(req);
    const reservation = await base44.asServiceRole.entities.Reservation.get(id);
    if (!reservation) return page('Prenotazione non trovata', 'Non risulta nessuna prenotazione associata a questo link.', '#a1491d');

    const apiKey = secrets.get('RESEND_API_KEY');

    if (action === 'confirm') {
      if (reservation.status === 'confirmed') {
        return page('Già confermata', 'Questa prenotazione risulta già confermata. Nessuna modifica necessaria.', '#3f7d4a');
      }
      if (reservation.status === 'cancelled') {
        return page('Prenotazione rifiutata', 'Questa prenotazione era stata rifiutata. Se vuoi confermarla, ricrea la richiesta dal sito.', '#a1491d');
      }
      await base44.asServiceRole.entities.Reservation.update(id, { status: 'confirmed' });

      const prettyDate = new Date(reservation.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
      if (apiKey) {
        const clientHtml = `
          <div style="font-family: Georgia, serif; max-width:560px; margin:auto; color:#1c1a18;">
            <h2 style="color:#3f7d4a;">Prenotazione confermata, ${reservation.name}!</h2>
            <p>La tua prenotazione ad <strong>Arco Trattoria con Vista</strong> è stata <strong>confermata</strong>.</p>
            <p style="font-family:sans-serif; font-size:14px; background:#f9f7f2; padding:16px; border-radius:8px;">
              <strong>${reservation.guests} persone</strong> · ${prettyDate} alle <strong>${reservation.time}</strong>
            </p>
            <p>Ti aspettiamo! Per qualsiasi modifica contattaci al +39 335 5845810.</p>
          </div>`;
        await sendEmail(apiKey, { to: reservation.email, subject: 'Prenotazione confermata — Arco', html: clientHtml });
      }
      return page('Prenotazione confermata', `Hai confermato la prenotazione di <strong>${reservation.name}</strong> per ${reservation.guests} persone il ${prettyDate} alle ${reservation.time}.<br>Una email di conferma è stata inviata a ${reservation.email}.`, '#3f7d4a');
    } else {
      if (reservation.status === 'cancelled') {
        return page('Già rifiutata', 'Questa prenotazione risulta già rifiutata.', '#a1491d');
      }
      await base44.asServiceRole.entities.Reservation.update(id, { status: 'cancelled' });
      return page('Prenotazione rifiutata', `La richiesta di <strong>${reservation.name}</strong> è stata rifiutata. Puoi eventualmente contattare il cliente al ${reservation.phone}.`, '#a1491d');
    }
  } catch (error) {
    return page('Errore', 'Si è verificato un errore durante la conferma: ' + error.message, '#a1491d');
  }
}
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

export default async function(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const id = body.id;
    const token = body.t;
    const action = body.action === 'cancel' ? 'cancel' : 'confirm';

    if (!id || !token) return Response.json({ ok: false, code: 'missing' });
    if (!(await verifyReservationId(id, token))) return Response.json({ ok: false, code: 'invalid' });

    const base44 = createClientFromRequest(req);
    const reservation = await base44.asServiceRole.entities.Reservation.get(id);
    if (!reservation) return Response.json({ ok: false, code: 'notfound' });

    const prettyDate = new Date(reservation.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });

    if (action === 'confirm') {
      if (reservation.status === 'confirmed') {
        return Response.json({ ok: true, code: 'already_confirmed', reservation, prettyDate });
      }
      if (reservation.status === 'cancelled') {
        return Response.json({ ok: false, code: 'was_cancelled' });
      }
      await base44.asServiceRole.entities.Reservation.update(id, { status: 'confirmed' });

      const apiKey = secrets.get('RESEND_API_KEY');
      let emailSent = false;
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
        const res = await sendEmail(apiKey, { to: reservation.email, subject: 'Prenotazione confermata — Arco', html: clientHtml });
        emailSent = res.ok;
      }
      return Response.json({ ok: true, code: 'confirmed', reservation, prettyDate, emailSent });
    }

    // cancel
    if (reservation.status === 'cancelled') {
      return Response.json({ ok: true, code: 'already_cancelled', reservation });
    }
    await base44.asServiceRole.entities.Reservation.update(id, { status: 'cancelled' });
    return Response.json({ ok: true, code: 'cancelled', reservation });
  } catch (error) {
    return Response.json({ ok: false, code: 'error', message: error.message });
  }
}
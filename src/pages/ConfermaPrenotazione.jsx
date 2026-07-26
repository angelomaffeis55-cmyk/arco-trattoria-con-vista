import React, { useEffect, useState } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { LOGO_IMG, RESTAURANT } from '@/components/arco/data';

export default function ConfermaPrenotazione() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get('id');
    const t = p.get('t');
    if (!id || !t) {
      setResult({ ok: false, code: 'missing' });
      setLoading(false);
      return;
    }
    base44.functions.invoke('confirmReservation', { id, t, action: 'confirm' })
      .then(setResult)
      .catch(() => setResult({ ok: false, code: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const ok = result?.ok && (result.code === 'confirmed' || result.code === 'already_confirmed');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <a href="/" className="inline-flex flex-col items-center gap-2 mb-8">
          <img src={LOGO_IMG} alt="Arco" className="h-12 w-12 rounded-full object-cover" />
          <span className="font-display text-xl tracking-wide leading-none">Arco
            <span className="block text-[0.55rem] tracking-[0.35em] uppercase text-muted-foreground font-body font-light mt-1">Trattoria con Vista</span>
          </span>
        </a>

        <div className="bg-card rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-10">
          {loading ? (
            <div className="py-6">
              <Loader2 size={34} className="mx-auto animate-spin text-primary" />
              <p className="mt-5 text-sm uppercase tracking-[0.2em] text-muted-foreground">Conferma in corso…</p>
            </div>
          ) : ok ? (
            <Confirmed result={result} />
          ) : (
            <ErrorState result={result} />
          )}
        </div>
      </div>
    </div>
  );
}

function Confirmed({ result }) {
  const r = result.reservation;
  const prettyDate = result.prettyDate || (r?.date ? new Date(r.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' }) : '');
  const emailSent = result.emailSent !== false;
  return (
    <>
      <div className="mx-auto h-20 w-20 rounded-full bg-[#3f7d4a]/10 flex items-center justify-center">
        <Check size={44} className="text-[#3f7d4a]" />
      </div>
      <h1 className="font-display text-3xl mt-5 text-foreground">Prenotazione confermata</h1>
      <p className="mt-2 text-muted-foreground">
        <strong className="text-foreground">{r?.name}</strong> · {r?.guests} persone
      </p>
      <p className="text-muted-foreground">{prettyDate} alle <strong className="text-foreground">{r?.time}</strong></p>
      <p className="mt-5 text-sm">
        {emailSent
          ? <>✓ Email di conferma inviata a <strong className="text-foreground">{r?.email}</strong></>
          : <span className="text-destructive">Prenotazione confermata, ma invio email al cliente non riuscito.</span>}
      </p>
    </>
  );
}

function ErrorState({ result }) {
  const msg = {
    missing: 'Link incompleto.',
    invalid: 'Link non valido o manomesso.',
    notfound: 'Nessuna prenotazione associata a questo link.',
    was_cancelled: 'Questa prenotazione era stata rifiutata.',
    error: 'Si è verificato un errore. Riprova più tardi.'
  }[result?.code] || 'Si è verificato un errore.';
  return (
    <>
      <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
        <AlertCircle size={32} className="text-primary" />
      </div>
      <h1 className="font-display text-2xl mt-5 text-foreground">Non riuscito</h1>
      <p className="mt-2 text-muted-foreground">{msg}</p>
    </>
  );
}
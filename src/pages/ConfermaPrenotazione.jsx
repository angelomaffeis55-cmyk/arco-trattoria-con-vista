import React, { useEffect, useState } from 'react';
import { Check, X, Loader2, CalendarDays, Clock, Users, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { LOGO_IMG, RESTAURANT } from '@/components/arco/data';

export default function ConfermaPrenotazione() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get('id');
    const t = p.get('t');
    const action = p.get('action') === 'cancel' ? 'cancel' : 'confirm';
    if (!id || !t) {
      setResult({ ok: false, code: 'missing' });
      setLoading(false);
      return;
    }
    base44.functions.invoke('confirmReservation', { id, t, action })
      .then(setResult)
      .catch(() => setResult({ ok: false, code: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">
        <div className="bg-card rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-10 sm:p-12 text-center">
          <a href="/" className="inline-flex items-center gap-3 mb-8">
            <img src={LOGO_IMG} alt="Arco" className="h-12 w-12 rounded-full object-cover" />
            <span className="font-display text-2xl tracking-wide">Arco
              <span className="block text-[0.6rem] tracking-[0.35em] uppercase text-muted-foreground font-body font-light">Trattoria con Vista</span>
            </span>
          </a>

          {loading ? <LoadingState /> : <Result result={result} />}
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="py-10">
      <Loader2 size={36} className="mx-auto animate-spin text-primary" />
      <p className="mt-5 text-sm uppercase tracking-[0.2em] text-muted-foreground">Verifica in corso…</p>
    </div>
  );
}

function Details({ reservation }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3 text-left">
      <Stat icon={<Users size={14} />} label="Ospiti" value={reservation?.guests || '—'} />
      <Stat icon={<CalendarDays size={14} />} label="Data" value={reservation?.date || '—'} />
      <Stat icon={<Clock size={14} />} label="Ora" value={reservation?.time || '—'} />
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-secondary/60 px-3 py-3 text-center">
      <span className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">{icon}{label}</span>
      <p className="mt-1 font-display text-lg text-foreground leading-none">{value}</p>
    </div>
  );
}

function Result({ result }) {
  if (!result) return <LoadingState />;
  const r = result.reservation;

  if (result.code === 'confirmed') {
    return (
      <>
        <Badge tone="ok"><Check size={26} /></Badge>
        <h1 className="font-display text-3xl mt-5 text-foreground">Prenotazione confermata</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Hai confermato la prenotazione di <strong className="text-foreground">{r?.name}</strong>.
          <span className="block mt-1.5">
            {result.emailSent
              ? <>Una <strong className="text-foreground">email di conferma</strong> è stata appena inviata a {r?.email}.</>
              : <>La prenotazione risulta confermata. (Impossibile inviare l'email automatica al cliente.)</>}
          </span>
        </p>
        <Details reservation={r} />
        <Footer />
      </>
    );
  }

  if (result.code === 'cancelled') {
    return (
      <>
        <Badge tone="ko"><X size={26} /></Badge>
        <h1 className="font-display text-3xl mt-5 text-foreground">Richiesta rifiutata</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          La richiesta di <strong className="text-foreground">{r?.name}</strong> è stata rifiutata.
          Puoi eventualmente contattare il cliente al <a href={`tel:${r?.phone}`} className="text-primary underline">{r?.phone}</a>.
        </p>
        <Footer />
      </>
    );
  }

  if (result.code === 'already_confirmed') {
    return (
      <>
        <Badge tone="ok"><Check size={26} /></Badge>
        <h1 className="font-display text-3xl mt-5 text-foreground">Già confermata</h1>
        <p className="mt-3 text-muted-foreground">Questa prenotazione risulta già confermata. Nessuna modifica necessaria.</p>
        <Details reservation={r} />
        <Footer />
      </>
    );
  }

  if (result.code === 'already_cancelled') {
    return (
      <>
        <Badge tone="ko"><X size={26} /></Badge>
        <h1 className="font-display text-3xl mt-5 text-foreground">Già rifiutata</h1>
        <p className="mt-3 text-muted-foreground">Questa prenotazione risulta già rifiutata.</p>
        <Footer />
      </>
    );
  }

  const msg = {
    missing: 'Il link non contiene i dati necessari.',
    invalid: 'Il link di conferma non è valido o è stato manomesso.',
    notfound: 'Non risulta nessuna prenotazione associata a questo link.',
    was_cancelled: 'Questa prenotazione era stata rifiutata. Per confermarla, ricrea la richiesta dal sito.',
    error: 'Si è verificato un errore. Riprova più tardi.'
  }[result.code] || 'Si è verificato un errore sconosciuto.';

  return (
    <>
      <Badge tone="warn"><AlertCircle size={26} /></Badge>
      <h1 className="font-display text-3xl mt-5 text-foreground">Non riuscito</h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">{msg}</p>
      <Footer />
    </>
  );
}

function Badge({ tone, children }) {
  const tones = {
    ok: 'bg-[#3f7d4a]/10 text-[#3f7d4a]',
    ko: 'bg-destructive/10 text-destructive',
    warn: 'bg-primary/10 text-primary'
  };
  return <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center ${tones[tone]}`}>{children}</div>;
}

function Footer() {
  return (
    <div className="mt-10 pt-6 border-t border-border">
      <a href={`tel:${RESTAURANT.phoneHref}`} className="text-sm text-muted-foreground">
        Serve aiuto? Chiama <span className="text-primary">{RESTAURANT.phone}</span>
      </a>
      <div className="mt-4">
        <a href="/" className="inline-flex rounded-full bg-primary px-7 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground">Torna al sito</a>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Check, Loader2 } from 'lucide-react';
import { useReservation } from './ReservationContext';
import { RESTAURANT } from './data';
import { base44 } from '@/api/base44Client';

export default function ReservationDrawer() {
  const { open, closeReservation } = useReservation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ date: '', time: '20:00', guests: '2', name: '', email: '', phone: '', note: '' });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await base44.functions.invoke('submitReservation', {
        name: form.name, email: form.email, phone: form.phone,
        date: form.date, time: form.time, guests: form.guests, notes: form.note
      });
      setSubmitted(true);
    } catch (err) {
      setError('Invio non riuscito. Riprova o chiamaci al ' + RESTAURANT.phone + '.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setError('');
    setForm({ date: '', time: '20:00', guests: '2', name: '', email: '', phone: '', note: '' });
    closeReservation();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeReservation}
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-500 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-border">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Prenotazione</p>
            <h3 className="font-display text-2xl mt-1">Un tavolo ad Arco</h3>
          </div>
          <button onClick={closeReservation} className="h-10 w-10 rounded-full hover:bg-secondary flex items-center justify-center" aria-label="Chiudi">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Check size={30} className="text-primary" />
            </div>
            <h4 className="font-display text-3xl mb-3">Grazie, {form.name || 'ospite'}!</h4>
            <p className="text-muted-foreground leading-relaxed mb-6">
              La tua richiesta per <strong className="text-foreground">{form.guests} persone</strong> il
              {' '}<strong className="text-foreground">{form.date || '—'}</strong> alle
              {' '}<strong className="text-foreground">{form.time}</strong> è in arrivo.
              Ti confermiamo al più presto al numero fornito.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Per conferme immediate chiama <a href={RESTAURANT.phoneHref} className="text-primary underline">{RESTAURANT.phone}</a>
            </p>
            <button onClick={reset} className="rounded-full bg-primary px-8 py-3 text-sm uppercase tracking-[0.18em] text-primary-foreground">
              Chiudi
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Vorrei unirmi a voi il <em>giorno</em> scelto, all'<em>ora</em> desiderata, in
              <em> compagnia</em>. Compila e ti ricontatteremo per confermare.
            </p>

            <Field label="Data" icon={<Calendar size={16} />}>
              <input type="date" required value={form.date} onChange={update('date')}
                className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none" />
            </Field>

            <div className="grid grid-cols-2 gap-5">
              <Field label="Ora" icon={<Clock size={16} />}>
                <select value={form.time} onChange={update('time')}
                  className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none">
                  {['12:30','13:00','13:30','19:00','19:30','20:00','20:30','21:00','21:30'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Ospiti" icon={<Users size={16} />}>
                <select value={form.guests} onChange={update('guests')}
                  className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none">
                  {['1','2','3','4','5','6','7','8','9','10+'].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Nome e cognome">
              <input type="text" required value={form.name} onChange={update('name')} placeholder="Mario Rossi"
                className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none placeholder:text-muted-foreground/50" />
            </Field>

            <Field label="Email">
              <input type="email" required value={form.email} onChange={update('email')} placeholder="mario@email.it"
                className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none placeholder:text-muted-foreground/50" />
            </Field>

            <Field label="Telefono">
              <input type="tel" required value={form.phone} onChange={update('phone')} placeholder="+39 ..."
                className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none placeholder:text-muted-foreground/50" />
            </Field>

            <Field label="Note (facoltativo)">
              <textarea value={form.note} onChange={update('note')} rows={2} placeholder="Intolleranze, occasioni speciali..."
                className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none placeholder:text-muted-foreground/50 resize-none" />
            </Field>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            <button type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Invio in corso</> : 'Richiedi prenotazione'}
            </button>
          </form>
        )}
      </aside>
    </>
  );
}

function Field({ label, icon, children }) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
        {icon}{label}
      </span>
      {children}
    </label>
  );
}
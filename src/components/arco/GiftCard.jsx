import React, { useState } from 'react';
import { Gift, Sparkles, Check, ChevronRight, Clock } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import { HERO_DISH_IMG, GALLERY } from './data';

const VOUCHER_PRICE = 80;

export default function GiftCard() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ buyerName: '', buyerEmail: '', recipientName: '', recipientEmail: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setSent(false);
      setForm({ buyerName: '', buyerEmail: '', recipientName: '', recipientEmail: '', message: '' });
    }, 200);
  };

  return (
    <section id="gift-card" className="relative py-24 sm:py-32 px-6 bg-secondary/40">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4 inline-flex items-center gap-2">
            <Sparkles size={14} /> Regala Arco
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
            Un regalo con vista
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-foreground/70 leading-relaxed text-balance">
            Regala un'esperienza alla trattoria, tra le prealpi Orobiche. Scegli il buono
            o prenota la cena romantica nel maso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Buono Regalo 80€ — Cena per due */}
          <article className="group flex flex-col overflow-hidden rounded-3xl bg-card border border-border shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="relative h-56 overflow-hidden">
              <img src={HERO_DISH_IMG} alt="Buono regalo Arco" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute top-4 left-4 rounded-full bg-primary px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-primary-foreground">Buono Regalo</span>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <h3 className="font-display text-3xl">Cena per due</h3>
              <p className="mt-2 text-foreground/70 text-sm leading-relaxed">
                Un buono regalo digitale da €{VOUCHER_PRICE} per una cena per due persone, valido su tutto il menù.
              </p>
              <div className="mt-5 space-y-2.5 text-foreground/75 text-sm">
                <Feature>Messaggio personalizzato per il destinatario</Feature>
                <Feature>Consegna digitale via email, pronta da stampare</Feature>
                <Feature>Validità 12 mesi su tutto il menù</Feature>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-display text-4xl">€{VOUCHER_PRICE}</span>
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs uppercase tracking-[0.22em] text-background hover:bg-foreground/90 transition-colors"
                >
                  Acquista <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </article>

          {/* Cena Romantica nel Maso — Coming soon */}
          <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-card border border-border shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="relative h-56 overflow-hidden">
              <img src={GALLERY[0]} alt="Cena romantica nel maso" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-foreground/85 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-background">
                <Clock size={12} /> Coming soon
              </span>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <h3 className="font-display text-3xl">Cena Romantica nel Maso</h3>
              <p className="mt-2 text-foreground/70 text-sm leading-relaxed">
                Una serata intima nel nostro maso storico: menu dedicato, calice di benvenuto e atmosfera unica per due.
              </p>
              <div className="mt-5 space-y-2.5 text-foreground/75 text-sm">
                <Feature>Esperienza esclusiva nel maso</Feature>
                <Feature>Menu degustazione per due</Feature>
                <Feature>Prenotazione dedicata</Feature>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Prossimamente</span>
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-full bg-muted px-7 py-3.5 text-xs uppercase tracking-[0.22em] text-muted-foreground cursor-not-allowed"
                >
                  Coming soon
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : close())}>
        <DialogContent className="max-w-lg">
          {sent ? (
            <div className="py-4 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Check size={30} className="text-primary" />
              </div>
              <DialogTitle className="font-display text-3xl mb-3">Grazie, {form.buyerName || 'grazie'}!</DialogTitle>
              <DialogDescription className="text-muted-foreground leading-relaxed">
                Il tuo buono regalo di <strong className="text-foreground">€{VOUCHER_PRICE}</strong> (cena per due) è stato registrato.
                Stiamo attivando i pagamenti online sul sito: riceverai subito il link per completare l'acquisto.
              </DialogDescription>
              <DialogClose asChild>
                <button
                  onClick={close}
                  className="mt-7 rounded-full bg-primary px-8 py-3 text-sm uppercase tracking-[0.18em] text-primary-foreground"
                >
                  Chiudi
                </button>
              </DialogClose>
            </div>
          ) : (
            <form onSubmit={submit}>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Buono regalo · Cena per due</DialogTitle>
                <DialogDescription>
                  Importo: <strong className="text-foreground">€{VOUCHER_PRICE}</strong>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-5 space-y-4">
                <Field label="Tuo nome">
                  <input required value={form.buyerName} onChange={update('buyerName')}
                    className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none" />
                </Field>
                <Field label="Tua email">
                  <input type="email" required value={form.buyerEmail} onChange={update('buyerEmail')}
                    className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none" />
                </Field>
                <Field label="Nome del destinatario">
                  <input required value={form.recipientName} onChange={update('recipientName')}
                    className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none" />
                </Field>
                <Field label="Email del destinatario">
                  <input type="email" required value={form.recipientEmail} onChange={update('recipientEmail')}
                    className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none" />
                </Field>
                <Field label="Messaggio (facoltativo)">
                  <textarea rows={2} value={form.message} onChange={update('message')}
                    className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none resize-none" />
                </Field>
              </div>
              <DialogFooter className="mt-7">
                <button type="submit"
                  className="w-full rounded-full bg-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2">
                  Conferma acquisto <Gift size={16} />
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Feature({ children }) {
  return (
    <div className="flex items-center gap-3">
      <Check size={16} className="text-primary" />
      <span>{children}</span>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
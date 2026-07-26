import React, { useState } from 'react';
import { Gift, Sparkles, Check, ChevronRight } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import { HERO_DISH_IMG, LOGO_IMG } from './data';

const AMOUNTS = [50, 100, 150, 250];

export default function GiftCard() {
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ buyerName: '', buyerEmail: '', recipientName: '', recipientEmail: '', message: '' });
  const [sent, setSent] = useState(false);

  const value = custom ? Math.max(10, Number(custom) || 0) : amount;
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
            Regala un'esperienza alla trattoria: una cena tra le prealpi Orobiche. Scegli l'importo,
            personalizza il messaggio e inviamo la gift card digitale al destinatario.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Card preview */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="arch-frame overflow-hidden shadow-2xl relative aspect-[4/5]">
              <img src={HERO_DISH_IMG} alt="Gift card Arco" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
              <div className="relative h-full flex flex-col justify-between p-7 text-white">
                <div className="flex items-center gap-3">
                  <img src={LOGO_IMG} alt="" className="h-9 w-9 rounded-full object-cover" />
                  <span className="font-display text-2xl">Arco</span>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/70">Gift Card</p>
                  <p className="font-display text-5xl mt-1">€{value}</p>
                  {form.recipientName && (
                    <p className="text-white/85 text-sm mt-3">Per {form.recipientName}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Selector */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Scegli l'importo</p>
            <div className="flex flex-wrap gap-3">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => { setAmount(a); setCustom(''); }}
                  className={`px-7 py-4 rounded-full text-lg font-display transition-all ${
                    !custom && amount === a
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background border border-border hover:border-primary text-foreground'
                  }`}
                >
                  €{a}
                </button>
              ))}
              <div className="relative">
                <input
                  type="number"
                  min={10}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Altro"
                  className="w-32 px-5 py-4 rounded-full bg-background border border-border focus:border-primary outline-none font-display text-lg placeholder:font-body placeholder:text-sm placeholder:text-muted-foreground/60"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">€</span>
              </div>
            </div>

            <div className="mt-10 space-y-3.5 text-foreground/75 text-sm">
              <Feature>Messaggio personalizzato per il destinatario</Feature>
              <Feature>Consegna digitale via email, pronta da stampare</Feature>
              <Feature>Validità 12 mesi su tutto il menù</Feature>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-9 py-4 text-xs uppercase tracking-[0.25em] text-background hover:bg-foreground/90 transition-colors"
            >
              Acquista online <ChevronRight size={16} />
            </button>
          </div>
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
                La tua gift card di <strong className="text-foreground">€{value}</strong> è stata registrata.
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
                <DialogTitle className="font-display text-2xl">Regala una gift card</DialogTitle>
                <DialogDescription>
                  Importo selezionato: <strong className="text-foreground">€{value}</strong>
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
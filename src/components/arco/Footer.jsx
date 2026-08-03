import React from 'react';
import { MapPin, Phone, Instagram } from 'lucide-react';
import { RESTAURANT, HOURS } from './data';
import { useReservation } from './ReservationContext';

export default function Footer() {
  const { openReservation } = useReservation();
  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="https://media.base44.com/images/public/6a66623b13a5257cb6038200/041b27e58_IMG_2254.jpeg" alt="Arco logo" className="h-11 w-11 rounded-full object-cover ring-2 ring-white/40" />
            <span className="font-display text-3xl">Arco</span>
          </div>
          <p className="text-white/75 leading-relaxed text-sm max-w-xs">
            {RESTAURANT.tagline}. Nuova apertura primavera 2025 ad Altino, Albino (BG).
          </p>
        </div>

        <div>
          <h4 className="font-display text-xl mb-4">Contatti</h4>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex gap-3"><MapPin size={16} className="text-white mt-0.5 shrink-0" /><span>{RESTAURANT.address}, {RESTAURANT.zip} {RESTAURANT.city}</span></li>
            <li className="flex gap-3"><Phone size={16} className="text-white mt-0.5 shrink-0" /><a href={RESTAURANT.phoneHref} className="hover:text-white">{RESTAURANT.phone}</a></li>
            <li className="flex gap-3"><Instagram size={16} className="text-white mt-0.5 shrink-0" /><a href={RESTAURANT.instagram} target="_blank" rel="noreferrer" className="hover:text-white">{RESTAURANT.instagramHandle}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-4">Orari</h4>
          <ul className="space-y-2 text-sm text-white/85">
            {HOURS.map((h) => (
              <li key={h.day} className="flex justify-between gap-4 border-b border-white/15 pb-2">
                <span>{h.day}</span>
                <span className="text-white/65 text-right text-xs">{h.time}</span>
              </li>
            ))}
          </ul>
          <button onClick={openReservation} className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90">
            Prenota un tavolo
          </button>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>© {new Date().getFullYear()} Arco Trattoria con Vista. Tutti i diritti riservati.</p>
          <p>Via Santuario di Altino 64, Albino (BG)</p>
        </div>
      </div>
    </footer>
  );
}
import React from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { LOGO_IMG, RESTAURANT } from './data';
import { useReservation } from './ReservationContext';

export default function Hero() {
  const { openReservation } = useReservation();
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background = the logo itself; its teal field fills the whole hero */}
      <div className="absolute inset-0">
        <img src={LOGO_IMG} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-background" />
      </div>

      {/* Echo arch motif */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34%] mx-auto max-w-5xl px-8">
        <div className="mx-auto h-full w-full max-w-3xl arch-top border-x border-t border-white/20" />
      </div>

      {/* Content — anchored lower so the logo's own ARCO reads as the title */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end text-center px-6 pb-24 sm:pb-28">
        <p className="mb-7 text-[0.7rem] sm:text-xs uppercase tracking-[0.5em] text-white/85 font-light">
          Albino · Valle Seriana
        </p>
        <p className="font-display italic text-4xl sm:text-5xl lg:text-6xl text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
          Trattoria con Vista
        </p>
        <p className="mt-6 max-w-xl text-sm sm:text-lg text-white/85 font-light leading-relaxed text-balance">
          Cucina tipica bergamasca tra le prealpi Orobiche. Materie prime del territorio,
          vista da cartolina, atmosfera da cartolina.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
          <button
            onClick={openReservation}
            className="rounded-full bg-background px-9 py-4 text-xs sm:text-sm uppercase tracking-[0.25em] text-primary hover:bg-background/90 transition-colors shadow-lg"
          >
            Prenota un tavolo
          </button>
          <a
            href={RESTAURANT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.25em] text-white/85 hover:text-white transition-colors"
          >
            <MapPin size={16} /> Come arrivare
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70">
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scopri</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  );
}
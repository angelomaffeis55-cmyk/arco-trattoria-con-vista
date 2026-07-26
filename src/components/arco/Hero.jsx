import React from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { LOGO_IMG, HERO_IMG, RESTAURANT } from './data';
import { useReservation } from './ReservationContext';

export default function Hero() {
  const { openReservation } = useReservation();
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background — cinematic golden hour */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
      </div>

      {/* Arch frame overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42%] mx-auto max-w-5xl px-8">
        <div className="mx-auto h-full w-full max-w-3xl arch-top border-x border-t border-white/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <p className="mb-9 text-[0.7rem] sm:text-xs uppercase tracking-[0.5em] text-white/80 font-light">
          Albino · Valle Seriana
        </p>

        {/* Brand crest */}
        <div className="relative">
          <span className="absolute -inset-3 rounded-full border border-white/25" aria-hidden="true" />
          <span className="absolute -inset-7 rounded-full border border-white/10" aria-hidden="true" />
          <img
            src={LOGO_IMG}
            alt="Arco"
            className="relative w-28 sm:w-32 lg:w-36 aspect-square rounded-full object-cover shadow-[0_12px_50px_rgba(0,0,0,0.5)]"
          />
        </div>

        <p className="mt-10 font-display italic text-3xl sm:text-4xl lg:text-5xl text-white/95 drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]">
          Trattoria con Vista
        </p>
        <p className="mt-6 max-w-xl text-sm sm:text-lg text-white/80 font-light leading-relaxed text-balance">
          Cucina tipica bergamasca tra le prealpi Orobiche. Materie prime del territorio,
          vista da cartolina, atmosfera da cartolina.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
          <button
            onClick={openReservation}
            className="rounded-full bg-primary px-9 py-4 text-xs sm:text-sm uppercase tracking-[0.25em] text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
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
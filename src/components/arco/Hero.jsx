import React from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { LOGO_IMG, RESTAURANT } from './data';
import { useReservation } from './ReservationContext';

export default function Hero() {
  const { openReservation } = useReservation();
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-foreground">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] sm:w-[100vw] lg:w-[80vw] aspect-square rounded-full blur-[2px] scale-110">
          <img src={LOGO_IMG} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-35" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background/40 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Arch frame overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[46%] mx-auto max-w-5xl px-8">
        <div className="mx-auto h-full w-full max-w-3xl arch-top border-x border-t border-white/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <p className="mb-7 text-[0.7rem] sm:text-xs uppercase tracking-[0.45em] text-white/75 font-light">
          Albino · Valle Seriana
        </p>
        {/* Logo — il suo marchio ARCO fa da titolo */}
        <img
          src={LOGO_IMG}
          alt="Arco"
          className="w-[58vw] max-w-[280px] sm:w-[36vw] sm:max-w-[340px] lg:max-w-[400px] aspect-square rounded-full object-cover drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
        />
        <p className="mt-7 text-base sm:text-xl uppercase tracking-[0.5em] sm:tracking-[0.6em] text-white/90 font-light">
          Trattoria con Vista
        </p>
        <p className="mt-6 max-w-xl text-sm sm:text-lg text-white/75 font-light leading-relaxed text-balance">
          Cucina tipica bergamasca tra le prealpi Orobiche. Materie prime del territorio,
          vista da cartolina, atmosfera da cartolina.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={openReservation}
            className="glass-dark rounded-full px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.25em] text-white border border-white/30 hover:bg-white/15 transition-colors"
          >
            Prenota un tavolo
          </button>
          <a
            href={RESTAURANT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors"
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
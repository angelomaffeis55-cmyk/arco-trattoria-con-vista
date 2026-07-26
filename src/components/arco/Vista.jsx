import React from 'react';
import { MapPin, Phone, Instagram } from 'lucide-react';
import { RESTAURANT, HOURS, TF } from './data';
import { Image } from '@/components/ui/image';
import { useReservation } from './ReservationContext';

export default function Vista() {
  const { openReservation } = useReservation();
  return (
    <section id="vista" className="relative overflow-hidden">
      {/* Parallax background */}
      <div className="relative h-[70vh] min-h-[480px] w-full">
        <div className="absolute inset-0 scale-110">
          <img
            src={TF("328653b9-9f7c-4690-aee9-95b9c1dce277.webp", 1600)}
            alt="Terrazza esterna con vista sulla valle"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-black/20 to-background/90" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-white/80 mb-4">La Vista</p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white leading-[0.95] max-w-3xl drop-shadow-lg">
            Una terrazza sulle<br />prealpi Orobiche
          </h2>
          <p className="mt-6 max-w-xl text-white/85 text-lg font-light leading-relaxed">
            Veranda esterna, camino e sedute in legno rustico: un balcone naturale dove
            il tramonto si gusta quanto il cibo.
          </p>
        </div>
      </div>

      {/* Info band */}
      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-10">
          <InfoBlock icon={<MapPin size={20} />} title="Dove siamo">
            <p>{RESTAURANT.address}</p>
            <p>{RESTAURANT.zip} {RESTAURANT.city}</p>
            <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer" className="text-primary-foreground/80 underline underline-offset-4 hover:text-primary">
              Apri in mappa
            </a>
          </InfoBlock>
          <InfoBlock icon={<Phone size={20} />} title="Orari">
            <ul className="space-y-1">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-background/80">{h.day}</span>
                  <span className="text-background/60 text-sm text-right">{h.time}</span>
                </li>
              ))}
            </ul>
          </InfoBlock>
          <InfoBlock icon={<Instagram size={20} />} title="Contatti">
            <a href={RESTAURANT.phoneHref} className="block hover:text-primary">{RESTAURANT.phone}</a>
            <a href={RESTAURANT.instagram} target="_blank" rel="noreferrer" className="block text-background/80 hover:text-primary">{RESTAURANT.instagramHandle}</a>
            <button onClick={openReservation} className="mt-3 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90">
              Prenota ora
            </button>
          </InfoBlock>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ icon, title, children }) {
  return (
    <div className="flex gap-4">
      <span className="shrink-0 text-primary">{icon}</span>
      <div>
        <h3 className="font-display text-2xl mb-3">{title}</h3>
        <div className="space-y-0.5 text-sm">{children}</div>
      </div>
    </div>
  );
}
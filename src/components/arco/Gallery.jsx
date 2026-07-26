import React from 'react';
import { Instagram } from 'lucide-react';
import { GALLERY, RESTAURANT } from './data';
import { Image } from '@/components/ui/image';

export default function Gallery() {
  return (
    <section id="galleria" className="relative py-24 sm:py-32 px-6 bg-secondary/40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">Social Archive</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Atmosfere & piatti
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Uno scorcio della vita ad Arco: la terrazza, la cucina, i dettagli.
          </p>
        </div>

        {/* Masonry */}
        <div className="columns-2 lg:columns-4 gap-4">
          {GALLERY.map((src, i) => (
            <div
              key={i}
              className={`mb-4 break-inside-avoid overflow-hidden ${i % 3 === 0 ? 'arch-frame' : 'rounded-2xl'} group`}
            >
              <Image
                src={src}
                alt={`Galleria Arco ${i + 1}`}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i % 2 === 0 ? 'h-64 sm:h-80' : 'h-48 sm:h-60'
                }`}
                fittingType="fill"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={RESTAURANT.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm uppercase tracking-[0.2em] text-background hover:bg-foreground/90 transition-colors"
          >
            <Instagram size={18} /> Seguici su Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
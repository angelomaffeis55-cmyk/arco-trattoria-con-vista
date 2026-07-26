import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS, RESTAURANT } from './data';

export default function Reviews() {
  return (
    <section id="recensioni" className="relative py-24 sm:py-32 px-6 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">Guest Chronicles</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Dicono di noi
          </h2>

          {/* Score summary */}
          <div className="mt-10 inline-flex flex-col items-center gap-3 rounded-full border border-border px-10 py-6">
            <div className="flex items-center gap-3">
              <span className="font-display text-6xl text-primary leading-none">{RESTAURANT.rating}</span>
              <div className="text-left">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">
                  {RESTAURANT.reviewsCount} recensioni
                </p>
              </div>
            </div>
            <div className="flex gap-6 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <span>Cibo {RESTAURANT.foodScore}</span>
              <span>Servizio {RESTAURANT.serviceScore}</span>
              <span>Atmosfera {RESTAURANT.atmosphereScore}</span>
            </div>
          </div>
        </div>

        {/* Wall of reviews */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {REVIEWS.map((r, i) => (
            <figure
              key={i}
              className="mb-6 break-inside-avoid rounded-3xl border border-border bg-card p-7 transition-shadow hover:shadow-lg"
            >
              <Quote size={26} className="text-primary/40 mb-3" />
              <blockquote className="text-foreground/85 leading-relaxed text-[0.95rem]">
                {r.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between">
                <span className="font-display text-lg">{r.author}</span>
                <span className="inline-flex items-center gap-1 text-sm text-primary">
                  <Star size={13} className="fill-primary" /> {r.score}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={RESTAURANT.thefork}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Vedi tutte su TheFork
          </a>
        </div>
      </div>
    </section>
  );
}
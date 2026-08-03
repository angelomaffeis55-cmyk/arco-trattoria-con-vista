import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { REVIEWS, RESTAURANT } from './data';

function GoogleLogo({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"/>
    </svg>
  );
}

function Stars({ score, size = 13 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < score ? 'fill-primary text-primary' : 'fill-muted-foreground/20 text-muted-foreground/20'} />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="recensioni" className="relative py-24 sm:py-32 px-6 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">Guest Chronicles</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Dicono di noi
          </h2>

          {/* Google summary */}
          <div className="mt-10 inline-flex flex-col items-center gap-5 rounded-3xl border border-border bg-card px-10 py-7 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-5">
              <GoogleLogo size={44} />
              <div className="text-left">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl text-foreground leading-none">{RESTAURANT.rating}</span>
                  <span className="text-2xl text-muted-foreground">/5</span>
                </div>
                <div className="mt-1.5"><Stars score={5} /></div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1.5">
                  {RESTAURANT.reviewsCount} recensioni
                </p>
              </div>
            </div>
            <a
              href={RESTAURANT.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-foreground/80 hover:border-primary hover:text-primary transition-colors"
            >
              <ExternalLink size={14} /> Aggiungi una recensione
            </a>
          </div>
        </div>

        {/* Wall of reviews */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {REVIEWS.map((r, i) => (
            <figure
              key={i}
              className="mb-6 break-inside-avoid rounded-3xl border border-border bg-card p-7 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <GoogleLogo size={22} />
                  <span className="font-display text-lg">{r.author}</span>
                </div>
                <Quote size={22} className="text-primary/30" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Stars score={Number(r.score)} />
                <span className="text-xs text-muted-foreground">{r.time}</span>
              </div>
              <blockquote className="text-foreground/80 leading-relaxed text-[0.95rem]">
                {r.text}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
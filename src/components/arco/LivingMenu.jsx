import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DISHES } from './data';
import { Image } from '@/components/ui/image';

export default function LivingMenu() {
  const scroller = useRef(null);
  const [active, setActive] = useState(null);

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-secondary/40">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Il Menu Vivente</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
              Il territorio, piatto dopo piatto
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={() => scrollBy(-1)} className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors" aria-label="Precedente">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scrollBy(1)} className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors" aria-label="Successivo">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 sm:px-[max(1.5rem,calc((100vw-80rem)/2))] pb-4"
      >
        {DISHES.map((dish, i) => (
          <article
            key={dish.name}
            className="group relative snap-start shrink-0 w-[78vw] sm:w-[360px] lg:w-[400px]"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="relative overflow-hidden arch-frame h-[440px] sm:h-[520px]">
              <Image
                src={dish.img}
                alt={dish.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                fittingType="fill"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {/* ingredient tooltip on hover */}
              <div className={`absolute top-4 right-4 glass-dark rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white transition-all duration-300 ${active === i ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                {dish.ingredient}
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6">
                <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">{dish.name}</h3>
                <p className={`mt-2 text-sm text-white/85 leading-relaxed transition-all duration-500 ${active === i ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  {dish.note}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-display text-lg italic text-muted-foreground">0{i + 1}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{dish.ingredient}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
import React from 'react';
import { Image } from '@/components/ui/image';

export default function About() {
  return (
    <section id="trattoria" className="relative py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">Il Proscenio</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
            Una trattoria come una<br />finestra sulle Orobie
          </h2>
          <div className="mt-7 space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Adagiata ad Altino, sopra Albino, <em>Arco</em> nasce dal desiderio di reinventare
              la trattoria di montagna: cucina tipica bergamasca fatta con materie prime del
              territorio, in un luogo dove la vista sulle prealpi Orobiche diventa parte del piatto.
            </p>
            <p>
              Il nome viene dall'arco di pietra che incornicia la valle. Qui ogni pasto è un
              proscenium: il palcoscenico sei tu, lo sfondo è la montagna, e la cucina racconta
              la tradizione con uno sguardo contemporaneo.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-3 gap-6">
            <Stat value="9,5" label="Su TheFork" />
            <Stat value="188" label="Recensioni" />
            <Stat value="2025" label="Nuova apertura" />
          </div>
        </div>

        {/* Image with arch */}
        <div className="order-1 lg:order-2 relative">
          <div className="relative mx-auto max-w-md">
            <div className="arch-frame overflow-hidden shadow-2xl">
              <Image
                src="https://cdn.thefork.com/tf-lab/image/upload/w_900,h_1100,c_fill,q_auto,f_jpg/restaurant/18352d30-e8f6-4b2f-9a4f-d387827ef2f2/bfeaeaa9-05bd-4f1d-b4dd-a3a46baacc2a.webp"
                alt="Interno della trattoria"
                className="h-[460px] sm:h-[560px] w-full object-cover"
                fittingType="fill"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block glass rounded-2xl px-6 py-4 shadow-lg">
              <p className="font-display text-3xl text-primary leading-none">38€</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Prezzo medio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="font-display text-4xl text-primary leading-none">{value}</p>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{label}</p>
    </div>
  );
}
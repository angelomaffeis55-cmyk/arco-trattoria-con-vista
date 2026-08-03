import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useReservation } from './ReservationContext';
import { LOGO_IMG } from './data';

const LINKS = [
  { label: 'La Trattoria', href: '#trattoria' },
  { label: 'Menu', href: '#menu' },
  { label: 'Cerimonie', href: '#cerimonie' },
  { label: 'Eventi', href: '#eventi' },
  { label: 'Galleria', href: '#galleria' },
  { label: 'Gift', href: '#gift-card' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openReservation } = useReservation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-brand text-white ${
        scrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.12)] py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#top" onClick={(e) => { e.preventDefault(); go('#top'); }} className="group flex items-center gap-3">
          <img src={LOGO_IMG} alt="Arco logo" className="h-11 w-11 rounded-full object-cover shrink-0 ring-2 ring-white/40" />
          <span className="font-display text-2xl tracking-wide text-white leading-none">
            Arco
            <span className="block text-[0.6rem] tracking-[0.35em] uppercase text-white/70 font-body font-light mt-1">
              Trattoria con Vista
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="relative text-sm uppercase tracking-[0.18em] text-white/85 hover:text-white transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all hover:after:w-full"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openReservation}
            className="hidden sm:inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Prenota
          </button>
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-96 bg-brand' : 'max-h-0'
        }`}
      >
        <nav className="px-6 py-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="text-left py-3 text-base uppercase tracking-[0.18em] text-white/85 border-b border-white/20"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); openReservation(); }}
            className="mt-3 rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-[0.18em] text-primary-foreground"
          >
            Prenota un tavolo
          </button>
        </nav>
      </div>
    </header>
  );
}
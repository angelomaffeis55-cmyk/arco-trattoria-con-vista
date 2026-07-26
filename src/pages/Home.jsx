import React from 'react';
import { ReservationProvider } from '@/components/arco/ReservationContext';
import Navbar from '@/components/arco/Navbar';
import Hero from '@/components/arco/Hero';
import About from '@/components/arco/About';
import LivingMenu from '@/components/arco/LivingMenu';
import Vista from '@/components/arco/Vista';
import Reviews from '@/components/arco/Reviews';
import Gallery from '@/components/arco/Gallery';
import Footer from '@/components/arco/Footer';
import ReservationDrawer from '@/components/arco/ReservationDrawer';

export default function Home() {
  return (
    <ReservationProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <About />
          <LivingMenu />
          <Vista />
          <Reviews />
          <Gallery />
        </main>
        <Footer />
        <ReservationDrawer />
      </div>
    </ReservationProvider>
  );
}
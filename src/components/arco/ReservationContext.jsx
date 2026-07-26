import React, { createContext, useContext, useState } from 'react';

const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openReservation = () => setOpen(true);
  const closeReservation = () => setOpen(false);
  return (
    <ReservationContext.Provider value={{ open, openReservation, closeReservation }}>
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservation = () => {
  const ctx = useContext(ReservationContext);
  if (!ctx) return { open: false, openReservation: () => {}, closeReservation: () => {} };
  return ctx;
};
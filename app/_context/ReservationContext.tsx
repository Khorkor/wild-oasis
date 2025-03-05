"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface IReservationContextValue {
  range: DateRange;
  setRange: (range: DateRange) => void;
  resetRange: () => void;
}

const ReservationContext = createContext<IReservationContextValue | undefined>(
  undefined,
);

const initialState: DateRange = { from: undefined, to: undefined };

interface ReservationProviderProps {
  children: ReactNode;
}

function ReservationProvider({ children }: ReservationProviderProps) {
  const [range, setRange] = useState<DateRange>(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation(): IReservationContextValue {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("Context was used outside provider");
  }
  return context;
}

export { ReservationProvider, useReservation };

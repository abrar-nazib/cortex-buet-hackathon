import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Session, Train, Route, Schedule, Seat, Booking, Passenger, Payment, PaymentTransaction } from  "@/utils/types";

// Define the context types
type AppState = {
  user: User | null;
  session: Session | null;
  trains: Train[];
  routes: Route[];
  schedules: Schedule[];
  seats: Seat[];
  bookings: Booking[];
  passengers: Passenger[];
  payments: Payment[];
  transactions: PaymentTransaction[];
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setTrains: (trains: Train[]) => void;
  setRoutes: (routes: Route[]) => void;
  setSchedules: (schedules: Schedule[]) => void;
  setSeats: (seats: Seat[]) => void;
  setBookings: (bookings: Booking[]) => void;
  setPassengers: (passengers: Passenger[]) => void;
  setPayments: (payments: Payment[]) => void;
  setTransactions: (transactions: PaymentTransaction[]) => void;
};

// Initial state
const initialState: AppState = {
  user: null,
  session: null,
  trains: [],
  routes: [],
  schedules: [],
  seats: [],
  bookings: [],
  passengers: [],
  payments: [],
  transactions: [],
  setUser: () => {},
  setSession: () => {},
  setTrains: () => {},
  setRoutes: () => {},
  setSchedules: () => {},
  setSeats: () => {},
  setBookings: () => {},
  setPassengers: () => {},
  setPayments: () => {},
  setTransactions: () => {},
};

// Create the context
const AppContext = createContext<AppState>(initialState);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [trains, setTrains] = useState<Train[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);

  return (
    <AppContext.Provider
      value={{
        user,
        session,
        trains,
        routes,
        schedules,
        seats,
        bookings,
        passengers,
        payments,
        transactions,
        setUser,
        setSession,
        setTrains,
        setRoutes,
        setSchedules,
        setSeats,
        setBookings,
        setPassengers,
        setPayments,
        setTransactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier access to context
export const useAppContext = () => useContext(AppContext);

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  User,
  Session,
  Route,
  Schedule,
  Seat,
  Booking,
  Passenger,
  Payment,
  PaymentTransaction,
  TrainResult,
  TrainSeatFare,
} from "@/utils/types";

// Define the context types
type AppState = {
  user: User | null;
  session: Session | null;
  trainResult: TrainResult[];
  trainSeatFare: TrainSeatFare| null;
  routes: Route[];
  schedules: Schedule[];
  seats: Seat[];
  bookings: Booking[];
  passengers: Passenger[];
  payments: Payment[];
  transactions: PaymentTransaction[];
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setTrainResults: (results: TrainResult[]) => void;
  setTrainSeatFare: (fareDetails: TrainSeatFare) => void;
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
  trainResult: [],
  trainSeatFare:null,
  routes: [],
  schedules: [],
  seats: [],
  bookings: [],
  passengers: [],
  payments: [],
  transactions: [],
  setUser: () => {},
  setSession: () => {},
  setTrainResults: () => {},
  setTrainSeatFare: () => {},
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
  const [routes, setRoutes] = useState<Route[]>([]);
  const [trainResult, setTrainResults] = useState<TrainResult[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [trainSeatFare, setTrainSeatFare] = useState<TrainSeatFare | null>(null);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);

  return (
    <AppContext.Provider
      value={{
        user,
        session,
        trainResult,
        routes,
        schedules,
        seats,
        bookings,
        passengers,
        payments,
        transactions,
        trainSeatFare,
        setUser,
        setSession,
        setTrainResults,
        setRoutes,
        setSchedules,
        setSeats,
        setBookings,
        setPassengers,
        setPayments,
        setTransactions,
        setTrainSeatFare,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier access to context
export const useAppContext = () => useContext(AppContext);

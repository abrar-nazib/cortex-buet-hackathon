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
  ConfirmedSeat
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
  bookings: Booking| null;
  passengers: Passenger[];
  payments: Payment[];
  transactions: PaymentTransaction[];
  confirmSeat: ConfirmedSeat | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setTrainResults: (results: TrainResult[]) => void;
  setTrainSeatFare: (fareDetails: TrainSeatFare) => void;
  setRoutes: (routes: Route[]) => void;
  setSchedules: (schedules: Schedule[]) => void;
  setSeats: (seats: Seat[]) => void;
  setBookings: (bookings: Booking) => void;
  setPassengers: (passengers: Passenger[]) => void;
  setPayments: (payments: Payment[]) => void;
  setTransactions: (transactions: PaymentTransaction[]) => void;
  setConfirmSeat: (confirmSeat: ConfirmedSeat) => void;
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
  bookings:null,
  passengers: [],
  payments: [],
  transactions: [],
  confirmSeat: null,
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
  setConfirmSeat: () => {},
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
  const [bookings, setBookings] = useState<Booking|null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [trainSeatFare, setTrainSeatFare] = useState<TrainSeatFare | null>(null);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [confirmSeat, setConfirmSeat] = useState<ConfirmedSeat | null>(null);

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
        confirmSeat,
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
        setConfirmSeat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier access to context
export const useAppContext = () => useContext(AppContext);

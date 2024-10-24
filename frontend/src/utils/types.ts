// Types

// Auth Service
export type User = {
  pk: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type Session = {
  token: string;
};

// Define the TrainResult type
export type TrainResult = {
  id: string;
  source: string;
  destination: string;
  train: string;
  fare: number;
  date: string; // in "YYYY-MM-DD" format
  available_seats: number;
};

export type Route = {
  id: number;
  trainId: number;
  sourceStation: string;
  destinationStation: string;
  departureTime: string;
  arrivalTime: string;
  distance: number;
};

export type TrainSeatFare = {
  id: string;
  fare: number;
  date: string; // in "YYYY-MM-DD" format
};

export type Schedule = {
  id: number;
  routeId: number;
  date: Date;
  availableSeats: number;
  fare: number;
  status: string;
};

export type Seat = {
  id: string;
  seat_number: number;
  is_booked: boolean;
  coach_number: number;
};

// Booking Service

export type Booking = {
  id: number;
  userId: number;
  scheduleId: number;
  seatId: number;
  bookingReference: string;
  status: string;
  createdAt: Date;
  expiresAt: Date | null;
  totalAmount: number;
};

export type Passenger = {
  id: number;
  bookingId: number;
  name: string;
  age: number;
  gender: string;
  idType: string;
  idNumber: string;
};

// Payment Service
export type Payment = {
  id: number;
  bookingId: number;
  amount: number;
  paymentReference: string;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type PaymentTransaction = {
  id: number;
  paymentId: number;
  transactionReference: string;
  status: string;
  responseCode: string | null;
  responseMessage: string | null;
  createdAt: Date;
};

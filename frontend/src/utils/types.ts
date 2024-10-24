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

// "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "seat_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "amount_payable": 0,
//   "payment_done": true,
//   "booking_confirmed": true,
//   "expires_at": "2024-10-24T17:33:09.647Z"
export type Booking = {
  id: string;
  seatId: string;
  amountPayable: number;
  paymentDone: boolean;
  bookingConfirmed: boolean;
  expiresAt: Date;
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
// {
//   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "seat_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "amount_payable": 0,
//   "payment_done": true,
//   "booking_confirmed": true,
//   "expires_at": "2024-10-24T17:47:45.079Z"
// }
export type Payment = {
  id: string;
  seat_id: string;
  amount_payable: number;
  payment_done: boolean;
  booking_confirmed: boolean;
  expires_at: Date;
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

export type ConfirmedSeat = {
  seat_number: number;
  coach_number: number;
  train_fare: number;
  train_name: string;
  source: string;
  destination: string;
  date: string;
};

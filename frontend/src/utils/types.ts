// Types

// Auth Service
export type User = {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
  };
  
  export type Session = {
    token: string;
  };
  
  // Inventory Service
  export type Train = {
    id: number;
    trainNumber: string;
    trainName: string;
    totalSeats: number;
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
  
  export type Schedule = {
    id: number;
    routeId: number;
    date: Date;
    availableSeats: number;
    fare: number;
    status: string;  
  };
  
  export type Seat = {
    id: number;
    scheduleId: number;
    seatNumber: string;
    classType: string;
    status: string;
    version: number;
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
  
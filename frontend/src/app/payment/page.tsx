"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from '@/context';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Payment ()  {
  
  const router = useRouter(); // Initialize useRouter
  const { session,bookings } = useAppContext();
  if(!session?.token){
    router.push("/login");
  }
 // PaymentPage.tsx
const bookingId=bookings?.id;


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/booking/${bookingId}/payment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        toast({
          title: "Payment Successful",
          description: "Your payment was processed successfully.",
          variant: "success",
        });
      } else {
        toast({
          title: "Payment Failed",
          description: "There was an issue processing your payment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while processing the payment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-sm">
      <h1 className="text-xl font-bold mb-4">Payment Page</h1>
      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <Button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );


}

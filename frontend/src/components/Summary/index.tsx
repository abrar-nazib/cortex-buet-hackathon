"use client";

import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  MapPinIcon,
  TrainIcon,
  ArmchairIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { API_TRAIN } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/context";

type SeatInfo = {
  seat_number: number;
  coach_number: number;
  schedule: {
    id: string;
    fare: number;
    date: string;
    train: string;
    from: string;
    to: string;
  };
};

const Summary = () => {
  const { selectedSeat } = useAppContext();
  const [seatInfo, setSeatInfo] = useState<SeatInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeatInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const seatID = selectedSeat?.id; // Ensure correct access to seat_id
        console.log("Fetching seat info for seatID:", seatID); // Debugging statement
        if (!seatID) {
          throw new Error("Seat ID is undefined");
        }
        const response = await fetch(`${API_TRAIN}/trains/seats/${seatID}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch seat information");
        }
        const data: SeatInfo = await response.json();
        setSeatInfo({
          seat_number: data.seat_number,
          coach_number: data.coach_number,
          schedule: {
            id: data.schedule.id,
            fare: data.schedule.fare,
            date: data.schedule.date,
            train: data.schedule.train,
            from: data.schedule.from,
            to: data.schedule.to,
          },
        });
      } catch (err) {
        setError("An error occurred while fetching seat information.");
        toast({
          title: "Error",
          description: "Failed to load seat information. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSeatInfo();
  }, [selectedSeat]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !seatInfo) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="bg-destructive text-destructive-foreground">
          <CardTitle className="text-2xl font-bold text-center">
            Error
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-center">
            {error || "Unable to load seat information."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-2xl font-bold text-center">
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex justify-between items-center bg-secondary p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <ArmchairIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            <div>
              <span className="text-sm text-muted-foreground">Seat</span>
              <p
                className="text-lg font-semibold"
                aria-label={`Seat number ${seatInfo.seat_number}`}
              >
                {seatInfo.seat_number}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrainIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            <div>
              <span className="text-sm text-muted-foreground">Coach</span>
              <p
                className="text-lg font-semibold"
                aria-label={`Coach number ${seatInfo.coach_number}`}
              >
                {seatInfo.coach_number}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <TrainIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            <div>
              <span className="text-sm text-muted-foreground">Train</span>
              <p className="font-semibold">{seatInfo.schedule.train}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPinIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            <div>
              <span className="text-sm text-muted-foreground">Route</span>
              <p className="font-semibold">
                {seatInfo.schedule.from} to {seatInfo.schedule.to}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CalendarIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            <div>
              <span className="text-sm text-muted-foreground">Date</span>
              <p className="font-semibold">
                {new Date(seatInfo.schedule.date).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center bg-primary/10 p-4 rounded-lg">
          <span className="text-lg font-semibold">Total Fare</span>
          <Badge variant="secondary" className="text-xl font-bold px-3 py-1">
          ৳{seatInfo.schedule.fare.toFixed(2)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <Card className="w-full max-w-md mx-auto shadow-lg">
    <CardHeader className="bg-primary text-primary-foreground">
      <Skeleton className="h-8 w-3/4 bg-primary-foreground/20" />
    </CardHeader>
    <CardContent className="space-y-6 p-6">
      <div className="flex justify-between items-center bg-secondary p-4 rounded-lg">
        <Skeleton className="h-12 w-24" />
        <Skeleton className="h-12 w-24" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="h-px w-full" />
      <div className="flex justify-between items-center p-4 rounded-lg">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-32" />
      </div>
    </CardContent>
  </Card>
);

export default Summary;

"use client";

import { useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/context";
import { TrainResult } from "@/utils/types";
import { API_TRAIN, API_BOOKING } from "@/constants";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

// TrainItem component
export default function TrainItem({ train }: { train: TrainResult }) {
  const router = useRouter();
  const {
    seats,
    setSeats,
    setTrainSeatFare,
    user,
    bookings,
    setBookings,
    setSelectedSeat,
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [coachFilter, setCoachFilter] = useState("1");
  const [selectedSeatID, setSelectedSeatID] = useState<string | null>(null);
  const [otp, setOtp] = useState<string>(""); // For OTP input
  const [dialogOpen, setDialogOpen] = useState(false); // For Dialog open/close
  const [countdown, setCountdown] = useState(60); // 1-minute countdown for OTP
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch seats for the selected train
  const fetchSeats = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_TRAIN}/trains/schedules/${train.id}/`
      );
      if (!response.ok) throw new Error("Failed to fetch seats");
      const data = await response.json();
      setSeats(data.seats);
      setTrainSeatFare({
        id: data.id,
        fare: data.fare,
        date: data.date,
      });
    } catch (error) {
      console.error("Error fetching seats:", error);
      toast({
        title: "Error",
        description: "Failed to fetch seat information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Seat selection handler
  const verifySeat = async (seatId: string) => {
    try {
      const response = await fetch(`${API_BOOKING}/booking/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.pk,
          seat_id: seatId,
        }),
      });

      if (response.status === 400) {
        toast({
          title: "Seat Unavailable",
          description: "This seat has been booked. Please choose another.",
          variant: "destructive",
        });
        setSelectedSeatID(null);
        setSeats(
          seats.map((seat) =>
            seat.id === seatId ? { ...seat, is_booked: true } : seat
          )
        );
      } else {
        toast({
          title: "Seat Selected",
          description:
            "You have successfully selected this seat. Enter the OTP to confirm booking.",
        });
        const responseData = await response.json();
        setBookings(responseData);
        setSelectedSeatID(seatId);
        setDialogOpen(true); // Open OTP dialog after seat selection
        startCountdown(); // Start OTP countdown
      }
    } catch (error) {
      console.error("Error verifying seat:", error);
      toast({
        title: "Error",
        description: "Failed to verify seat availability",
        variant: "destructive",
      });
    }
  };

  // Start OTP countdown timer
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setDialogOpen(false); // Close dialog if timer ends
        }
        return prev - 1;
      });
    }, 1000);
  };

  // OTP Submission handler
  const submitOtp = async () => {
    setIsSubmitting(true);
    try {
      const bookinID = bookings?.id;
      const response = await fetch(
        `${API_BOOKING}/booking/${bookinID}/confirm/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: Number(otp) }),
        }
      );

      if (response.ok) {
        toast({
          title: "Booking Confirmed",
          description:
            "Your seat has been successfully booked. Proceeding to Payment.",
          variant: "success",
        });

        setDialogOpen(false); // Close dialog on successful booking

        router.push("/payment"); // Redirect to payment page
      } else {
        toast({
          title: "OTP Error",
          description: "Invalid OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast({
        title: "Error",
        description: "Failed to confirm the booking.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredSeats = coachFilter
    ? seats.filter((seat) => seat.coach_number === parseInt(coachFilter))
    : seats;

  return (
    <AccordionItem
      value={train.id}
      className="bg-primary/5 rounded-lg px-8 hover:bg-primary/15"
    >
      <AccordionTrigger onClick={fetchSeats}>
        <p>{train.train}</p>
        <p>{train.source}</p>
        <p>{train.destination}</p>
        <p>{train.date}</p>
        {train.fare}
      </AccordionTrigger>
      <AccordionContent>
        {loading ? (
          <p>Loading seats...</p>
        ) : (
          <>
            <div className="mb-4">
              <Label htmlFor="coachFilter">Filter by Coach Number:</Label>
              <select
                id="coachFilter"
                value={coachFilter}
                onChange={(e) => setCoachFilter(e.target.value)}
                className="mt-1"
              >
                <option value="1">Coach 1</option>
                <option value="2">Coach 2</option>
                <option value="3">Coach 3</option>
                <option value="4">Coach 4</option>
                <option value="5">Coach 5</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {filteredSeats.map((seat) => (
                <div key={seat.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={seat.id}
                    checked={selectedSeatID === seat.id}
                    onCheckedChange={() => {
                      if (selectedSeatID === seat.id) {
                        setSelectedSeatID(null); // Unselect the seat
                      } else if (!seat.is_booked) {
                        verifySeat(seat.id); // Select the seat and open OTP dialog
                        setSelectedSeat({ id: seat.id });
                      }
                    }}
                    disabled={
                      seat.is_booked ||
                      (selectedSeatID !== null && selectedSeatID !== seat.id)
                    }
                  />
                  <Label
                    htmlFor={seat.id}
                    className={`${seat.is_booked ? "text-gray-400" : ""} ${
                      selectedSeatID === seat.id
                        ? "text-green-600 font-bold"
                        : ""
                    }`}
                  >
                    Seat {seat.seat_number} (Coach {seat.coach_number})
                  </Label>
                </div>
              ))}
            </div>

            {/* OTP Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter OTP</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="otp">
                    Enter the 9-digit OTP sent to your phone:
                  </Label>
                  <Input
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP sent to your email"
                    className="mt-2"
                  />
                  <p className="text-gray-500 mt-2">
                    Time remaining: {countdown}s
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    onClick={submitOtp}
                    disabled={isSubmitting || otp.length == 0}
                  >
                    {isSubmitting ? "Submitting..." : "Submit OTP"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

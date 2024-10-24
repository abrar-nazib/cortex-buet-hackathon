"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/context";
import { TrainResult, Seat } from "@/utils/types";
import { API_TRAIN } from "@/constants";

// TrainItem component
export default function TrainItem({ train }: { train: TrainResult }) {
  const { seats, setSeats, setTrainSeatFare } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [coachFilter, setCoachFilter] = useState("1"); // Default value set to "1"
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

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

  const verifySeat = async (seatId: string) => {
    try {
      const response = await fetch(`/api/verify-seat/${seatId}`);

      if (response.status === 400) {
        toast({
          title: "Seat Unavailable",
          description: "This seat has been booked. Please choose another.",
          variant: "destructive",
        });
        setSelectedSeat(null);
        // Update the seats state to reflect the new booking status
        setSeats(
          seats.map((seat) =>
            seat.id === seatId ? { ...seat, is_booked: true } : seat
          )
        );
      } else {
        toast({
          title: "Seat Selected",
          description:
            "You have successfully selected this seat. You can now proceed to payment.",
        });
        setSelectedSeat(seatId);
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

  const filteredSeats = coachFilter
    ? seats.filter((seat) => seat.coach_number === parseInt(coachFilter))
    : seats;

  return (
    <AccordionItem
      value={train.id}
      className="bg-primary/5 rounded-lg px-8 hover:bg-primary/15  "
    >
      <AccordionTrigger
        onClick={fetchSeats}
        className="flex hover:no-underline text-md hover:font-semibold transition-all duration-100 ease-in-out"
      >
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
              {/* Dropdown for coach selection */}
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
                    checked={selectedSeat === seat.id}
                    onCheckedChange={() => {
                      if (selectedSeat === seat.id) {
                        setSelectedSeat(null); // Unselect the seat
                      } else if (!seat.is_booked) {
                        verifySeat(seat.id); // Select the seat
                      }
                    }}
                    disabled={
                      seat.is_booked ||
                      (selectedSeat !== null && selectedSeat !== seat.id)
                    }
                  />
                  <Label
                    htmlFor={seat.id}
                    className={`${seat.is_booked ? "text-gray-400" : ""} ${
                      selectedSeat === seat.id ? "text-green-600 font-bold" : ""
                    }`}
                  >
                    Seat {seat.seat_number} (Coach {seat.coach_number})
                  </Label>
                </div>
              ))}
            </div>
            {selectedSeat && (
              <Button
                className="mt-4"
                onClick={() => {
                  /* Implement booking logic here */
                }}
              >
                Book Selected Seat
              </Button>
            )}
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

// import {
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";

// import { toast } from "@/hooks/use-toast";
// import { useAppContext } from "@/context";
// import { TrainResult,Seat } from "@/utils/types";
// import { API_TRAIN } from "@/constants";

// // TrainItem component
// export default function TrainItem({ train }: { train: TrainResult }) {
//   const { seats, setSeats, setTrainSeatFare } = useAppContext();
//   const [loading, setLoading] = useState(false);
//   const [coachFilter, setCoachFilter] = useState("");
//   const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

//   const fetchSeats = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${API_TRAIN}/trains/schedules/${train.id}/`
//       );
//       if (!response.ok) throw new Error("Failed to fetch seats");
//       const data = await response.json();
//       setSeats(data.seats);
//       setTrainSeatFare({
//         id: data.id,
//         fare: data.fare,
//         date: data.date,
//       });
//     } catch (error) {
//       console.error("Error fetching seats:", error);
//       toast({
//         title: "Error",
//         description: "Failed to fetch seat information",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifySeat = async (seatId: string) => {
//     try {
//       const response = await fetch(`/api/verify-seat/${seatId}`);

//       if (response.status === 400) {
//         toast({
//           title: "Seat Unavailable",
//           description: "This seat has been booked. Please choose another.",
//           variant: "destructive",
//         });
//         setSelectedSeat(null);
//         // Update the seats state to reflect the new booking status
//         setSeats(
//             seats.map((seat) =>
//                 seat.id === seatId ? { ...seat, is_booked: true } : seat
//             )
//         );
//       } else {
//         toast({
//           title: "Seat Selected",
//           description: "You have successfully selected this seat. You can now proceed to payment.",
//         });
//         setSelectedSeat(seatId);
//       }
//     } catch (error) {
//       console.error("Error verifying seat:", error);
//       toast({
//         title: "Error",
//         description: "Failed to verify seat availability",
//         variant: "destructive",
//       });
//     }
//   };

//   const filteredSeats = coachFilter
//     ? seats.filter((seat) => seat.coach_number === parseInt(coachFilter))
//     : seats;

//   return (
//     <AccordionItem value={train.id}>
//       <AccordionTrigger onClick={fetchSeats}>
//         {train.train} - {train.source} to {train.destination} - {train.date} - $
//         {train.fare}
//       </AccordionTrigger>
//       <AccordionContent>
//         {loading ? (
//           <p>Loading seats...</p>
//         ) : (
//           <>
//             <div className="mb-4">
//               <Label htmlFor="coachFilter">Filter by Coach Number:</Label>
//               <Input
//                 id="coachFilter"
//                 type="number"
//                 value={coachFilter}
//                 onChange={(e) => setCoachFilter(e.target.value)}
//                 min={1}
//                 max={5}
//                 placeholder="Enter coach number between 1 and 5"
//                 className="mt-1"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               {filteredSeats.map((seat) => (
//                 <div key={seat.id} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={seat.id}
//                     checked={selectedSeat === seat.id}
//                     onCheckedChange={() => {
//                         if (selectedSeat === seat.id) {
//                           setSelectedSeat(null); // Unselect the seat
//                         } else if (!seat.is_booked) {
//                           verifySeat(seat.id); // Select the seat
//                         }
//                       }}
//                     disabled={
//                       seat.is_booked ||
//                       (selectedSeat !== null && selectedSeat !== seat.id)
//                     }
//                   />
//                   <Label
//                     htmlFor={seat.id}
//                     className={`${seat.is_booked ? "text-gray-400" : ""} ${
//                       selectedSeat === seat.id ? "text-green-600 font-bold" : ""
//                     }`}
//                   >
//                     Seat {seat.seat_number} (Coach {seat.coach_number})
//                   </Label>
//                 </div>
//               ))}
//             </div>
//             {selectedSeat && (
//               <Button
//                 className="mt-4"
//                 onClick={() => {
//                   /* Implement booking logic here */
//                 }}
//               >
//                 Book Selected Seat
//               </Button>
//             )}
//           </>
//         )}
//       </AccordionContent>
//     </AccordionItem>
//   );
// }

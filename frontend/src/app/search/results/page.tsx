"use client";

import { Accordion } from "@/components/ui/accordion";
import { useAppContext } from "@/context";
import TrainItem from "@/components/Trains/TrainItem";

export default function TrainSeatBooking() {
  const { trainResult } = useAppContext();
  return (
    <Accordion
      type="single"
      collapsible
      className="mt-20 mx-12 py-2 flex flex-col  dark:shadow-custom-dark gap-4"
    >
      {trainResult.map((train) => (
        <TrainItem key={train.id} train={train} />
      ))}
    </Accordion>
  );
}

//

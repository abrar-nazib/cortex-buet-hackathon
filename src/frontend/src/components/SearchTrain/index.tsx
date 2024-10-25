"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, addDays, isValid, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context";
import { API_TRAIN } from "@/constants";
import { useRouter } from "next/navigation";

const stations = [
  "Dhaka",
  "Chittagong",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Barisal",
  "Rangpur",
  "Comilla",
  "Narayanganj",
  "Gazipur",
] as const;

const FormSchema = z.object({
  from: z.string().min(1, { message: "Please select a source station." }),
  to: z.string().min(1, { message: "Please select a destination station." }),
  date: z.date({
    required_error: "A date is required.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function SearchTrain() {
  const { setTrainResults } = useAppContext();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      from: "",
      to: "",
      date: new Date(),
    },
  });

  const [selectedFrom, setSelectedFrom] = useState<string | null>(null);
  const [selectedTo, setSelectedTo] = useState<string | null>(null);

  const availableStationsForFrom = stations.filter(
    (station) => station !== selectedTo
  );
  const availableStationsForTo = stations.filter(
    (station) => station !== selectedFrom
  );

  const onSubmit = async (data: FormData) => {
    const formattedDate = format(data.date, "yyyy-MM-dd");
    const response = await fetch(
      `${API_TRAIN}/trains/search/?date=${formattedDate}&destination=${data.to}&source=${data.from}`
    );
    // http://localhost:8001/trains/search/?date=2024-10-25&destination=Chittagong&source=Khulna'

    const responseData = await response.json();
    setTrainResults(responseData);
    router.push("/search/results");

    // Handle API call with formatted payload
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex-grow space-y-6 bg-white border-2 border-primary/15 px-12 py-8 rounded-lg dark:bg-primary/15 dark:border-primary bg-opacity-50 shadow-lg text-md dark:text-gray-200 dark:shadow-custom-dark"
      >
        {/* From Station Combobox */}
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-6">From Station: </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[240px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value || "Select station"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                  <Command>
                    <CommandInput placeholder="Search station..." />
                    <CommandList>
                      <CommandEmpty>No station found.</CommandEmpty>
                      <CommandGroup>
                        {availableStationsForFrom.map((station) => (
                          <CommandItem
                            key={station}
                            value={station}
                            onSelect={() => {
                              field.onChange(station);
                              setSelectedFrom(station);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                station === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {station}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* To Station Combobox */}
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-12">To Station:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[240px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value || "Select station"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                  <Command>
                    <CommandInput placeholder="Search station..." />
                    <CommandList>
                      <CommandEmpty>No station found.</CommandEmpty>
                      <CommandGroup>
                        {availableStationsForTo.map((station) => (
                          <CommandItem
                            key={station}
                            value={station}
                            onSelect={() => {
                              field.onChange(station);
                              setSelectedTo(station);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                station === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {station}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Picker */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-8">Select Date: </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(
                          typeof field.value === "string"
                            ? parseISO(field.value)
                            : field.value,
                          "PPP"
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      isValid(field.value)
                        ? typeof field.value === "string"
                          ? parseISO(field.value)
                          : field.value
                        : undefined
                    }
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const today = new Date();
                      const maxDate = addDays(today, 9);
                      return date < today || date > maxDate;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Search Train
        </Button>
      </form>
    </Form>
  );
}

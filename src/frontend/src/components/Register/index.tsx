"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { API_URL } from "@/constants";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {useRouter } from "next/navigation";

export const FormSchema = z
  .object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password1: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    //match password1 and password2
    password2: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords must match!",
    path: ["password2"],
  });

type FormData = z.infer<typeof FormSchema>;



export default function Registration() {
 const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);

    const { username, email, password1, password2 } = data;

    try {
      const response = await fetch(`${API_URL}/auth/registration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password1, password2 }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Process response here

      
        //redirect to login page
        router.push("/login");

    } catch (error: Error | unknown) {
      console.error("Registration Failed:", error);
      toast({
        title: "Registration Failed",
        description: (error as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex-grow space-y-6 bg-white border-2 border-primary/15 px-12 py-8 rounded-lg dark:bg-primary/15 dark:border-primary bg-opacity-50 shadow-lg text-md dark:text-gray-200 dark:shadow-custom-dark"
        onSubmit={
            form.handleSubmit(async (data, event) => {
                event?.preventDefault(); // Prevent default form submission
                try {
                  await onSubmit(data);
                } catch (error) {
                  console.error(error);
                }
              })}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  {...field}
                  type="password"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className=" w-full text-center   text-lg text-gray-50 dark:text-gray-900 bg-primary hover:bg-primary/95 py-5 font-semibold"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

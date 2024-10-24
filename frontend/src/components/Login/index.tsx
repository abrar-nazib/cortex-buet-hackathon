"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation"; // Use useRouter hook
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context";
import { API_URL } from "@/constants";

export const LoginSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
// type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter(); // Initialize useRouter
  const { session,setSession } = useAppContext();
  if(session?.token){
    router.push("/search");
  }
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (formData: {
    username: string;
    password: string;
  }) => {
    const loginPayload = {
      username: formData.username,
      password: formData.password,
    };
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });

    if (!response.ok) {
      throw new Error("Login failed");
      alert("Login failed");
    }
    const responseData = await response.json();
    console.log(responseData);
    setSession({ token: responseData.key });
    router.push("/search");
  };

  return (
    <Form {...form}>
            <form
        className="space-y-6 bg-white border-2 border-primary px-12 py-16 rounded-lg shadow-lg text-md dark:text-gray-200 dark:bg-primary/15 dark:border-primary bg-opacity-50"
        onSubmit={form.handleSubmit(async (data, event) => {
          event?.preventDefault(); // Prevent default form submission
          try {
            await handleLogin(data);
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}

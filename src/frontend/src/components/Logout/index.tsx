"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/constants";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { setSession } = useAppContext();
  const router = useRouter();

  const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const logDetails = await response.json();
    // Destroy the session
    if (logDetails.detail === "Successfully logged out.") {
      setSession(null);
      router.push("/");
    }
  };
  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    await logout();
  };

  return (
    <form onSubmit={handleLogout}>
      <Button type="submit">Logout</Button>
    </form>
  );
};

export default Logout;

"use client";

import Summary from "@/components/Summary";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

const Page = () => {
  const router = useRouter();
  const { session } = useAppContext();
  if (!session?.token) {
    router.push("/login");
  }
  return (
    <div>
  
      <Summary />
    </div>
  );
};

export default Page;

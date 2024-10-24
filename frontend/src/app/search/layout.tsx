"use client";

import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter(); // Initialize useRouter
  const { session } = useAppContext();
  if (!session?.token) {
    router.push("/login");
  }
  return <main>{children}</main>;
}

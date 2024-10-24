"use client";
import LoginPage from "@/components/Login";
import React from "react";
import Link from "next/link";

const Login = () => {
  return (
    <section className=" flex flex-col items-center justify-center gap-4">
      <div className="w-[600px]">
        <p className="w-full flex-grow text-center text-2xl text-primary font-semibold my-8 ">
          Login to your account to continue.
        </p>
        <LoginPage />
        <div className="flex gap-2 text-md justify-center items-center mt-4">
          <p>Don&apos;t have an account?</p>
          <Link href="/register" className="text-primary font-semibold text-lg">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;

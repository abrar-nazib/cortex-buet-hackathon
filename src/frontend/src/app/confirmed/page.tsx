"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context';

const Confirmed = () => {
  const router = useRouter(); // Initialize useRouter
  const { session } = useAppContext();
  if(!session?.token){
    router.push("/login");
  }
  return (
    <div>Confirmed</div>
  )
}

export default Confirmed
import { useAppContext } from '@/context';
import { useRouter } from 'next/navigation';
import React from 'react'

const Payment = () => {
  const router = useRouter(); // Initialize useRouter
  const { session } = useAppContext();
  if(!session?.token){
    router.push("/login");
  }
  return (
    <div>Payment</div>
  )
}

export default Payment
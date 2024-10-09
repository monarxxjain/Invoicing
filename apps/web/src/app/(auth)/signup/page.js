"use client"
import Signup from '@/components/molecules/login-signup/Signup';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('TOKEN');
    const decodedToken = jwt.decode(token);

    if (decodedToken?.role === 'INVESTOR') {
      router.push('/investor');
    } 
    else if (decodedToken?.role === 'SELLER') {
      router.push('/seller');
    }
  }, []);

  return (
    <div>
      <Signup />
    </div>
  );
}

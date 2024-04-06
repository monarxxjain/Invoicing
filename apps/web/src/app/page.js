import { cookies } from 'next/headers'
import HeroSection from "@/components/molecules/homePage/HeroSection";
import TheProcess from "@/components/molecules/homePage/TheProcess";
import FAQS from "@/components/molecules/homePage/FAQS";
import Footer from "@/components/molecules/common/Footer";
import Link from 'next/link'
import jwt from 'jsonwebtoken';
import Navbar from '@/components/molecules/common/Navbar';

export default function Home() {
    const cookieStore = cookies()
    const metaMaskId = cookieStore.get('METAMASKID')
    const token = cookieStore.get('access_token')
    const decodedToken = jwt.decode(token?.value);

  return (
    <div>
      <Navbar metaMaskId={metaMaskId} token={token}/>
      <HeroSection />
      <div className="flex flex-col gap-16">
        <TheProcess />
        <FAQS />
        <Footer/>
      </div>
    </div>
  );
}

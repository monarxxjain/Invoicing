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
    const wolleteAddr = cookieStore.get('WOLLETEADDR')
    const role = cookieStore.get('ROLE')
    const token = cookieStore.get('access_token')
    const decodedToken = jwt.decode(token?.value);
  return (
    <div>
      <Navbar role={role} wolleteAddr={wolleteAddr} token={token}/>
      <HeroSection role={role} wolleteAddr={wolleteAddr} token={token} />
      <div className="flex flex-col gap-16">
        <TheProcess />
        <FAQS />
        <Footer/>
      </div>
    </div>
  );
}

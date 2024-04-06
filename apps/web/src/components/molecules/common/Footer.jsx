import React from "react";
import Image from "next/image";
import logo from "@/assets/home/logo.png";
import phone from '@/assets/home/phone.png'
import Link from 'next/link'
import email from '@/assets/home/email.png'
import whatsapplogo from '@/assets/home/whatsapplogo.png'

export default function Footer() {
  return (
    <div className="flex flex-wrap gap-10 justify-around bg-gray-700 p-6">

      
        <div className="flex justify-between sm:flex-col gap-8">
          <div className="">
            <h4 className="text-white font-bold text-lg pb-4">Useful links</h4>
            <ul className="flex flex-col gap-1 text-gray-100">
              <Link href={"/"}>Home</Link>
              <li>About Us</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg pb-4 flex items-center gap-3">
              <Image src={email} height={14} width={14}></Image>
              Email</h4>
            <address className="text-gray-100 ">support@example.com</address>
            
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <h4 className="text-white font-bold text-lg pb-4">Legal</h4>
            <ul className="flex flex-col gap-1 text-gray-100">
              <li>Privacy Policy</li>
              <li>Terms and Condition</li>
              <li>Refund and Cancellation Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg pb-4">Contact</h4>
            <ul className="flex flex-col gap-1 text-gray-100">
              <li className="flex items-center gap-3">
              <Image src={phone} height={14} width={14}></Image>
                Phone : 1800-XXX-2342</li>
              <li className="flex items-center gap-3">
              <Image src={whatsapplogo} height={20} width={20}></Image>
                Chat with us: 935XXXX066</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <h4 className="text-white font-bold text-base pb-4">Important</h4>
            <ul className="flex flex-col gap-1 text-gray-100">
              <li>Users</li>
              <li>Login</li>
              <li>Register</li>
            </ul>
          </div>
        </div>
      </div>
  );
}

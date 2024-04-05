import React from "react";
import Image from "next/image";
import logo from "@/assets/home/logo.png";
export default function Footer() {
  return (
    <div className="flex justify-evenly bg-gray-600">
      <div>
        <Image alt="altText" src={logo} height={100} width={100} />
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h4 className="text-white text-base">Useful links</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-base">Email</h4>
          <address>support@tradecred.com</address>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h4 className="text-white text-base">Legal</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms and Condition</li>
            <li>Refund and Cancellation Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-base">Contact</h4>
          <ul>
            <li>Phone</li>
            <li>1800-120-9870</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h4 className="text-white text-base">Important</h4>
          <ul>
            <li>Users</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Image from "next/image";

import logo from "@/assets/home/logo.png";

export default function Signup() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };
  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <Image
        className="absolute top-5 left-5"
        src={logo}
        height={100}
        width={150}
      />

      <div class=" bg-white absolute bottom-0 right-0 p-56 rounded-tl-[100px] text-center flex flex-col gap-6">
        <h1 className="text-3xl font-medium">Welcome to TradeCred</h1>
        <h3 className="text-l text-gray-600">How would you like to proceed:</h3>

        <div className="flex flex-col gap-4 text-justify ">
          <form>
            <div
              type={"submit"}
              onClick={() => handleClick("buyer")}
              className="border border-gray-300 p-4 flex gap-4 hover:bg-gray-100 active:bg-gray-200  transition-all"
            >
              <input
                type="radio"
                name="role"
                value="investor"
                checked={selectedOption === "buyer"}
                onChange={() => handleClick("buyer")}
              />
              <label className="">Signup to invest in invoices</label>
            </div>
            <div
              type={"submit"}
              onClick={() => handleClick("seller")}
              className="border border-gray-300 p-4 flex gap-4 hover:bg-gray-100 active:bg-gray-200 transition-all"
            >
              <input
                type="radio"
                name="role"
                value="option2"
                checked={selectedOption === "seller"}
                onChange={() => handleClick("seller")}
              />
              <label className="">Signup to discount your invoices</label>
            </div>
          </form>
        </div>

        <div>
          <p>Have an account already? Click Here to login</p>
        </div>
      </div>
    </div>
  );
}

//#001628 #65b7a4

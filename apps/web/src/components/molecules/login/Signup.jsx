"use client";
import React, { useState } from "react";
import Image from "next/image";

import logo from "@/assets/home/logo.png";
import SelectRole from "./SelectRole";
import { useEffect } from "react";
import FormSignUp from "./FormSignUp";

export default function Signup() {

  const [userData, setUserData] = useState({
    role: "",
    modelData: {}
  })

  const [view, setView] = useState("ROLE")

  useEffect(()=>{
    console.log(userData)
  },[userData])

  // const handleClick = (option) => {
  //   if (selectedOption === option) {
  //     setSelectedOption(null);
  //   } else {
  //     setSelectedOption(option);
  //   }
  // };
  return (
    <div className="flex flex-col h-screen bg-[#061c37]">
      <Image
        className="absolute top-5 left-5"
        src={logo}
        height={100}
        width={150}
      />

      <div class=" p-56 bg-white absolute top-32  bottom-0 right-0  rounded-tl-[100px] text-center flex flex-col gap-6">
        <SelectRole userData={userData} setUserData={setUserData} view={view} setView={setView}  />
        <FormSignUp userData={userData} setUserData={setUserData} view={view} setView={setView} />
      </div>
    </div>
  );
}

//#001628 #65b7a4

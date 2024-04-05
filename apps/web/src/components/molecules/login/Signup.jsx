"use client";
import React, { useState } from "react";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import SelectRole from "./SelectRole";
import { useEffect } from "react";
import FormSignUp from "./FormSignUp";
import { motion } from "framer-motion"

export default function Signup() {

  const [userData, setUserData] = useState({
    role: "",
    modelData: {}
  })

  const [view, setView] = useState("ROLE")

  useEffect(()=>{
    console.log(userData)
  },[userData])

  return (
    <div className="flex flex-col h-screen bg-[#061c37]">
      
      <div className="absolute top-5 left-5 flex gap-1 items-center text-3xl font-mono">
        <CurrencyBitcoinIcon className="text-green-500 text-5xl" />
        <p className="text-white">Investo</p>
      </div>

      <div className="hidden py-44 px-8 sm:px-32 md:p-44 w-screen md:w-auto bg-white absolute top-32 bottom-0 md:right-0 rounded-t-[40px] md:rounded-tr-none md:rounded-tl-[80px] text-center sm:flex flex-col">
        <SelectRole userData={userData} setUserData={setUserData} view={view} setView={setView}  />
        <FormSignUp userData={userData} setUserData={setUserData} view={view} setView={setView} />
      </div>
      <motion.div
       initial={{ opacity: 0, y: "700px" }}
       animate={{ opacity: 1, y: ["400px","-50px", "0px"], transition: { duration: 0.8, ease: "easeOut" }}}
       exit={{ opacity: 0, y: "700px", transition: { duration: 0.3, ease: "easeOut" }}}
       transition={{ duration: 0.3 }}
       className="sm:hidden h-max overflow-y-hidden py-44 px-8 sm:px-32 md:p-44 w-screen md:w-auto bg-white absolute top-32 bottom-0 md:right-0 rounded-t-[40px] md:rounded-tr-none md:rounded-tl-[80px] text-center flex flex-col">
        <SelectRole userData={userData} setUserData={setUserData} view={view} setView={setView}  />
        <FormSignUp userData={userData} setUserData={setUserData} view={view} setView={setView} />
      </motion.div>
    </div>
  );
}


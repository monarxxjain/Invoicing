"use client"
import ThemeContext from "@/components/context/ThemeContext";
import Header from "@/components/molecules/common/Header";
import Sidebar from "@/components/molecules/common/Sidebar";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const [user, setUser] = useState({});
  const [isFull, setIsFull] = useState(true);
  const notifications = [
    {
      title: "This is tilte 1",
      description: "Desc",
      read: true,
      time: "4h"
    },
    {
      title: "This is tilte 2",
      description: "Desc",
      read: false,
      time: "4h"
    },
    {
      title: "This is tilte 3",
      description: "Desc",
      read: true,
      time: "4h"
    },
    {
      title: "This is tilte 4",
      description: "Desc",
      read: false,
      time: "4h"
    },
    {
      title: "This is tilte 5",
      description: "Desc",
      read: false,
      time: "4h"
    }
  ]

  return (
    <ThemeContext.Provider value={{user, notifications}}>
        <div className="absolute w-screen h-[0.5px] z-10 top-20 bg-gray-300"></div>
        <div className="flex overflow-y-hidden h-screen">
          <Sidebar isFull={isFull} setIsFull={setIsFull} />
          <div className="w-full">
            <Header />  
            <div className={inter.className + " hide-scrollbars overflow-y-scroll"}>{children}</div>
          </div>
        </div>
    </ThemeContext.Provider>
  );
}
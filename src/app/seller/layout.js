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

  return (
    <ThemeContext.Provider value={user}>
      <div className="absolute w-screen h-[1px] z-10 top-20 bg-gray-300"></div>
      <div className="flex">
        <Sidebar isFull={isFull} setIsFull={setIsFull} />
        <div className="w-full">
          <Header />  
          <div className={inter.className}>{children}</div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

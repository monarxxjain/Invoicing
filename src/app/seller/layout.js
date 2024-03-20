"use client"
import ThemeContext from "@/components/context/ThemeContext";
import Header from "@/components/molecules/common/Header";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const [user, setUser] = useState({});
  return (
    <ThemeContext.Provider value={user}>
        <Header />  
        <div className={inter.className}>{children}</div>
    </ThemeContext.Provider>
  );
}

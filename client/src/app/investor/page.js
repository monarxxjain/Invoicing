"use client"
import ThemeContext from "@/components/context/ThemeContext";
import DealsContainer from "@/components/molecules/investor/DealsContainer";
import { useContext } from "react";

export default function Home() {

    const { user } = useContext(ThemeContext);
    return (
      <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
        <h1 className="text-2xl">Welcome, <span className="font-serif font-semibold italic">{user?.name || "Monark Jain"}</span> 👋</h1>
        <DealsContainer />
      </div>
    );
  }
  
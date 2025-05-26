"use client";
import ThemeContext from "@/components/context/ThemeContext";
import CreateDealForm from "@/components/molecules/seller/newdeal/NewDeal";
import { useContext } from "react";

export default function Home() {
  const {user} = useContext(ThemeContext);
    return (
      <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
        <CreateDealForm sellerId={user.sellerId} />
      </div>
    );
}
  
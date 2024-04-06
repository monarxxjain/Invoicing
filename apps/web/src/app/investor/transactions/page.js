"use client"
import Transactions from "@/components/molecules/investor/Transactions";

export default function Home() {
    return (
      <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8 flex flex-col gap-8">
        <h1 className="text-4xl text-[rgb(6,28,55)] font-semibold mx-auto w-full text-center font-[sans-serif]">Transaction History</h1>
        <Transactions />
      </div>
    );
}
  
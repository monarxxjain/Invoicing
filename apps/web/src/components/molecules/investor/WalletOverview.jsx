import { Button } from "@mui/material";
import React from "react";
import Image from "next/image";
import investedamount from "@/assets/Investor/InvestedAmount.svg";
import currentvalue from "@/assets/Investor/CurrentValue.svg";
import netgain from "@/assets/Investor/NetGain.svg";
import netirr from "@/assets/Investor/NetIRR.svg";

export default function WalletOverview() {
  return (
    <div className="flex flex-col gap-10 h-screen md:px-12 lg:px-32 py-12 bg-[#f4f4f6]">
      <div className="flex justify-evenly py-12 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <h2>Wallet Balance</h2>
          <p>0</p>
        </div>
        <div className="flex gap-12">
          <Button variant="contained">Deposit</Button>
          <Button variant="outlined">Withdraw</Button>
        </div>
      </div>

      <div className="flex  justify-between gap-6 flex-wrap ">
        <div className="bg-white p-8 rounded-lg gap-5 flex flex-col justify-between shadow">
          <div className="flex justify-between gap-10">
            <h3>
              Invested <br /> Amount
            </h3>
            <div className="bg-blue-600 rounded-full">
              <Image src={investedamount} className="w-10" />
            </div>
          </div>
          <p>0</p>
        </div>

        <div className="bg-white p-8 rounded-lg gap-5 flex flex-col justify-between shadow">
          <div className="flex justify-between gap-10">
            <h3>Current<br/> Value</h3>
            <div className="bg-blue-600 rounded-full">
              <Image src={currentvalue} height={20} width={20} />
            </div>
          </div>
          <p>0</p>
        </div>
        <div className="bg-white p-8 rounded-lg gap-5 flex flex-col justify-between shadow">
          <div className="flex justify-between gap-10">
            <h3>Net Gain</h3>
            <div className="bg-blue-600 rounded-full">
              <Image src={netgain} height={20} width={20} />
            </div>
          </div>
          <p>0</p>
        </div>
        <div className="bg-white p-8 rounded-lg gap-5 flex flex-col justify-between shadow">
          <div className="flex justify-between gap-10">
            <h3>Net IRR</h3>
            <div className="bg-blue-600 rounded-full">
              <Image src={netirr} height={20} width={20} />
            </div>
          </div>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}

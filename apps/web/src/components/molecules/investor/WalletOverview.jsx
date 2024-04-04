import { Button } from "@mui/material";
import React from "react";
import Image from "next/image";
import investedamount from '@/assets/Investor/InvestedAmount.svg'
import currentvalue from '@/assets/Investor/CurrentValue.svg'
import netgain from '@/assets/Investor/NetGain.svg'
import netirr from '@/assets/Investor/NetIRR.svg'


export default function WalletOverview() {
  return (
    <div className="flex flex-col px-32 py-12">

      <div className="flex justify-evenly py-12 bg-gray-300">
        <div className="flex flex-col items-center">
          <h2>Wallet Balance</h2>
          <p>0</p>
        </div>
        <div className="flex gap-12">
          <Button variant="contained">Deposit</Button>
          <Button variant="outlined">Withdraw</Button>
        </div>
      </div>



      <div className="flex bg-gray-300">
        <div className>
            <div className="flex ">
                <h3>Invested Amount</h3>
                <Image src={investedamount} height={20} width={20}/>
            </div>
            <p>0</p>
        </div>
        <div>
            <div className="flex">
                <h3>Current Value</h3>
                <Image src={currentvalue} height={20} width={20}/>
            </div>
            <p>0</p>
        </div>
        <div>
            <div className="flex">
                <h3>Net Gain</h3>
                <Image src={netgain} height={20} width={20}/>
            </div>
            <p>0</p>
        </div>
        <div>
            <div className="flex">
                <h3>Net IRR</h3>
                <Image src={netirr} height={20} width={20}/>
            </div>
            <p>0</p>
        </div>
      </div>
    </div>
  );
}

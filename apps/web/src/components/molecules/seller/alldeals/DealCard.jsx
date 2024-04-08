import TransactionTable from "@/components/atoms/TransactionTable";
import React from "react";

const DealCard = ({ dealData }) => {
  const {
    raisedOn, totalRequested, totalCollected, minInvestment, timeLeft, amountToBeReturned, interestRate,} = dealData;

  return (
    <div className="shadow-md rounded-md flex flex-col gap-4">
      <h2 className="text-2xl mb-4">Deal Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex gap-3">
          <p className="font-semibold">Deal Raised On :</p>
          <div className="font-normal">{raisedOn}</div>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Time Left :</p>
          <div className="font-normal">{timeLeft}</div>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Total Capital Requested :</p>
          <div className="font-normal">{totalRequested}</div>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Total Capital Collected :</p>
          <div className="font-normal">{totalCollected}</div>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Capital to be Returned :</p>
          <div className="font-normal">{amountToBeReturned}</div>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Minimum Investment :</p>
          <div className="font-normal">{minInvestment}</div>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Interest Rate :</p>
          <div className="font-normal">{interestRate}</div>
        </div>
      </div>

      <TransactionTable />
    </div>
  );
};

export default DealCard;

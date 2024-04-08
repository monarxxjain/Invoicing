import React from 'react';
import DealCard from './DealCard';

const DealDatails = () => {
  const dealData = [
    {
      raisedOn: '2024-04-01',
      totalRequested: '$1,000,000',
      totalCollected: '$800,000',
      minInvestment: '$10,000',
      timeLeft: '3 days',
      amountToBeReturned: '$900,000',
      intrestRate:'10 %',
    },
  ];

  return (
    <div className="">
      {dealData.map((deal, index) => (
        <DealCard key={index} dealData={deal} />
      ))}
    </div>
  );
};

export default DealDatails;

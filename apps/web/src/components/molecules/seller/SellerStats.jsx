import React from 'react'
import CardTravelIcon from '@mui/icons-material/CardTravel';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const SellerStats = () => {
    const stats = [
        {
            icon: <CardTravelIcon className='text-base' />,
            name: "Total No. of Investors",
            value: "1203",
            changeIncrease: true,
            percentChange: "1.32",
            changeDuration: "Last 7 days"
        },
        {
            icon: <RecordVoiceOverIcon className='text-base' />,
            name: "Total Amount Requested",
            value: "€9.8K",
            changeIncrease: false,
            percentChange: "0.32",
            changeDuration: "Last 7 days"
        },
        {
            icon: <PriceChangeIcon className='text-base' />,
            name: "Received Amount",
            value: "72%",
            changeIncrease: true,
            percentChange: "0.58",
            changeDuration: "Last 7 days"
        },
        {
            icon: <LocalOfferIcon className='text-base' />,
            name: "Total No. of Deals",
            value: "€2.9K",
            changeIncrease: false,
            percentChange: "0.62",
            changeDuration: "Last 7 days"
        },
    ]

    const colorStats = ["text-blue-500", "text-green-500", "text-purple-500", "text-yellow-500"]
    const bgColorStats = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500"]
  return (
    <div className='flex gap-8 justify-between'>
      {stats.map((stat, id) => {
        return (
            <div key={id} className='p-5 px-8 w-full flex flex-col gap-2 bg-white rounded-lg shadow'>
                <div className={`flex gap-2 items-center ${colorStats[id]} relative`}>
                    <div className={`absolute w-3 h-3 animate-ping ms-0.5 rounded-full ${bgColorStats[id]}`}></div>
                    {stat?.icon}
                    {stat.name}
                </div>
                <div className='text-3xl font-medium px-5'>
                    {stat.value}
                </div>
                <div className='flex gap-3 items-center px-5'>
                    <div className={`${stat.changeIncrease ? "text-green-600" : "text-red-500"} flex gap-1 text-base`}>
                        {stat.changeIncrease ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        <p>{stat.percentChange}</p>
                    </div>
                    <p className='text-gray-600 text-sm'>{stat.changeDuration}</p>
                </div>
            </div>
        )
      })}
    </div>
  )
}

export default SellerStats

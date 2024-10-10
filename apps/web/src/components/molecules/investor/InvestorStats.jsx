"use client"
import React from 'react'
import CardTravelIcon from '@mui/icons-material/CardTravel';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const InvestorStats = () => {
    const stats = [
        {
            icon: <CardTravelIcon className='text-base' />,
            name: "Total Amount Invested",
            value: "1203",
            changeIncrease: true,
            percentChange: "1.32",
            changeDuration: "Last 7 days"
        },
        {
            icon: <RecordVoiceOverIcon className='text-base' />,
            name: "Total Amount Received",
            value: "€9.8K",
            changeIncrease: false,
            percentChange: "0.32",
            changeDuration: "Last 7 days"
        },
        {
            icon: <PriceChangeIcon className='text-base' />,
            name: "Earned Amount",
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
    const stats2 = [
        {
            icon: <CardTravelIcon className='text-base' />,
            name: "Total Liquidated Amount",
            value: "1203",
            changeIncrease: true,
            percentChange: "1.32",
            changeDuration: "Last 7 days"
        },
        {
            icon: <RecordVoiceOverIcon className='text-base' />,
            name: "Repeat Business",
            value: "€9.8K",
            changeIncrease: false,
            percentChange: "0.32",
            changeDuration: "Last 7 days"
        },
        {
            icon: <PriceChangeIcon className='text-base' />,
            name: "Maximum Deals with",
            value: "72%",
            changeIncrease: true,
            percentChange: "0.58",
            changeDuration: "Last 7 days"
        }
    ]
    const [currency, setCurrency] = useState("USD")
    const [input, setInput] = useState(1)
    const [value, setValue] = useState({
        
    })
    const balance = 12000
    const address = "0xCe52C63E5030879079c4C5B993A5EE8282a60A88"
    const formatter = new Intl.NumberFormat('en-US');
    const formattedNumber = formatter.format(balance);

    const colorStats = ["text-blue-500", "text-green-500", "text-purple-500", "text-yellow-500"]
    const bgColorStats = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500"]

    const colorStats2 = ["text-red-500", "text-blue-950", "text-pink-500"]
    const bgColorStats2 = ["bg-red-500", "bg-blue-950", "bg-pink-500"]

    const handleChange = (e) => {
        console.log(e.target.value)
    }
    useEffect(() => {
        console.log(process.env.ETH_API)
        const fetchData = async () => {
            try {
              const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,INR,EUR&api_key${process.env.ETH_API}`);
              console.log(response.data);
              setValue(response.data)
            } catch (err) {
                console.log(err)
            }
          };
      
          fetchData();
    },[])


  return (
    <section className='flex flex-col gap-8 top-1/2 absolute -translate-y-[50%]'>
        <div className='p-12 px-24 w-full flex justify-between gap-2 bg-white rounded-lg shadow items-center'>
            <div>
                <p className='text text-gray-700 font-semibold'>Wollete :</p>
                <p className='text-3xl'><span className='font-mono italic'>MetaMask</span></p>
            </div>
            <div>
                <p className='text text-gray-700 font-semibold'>Balance :</p>
                <p className='text-2xl'><span className='font-mono italic text-3xl'>{balance} </span>ETH</p>
            </div>
            <div>
                <p className='text text-gray-700 font-semibold'>Current Prices :</p>
                <div className='flex gap-2 items-center'>
                    <div className='flex gap-1 items-center'>
                        <input className='w-28 border text-lg border-gray-400 px-2 py-1 rounded outline-none' type='number' name='eths' value={input} onChange={(e)=>setInput(e.target.value)}/> 
                        <p className='text-gray-500 text-lg'>ETH</p>
                    </div>
                    <p className='text-2xl'>=</p>
                    <div className='flex gap-2 items-center'>
                        <div className='flex items-center gap-0.5'>
                            <p onClick={()=>setCurrency("USD")} className={`w-7 h-7 text-center pt-[1px] hover:bg-blue-600/10 border rounded-full transition-all cursor-pointer ${currency=="USD" ? "border-blue-600 text-blue-600 bg-blue-600/10" : "border-gray-400"}`}>$</p>
                            <p onClick={()=>setCurrency("INR")} className={`w-7 h-7 text-center pt-[1px] hover:bg-blue-600/10 border rounded-full transition-all cursor-pointer ${currency=="INR" ? "border-blue-600 text-blue-600 bg-blue-600/10" : "border-gray-400"}`}>₹</p>
                            <p onClick={()=>setCurrency("EUR")} className={`w-7 h-7 text-center pt-[1px] hover:bg-blue-600/10 border rounded-full transition-all cursor-pointer ${currency=="EUR" ? "border-blue-600 text-blue-600 bg-blue-600/10" : "border-gray-400"}`}>€</p>
                        </div>
                        {(value[currency]) ? 
                            <div className='text-2xl'>{(value[currency])*input}</div>
                        : 
                            <div class="typing">
                                <span class="dots"></span>
                            </div>
                        }
                    </div>
                </div>
            </div>

            
        </div>
        
        <div className='flex gap-8 justify-between'>
        {stats.map((stat, id) => {
            return (
                <div key={id} className='p-5 px-8 w-full flex flex-col justify-center gap-2 bg-white rounded-lg shadow'>
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
        <div className='flex gap-8 justify-between'>
        {stats2.map((stat, id) => {
            return (
                <div key={id} className='p-5 px-8 w-full flex flex-col justify-center gap-2 bg-white rounded-lg shadow'>
                    <div className={`flex gap-2 items-center ${colorStats2[id]} relative`}>
                        <div className={`absolute w-3 h-3 animate-ping ms-0.5 rounded-full ${bgColorStats2[id]}`}></div>
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
    </section>
  )
}

export default InvestorStats

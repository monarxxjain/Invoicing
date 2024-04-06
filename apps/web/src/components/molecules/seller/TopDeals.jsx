import React from 'react'
import {motion} from "framer-motion"
import Button from '@mui/material/Button'
import Link from 'next/link'

const TopDeals = () => {
    const topDeals = [
        {
            id: "Deal 1",
            date: "12/12/12",
            receivedAmount: 75000,
            totalAmount: 100000
        },
        {
            id: "Deal 2",
            date: "12/12/12",
            receivedAmount: 50000,
            totalAmount: 100000
        },
        {
            id: "Deal 3",
            date: "12/12/12",
            receivedAmount: 40000,
            totalAmount: 100000
        },
        {
            id: "Deal 4",
            date: "12/12/12",
            receivedAmount: 25000,
            totalAmount: 100000
        },
        {
            id: "Deal 5",
            date: "12/12/12",
            receivedAmount: 10000,
            totalAmount: 100000
        },
    ]
  return (
    <div className='bg-white rounded-lg shadow p-5 w-full'>
      <h1 className='text-xl font-medium'>Top Deals</h1>
      <p className='text-gray-600 text-xs mt-1'>This data was collected from last 30 days</p>
      <ul className='flex flex-col gap-5 mt-5'>
        {topDeals.map((deal, id) => {
            const progressPercent = (deal.receivedAmount/deal.totalAmount) * 100
            return (
                <div key={id} className='flex flex-col gap-1'>
                    <div className='flex gap-10 text-sm justify-between font-medium'>
                        <p className=''>{deal.id}</p>
                        <p>{deal.totalAmount}</p>
                    </div>
                    <div className="progressBar rounded ">
                        <motion.div
                            className={`heighted-bar bg-[#061C37] relative`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1 + (progressPercent/100) }}
                        >
                            <div className='absolute mx-auto text-white text-[11px] left-1/4'>{progressPercent}%</div>
                        </motion.div>
                    </div>
                </div>
            )
        })}
      </ul>
      <Link href={"/seller/deals"}><Button variant='outlined'  className='w-full mt-4'>All Deals</Button></Link>
    </div>
  )
}

export default TopDeals

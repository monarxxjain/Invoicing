import React from 'react'
import Image1 from '@/assets/icons/metaMaskId.svg'
import Image from 'next/image'

const TopInvestors = () => {

    const topInvestors = [
        {
            name: "Monark Jain",
            totalAmountInvested: 33440,
            noOfDealsInvestedIn: 4
        },
        {
            name: "Monark Jain",
            totalAmountInvested: 33440,
            noOfDealsInvestedIn: 4
        },
        {
            name: "Monark Jain",
            totalAmountInvested: 33440,
            noOfDealsInvestedIn: 4
        }
    ]

  return (
    <div className='bg-white rounded-lg shadow p-5'>
      <h1 className='text-xl font-medium'>Top Investors</h1>
      <p className='text-gray-600 text-xs mt-1'>This data was collected from last 30 days</p>
      <ul className='flex flex-col gap-5 mt-5'>
        {topInvestors.map((investor, id) => {
            return (
                <div key={id} className='flex flex-col gap-1 w-80 border rounded'>
                    <div className='flex gap-2 p-2 px-3 font-medium text-gray-800 items-center'>
                        <div className='animate-pulse h-7 w-7 rounded-full bg-slate-200'></div>
                        <p>{investor.name}</p>
                    </div>
                    <div className='bg-gray-200 p-3  flex justify-between items-center text-xs text-gray-700'>
                        <div>
                            TOTAL AMOUNT : <span className='text-black font-medium'>{investor.totalAmountInvested}</span>
                        </div>
                        <div>|</div>
                        <div>
                            NO OF DEALS : <span className='text-black font-medium'>{investor.noOfDealsInvestedIn}</span>
                        </div>
                    </div>
                </div>
            )
        })}
      </ul>
    </div>
  )
}

export default TopInvestors

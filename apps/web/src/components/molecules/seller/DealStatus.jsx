import Meter from '@/components/atoms/Meter'
import SelectMenu from '@/components/atoms/SelectMenu'
import React from 'react'

const DealStatus = () => {
    
  const totalAmount = 100000;
  const receivedAmount = 75000;

  return (
    <div className='bg-white rounded-lg shadow p-5'>
        <h1 className='text-xl font-medium'>Deal Status</h1>
        <p className='text-gray-600 mt-2 mb-4'>Select Deal</p>
        <SelectMenu />
        <Meter totalAmount={totalAmount} receivedAmount={receivedAmount} />
        <div className='flex justify-between'>
            <div>
                <p className='text-sm text-gray-600'>Received Amount</p>
                <p className='text-xl font-medium'>{receivedAmount}</p>
            </div>
            <div>
                <p className='text-sm text-gray-600'>Total Amount</p>
                <p className='text-xl font-medium'>{totalAmount}</p>
            </div>
        </div>
    </div>
  )
}

export default DealStatus

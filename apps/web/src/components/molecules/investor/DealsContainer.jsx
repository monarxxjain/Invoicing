"use client"
import React from 'react'
import Deal from './Deal'

const DealsContainer = ({deals}) => {
  console.log("deals", deals)
  return (
    <div className='mt-10 grid grid-cols-2 gap-6'>
      {/* {deals?.map((deal, id) => {
        return (
          <Deal key={id} deal={deal} />
        )
      })} */}
    </div>
  )
}

export default DealsContainer

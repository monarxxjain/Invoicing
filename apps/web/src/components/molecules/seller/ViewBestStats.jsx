import React from 'react'
import TopDeals from './TopDeals'
import TopInvestors from './TopInvestors'
import DealStatus from './DealStatus'

const ViewBestStats = () => {
  return (
    <div className='flex gap-8'>
      <TopDeals />
      <TopInvestors />
      <DealStatus />
    </div>
  )
}

export default ViewBestStats

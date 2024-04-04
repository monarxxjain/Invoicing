import React from 'react'
import TopDeals from './TopDeals'
import TopInvestors from './TopInvestors'

const ViewBestStats = () => {
  return (
    <div className='flex gap-8'>
      <TopDeals />
      <TopInvestors />
    </div>
  )
}

export default ViewBestStats

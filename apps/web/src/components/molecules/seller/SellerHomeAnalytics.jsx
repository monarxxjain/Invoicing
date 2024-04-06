"use client"
import React from 'react'
import SellerStats from './SellerStats'
import ViewBestStats from './ViewBestStats'

const SellerHomeAnalytics = () => {
  return (
    <div className='flex flex-col gap-6'>
      <SellerStats />
      <ViewBestStats />
    </div>
  )
}

export default SellerHomeAnalytics

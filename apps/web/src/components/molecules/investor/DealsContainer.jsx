"use client"
import React from 'react'
import Deal from './Deal'
import axios from 'axios'
import { BACKEND_URL } from '@/content/values'
import { useEffect } from 'react'
import { useState } from 'react'
import { supabase } from '@/utils/supabase'
import LoadDeals from '../common/LoadDeals'
const DealsContainer = ({role}) => {
  const [deals, setDeals] = useState()
  const [investedDeals, setInvestedDeals] = useState()

  const getAllDeals = async () => {
    let deals = await axios.post(`${BACKEND_URL}/deal/getDeals`, 
      { status: "OPEN" },
      { withCredentials: true }
    )
    deals = await Promise.all(deals?.data?.data?.map(async (v) => {
      const { data, error } = await supabase.storage
        .from('invoice')
        .createSignedUrl(v.seller.logo, 3600)
      let ob = v;
      ob.seller.logo = data.signedUrl
      return ob;
    }))

    console.log(deals)
    setDeals(deals)
  }

  const getAllInvestedDeals = async () => {
    let investedDeals = await axios.get(`${BACKEND_URL}/deal/getInvestedDeals`,
      { withCredentials: true }
    )

    console.log(investedDeals.data)
    setInvestedDeals(investedDeals.data.data)
  }

  useEffect(() => {
    getAllDeals()
    getAllInvestedDeals()
  }, [])

  return (
    <div className='mt-10 grid grid-cols-2 gap-6 relative loader'>
      {!deals && <>
        <LoadDeals />
      </>}
      {deals?.map((deal, id) => {
        return (
          <Deal key={id} role={role} deal={deal} investedDeals={investedDeals} />
        )
      })}
    </div>
  )
}

export default DealsContainer

"use client"
import React from 'react'
import Deal from './Deal'
import axios from 'axios'
import { BACKEND_URL } from '@/content/values'
import { useEffect } from 'react'
import { useState } from 'react'

const DealsContainer = () => {
  const [deals, setDeals] = useState()
  const getAllDeals = async () => {
    let deals = await axios.get(`${BACKEND_URL}/deal/getDeals`,
      {withCredentials: true}  
    )
    console.log(deals.data.data);
    deals =  deals.data.data.map(async (v)=>{
      ({ data, error } = await supabase.storage
          .from('invoice')
          .createSignedUrl(v.seller.logo, 3600))
        let ob = v;

        ob.seller.logo = data.signedUrl
        console.log("here ",ob);
        return ob;
    })
    setDeals(deals.data.data)
  }

  useEffect(()=>{
    getAllDeals()
  },[])

  return (
    <div className='mt-10 grid grid-cols-2 gap-6'>
      {deals?.map((deal, id) => {
        return (
          <Deal key={id } deal={deal} />
        )
      })}
    </div>
  )
}

export default DealsContainer

import React, { useRef, useState } from 'react'
import logo from '@/assets/logo.png'
import { motion } from "framer-motion";
import Image from 'next/image'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Warning from '@/components/atoms/Warning';
import Tag from '@/components/atoms/Tag';
import DealSummary from '@/components/atoms/DealSummary';
import DealRisks from '@/components/atoms/DealRisks';
import axios from 'axios';
import { BACKEND_URL } from '@/content/values';
import { useEffect } from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Snackbar from '@mui/joy/Snackbar';

const InvestedDeal = ({ deal }) => {
  console.log("Invested Deals ",deal);
  const balance = 100000
  const tags = [
    {
      abbr: "RF",
      name: "Refundable",
      variant: "green"
    },
    {
      abbr: "ZC",
      name: "Zero Cost Liquidity",
      variant: "blue"
    }
  ]

  const [progressPercent, setProgressPercent] = useState(Math.floor((deal.currentAmount / deal.targetAmount) * 100))

  const details = [
    {
      title: "Net IRR",
      value: `${deal.profitPercent}%`,
      color: "text-green-600"
    },
    {
      title: "Return in",
      value: `${deal.completionDate} days`,
      color: "text-blue-900"
    },
    {
      title: "Minimum Purchasable amount",
      value: `${deal.minInvestmentAmount} ETH`,
      color: "text-black"
    }
  ]
  const [amount, setAmount] = useState(null)
  const [showMore, setShowMore] = useState(null)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [open, setOpen] = useState()
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    '&:hover': {
      backgroundColor: "#061c37",
    }
  }));

  const handleBuy = (e) => {
    e.preventDefault();

    try {
      invest(amount)
    } catch (error) {

    }
  }

  const invest = async (amount) => {
    return;
    deal.id = Number(deal.id);
    deal.investors = deal.investors?.map((v) => {
      return { dealId: Number(v.dealId), investorId: Number(v.investorId) };
    });

    try {
      const res = await axios.put(`${BACKEND_URL}/deal/investDeal`,
        {
          deal: deal,
          metaMaskId: address,
          amount: Number(Math.abs(amount))
        },
        { withCredentials: true }
      )
      if (res.data.error) {
        console.log(res.data.error)
        setError(res.data.error)
        setOpen(true)
      }
      else if (res.data.message) {
        setProgressPercent(Math.floor((amount+deal.currentAmount)/deal.targetAmount *100))
        setSuccess(res.data.message)
        setOpen(true)
        setAmount(null)
      }

    } catch (error) {

    }
  }

  let investedAmount = deal.investmentAmount;



  return (  
    <div className='relative h-full'>
      <div className='absolute left-8 z-10 -top-3 border border-green-400 bg-green-200 rounded px-10 text-sm text-green-700'>
        ICT{deal.id}
      </div>
      <div className='border h-full border-green-400 bg-white rounded px-3 pt-5 pb-3 flex flex-col gap-5'>
        <section className='flex justify-between items-center'>
          <ul className='flex gap-3 h-fit'>
            {tags.map((tag, id) => {
              return (
                <Tag key={id} tag={tag} />
              )
            })}
          </ul>
          <Image alt="altText" src={deal.seller.logo} width={300} height={100} className='h-14 w-fit self-end' />
        </section>

        <section className='w-full flex justify-between items-center ps-2'>
          <div className='w-[90%] h-2'>
            <div className="progressBar">
              <motion.div
                className={`bar ${progressPercent < 50 ? "bg-green-500" : "bg-red-500"}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1 + (progressPercent / 100) }}
              ></motion.div>
            </div>
          </div>
          <div className=''>{progressPercent}%</div>
        </section>

        <section className='flex justify-between items-center text-gray-700 text-sm -mt-3 px-5'>
          <div>ETH <span className='font-medium text-gray-900'>{deal.targetAmount - deal.currentAmount}</span> - Available</div>
          <div>ETH <span className='font-medium text-gray-900'>{deal.targetAmount}</span> - Total</div>
        </section>

        <section className='flex justify-around'>
          {details.map((detail, id) => {
            return (
              <div key={id} className='flex flex-col gap-1'>
                <div className='text-gray-500 font-semibold text-sm'>{detail.title}</div>
                <div className={`font-bold text-xl ${detail.color}`}>{detail.value}</div>
              </div>
            )
          })}
        </section>

        <form id='investForm' onSubmit={(e) => { handleBuy(e) }} className='grid grid-cols-2 gap-4'>
          <input type='number' onChange={(e) => { setAmount(Math.abs(e.target.value).toString().replace(/^0+/, '')) }} value={amount || 0} name='amount' className='text-right outline-gray-600 border border-gray-600 rounded p-2' />
          <ColorButton disabled={balance < deal.minInvestmentAmount || !amount ? true : false} variant='contained' type='submit' >
            BUY
          </ColorButton>
        </form>

        {deal?.investmentAmount ? <section className='text-sm text-[#061c37] border border-[#061c37] rounded bg-blue-100 w-full text-center px-3 py-1 '>
          You have invested ETH <span>{deal?.investmentAmount}</span> on this Deal
        </section>
          : 
        <section className='text-sm text-yellow-600 border border-yellow-600 rounded bg-yellow-100 w-full text-center px-3 py-1 '>
          Let's make a bond and earn
        </section>
        }

        <section className='self-end -mt-3'>
          {balance < deal.minInvestmentAmount && <Warning warning={`Add at least ${deal.minInvestmentAmount - balance} ETH in your wollete to invest`} />}
        </section>

        <section className='flex justify-around text-gray-700 cursor-pointer font-medium'>
          <Button onClick={() => { setShowMore("RISKS") }} variant='secondary'>
            <div>Risks</div>
          </Button>
          <Button onClick={() => { setShowMore("SUMMARY") }} variant='secondary'>
            <div>Summary</div>
          </Button>
          <Button onClick={() => { setShowMore("REPORT") }} variant='secondary'>
            <div>Deal Report</div>
          </Button>
        </section>
      </div>

      <DealSummary showMore={showMore} setShowMore={setShowMore} />

      <DealRisks showMore={showMore} setShowMore={setShowMore}/>

      {error && <Snackbar
        autoHideDuration={3000}
        open={open}
        variant="outlined"
        color={"danger"}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
      >
        {error}
      </Snackbar>}
      { success && <Snackbar
        autoHideDuration={3000}
        open={open}
        variant="outlined"
        color={"success"}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
      >
        {success}
      </Snackbar>}
    </div>
  )
}

export default InvestedDeal

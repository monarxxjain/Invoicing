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
import DescriptionIcon from '@mui/icons-material/Description';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation'
import Snackbar from '@mui/joy/Snackbar';

const PendingDeal = ({ deal }) => {
  const router = useRouter()
  const [showMore, setShowMore] = useState(null)

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

  const details = [
    {
      title: "Net IRR",
      value: `${deal.profitPercent}%`,
      color: "text-green-600"
    },
    {
      title: "Return in",
      value: `${deal.completionDate} days`,
      color: "text-black"
    },
    {
      title: "Minimum amount",
      value: `${deal.minInvestmentAmount} ETH`,
      color: "text-blue-900"
    }
  ]

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    '&:hover': {
      backgroundColor: "#061c37",
    }
  }));
  const DangerButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#DC2626"),
    backgroundColor: "#DC2626",
    '&:hover': {
      backgroundColor: "#DC2626",
    }
  }));
  const SuccessButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#06de15"),
    backgroundColor: "#06de15",
    '&:hover': {
      backgroundColor: "#06de15",
    }
  }));



  return (
    <div className='relative h-full'>
      <div  onClick={() => {router.push(`/seller/deals/${deal.id}`)}} className={`absolute cursor-pointer left-8 z-10 -top-3 border  rounded px-10 text-sm  border-yellow-500 bg-yellow-200 text-yellow-700`}>
        ICT{deal.id}
      </div>
      <div className={`border h-full border-yellow-500 bg-white rounded px-3 pt-5 pb-3 flex flex-col gap-5`}>
        <section className='flex gap-6 flex-wrap-reverse justify-between items-center'>
          <ul className='flex gap-3 h-fit'>
            {tags.map((tag, id) => {
              return (
                <Tag key={id} tag={tag} />
              )
            })}
          </ul>
          <Image alt="altText" src={deal.seller.logo} width={300} height={100} className='h-14 w-fit self-end' />
        </section>




        <section className='grid grid-cols-3 gap-y-3 px-2 gap-x-6 items-center'>
          <div className='flex flex-col'>
            <div className='text-gray-500 font-semibold text-sm'>Invoices</div>
            <IconButton className='w-fit' onClick={()=>{window.open(deal.bill)}}><DescriptionIcon className='text-3xl text-blue-950' /></IconButton>
          </div>
          <div className='flex flex-col gap-1 -ms-6'>
            <div className='text-gray-500 font-semibold text-sm'>Total Money</div>
            <div className={`font-bold text-xl text-green-600`}>{deal.targetAmount} ETH</div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-gray-500 font-semibold text-sm'>Freezing Point</div>
            <div className={`font-bold text-xl `}>{deal.completionDate}</div>
          </div>
        </section>

        <section className='grid grid-cols-3 px-2 gap-x-6 gap-y-4'>
          {details.map((detail, id) => {
            return (
              <div key={id} className={`flex flex-col gap-1 ${id==1 && "-ms-6"}`}>
                <div className='text-gray-500 font-semibold text-sm'>{detail.title}</div>
                <div className={`font-bold text-xl ${detail.color}`}>{detail.value}</div>
              </div>
            )
          })}
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

    
      <Snackbar
        autoHideDuration={3000}
        // open={open}
        variant="outlined"
        color={"success"}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
        //   setOpen(false);
        }}
      >
        {/* {success} */}
      </Snackbar>
    </div>
  )
}

export default PendingDeal

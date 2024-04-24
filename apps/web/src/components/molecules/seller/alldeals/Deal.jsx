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

const Deal = ({ deal, investedDeals, role }) => {
  const router = useRouter()
  const balance = 100000
  const formattedDate = (date) => {
    let newDate = new Date(date)
    newDate = `${newDate.getUTCDate()}/${newDate.getUTCMonth()}/${newDate.getUTCFullYear()}`
    return newDate
  }
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
      value: `${formattedDate(deal.completionDate)}`,
      color: "text-black"
    },
    {
      title: "Minimum amount",
      value: `${deal.minInvestmentAmount} ETH`,
      color: "text-blue-900"
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

  const handleBuy = (e) => {
    e.preventDefault();

    try {
      invest(amount)
    } catch (error) {

    }
  }

  const invest = async (amount) => {

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
        setSuccess(false)
        console.log(res.data.error)
        setError(res.data.error)
        setOpen(true)
      }
      else if (res.data.message) {
        setError(false)
        setProgressPercent(Math.floor((Number(amount)+Number(deal.currentAmount))/Number(deal.targetAmount) *100))
        setSuccess(res.data.message)
        setOpen(true)
        setAmount(null)
      }

    } catch (error) {
      console.log(error);
    }
  }

  let investedAmount = null;
  for(let i=0; i<investedDeals?.length; i++){
    if(deal.id == investedDeals[i].dealId){
      investedAmount = investedDeals[i].investmentAmount;
       break;
    }

  }

  console.log(deal.status)
  const amountWithInterest = 8347783;



  return (
    <div className='relative h-full'>
      <div  onClick={() => {role == "SELLER" && router.push(`/seller/deals/${deal.id}`)}}  className={`absolute cursor-pointer left-8 z-10 -top-3 border  rounded px-10 text-sm  ${deal.status == "FREEZED" ? "border-yellow-500 bg-yellow-200 text-yellow-700" : deal.status == "FINAL" ? "border-blue-950 bg-blue-200 text-blue-950" : deal.status == "CANCELLED" ? "border-red-500 bg-red-200 text-red-700" : "border-green-400 bg-green-200 text-green-700"}`}>
        ICT{deal.id}
      </div>
      <div className={`border h-full ${deal.status == "FREEZED" ? "border-yellow-500" : deal.status == "FINAL" ? "border-blue-950" : deal.status == "CANCELLED" ? "border-red-500" : ""} border-green-400 bg-white rounded px-3 pt-5 pb-3 flex flex-col gap-5`}>
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

        {(deal.status == "OPEN" || deal.status == "FREEZED") && 
        <section className='w-full flex justify-between items-center ps-2'>
          <div className={`w-[90%] h-2 ${progressPercent<5 ? "border border-gray-400 h-3 rounded" : ""}`}>
            <div className="progressBar">
              <motion.div
                className={`bar ${progressPercent < 50 ? "bg-red-500" : "bg-green-500"}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1 + (progressPercent / 100) }}
              ></motion.div>
            </div>
          </div>
          <div className=''>{progressPercent}%</div>
        </section>}

        {(deal.status == "OPEN" || deal.status == "FREEZED") && 
        <section className={`flex justify-between items-center text-gray-700 -mt-3 px-5 ${deal.status == "FREEZED" ? "text-xl" : "text-sm"}`}>
          {role=="INVESTOR" && <div>ETH <span className='font-medium text-gray-900'>{deal.targetAmount - deal.currentAmount}</span> - Available</div>}
          {role=="SELLER" &&<div>ETH <span className='font-medium text-gray-900'>{deal.currentAmount}</span> - Colleted</div>}
          <div>ETH <span className='font-medium text-gray-900'>{deal.targetAmount}</span> - Total</div>
        </section>}

        {!(role=="INVESTOR") && 
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
            <div className={`font-bold text-xl `}>{formattedDate(deal.completionDate)}</div>
          </div>

        </section>
        }

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

        {deal.status == "FINAL" && <section className='flex justify-around px-2 gap-x-6 gap-y-4'>
        
          <div className='flex flex-col gap-1'>
            <div className='text-gray-500 font-semibold text-sm'>Payout Amount</div>
            <div className={`font-bold text-xl text-red-600`}>{deal.targetAmount} ETH</div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-gray-500 font-semibold text-sm'>Interest Amount</div>
            <div className={`font-bold text-xl `}>{ amountWithInterest - deal.currentAmount}</div>
          </div>
        </section>}

        {deal.status == "CLOSED" && <section className='grid grid-cols-3 px-2 gap-x-6 gap-y-4'>
        
          <div className='flex flex-col gap-1'>
            <div className='text-gray-500 font-semibold text-sm'>Payout Amount</div>
            <div className={`font-bold text-xl text-red-600`}>{deal.targetAmount} ETH</div>
          </div>
          <div className='flex flex-col gap-1 -ms-6'>
            <div className='text-gray-500 font-semibold text-sm'>Interest Amount</div>
            <div className={`font-bold text-xl text-blue-900`}>{ amountWithInterest - deal.currentAmount}</div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-gray-500 font-semibold text-sm'>Completed On</div>
            <div className={`font-bold text-xl `}>12/03/24</div>
          </div>
        </section>
        }
        {deal.status == "CANCELLED" && <section className='grid grid-cols-3 px-2 gap-x-6 gap-y-4'>
        
          
          <div className='flex flex-col gap-1'>
            <div className='text-gray-500 font-semibold text-sm'>Cancelled On</div>
            <div className={`font-bold text-xl `}>12/03/24</div>
          </div>
        </section>
        }

        {role == "INVESTOR" && <form id='investForm' onSubmit={(e) => { handleBuy(e) }} className='grid grid-cols-2 gap-4'>
          <input type='number' onChange={(e) => { setAmount(Math.abs(e.target.value).toString().replace(/^0+/, '')) }} value={amount || 0} name='amount' className='text-right outline-gray-600 border border-gray-600 rounded p-2' />
          <ColorButton disabled={balance < deal.minInvestmentAmount || !amount ? true : false} variant='contained' type='submit' >
            BUY
          </ColorButton>
        </form>}
      
        {role == "INVESTOR" && <>
          {investedDeals?.investmentAmount ? <section className='text-sm text-[#061c37] border border-[#061c37] rounded bg-blue-100 w-full text-center px-3 py-1 '>
            You have invested ETH <span>{investedDeals?.investmentAmount}</span> on this Deal
          </section>
            : 
          <section className='text-sm text-yellow-600 border border-yellow-600 rounded bg-yellow-100 w-full text-center px-3 py-1 '>
            Let's make a bond and earn
          </section>
          }
        </>}

        <section className='self-end -mt-3'>
          {balance < deal.minInvestmentAmount && <Warning warning={`Add at least ${deal.minInvestmentAmount - balance} ETH in your wollete to invest`} />}
        </section>

        <section className='flex justify-around text-gray-700 cursor-pointer font-medium'>
          {role == "INVESTOR" && <Button onClick={() => { setShowMore("RISKS") }} variant='secondary'>
            <div>Risks</div>
          </Button>}
          {!(deal.status == "FREEZED") &&<Button onClick={() => { setShowMore("SUMMARY") }} variant='secondary'>
            <div>Summary</div>
          </Button>}
          {(deal.status == "FINAL") && <ColorButton onClick={() => { setShowMore("REPORT") }} variant='contained'>
            <div>Release Payments</div>
          </ColorButton>}
          {!(deal.status == "FREEZED") && <Button onClick={() => { setShowMore("REPORT") }} variant='secondary'>
            <div>Deal Report</div>
          </Button>}
            {role == "SELLER" && deal.status == "FREEZED" && <DangerButton className='dangerButton' color='error' variant='contained'>
            <div>Cancel Deal</div>
          </DangerButton>}
          {role == "SELLER" && deal.status == "FREEZED" && <SuccessButton className='successButton !font-bold' color='success' variant='contained'>
            <div>Accept Deal</div>
          </SuccessButton>}
        </section>
      </div>

      <DealSummary role={role} showMore={showMore} setShowMore={setShowMore} />

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

export default Deal

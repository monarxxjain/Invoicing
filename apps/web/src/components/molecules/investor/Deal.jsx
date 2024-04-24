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
import { addInvestment } from '@/utils/etherInterface';
import { useContext } from 'react';
import ThemeContext from '@/components/context/ThemeContext';
import Snackbar from '@mui/joy/Snackbar';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect } from 'react';

const Deal = ({ deal, investedDeals, role }) => {
  const router = useRouter()
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
  const calcNoOfDays = (date) => {
    let newDate = new Date(date)
    let noOfDays = Math.floor((newDate - new Date()) / 86400000)
    return noOfDays
  }
  const details = [
    {
      title: "Net IRR",
      value: `${deal.profitPercent}%`,
      color: "text-blue-900"
    },
    {
      title: "Return in",
      value: `${calcNoOfDays(deal.completionDate)} days`,
      color: "text-green-600"
    },
    {
      title: "Minimum amount",
      value: `${deal.minInvestmentAmount} ETH`,
      color: "text-black"
    }
  ]
  const [progressPercent, setProgressPercent] = useState(Math.floor((deal.currentAmount / deal.targetAmount) * 100))
  const [availableAmount, setAvailableAmount] = useState(((deal.targetAmount * 1e18) - (deal.currentAmount * 1e18)) / 1e18)
  const [lastTransaction, setLastTransaction] = useState(null)
  const [amount, setAmount] = useState(null)
  const [investedAmount, setInvestedAmount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(null)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [open, setOpen] = useState()
  const ColorLoadingButton = styled(LoadingButton)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    "&:hover": {
      backgroundColor: "#061c37",
    },
  }));

  const { wolleteInfo } = useContext(ThemeContext)

  useEffect(() => {
    
    if((availableAmount * 1e18) <= (deal.minInvestmentAmount * 1e18)) {
      setLastTransaction(((deal.targetAmount * 1e18) - (deal.currentAmount * 1e18)) / 1e18)
      setAmount(((deal.targetAmount * 1e18) - (deal.currentAmount * 1e18)) / 1e18)
    }

    for(let i=0; i<investedDeals?.length; i++){
      if(deal.id == investedDeals[i].dealId){
         setInvestedAmount(investedDeals[i].investmentAmount)
         break;
      }
  
    }
  }, [])



  const handleBuy = (e) => {
    e.preventDefault();

    try {
      console.log("Amount: ", amount)
      invest(amount)
    } catch (error) {

    }
  }

  const invest = async (amount) => {

  
    try {
      setLoading(true)
      const dealId = deal.id
      
      // Type Casting
      deal.id = Number(deal.id);
      deal.investors = deal.investors?.map((v) => {
        return { dealId: Number(v.dealId), investorId: Number(v.investorId) };
      });

      const isTransactionSuccess = await addInvestment(wolleteInfo.contractInstance, wolleteInfo.walletAddress, `${dealId}`, (Number(Math.abs(amount))) * 1e18)
      console.log("isTransactionSuccess: ", isTransactionSuccess)
      
      
      // Updating DB after Transaction
      const res = await axios.post(`${BACKEND_URL}/deal/investDeal`,
        {
          deal: deal,
          wolleteAddr: wolleteInfo.walletAddress,
          amount: Number(Math.abs(amount))
        },
        { withCredentials: true }
      )
      if (res.data.error) {
        setSuccess(false)
        console.log(res.data.error)
        setError(res.data.error)
        setOpen(true)
        setLoading(false)
      }
      else if (res.data.message) {
        
        if(res.data.lastTransaction) {
          setLastTransaction(res.data.lastTransaction)
          setAmount(res.data.lastTransaction)
        }
        setInvestedAmount(investedAmount+amount)
        setError(false)
        setProgressPercent(Math.floor((Number(amount)+Number(deal.currentAmount))/Number(deal.targetAmount) *100))
        setAvailableAmount(((availableAmount*1e18)-(Number(amount)*1e18)) / 1e18)
        setSuccess(res.data.message)
        setOpen(true)
        setAmount(null)
        setLoading(false)
      }

    } catch (error) {
      console.log(error);

      setError("Wollete Error")
      setOpen(true)
      setLoading(false)
    }
  }





  return (
    <div className='relative h-full'>
      <div  onClick={() => {role == "SELLER" && router.push(`/seller/deals/${deal.id}`)}}  className={`absolute cursor-pointer left-8 z-10 -top-3 border  rounded px-10 text-sm  border-green-400 bg-green-200 text-green-700`}>
        ICT{deal.id}
      </div>
      <div className={`border h-full border-green-400 bg-white rounded px-3 pt-5 pb-3 flex flex-col gap-5`}>
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

        <section className='w-full flex justify-between items-center ps-2'>
          <div className={`w-[90%] h-2 ${progressPercent<5 ? "border border-gray-400 h-2 rounded mt-[1px]" : ""}`}>
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

        <section className="flex justify-between items-center text-gray-700 -mt-3 px-5 text-sm">
          <div>ETH <span className={`font-medium text-xl ${progressPercent < 50 ? "text-green-600" : "text-red-600"}`}>{availableAmount}</span>  (Available)</div>
          <div className='text-xl font-thin text-gray-400 rounded'>|</div>
          <div>ETH <span className="font-medium text-xl text-gray-900">{deal.targetAmount}</span>  (Total)</div>
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
            <div className={`font-bold text-xl `}>{calcNoOfDays(deal.freezingDate)} days</div>
          </div>

        </section>

        <section className='grid grid-cols-3 px-2 gap-x-6 gap-y-4 -mt-3'>
          {details.map((detail, id) => {
            return (
              <div key={id} className={`flex flex-col gap-1 ${id==1 && "-ms-6"}`}>
                <div className='text-gray-500 font-semibold text-sm'>{detail.title}</div>
                <div className={`font-bold text-xl ${detail.color}`}>{detail.value}</div>
              </div>
            )
          })}
        </section>


        {availableAmount ? <>
        {lastTransaction ?
          <form id='investForm' onSubmit={(e) => { handleBuy(e) }} className='grid grid-cols-2 gap-4'>
            <div name='amount' className='text-right outline-gray-600 border border-gray-600 rounded p-2'>{lastTransaction}</div>
            <ColorLoadingButton loadingPosition='end' loading={loading} disabled={( !investedAmount && balance < deal.minInvestmentAmount ) || !amount ? true : false} variant='contained' type='submit' >
              <div className='me-3'>BUY</div>
            </ColorLoadingButton>
          </form>
        :
          <form id='investForm' onSubmit={(e) => { handleBuy(e) }} className='grid grid-cols-2 gap-4'>
            <input type='number' onChange={(e) => { setAmount(Math.abs(e.target.value).toString().replace(/^0+/, '')) }} value={amount || 0} name='amount' className='text-right outline-gray-600 border border-gray-600 rounded p-2' />
            <ColorLoadingButton loadingPosition='end' loading={loading} disabled={( !investedAmount && balance < deal.minInvestmentAmount) || !amount ? true : false} variant='contained' type='submit' >
              <div className='me-3'>BUY</div>
            </ColorLoadingButton>
          </form>
        }
        </> : <></>}
      
        <div className='-mt-3'>
          {investedAmount ? <section className='text-sm text-[#061c37] border border-[#061c37] rounded bg-blue-100 w-full text-center px-3 py-1 '>
            You have invested ETH <span>{investedAmount }</span> on this Deal
          </section>
            : 
          <section className='text-sm text-yellow-600 border border-yellow-600 rounded bg-yellow-100 w-full text-center px-3 py-1 '>
            Let's make a bond and earn
          </section>
          }
        </div>

        <section className='self-end -mt-3'>
          {balance < deal.minInvestmentAmount && <Warning warning={`Add at least ${deal.minInvestmentAmount - balance} ETH in your wollete to invest`} />}
        </section>

        <section className='flex justify-around text-gray-700 cursor-pointer font-medium -mt-3'>
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

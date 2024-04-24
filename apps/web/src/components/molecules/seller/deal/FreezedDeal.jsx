import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Button from '@mui/material/Button';
import Tag from '@/components/atoms/Tag';
import { motion } from 'framer-motion';
import DealSummary from '@/components/atoms/DealSummary';
import DescriptionIcon from '@mui/icons-material/Description';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation'
import Snackbar from '@mui/joy/Snackbar';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { BACKEND_URL } from '@/content/values';
import { useEffect } from 'react';

const FreezedDeal = ({ deal, updateDeals }) => {
  const router = useRouter()
  const [showMore, setShowMore] = useState(null)
  const [openModal, setOpenModal] = useState(null)
  const [loading, setLoading] = useState(null)
  const [snackbar, setSnackbar] = useState({
    color: "",
    message: "",
    open: false
  })
  const [progressPercent, setProgressPercent] = useState(Math.floor((deal.currentAmount / deal.targetAmount) * 100))

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
  };


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

  const details = [

    {
      title: "Net IRR (%)",
      value: `${deal.profitPercent} %`,
      color: "text-blue-900"
    },
    {
      title: "Minimum amount",
      value: `${deal.minInvestmentAmount} ETH`,
      color: "text-green-600"
    },
    {
      title: "Return On",
      value: formattedDate(deal.completionDate),
      color: "text-black"
    },
  ]

  useEffect(()=>{
    console.log(snackbar)
  },[snackbar])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      
      const res = await axios.put(`${BACKEND_URL}/deal/sellerDealDecision`,
        {
          id: Number(deal.id),
          status: openModal,
        },
        {withCredentials: true}
      )

      if(res.data.message) {
        setSnackbar({
          open: true,
          message: res.data.message,
          color: "success"
        })
        setLoading(false)
        setOpenModal(false)
        setTimeout(() => {
          updateDeals(deal)
        }, 1000);
      }
      else if(res.data.error) {
        console.log(res.data.error)
        setSnackbar({
          open: true,
          message: res.data.error,
          color: "danger"
        })
        setLoading(false)
        setOpenModal(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='relative h-full'>
      <div  onClick={() => {router.push(`/seller/deals/${deal.id}`)}} className={`absolute cursor-pointer left-8 z-10 -top-3 border  rounded px-10 text-sm  border-blue-500 bg-blue-200 text-blue-700`}>
        ICT{deal.id}
      </div>
      <div className={`border h-full border-blue-500 bg-white rounded p-6 flex flex-col gap-5`}>
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
        </section>

        <section className="flex justify-between items-center text-gray-700 -mt-3 px-5 text-sm">
          <div>ETH <span className={`font-medium text-2xl ${progressPercent < 50 ? "text-red-600" : "text-green-600"}`}>{deal.currentAmount}</span>  (Colleted)</div>
          <div className='text-xl font-thin text-gray-400 rounded'>|</div>
          <div>ETH <span className="font-medium text-2xl text-gray-900">{deal.targetAmount}</span>  (Total)</div>
        </section>


        <section className='grid grid-cols-3 gap-y-3 px-2 gap-x-6 '>
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
            <div className={`font-bold text-xl `}>{formattedDate(deal.freezingDate)}</div>
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

        <section className='flex justify-between gap-10 text-gray-700 cursor-pointer font-medium mt-4'>
          <div className='flex justify-between gap-6'>
            <Button variant='secondary' onClick={() => { setShowMore("SUMMARY") }} >
              <div>Summary</div>
            </Button>
            <Button variant='secondary' onClick={() => { setShowMore("KNOW MORE") }} >
              <div>Know More</div>
            </Button>
          </div>

          <div className='flex justify-between gap-6'>
            <Button onClick={() => {setOpenModal("CANCELLED")}} color='error' variant='contained'>
              <div>Cancel Deal</div>
            </Button>
            <Button onClick={() => {setOpenModal("ACCEPTED")}} color='success' variant='contained'>
              <div>Accept Deal</div>
            </Button>
          </div>
        </section>
      </div>


      {openModal == "CANCELLED" && <Modal
        className='fade-in text-white'
        open={openModal}
        onClose={() => {setOpenModal(false);}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <div style={style} className='flex flex-col bg-white rounded'>
            <p className='px-5 text-lg py-3 bg-[#061c37] rounded-t '>Are you Sure ?</p>
            <p className='px-5 py-3 text-[#061c37]'>Do you want to CANCEL this deal ?</p>
            <div className='flex gap-6 px-5 py-3 justify-between'>
              <Button onClick={() => {setOpenModal(false); setLoading(false)}}>Cancel</Button>
              <LoadingButton className='loading-button' loadingPosition='end' loading={loading} color='error' variant='outlined' onClick={() => handleSubmit()} ><div className={`${loading && "me-3"}`}>REJECT</div></LoadingButton>
            </div>
        </div>
            
      </Modal>}

      {openModal == "ACCEPTED" && <Modal
        className='fade-in text-white'
        open={openModal}
        onClose={() => {setOpenModal(false);}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <div style={style} className='flex flex-col bg-white rounded'>
            <p className='px-5 text-lg py-3 bg-[#061c37] rounded-t '>Are you Sure ?</p>
            <div className='px-5 py-3 text-[#061c37]'>
              <p>Do you want to ACCEPT this deal ?</p>
              <p className='text-sm text-gray-500 mt-1'>After accepting, you will receive {deal.currentAmount} ETH.</p>
            </div>
            
            <div className='flex gap-6 px-5 py-3 justify-between'>
              <Button onClick={() => {setOpenModal(false); setLoading(false)}}>Cancel</Button>
              <LoadingButton className='loading-button' loadingPosition='end' loading={loading} color='success' variant='outlined' onClick={() => handleSubmit()} ><div className={`${loading && "me-3"}`}>APPROVE</div></LoadingButton>
            </div>
        </div>
            
      </Modal>}

      <Snackbar
        autoHideDuration={4000}
        open={snackbar.open}
        variant="outlined"
        color={snackbar.color}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setSnackbar((prev) => ({ ...prev, open: false}));
        }}
      >
        {snackbar.message}
      </Snackbar>

      <DealSummary showMore={showMore} setShowMore={setShowMore} />

    </div>
  )
}

export default FreezedDeal

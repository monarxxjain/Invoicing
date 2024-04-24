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
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import { useContext } from 'react';
import ThemeContext from '@/components/context/ThemeContext';
import { systemApprovesDeal } from '@/utils/etherInterface';

const PendingDeal = ({ deal, updateDeals }) => {
  const router = useRouter()
  const [showMore, setShowMore] = useState(null)
  const [openModal, setOpenModal] = useState(null)
  const [loading, setLoading] = useState(null)
  const [snackbar, setSnackbar] = useState({
    color: "",
    message: "",
    open: false
  })

  const { wolleteInfo } = useContext(ThemeContext)

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

  const handleSubmit = async () => {
    setLoading(true)
    
    // console.log(typeof(deal.completionDate))
    try {
      if(openModal=="REJECTED") {
        await systemApprovesDeal(wolleteInfo.contractInstance, false, {
          actorAddress: deal.seller.wolleteAddr,
          tokenID: deal.nftTokenId
        })
      }
      else {
        await systemApprovesDeal(wolleteInfo.contractInstance, true, {
          dealID: deal.id,
          minAmt: deal.minInvestmentAmount * 1e18,
          targetAmt: deal.targetAmount * 1e18,
          floatingEndTimestamp: Date.parse(deal.freezingDate),
          expirationTimestamp: Date.parse(deal.completionDate),
          tokenID: deal.nftTokenId,
          interestRate: Math.floor(deal.profitPercent),
          companyAddress: deal.seller.wolleteAddr
        })
      }
      const res = await axios.put(`${BACKEND_URL}/deal/updateDealStatus`,
        {
          id: Number(deal.id),
          status: openModal,
          currentAmount: (30 * deal.targetAmount) / 100
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
        updateDeals(deal)
      }
      else if(res.data.error) {
        setSnackbar({
          open: true,
          message: res.data.message,
          color: "success"
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
      <div  onClick={() => {router.push(`/seller/deals/${deal.id}`)}} className={`absolute cursor-pointer left-8 z-10 -top-3 border  rounded px-10 text-sm  border-yellow-500 bg-yellow-200 text-yellow-700`}>
        ICT{deal.id}
      </div>
      <div className={`border h-full border-yellow-500 bg-white rounded p-6 flex flex-col gap-5`}>
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
            <Button  onClick={() => { setShowMore("SUMMARY") }} >
              <div>Summary</div>
            </Button>
            <Button  onClick={() => { setShowMore("KNOW MORE") }} >
              <div>Know More</div>
            </Button>
          </div>
          <div className='flex justify-between gap-6'>
            <Button onClick={() => {setOpenModal("REJECTED")}} color='error' variant='contained'>
              <div>Reject</div>
            </Button>
            <Button onClick={() => {setOpenModal("OPEN")}} color='success' variant='contained'>
              <div>Approve</div>
            </Button>
          </div>
        </section>
      </div>

      {openModal == "REJECTED" && <Modal
        className='fade-in text-white'
        open={openModal}
        onClose={() => {setOpenModal(false);}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <div style={style} className='flex flex-col bg-white rounded'>
            <p className='px-5 text-lg py-3 bg-[#061c37] rounded-t '>Are you Sure ?</p>
            <p className='px-5 py-3 text-[#061c37]'>Do you want to REJECT this deal ?</p>
            <div className='flex gap-6 px-5 py-3 justify-between'>
              <Button onClick={() => {setOpenModal(false); setLoading(false)}}>Cancel</Button>
              <LoadingButton className='loading-button' loadingPosition='end' loading={loading} color='error' variant='outlined' onClick={() => handleSubmit()} ><div className={`${loading && "me-3"}`}>REJECT</div></LoadingButton>
            </div>
        </div>
            
      </Modal>}

      {openModal == "OPEN" && <Modal
        className='fade-in text-white'
        open={openModal}
        onClose={() => {setOpenModal(false);}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <div style={style} className='flex flex-col bg-white rounded'>
            <p className='px-5 text-lg py-3 bg-[#061c37] rounded-t '>Are you Sure ?</p>
            <p className='px-5 py-3 text-[#061c37]'>Do you want to APPROVE this deal ?</p>
            <div className='flex gap-6 px-5 py-3 justify-between'>
              <Button onClick={() => {setOpenModal(false); setLoading(false)}}>Cancel</Button>
              <LoadingButton className='loading-button' loadingPosition='end' loading={loading} color='success' variant='outlined' onClick={() => handleSubmit()} ><div className={`${loading && "me-3"}`}>APPROVE</div></LoadingButton>
            </div>
        </div>
            
      </Modal>}

      <DealSummary showMore={showMore} setShowMore={setShowMore} />


    
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
    </div>
  )
}

export default PendingDeal

import React, { useRef, useState } from 'react'
import logo from '@/assets/logo.png'
import { motion } from "framer-motion";
import Image from 'next/image'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Warning from '@/components/atoms/Warning';
import Tag from '@/components/atoms/Tag';
import DealSummary from '@/components/atoms/DealSummary';

const Deal = () => {

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

  const progressPercent =  76

  const details = [
    {
      title: "Net IRR",
      value: "10.40%",
      color: "text-green-600"
    },
    {
      title: "Return in",
      value: "95 days",
      color: "text-blue-900"
    },
    {
      title: "Minimum Purchasable amount",
      value: "$ 1,00,000",
      color: "text-black"
    }
  ]

  const [showMore, setShowMore] = useState(null)

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    '&:hover': {
      backgroundColor: "#061c37",
    }
  }));

  return (
    <div className='relative'>
      <div className='absolute left-8 z-10 -top-3 border border-green-400 bg-green-200 rounded px-10 text-sm text-green-700'>
        ICT24249823897238798789324
      </div>
      <div className='border border-green-400 bg-white rounded px-3 pt-5 pb-3 flex flex-col gap-5'>
        <section className='flex justify-between items-center'>
          <ul className='flex gap-3 h-fit'>
            {tags.map((tag, id) => {
              return (
                <Tag key={id} tag={tag} />
              )
            })}
          </ul>
          <Image src={logo} className='h-14 w-fit self-end' />
        </section>

        <section className='w-full flex justify-between items-center ps-2'>
            <div className='w-[90%] h-2'>
              <div className="progressBar">
                <motion.div
                  className={`bar ${progressPercent<50 ? "bg-green-500" : "bg-red-500" }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1 + (progressPercent/100) }}
                ></motion.div>
              </div>
            </div>
            <div className=''>{progressPercent}%</div>
        </section>

        <section className='flex justify-around'>
          {details.map((detail, id) => {
            return(
              <div className='flex flex-col gap-1'>
                <div className='text-gray-500 font-semibold text-sm'>{detail.title}</div>
                <div className={`font-bold text-xl ${detail.color}`}>{detail.value}</div>
              </div>
            )
          })}
        </section>

        <form className='grid grid-cols-2 gap-4'>
            <input type='number' name='amount' className='text-right outline-gray-600 border border-gray-600 rounded p-2' />
            <ColorButton variant='contained' type='submit' onClick={(e)=>{e.preventDefault()}}>
              BUY
            </ColorButton>
        </form>

        <section className='self-end -mt-3'>
          <Warning warning={"This is the warning"} />
        </section>

        <section className='flex justify-around text-gray-700 cursor-pointer font-medium'>
          <Button onClick={()=>{setShowMore("RISKS")}} variant='secondary'>
            <div>Risks</div>
          </Button>
          <Button onClick={()=>{setShowMore("SUMMARY")}} variant='secondary'>
            <div>Summary</div>
          </Button>
          <Button onClick={()=>{setShowMore("REPORT")}} variant='secondary'>
            <div>Deal Report</div>
          </Button>
        </section>
      </div>

      <DealSummary showMore={showMore} setShowMore={setShowMore} />
    </div>
  )
}

export default Deal

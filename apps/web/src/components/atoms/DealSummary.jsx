import React, { useRef } from 'react'
import { motion } from "framer-motion";
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import IconButton from '@mui/material/IconButton';

const DealSummary = ({showMore, setShowMore}) => {
    const summaryRef = useRef(null)
  return (
      showMore=="SUMMARY" && <motion.div
        ref={summaryRef}
        initial={{ opacity: 0, x: "300px", y: "0px" }}
        animate={{ opacity: 1, x: "0", y: "0px" }}
        exit={{ opacity: 0, x: "-300px", y: "0px" }}
        transition={{ duration: 0.2 }}
        className='absolute top-[2px] left-[2px] rounded h-[99%] bg-white w-[99.4%] px-3 py-5'
      >
        <div className='flex gap-2 items-center text-gray-700 font-medium'>
            <IconButton 
                onClick={()=>{
                    summaryRef.current.classList.add("slide-left-out")
                    setTimeout(() => {
                        setShowMore(null)
                    }, 300);
                }}>
                <WestOutlinedIcon className='text-xl text-gray-700 cursor-pointer' />
            </IconButton>
            <div>Summary</div>
        </div>
      </motion.div>
  )
}

export default DealSummary

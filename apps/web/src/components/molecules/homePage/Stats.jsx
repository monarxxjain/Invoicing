import { statistic, userTypes } from '@/content/homeContent'
import { AnimatePresence, motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import { useState } from 'react'
import Image from 'next/image';

const Stats = ({setCursorVariant}) => {
    const [selected, setSelected] = useState(null)
    
  return (
    <div onMouseEnter={()=>setCursorVariant("featureBody")} className='h-screen relative px-52 flex flex-col justify-center overflow-hidden'>
      <div className='absolute bg-[#20378b]/75 opacity-30 w-[1300px] h-screen -right-1/4 bottom-1/3 rotate-45'></div>
      
      <div 
        onMouseEnter={()=>setCursorVariant("featureTitle")} onMouseLeave={()=>setCursorVariant("featureBody")}
        className='text-gray-500 z-10 text-4xl text-center font-bold'
      >
        Investo Invoice Discounting enables
      </div>
      <div className='flex justify-center gap-8 mt-10 z-10' onMouseEnter={()=>setCursorVariant("featureTitle")} onMouseLeave={()=>setCursorVariant("featureBody")}>
        {statistic.map((stat, id)=>(
            <div key={id} className='flex flex-col gap-4'>
                <div className='flex items-center gap-1'>
                    <div className='text-[#20378b] text-5xl font-semibold tracking-tighter'>{stat.value}</div>
                    <div className='text-green-500 text-3xl font-semibold'>+</div>
                </div>
                <div className='text-gray-600 hover:text-gray-400'>{stat.title}</div>
            </div>
        ))}
      </div>
      <div className='grid grid-cols-3 gap-10 mt-16'>
            {userTypes.map((type, id) => (
                <motion.div layoutId={type.id} onClick={() => setSelected(type)} key={id} className={`hover:-translate-y-1 cursor-pointer transition-all border shadow-md rounded-xl p-6 ${selected?.id!=type.id ? "visible" : "invisible"}`}>
                    <div className='text-3xl text-[#20378b] font-semibold'>{type.name}</div>
                    <div className='mt-2 text-gray-600'>{type.description}</div>
                    {/* <div>Show more</div> */}
                </motion.div>
            ))}
            <div className='absolute left-1/2 -translate-x-[50%] top-1/2 -translate-y-[50%] border shadow-md rounded-xl z-10'>
                <AnimatePresence >
                    {selected && (
                        <motion.div layoutId={selected.id} className='relative bg-white'>
                            <CloseIcon onClick={() => setSelected(null)} className='absolute right-0 m-2 text-[#8b2020] text-xl cursor-pointer bg-red-300/60 rounded-full' />
                            <Image src={selected.image} width={300} height={100} className='w-full rounded-t-xl' />
                            <div className='p-6'>
                                <div className='text-blue-900 text-3xl'>{selected.name}</div>
                                <div className='text-gray-600'>{selected.description}</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
      </div>
    </div>
  )
}

export default Stats

import { features } from '@/content/homeContent'
import React from 'react'

const Features = ({setCursorVariant}) => {
  return (
    <div className='h-screen px-52 flex flex-col justify-center'>
        <div className='text-5xl font-semibold text-[#121F4F] leading-tight tracking-tight w-2/3'>
            What makes Investo Invoice Discounting unique?
        </div>
        <div className='grid grid-cols-4 gap-8 mt-10'>
            {features.map((feat, index) => (
                <div key={index} className='flex flex-col shadow-sm p-5 border rounded-lg'>
                    <div className='text-xl'>{feat.icon}</div>
                    <div className='text-2xl font-semibold mt-1 text-green-600'>{feat.title}</div>
                    <div className='mt-3'>{feat.description}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Features

import { faqs } from '@/content/homeContent'
import React from 'react'

const FAQ = ({setCursorVariant}) => {
  return (
    <div className='px-40 bg-[#061C37] flex flex-col justify-center relative overflow-hidden py-20'>
      <div onMouseEnter={()=>setCursorVariant("title")} onMouseLeave={()=>setCursorVariant("default")} className='text-5xl text-center text-white tracking-tight font-semibold'>Frequently Asked Questions</div>
      
      <div  onMouseEnter={()=>setCursorVariant("button")} onMouseLeave={()=>setCursorVariant("default")}  className='flex flex-col gap-6 mt-16'>
        {faqs.map((faq, id)=>(
            <div key={id} className='flex flex-col gap-1'>
                <div className='flex gap-1 text-xl font-medium text-white'>
                    <div>{id+1}.</div>
                    <div>{faq.question}</div>
                </div>
                <div className='text-gray-400'>{faq.answer}</div>
            </div>
        ))}

      </div>
    </div>
  )
}

export default FAQ

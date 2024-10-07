import { features } from '@/content/homeContent'
import React from 'react'
import { Tilt } from 'react-tilt'

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const Features = ({setCursorVariant}) => {
  return (
    <div onMouseEnter={()=>setCursorVariant("featureBody")} className='h-screen px-52 flex flex-col justify-center'>
        <div
            onMouseEnter={()=>setCursorVariant("featureTitle")} onMouseLeave={()=>setCursorVariant("featureBody")}  
            className='text-5xl font-semibold text-[#1f3890] leading-tight tracking-tight w-2/3 '
        >
            What makes Investo Invoice Discounting unique?
        </div>
        <div className='grid grid-cols-4 gap-8 mt-10 transition-all'  onMouseEnter={()=>setCursorVariant("featureGrid")} onMouseLeave={()=>setCursorVariant("featureBody")}>
            {features.map((feat, index) => (
                <Tilt options={defaultOptions}>
                    <div key={index} className='flex hover:bg-blue-950 group transition-all  flex-col shadow-md p-5 border rounded-lg h-[100%]'>
                        <div className='text-xl'>{feat.icon}</div>
                        <div className='text-2xl font-semibold mt-1 text-[#121F4F] tracking-tight group-hover:text-white transition-all'>{feat.title}</div>
                        <div className='mt-3 text-gray-500 group-hover:text-gray-300'>{feat.description}</div>
                    </div>
                </Tilt>
            ))}
        </div>
    </div>
  )
}

export default Features

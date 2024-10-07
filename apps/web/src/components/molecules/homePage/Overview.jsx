import React, { useEffect, useState } from 'react';

const Overview = ({setCursorVariant}) => {

    const [isClient, setIsClient] = useState(false);

    // This will run only on the client, avoiding SSR issues
    useEffect(() => {
        setIsClient(true);
    }, []);

  return (
    <div className='h-screen bg-#121F4F px-40 bg-[#0a1437] flex flex-col justify-center relative overflow-hidden'>
      <div className='absolute bg-white opacity-30 w-[1300px] h-screen -right-1/4 bottom-0 top-1/3 -rotate-45'></div>
      
      <div onMouseEnter={()=>setCursorVariant("title")} onMouseLeave={()=>setCursorVariant("default")} className='text-5xl text-center text-white tracking-tight font-semibold'>How does Invoice Discounting work?</div>
      <div onMouseEnter={()=>setCursorVariant("title")} onMouseLeave={()=>setCursorVariant("default")} className='text-gray-100 text-center pt-4 text-xl opacity-75 font-light tracking-wide'>Here's how the entire process of invoice discounting works with Clear Invoice Discounting</div>
      {isClient && (
        <video
          src={"./Video.mp4"}
          controls
          autoPlay
          className='mt-10 z-[1] mx-28 border-2 rounded border-white'
        />
      )}
    </div>
  )
}

export default Overview

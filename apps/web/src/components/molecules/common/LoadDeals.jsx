import React from 'react'

const LoadDeal = () => {
  return (
    <div className='animate-pulse relative h-full'>
      <div className={`absolute cursor-pointer left-8 z-10 -top-2 w-80 h-4 rounded bg-slate-200 `}> </div>
      <div className={`border h-full border-slate-300 bg-white rounded px-5 pt-5 pb-3 flex flex-col`}>
        <section className='flex gap-6 flex-wrap-reverse justify-between items-center'>
          <ul className='flex gap-3 h-fit'>
            <div className='h-7 w-32 bg-slate-200 rounded'></div>
            <div className='h-7 w-32 bg-slate-200 rounded'></div>
          </ul>
          <div className='h-14 w-14 rounded self-end bg-slate-200'></div>
        </section>

        <section className='w-full flex justify-between items-center mt-8'>
          <div className={`w-[90%] h-2 rounded bg-slate-200 mt-[1px]`}>
            <div className="progressBar"></div>
          </div>
          <div className=''></div>
        </section>

        <section className="flex justify-between items-center text-gray-200 mt-1 px-5 text-sm">
          <div>ETH <span className={`font-medium text-xl`}></span>  (Available)</div>
          <div className='text-xl font-thin text-gray-400 rounded'>|</div>
          <div>ETH <span className="font-medium text-xl text-gray-900"></span>  (Total)</div>
        </section>

        <section className='grid grid-cols-3 gap-y-3 px-2 gap-x-6 items-center mt-5'>
          <div className='h-5 w-5 rounded-full bg-slate-200 ms-1'></div>
          <div className='h-5 w-5 rounded-full bg-slate-200 ms-1'></div>
          <div className='h-5 w-5 rounded-full bg-slate-200 ms-1'></div>
        </section>

        <section className='grid grid-cols-3 gap-y-3 px-2 gap-x-6 items-center mt-1'>
          <div className='h-2 w-full rounded bg-slate-200'></div>
          <div className='h-2 w-full rounded bg-slate-200'></div>
          <div className='h-2 w-full rounded bg-slate-200'></div>
        </section>

        <section className='grid grid-cols-3 gap-y-3 px-2 gap-x-6 items-center mt-10'>
          <div className='h-5 w-5 rounded-full bg-slate-200 ms-1'></div>
          <div className='h-5 w-5 rounded-full bg-slate-200 ms-1'></div>
          <div className='h-5 w-5 rounded-full bg-slate-200 ms-1'></div>
        </section>

        <section className='grid grid-cols-3 gap-y-3 px-2 gap-x-6 items-center mt-1'>
          <div className='h-2 w-full rounded bg-slate-200'></div>
          <div className='h-2 w-full rounded bg-slate-200'></div>
          <div className='h-2 w-full rounded bg-slate-200'></div>
        </section>

        <div className='flex gap-3 mt-8 mb-5'>
            <div className='h-10 w-full bg-slate-200 rounded '></div>
            <div className='h-10 w-full bg-slate-200 rounded '></div>
        </div>

      </div>
    </div>
  )
}

const LoadDeals = () => {
  return(
    <>
      <LoadDeal />
      <LoadDeal />
      <LoadDeal />
      <LoadDeal />
      <LoadDeal />
      <LoadDeal />
    </>
  )
}

export default LoadDeals

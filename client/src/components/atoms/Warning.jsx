import React from 'react'

const Warning = ({warning}) => {
  return (
    <div className='rounded-lg text-sm bg-yellow-100 flex gap-1 p-1 px-2 w-fit'>
      <div className='bg-yellow-400 text-white rounded-full w-5 h-5 text-center'>!</div>
      <div className=''>{warning}</div>
    </div>
  )
}

export default Warning

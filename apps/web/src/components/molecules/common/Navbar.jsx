import Link from 'next/link'
import React from 'react'

const Navbar = ({wolleteAddr, token, role}) => {

  const myRoute = role?.value.toLowerCase()
  return (
    <div className='hidden xs:flex justify-center gap-8 sm:gap-14 py-3 absolute z-30 top-0 w-screen text-white backdrop-blur bg-gray-50/10 sm:text-lg font-medium'>
        <a href='' className='hidden xs:block hover:text-green-500 transition-all ' >Home</a>
        <a href='' className='hidden xs:block hover:text-green-500 transition-all ' >Roles</a>
        <a href='' className='hidden xs:block hover:text-green-500 transition-all ' >FAQ's</a>
        <a href='' className='hidden xs:block hover:text-green-500 transition-all ' >Team</a>
        <Link  className='hover:text-green-500 transition-all ' href={`${token ? `/${myRoute}` : wolleteAddr?.value ? "/login" : "/signup"}`}><button className="">{token ? "Dashboard" : "Login/Signup"}</button></Link>
    </div>
  )
}

export default Navbar

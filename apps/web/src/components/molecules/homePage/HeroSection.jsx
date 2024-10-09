import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SouthIcon from '@mui/icons-material/South';
import { heroPoints } from '@/content/homeContent';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const HeroSection = ({ setCursorVariant }) => {

  const [token, setToken] = useState(typeof window !== 'undefined' ? (sessionStorage.getItem("TOKEN")) : null)
  const [role, setRole] = useState(typeof window !== 'undefined' ? (localStorage.getItem("ROLE")) : null)
  const [link, setLink] = useState("/signup")
  useEffect(() => {
    const token = sessionStorage.getItem('TOKEN');
    const decodedToken = jwt.decode(token);


    if (role === 'ADMIN') setLink('/admin');
    else if (role) setLink('/login');

  }, []);

  return (
    <div onMouseEnter={() => setCursorVariant("default")} className={`w-screen h-screen flex relative items-center px-40`}>
      <div className='flex flex-col -mt-20'>

        <div className='relative w-fit'>
          <SideAnimate color={"white"} />
          <div onMouseEnter={() => setCursorVariant("text")} onMouseLeave={() => setCursorVariant("default")} className='text-gray-200 text-xl w-fit tracking-tight'>Maximise Profit with Invoice Discounting</div>
        </div>

        <div className='relative w-fit'>
          <SideAnimate color={"#41CFA2"} />
          <h1 onMouseEnter={() => setCursorVariant("title")} onMouseLeave={() => setCursorVariant("default")} className='text-white text-6xl font-bold max-w-[900px] leading-tight'>
            Increase business savings by paying your vendors early
          </h1>
        </div>

        <div className='flex flex-col gap-3 mt-20 text-lg w-fit' onMouseEnter={() => setCursorVariant("text")} onMouseLeave={() => setCursorVariant("default")} >
          {heroPoints.map((val, id) =>
            <motion.div
              key={id}
              className='flex items-center gap-2 w-fit'
              variants={{
                hidden: { opacity: 0, x: 80 },
                visible: { opacity: 1, x: 0 }
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.25 + (id * 0.07) }}
            >
              <TaskAltIcon className='text-green-500' />
              <p className='text-gray-300'>{val}</p>
            </motion.div>
          )}
        </div>

        <a href={link}
          onMouseEnter={() => setCursorVariant("button")} onMouseLeave={() => setCursorVariant("default")}
          className='bg-white relative w-fit text-lg text-blue-800 font-medium rounded px-6 py-2 mt-10 hover:scale-105 active:scale-90 transition-all'
        >
          <SideAnimate color={"#41CFA2"} />
          {token ? "Dashboard" : "Get Started"}
        </a>
      </div>
      <motion.div
        onMouseEnter={() => setCursorVariant("scrollBtn")} onMouseLeave={() => setCursorVariant("default")}
        className='bg-white p-3 absolute bottom-5 left-1/2 -translate-x-[50%] text-[#0A0B1F] rounded-full animate-bounce'
        variants={{
          hidden: { opacity: 0, y: -200 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 1.25 }}
      >
        <SouthIcon />
      </motion.div>
    </div>
  )
}

const SideAnimate = ({ color }) => {
  return (
    <motion.div
      variants={{
        hidden: { left: 0 },
        visible: { left: "100%" }
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.25, ease: "easeIn" }}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: color,
        zIndex: 20
      }}
    >
    </motion.div>
  )
}

export default HeroSection

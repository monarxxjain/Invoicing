"use client";
import { motion } from "framer-motion"
import React, { useRef, useState, useEffect } from "react";
import Image from 'next/image'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Image1 from '@/assets/signup/slide1.png'
import Image2 from '@/assets/signup/slide2.png'
import Image3 from '@/assets/signup/slide3.png'
import Image4 from '@/assets/signup/slide4.png'
import LoginRole from "./LoginRole";
import LoginForm from "./LoginForm";

import Snackbar from '@mui/joy/Snackbar';


export default function Login({ existingRole, existingEmail}) {

  const [userData, setUserData] = useState({
    role: existingRole || "",
    modelData: {
      email : existingEmail || ""
    }
  })

  const [view, setView] = useState("ROLE")
  const [isSnackbarOpen, setIsSnackbarOpen] = useState({
    color: "",
    message: ""
  })

  useEffect(() => {
    console.log(userData)
  }, [userData])

  const slides = [
    {
      image: Image1,
      title: "Credit Models",
      desc: "We use superior algo-driven credit models to curate invoices - Our credit models are much more superior & sharper than that of any other financial institution in India - And we are open to discussing with you about how they work."
    },
    {
      image: Image2,
      title: "Liquidation",
      desc: "Down sell your asset to another investor at a click of a button at zero cost. 100% of liquidity requests on TradeCred platform have been honoured till date."
    },
    {
      image: Image3,
      title: "Track Record",
      desc: "We have zero delinquency till date."
    },
    {
      image: Image4,
      title: "Diverse Set of Products",
      desc: "Invoice Discounting, Asset Leasing, Corporate Bonds, Sovereign Bonds"
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-[#061c37]">

      <div className="absolute top-5 left-5 flex gap-1 items-center text-3xl font-mono">
        <CurrencyBitcoinIcon className="text-green-300 text-5xl" />
        <p className="text-white">Investo</p>
      </div>
      <section className="absolute hidden xl:block left-20 top-1/3">

        <Swiper
          direction={'vertical'}
          pagination={{
            clickable: false,
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper h-96 w-[35vw]"
        >
          {slides.map((slide, id) => {
            return (
              <SwiperSlide key={id} className="flex flex-col">
                <Image alt="altText" src={slide.image} />
                <h1 className="text-green-300 text-4xl mt-4">{slide.title}</h1>
                <div className="text-white text-lg mt-2">{slide.desc}</div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>
      


        <div className="hidden py-44 px-8 sm:px-32 md:p-44 w-screen md:w-auto bg-white absolute top-32 bottom-0 md:right-0 rounded-t-[40px] md:rounded-tr-none md:rounded-tl-[80px] text-center sm:flex flex-col">
          <LoginRole existingEmail={existingEmail} existingRole={existingRole} userData={userData} setUserData={setUserData} view={view} setView={setView} />
          <LoginForm setIsSnackbarOpen={setIsSnackbarOpen} existingEmail={existingEmail} existingRole={existingRole} userData={userData} setUserData={setUserData} view={view} setView={setView} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: "700px" }}
          animate={{ opacity: 1, y: ["400px", "-50px", "0px"], transition: { duration: 0.8, ease: "easeOut" } }}
          exit={{ opacity: 0, y: "700px", transition: { duration: 0.3, ease: "easeOut" } }}
          transition={{ duration: 0.3 }}
          className="sm:hidden h-max overflow-y-hidden py-44 px-8 sm:px-32 md:p-44 w-screen md:w-auto bg-white absolute top-32 bottom-0 md:right-0 rounded-t-[40px] md:rounded-tr-none md:rounded-tl-[80px] text-center flex flex-col">
          <LoginRole existingEmail={existingEmail} existingRole={existingRole} userData={userData} setUserData={setUserData} view={view} setView={setView} />
          <LoginForm setIsSnackbarOpen={setIsSnackbarOpen} existingEmail={existingEmail} existingRole={existingRole} userData={userData} setUserData={setUserData} view={view} setView={setView} />
        </motion.div>

        <Snackbar
          autoHideDuration={4000}
          open={isSnackbarOpen}
          variant={"outlined"}
          color={isSnackbarOpen.color}
          onClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setIsSnackbarOpen(false);
          }}
        >
          {isSnackbarOpen.message}
        </Snackbar>
    </div>
  );
}


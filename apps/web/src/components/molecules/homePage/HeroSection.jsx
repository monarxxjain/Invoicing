import React from "react";
import { features } from "@/content/homeContent";
import { statistic } from "@/content/homeContent";
import arrow from "@/assets/home/arrow.svg";

import Image from "next/image";
import ImageCorousal from "./ImageCorousal";
import TheProcess from "./TheProcess";
import FAQS from "./FAQS";

const HeroSection = () => {
  return (
    <div className="lg:h-screen parentcss">
      <div className="lg:h-[85vh] px-12 sm:px-24 py-10 flex flex-col gap-10 bg-[url('/homeImages/heroImage.png')] bg-cover">
        {/* <Image className="absolute top-0 left-0 h-screen w-full "  width={1000} height={1000}/> */}

        <h1 className="text-5xl text-white font-normal">
          Best Invoice Discounting Platform
        </h1>
        <button className="py-2 px-5 sm:py-4 sm:px-10 transition duration-500 hover:shadow-none shadow-[0_0_100px_-10px_rgba(255,255,255)] text-left font-montserrat bg-green-500 font-medium rounded-lg w-fit text-white">
          GET STARTED
        </button>
        <div className="">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((item, index) => (
              <div
                className="bg-gray-50/15 px-6 py-3 blurFeat text-white rounded-tr-2xl rounded-bl-2xl"
                key={index}
              >
                <div className="flex z-10">
                  <h2 className="text-xl font-semibold px-2 py-3">
                    {item.title}
                  </h2>
                  <Image src={arrow} width={20} height={20} />
                </div>
                <p className="text-l text-white/70 font-normal px-2">
                  {item.description}
                </p>
              </div>
            ))}
          </ul>
        </div>

        <div className="">
          <ul className="flex justify-around gap-10 flex-wrap align-middle">
            {statistic.map((item, index) => (
              <div className="flex flex-col items-center gap-3 " key={index}>
                <Image src={item.chitra} width={75} height={75} />
                <h3 className="text-3xl font-bold text-white">{item.amount}</h3>
                <p className="text-sm text-white">{item.title}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:h-[15vh] flex justify-evenly gap-14 !p-8 bg-gray-100">
        <div className=" ms-0 sm:ms-10">
          <h3 className="text-l !w-32">Listed Brands</h3>
        </div>
        <ImageCorousal />
      </div>
    </div>
  );
};

export default HeroSection;

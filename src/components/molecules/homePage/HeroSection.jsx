import React from "react";
import { features } from "@/content/homeContent";
import { statistic } from "@/content/homeContent";
import Image from 'next/image'

const HeroSection = () => {
  
  return (
    <div className="px-12 sm:px-24 lg:h-screen bg-red-500 pt-16 py-10 flex flex-col gap-10">
      <h1 className="text-5xl text-white font-normal">Best Invoice Discounting Platform</h1>
      <button className="py-2 px-5 sm:py-4 sm:px-10 transition duration-500 hover:shadow-none shadow-[0_0_100px_-10px_rgba(255,255,255)] text-left font-montserrat bg-green-500 font-medium rounded-lg w-fit text-white">GET STARTED</button>
      <div className="">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, index) => (
            <div className="bg-white px-6 py-3 backdrop-blur-xl" key={index}>
              <h2 className="text-xl font-semibold px-2 py-3">{item.title}</h2>
              <p className="text-l font-normal px-2">{item.description}</p>
            </div>
          ))}
        </ul>
      </div>

      <div className="">
        <ul className="flex">
          {statistic.map((item, index) => (
            <div key={index}>
              <Image src={item.chitra} width={100} height={100} />
              <h3>{item.amount}</h3>
              <p>{item.title}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroSection;

"use client";
import React, { useState } from "react";
import { faqs } from "@/content/homeContent";

export default function FAQS() {
    const [open,setOpen] = useState(-1)

  return (
    <div className="flex flex-col  lg:flex-row gap-4 lg:gap-0 justify-evenly">
      <h3 className=" text-3xl md:text-5xl font-bold text-gray-400">FAQs</h3>
      <div>
        <ul className="flex flex-col gap-8 text-justify ">
          {faqs.map((item, index) => (
            <div className="">
              <div
                className="flex border-b-2 border-green-500 justify-between gap-32"
                key={index}
              >
                <h4 className="text-base sm:text-lg md:text-xl font-bold ">
                  {item.question}
                </h4>
                <button className=" text-2xl text-gray-500 w-10" onClick={
                    ()=>{
                        if(open === index)setOpen(-1);
                        else setOpen(index);
                    }
                } >+</button>
              </div>
              <div className={(open===index)?null:`hidden`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

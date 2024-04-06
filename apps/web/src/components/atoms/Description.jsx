import React from "react";
import Image from "next/image";

export default function Description({ title, details, logo1, logo2, logoAtTop, }) {
  return logoAtTop ? (
    <div className="p-5 flex flex-col gap-4 shadow-lg group hover:bg-green-500 transition-all rounded">
      <Image alt="altText" className="block group-hover:hidden" src={logo1} height={30} width={30}></Image>

      <Image alt="altText" className="hidden group-hover:block" src={logo2} height={30} width={30}></Image>

      <h3 className="font-bold">{title}</h3>
      <p>{details}</p>
    </div>
  ) : (
    <div></div>
  );
}

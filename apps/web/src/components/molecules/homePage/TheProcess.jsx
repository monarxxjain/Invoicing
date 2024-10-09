import Description from "@/components/atoms/Description";
import React from "react";

import buyerWhite from "@/assets/home/buyerWhite.png";
import buyerBlack from "@/assets/home/buyerBlack.png";
import partnerBlack from "@/assets/home/partnerBlack.png";
import partnerWhite from "@/assets/home/partnerWhite.png";

export default function TheProcess() {
  return (
    <div className="flex flex-col gap-3 mt-8 px-10 lg:px-24">
      <div className="text-center flex flex-col gap-4">
        <h2 className="font-semibold text-xl text-gray-800">The Process</h2>
        <h3 className="text-gray-500">
          Transact on India's largest Invoice Discounting Platform
        </h3>
      </div>

      <div className="justify-around gap-y-10 gap-6 grid grid-cols-1 md:grid-cols-3">
        <Description
          title={"Become an Investor"}
          details={
            "Deploy your capital in curated deals & watch your money grow"
          }
          logo1={buyerBlack}
          logo2={buyerWhite}
          logoAtTop={true}
        />
        <Description
          title={"Become a Partner"}
          details={
            "Deploy your capital in curated deals & watch your money grow"
          }
          logo1={partnerBlack}
          logo2={partnerWhite}
          logoAtTop={true}
        />
        <Description
          title={"Become a Seller"}
          details={"Solve your working capital problems conviently and quickly"}
          logo1={buyerBlack}
          logo2={buyerWhite}
          logoAtTop={true}
        />
      </div>
    </div>
  );
}

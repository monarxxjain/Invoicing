import Description from "@/components/atoms/Description";
import React from "react";

import buyerWhite from "@/assets/home/buyerWhite.png";
import buyerBlack from "@/assets/home/buyerBlack.png";
import partnerBlack from "@/assets/home/partnerBlack.png";
import partnerWhite from "@/assets/home/partnerWhite.png";

export default function TheProcess() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2>The Process</h2>
        <h3>Transact on India's largest Invoice Discounting Platform</h3>
      </div>

      <div className="flex justify-around ">
        <Description
          title={"Become an Buyer"}
          details={
            "Deploy your capital in curated deals & watch your money grow"
          }
          logo1={buyerBlack}
          logo2={buyerWhite}
          logoAtTop={true}
        />
        <Description
          title={"Become an Partner"}
          details={
            "Deploy your capital in curated deals & watch your money grow"
          }
          logo1={partnerBlack}
          logo2={partnerWhite}
          logoAtTop={true}
        />
        <Description
          title={"Become an Seller"}
          details={"Solve your working capital problems easily"}
          logo1={buyerBlack}
          logo2={buyerWhite}
          logoAtTop={true}
        />
      </div>
    </div>
  );
}

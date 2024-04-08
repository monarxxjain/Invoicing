import React, { useRef } from "react";
import { motion } from "framer-motion";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

const DealSummary = ({ showMore, setShowMore, role }) => {
  const summaryRef = useRef(null);

  const returnBack = () => {
    summaryRef.current.classList.add("slide-left-out");
    setTimeout(() => {
      setShowMore(null);
    }, 300);
  }
  return (
    showMore == "SUMMARY" && (
      <motion.div
        ref={summaryRef}
        initial={{ opacity: 0, x: "300px", y: "0px" }}
        animate={{ opacity: 1, x: "0", y: "0px" }}
        exit={{ opacity: 0, x: "-300px", y: "0px" }}
        transition={{ duration: 0.2 }}
        className="absolute top-[2px] left-[2px] rounded h-[99%] bg-white w-[99.4%] px-3 py-5"
      >
        <div className="flex gap-2 items-center text-gray-700 font-medium">
          <IconButton
            onClick={() => { returnBack() }}
          >
            <WestOutlinedIcon className="text-xl text-gray-700 cursor-pointer" />
          </IconButton>
          <div>Summary</div>
        </div>
        <div className="flex flex-col justify-between gap-9">
          <ul className="flex flex-col gap-4 p-3">
            <li>
              <div className="flex justify-between text-base">
                <h3>Expected Net IRR</h3>
                <p>10.40 %</p>
              </div>
            </li>
            <li>
              <div className="flex justify-between text-base">
                <h3>Tentative Deal Duration</h3>
                <p>0 days</p>
              </div>
            </li>
            <li>
              <div className="flex justify-between text-base">
                <h3>Tentative Maturation date</h3>
                <p>0 days</p>
              </div>
            </li>
            <li>
              <div className="flex justify-between text-base">
                <h3>Investment Amount</h3>
                <p>0 days</p>
              </div>
            </li>
            <li>
              <div className="flex justify-between text-base">
                <h3>Tentative maturity Value</h3>
                <p>0 days</p>
              </div>
            </li>
            <li>
              <p className="text-xs">
                Transactions might take upto 48 hours to reflect in your
                account. For further queries, you can reach us at
                support@tradecred.com. We are happy to help.
              </p>
            </li>
          </ul>
          {role == "INVESTOR" && <section className='flex justify-around text-gray-700 cursor-pointer font-medium'>
            <Button onClick={() => { setShowMore("RISKS") }} variant='secondary'>
              <div>Risks</div>
            </Button>
            <Button onClick={() => { returnBack() }} variant='outlined'>
              <div>DEAL</div>
            </Button>
            <Button onClick={() => { setShowMore("REPORT") }} variant='secondary'>
              <div>Deal Report</div>
            </Button>
          </section>}
        </div>
      </motion.div>
    )
  );
};

export default DealSummary;

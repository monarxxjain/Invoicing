import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Button, IconButton } from "@mui/material";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const DealRisks = ({ showMore, setShowMore }) => {
  const riskRef = useRef(null);
  const { user } = useContext(ThemeContext)

  const returnBack = () => {
    riskRef.current.classList.add("slide-left-out");
    setTimeout(() => {
      setShowMore(null);
    }, 300);
  }
  return (
    showMore == "RISKS" && (
      <motion.div
        ref={riskRef}
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
          <div>Risks</div>
        </div>
        <div className="p-2 flex flex-col justify-between gap-6">
          <h3 className="text-lg">
            I, {user?.name}, understand the risks involved and acknowledge of
            the following risks:
          </h3>
          <ol className="pt-3 text-sm flex flex-col gap-5">
            <li className="flex gap-2">
              <div className="h-2 w-3 mt-2 bg-black rounded-full"></div>There can be
              a delay in collection of money pertaining to the invoice amount,
              which is outside the control of TradeCred at any time
            </li>
            <li className="flex gap-2">
              <div className="h-2 w-3 mt-2 bg-black rounded-full"></div>There can be
              a shortfall in collection of money pertaining to the invoice
              amount, which is outside the control of TradeCred at any time.
            </li>
            <li className="flex gap-2">
              <div className="h-2 w-2 mt-2 bg-black rounded-full"></div>
              There arechances of intentional fraud by the Seller, which may not have
              been detected by TradeCred.
            </li>
          </ol>
          <section className='flex justify-around text-gray-700 cursor-pointer font-medium'>
            <Button onClick={() => { returnBack() }} variant='outlined'>
              <div>DEAL</div>
            </Button>
            <Button onClick={() => { setShowMore("SUMMARY") }} variant='secondary'>
              <div>Summary</div>
            </Button>
            <Button onClick={() => { setShowMore("REPORT") }} variant='secondary'>
              <div>Deal Report</div>
            </Button>
          </section>
        </div>
      </motion.div>
    )
  );
};

export default DealRisks;

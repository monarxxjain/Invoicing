import { Button, IconButton } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { useRef } from "react";
import Image from "next/image";
import MetaMaskWolf from "@/assets/icons/metamaskIcon.svg";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import InputFile from "@/components/atoms/InputFile";

const FormSignUp = ({ userData, setUserData, view, setView }) => {
  const sellerFormRef = useRef(null);
  const investorFormRef = useRef(null);
  const [sellerPageNo, setSellerPageNo] = useState(1);
  const handleSellerPageNo = (number) => {
    //console.log(number)
    if (number === 1) {
      setSellerPageNo(2);
    }
  };
  const handler = (e) => {
    e.preventDefault();

    setUserData((prev) => ({
      ...prev,
      modelData: {
        ...prev.modelData,
        metaMaskId: e.target.value,
      },
    }));
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    "&:hover": {
      backgroundColor: "#061c37",
    },
  }));

  return (
    <div className="w-96">
      {view == "DATA_INVESTOR" && (
        <motion.div
          ref={investorFormRef}
          initial={{ opacity: 0, x: "300px", y: "0px" }}
          animate={{ opacity: 1, x: "0", y: "0px" }}
          exit={{ opacity: 0, x: "-300px", y: "0px" }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-2 items-center text-gray-700 font-medium ps-4">
            <IconButton
              onClick={() => {
                investorFormRef.current.classList.add("slide-left-out");
                setTimeout(() => {
                  setView("ROLE");
                }, 300);
              }}
            >
              <WestOutlinedIcon className="text-xl text-gray-500 cursor-pointer" />
            </IconButton>
            <p className="text-gray-500">Previous</p>
          </div>
          <div className="flex flex-col gap-4 pt-4 ">
            <Image src={MetaMaskWolf} className="w-24 mx-auto" />
            <p className="text-black">
              Connect to your Metamask Wollete to proceed{" "}
            </p>
            <form>
              <ColorButton
                variant="contained"
                name="metaMaskId"
                type="submit"
                value={"metaMaskId"}
                onClick={(e) => {
                  handler(e);
                }}
              >
                Connect
              </ColorButton>
            </form>
          </div>
        </motion.div>
      )}

      {view == "DATA_SELLER" && sellerPageNo === 1 && (
        <motion.div
          ref={sellerFormRef}
          initial={{ opacity: 0, x: "300px", y: "0px" }}
          animate={{ opacity: 1, x: "0", y: "0px" }}
          exit={{ opacity: 0, x: "-300px", y: "0px" }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-2 items-center text-gray-700 font-medium">
            <IconButton
              onClick={() => {
                sellerFormRef.current.classList.add("slide-left-out");
                setTimeout(() => {
                  setView("ROLE");
                }, 300);
              }}
            >
              <WestOutlinedIcon className="text-xl text-gray-700 cursor-pointer" />
            </IconButton>
            <p>Back</p>
          </div>
          <form className="flex flex-col gap-4 py-4">
            <div className="flex justify-between items-center">
              <label for="name">Organisation Name:</label>
              <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Name"
          size="small"
        />
            </div>
            <div className="flex justify-between">
              <label for="email">Organisation Email:</label>
              <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Name"
          size="small"
        />
            </div>
            <div className="flex justify-between">
              <label for="contactNumber">Contact Number:</label>
              <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Name"
          size="small"
        />
            </div>
            <div className="flex justify-between">
              <label for="password">Password:</label>
              <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Name"
          size="small"
        />
            </div>

            <ColorButton variant="contained" onClick={() => handleSellerPageNo(1)}>Next</ColorButton>
          </form>
        </motion.div>
      )}
      {view == "DATA_SELLER" && sellerPageNo === 2 && (
        <motion.div
          ref={sellerFormRef}
          initial={{ opacity: 0, x: "300px", y: "0px" }}
          animate={{ opacity: 1, x: "0", y: "0px" }}
          exit={{ opacity: 0, x: "-300px", y: "0px" }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-2 items-center text-gray-700 font-medium">
            <IconButton
              onClick={() => {
                sellerFormRef.current.classList.add("slide-left-out");
                setTimeout(() => {
                  setSellerPageNo(1);
                }, 300);
              }}
            >
              <WestOutlinedIcon className="text-xl text-gray-500 cursor-pointer" />
            </IconButton>
            <p>Back</p>
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex justify-between">
              <label for="gstNumber">GST Number:</label>
              <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Name"
          size="small"
        />
            </div>

            <div className="flex justify-between">
              <label for="logo">Logo:</label>
              <InputFile/>
            </div>

            <div className="flex justify-between">
              <label for="metaMaskId">Connect metamask</label>
              <ColorButton variant="contained">Connect</ColorButton>
            </div>

            <imput type="submit"> Submit</imput>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default FormSignUp;

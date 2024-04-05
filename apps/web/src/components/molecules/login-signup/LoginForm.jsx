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
import { useEffect } from "react";

const LoginForm = ({ userData, setUserData, view, setView }) => {
  const sellerFormRef = useRef(null);
  const investorFormRef = useRef(null);
  const handler = (e) => {
    e.preventDefault();
    let field = e.target.name
    let value = e.target.value

    if(field == "logo"){
      value = e.target.files[0]
    }

    if(view == "INVESTOR"){
      setUserData((prev) => ({
        ...prev,
        modelData: {
          ...prev.modelData,
          metaMaskId: e.target.value,
        },
      }));
    }
    
    else{
      setUserData((prev) => ({
        ...prev, modelData : {
          ...prev.modelData,
          [field]: value
        }
      }))
    }
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    "&:hover": {
      backgroundColor: "#061c37",
    },
  }));

  useEffect(()=>{console.log(view)},[view])

  return (
    <div className="sm:w-96">
      {view == "INVESTOR" && (
        <motion.div
          ref={investorFormRef}
          initial={{ opacity: 0, x: "300px", y: "0px" }}
          animate={{ opacity: 1, x: "0", y: "0px" }}
          exit={{ opacity: 0, x: "-300px", y: "0px" }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-2 items-center text-gray-700 font-medium md:-ms-6">
            <IconButton
              onClick={() => {
                investorFormRef.current.classList.add("slide-left-out");
                setTimeout(() => {
                  setView("ROLE");
                }, 300);
              }}
            >
              <WestOutlinedIcon className="text-xl text-gray-700 cursor-pointer" />
            </IconButton>
            <p className="text-gray-700 text-2xl mx-auto">Investor Login</p>
          </div>
          <div className="flex flex-col gap-4 pt-4 ">
            <Image src={MetaMaskWolf} className="w-24 mx-auto" />
            <p className="text-black">
              Connect your Metamask Wollete to Get Started🔥 {" "}
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

      {view == "SELLER" && (
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
            <p className="text-2xl xs:ms-8">Company Login</p>
          </div>
          <form name="orgForm" className="flex flex-col gap-4 py-4">
            
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
              <label for="email">Organisation Email:</label>
              <TextField
                name="email"
                label="Email"
                id="outlined-size-small"
                size="small"
                className="w-full xs:w-auto"
                onChange={(e) => {handler(e)}}
              />
            </div>
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
              <label for="password">Password:</label>
              <TextField
                name="password"
                type="password"
                label="Password"
                id="outlined-size-small"
                size="small"
                className="w-full xs:w-auto"
                onChange={(e) => {handler(e)}}
              />
            </div>
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
                <label for="metaMaskId">Connect metamask</label>
                <Button variant="outlined" className="w-40" name="metaMaskId" type="submit" value={"metaMaskId"}  onClick={(e) => handler(e)}>Connect</Button>
            </div>

            <ColorButton variant="contained" >Submit</ColorButton>
          </form>
        </motion.div>
      )}
      
    </div>
  );
};

export default LoginForm;

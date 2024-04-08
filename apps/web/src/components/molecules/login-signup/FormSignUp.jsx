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
import { BACKEND_URL } from "@/content/values";
import axios from "axios";
import { useRouter } from 'next/navigation'
import LoadingButton from '@mui/lab/LoadingButton';
import { supabase } from "@/utils/supabase";
import { initWallet } from "@/utils/etherInterface";
import Link from "next/link";

const FormSignUp = ({ setIsSnackbarOpen, userData, setUserData, view, setView }) => {
  
  
  const router = useRouter()
  const sellerFormRef = useRef(null);
  const investorFormRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [sellerPageNo, setSellerPageNo] = useState(1);
  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    "&:hover": {
      backgroundColor: "#061c37",
    },
  }));
  const ColorLoadingButton = styled(LoadingButton)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    "&:hover": {
      backgroundColor: "#061c37",
    },
  }));

  const handleSellerPageNo = (number) => {
    if (number === 1) {
      setSellerPageNo(2);
    }
  };

  const handler = async (e) => {
    e.preventDefault();
    let field = e.target.name
    let value = e.target.value

    if (field == "logo") {
      value = e.target.files[0]
      console.log("File ", value);

      const currentDate = new Date();
      const timestamp = currentDate.getTime(); // Get current timestamp
      const fileName = `${timestamp}_${value.name}`; // Append timestamp to the file name
      console.log(fileName)
      let { data, error } = await supabase.storage.from('invoice').upload('/logos/' + fileName, value);
      if (error) {
        console.log("Supabase error ", error);
      } else {
        console.log("Supabase data ", data);
      }
      value = data.path
    }

    if (view == "DATA_INVESTOR") {
      setUserData((prev) => ({
        ...prev,
        modelData: {
          ...prev.modelData,
          metaMaskId: e.target.value,
        },
      }));
    }

    else {
      setUserData((prev) => ({
        ...prev, modelData: {
          ...prev.modelData,
          [field]: value
        }
      }))
    }
  };


  const connectWallet = async () => {
    try {

      setLoading(true)
      const { signer, walletAddress, contractInstance } = await initWallet()

      setUserData((prev) => ({
        ...prev, modelData: {
          ...prev.modelData, wolleteAddr: walletAddress
        }
      }))

      if(userData.role == "INVESTOR"){
        await signUpInvestor(walletAddress)
      }
      else {
        await signUpSeller()
      }

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const signUpInvestor = async (walletAddr) => {
    console.log("Wollete Address:", walletAddr)
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/signup/investor`,
        { wolleteAddr: walletAddr },
        { withCredentials: true }
      )
      if (res.data.message) {
        setIsSnackbarOpen(() => ({ color: "success", message: res.data.message }))
        router.push('/login')
      }
      else if (res.data.error) {
        console.log(res.data.error)
        setIsSnackbarOpen(() => ({ color: "danger", message: res.data.error }))
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log("Error In Axios")
    }

  }

  const signUpSeller = async () => {

    try {
      const res = await axios.post(`${BACKEND_URL}/auth/signup/seller`,
        { ...userData.modelData },
        { withCredentials: true }
      )
      if (res.data.message) {
        setIsSnackbarOpen(() => ({ color: "success", message: res.data.message }))
        router.push('/login')
      }
      else if (res.data.error) {
        console.log(res.data.error)
        setIsSnackbarOpen(() => ({ color: "danger", message: res.data.error }))
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log("Error In Axios")
    }

  }

  return (
    <div className="sm:w-96">
      {view == "DATA_INVESTOR" && (
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
            <p className="text-gray-700 text-2xl mx-auto">Investor SignUp</p>
          </div>
          <div className="flex flex-col gap-4 pt-4 ">
            <Image src={MetaMaskWolf} alt="metaMaskLogo" className="w-24 mx-auto" />
            <p className="text-black">
              Connect your Wollete to Get Started🔥 {" "}
            </p>
            <form>
              <ColorLoadingButton loadingPosition="end" loading={loading} onClick={() => { connectWallet() }} className="capitalize !px-4 text-lg !font-mono !font-light">Connect Web3</ColorLoadingButton>
            </form>
          </div>
          <div className="mt-10">
            <p>Have an account already? Click Here to <Link className="text-blue-500 hover:underline" href={"/login"}>login</Link></p>
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
            <p className="text-2xl xs:ms-8">Organisation Details</p>
          </div>
          <form name="orgForm" className="flex flex-col gap-4 py-4">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
              <label htmlFor="name">Organisation Name:</label>
              <TextField
                name="name"
                label="Name"
                id="outlined-size-small"
                size="small"
                required
                className="w-full xs:w-auto"
                onChange={(e) => { handler(e) }}
              />
            </div>
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
              <label htmlFor="email">Organisation Email:</label>
              <TextField
                name="email"
                label="Email"
                id="outlined-size-small"
                size="small"
                required
                className="w-full xs:w-auto"
                onChange={(e) => { handler(e) }}
              />
            </div>
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
              <label htmlFor="contactNumber">Contact Number:</label>
              <TextField
                name="contactNumber"
                label="Contact"
                id="outlined-size-small"
                size="small"
                required
                className="w-full xs:w-auto"
                onChange={(e) => { handler(e) }}
              />
            </div>
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
              <label htmlFor="password">Password:</label>
              <TextField
                name="password"
                type="password"
                label="Password"
                id="outlined-size-small"
                size="small"
                required
                className="w-full xs:w-auto"
                onChange={(e) => { handler(e) }}
              />
            </div>

            <ColorButton type="submit" variant="contained" onClick={(e) => handleSellerPageNo(1)}>Next</ColorButton>
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
              <WestOutlinedIcon className="text-xl text-gray-700 cursor-pointer" />
            </IconButton>
            <p className="text-2xl xs:ms-8">Organisation Details</p>
          </div>
          <form name="orgForm" className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
              <label htmlFor="gstNumber">GST Number:</label>
              <TextField
                name="gstNumber"
                label="GST No"
                id="outlined-size-small"
                size="small"
                required
                className="w-full xs:w-auto"
                onChange={(e) => { handler(e) }}
              />
            </div>
            <div className="flex flex-wrap   xs:flex-col gap-4 justify-between">
              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
                <label htmlFor="logo">Logo:</label>
                <InputFile handler={handler} />
              </div>

              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
                <label htmlFor="metaMaskId">Connect metamask</label>
                <LoadingButton variant="outlined" loadingPosition="end" loading={loading} onClick={() => { connectWallet() }} className="capitalize !px-4 text-lg !font-mono !font-light">Connect Web3</LoadingButton>
              </div>

            </div>

            <ColorLoadingButton loading={loading} variant="contained" type="submit" onClick={(e) => { e.preventDefault(); signUpSeller() }}> Submit</ColorLoadingButton>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default FormSignUp;

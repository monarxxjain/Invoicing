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

import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/content/values";
import { useRouter } from 'next/navigation'
import LoadingButton from '@mui/lab/LoadingButton';
import Link from "next/link";
import { initWallet, signMessage } from "@/utils/etherInterface";

const LoginForm = ({ setIsSnackbarOpen, existingEmail, userData, setUserData, view, setView }) => {

  const router = useRouter()
  const sellerFormRef = useRef(null);
  const investorFormRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError]= useState(null)


  const handler = (e) => {
    e.preventDefault();
    let field = e.target.name
    let value = e.target.value

    if (field == "logo") {
      value = e.target.files[0]
    }

    if (view == "INVESTOR") {
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

  const ColorIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    '&:hover': {
      backgroundColor: "#061c37",
    }
  }));

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
        await generateLoginRequest(signer, walletAddress, contractInstance)
      }
      setLoading(false)
      setIsSnackbarOpen(() => ({ color: "success", message: "Wollete Connected  " }))

    } catch (error) {
      console.log(error)
      setIsSnackbarOpen(() => ({ color: "danger", message: "Please Create a Web3 Wollete First" }))
      setLoading(false)
    }
  }

  const generateLoginRequest = async (signer, wolleteAddr, contractInstance) => {
    console.log("Wollete Address:", wolleteAddr)
    try {
      const res = await axios.put(`${BACKEND_URL}/auth/login/investor/request`,
        { wolleteAddr: wolleteAddr },
        { withCredentials: true }
      )
      if (res.data.message) {
        console.log(res.data.accessString)
        const signedMessage = await signMessage(signer, res.data.accessString)
        console.log(signedMessage)
        await loginInvestor(signedMessage, wolleteAddr)
      }
      else {
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  const loginInvestor = async (signedMessage, wolleteAddr) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login/investor/check`,
        { signedMessage: signedMessage, wolleteAddr: wolleteAddr,  },
        { withCredentials: true }
      )
      if(res.data.message) {
        setIsSnackbarOpen(() => ({ color: "success", message: res.data.message }))

        const result = res.data.result
        sessionStorage.setItem("TOKEN", result.access_token)
        localStorage.setItem("WOLLETEADDR", result.wolleteAddr)
        localStorage.setItem("ROLE", result.role)

        router.push('/investor')
      }
      else if(res.data.error) {
        console.log(res.data.error)
        setIsSnackbarOpen(() => ({ color: "danger", message: res.data.error }))
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log("Error Logging In Investor")
    }
  }

  const loginSeller = async () => {
    try {
      setSubmitLoading(true)
      const response = await axios.post(`${BACKEND_URL}/auth/login/seller`,
        { ...userData.modelData },
        { withCredentials: true }
      )
      if (response.data.error) {
        console.log(response.data.error)
        setIsSnackbarOpen(() => ({ color: "danger", message: response.data.error }))
        setSubmitLoading(false)
      }
      else {
        
        const result = response.data.result

        sessionStorage.setItem("TOKEN", result.access_token)
        localStorage.setItem("WOLLETEADDR", result.wolleteAddr)
        localStorage.setItem("EMAIL", result.email)
        localStorage.setItem("ROLE", result.role)
        localStorage.setItem("NAME", result.name)
        localStorage.setItem("SELLER_ID", result.sellerId)

        router.push('/seller')
      }
    } catch (error) {
      setSubmitLoading(false)
      console.log(error)
    }

  }

  useEffect(() => { console.log(view) }, [view])

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
            <ColorIconButton
              onClick={() => {
                investorFormRef.current.classList.add("slide-left-out");
                setTimeout(() => {
                  setView("ROLE");
                }, 300);
              }}
            >
              <WestOutlinedIcon className="text-lg text-white cursor-pointer" />
            </ColorIconButton>
            <p className="text-gray-700 text-2xl mx-auto">Investor Login</p>
          </div>
          <div className="flex flex-col gap-4 pt-4 ">
            <Image alt="altText" src={MetaMaskWolf} className="w-24 mx-auto" />
            <p className="text-black">
              Connect your Metamask Wollete to Get Started🔥 {" "}
            </p>
            <form>
              <ColorLoadingButton loadingPosition="end" loading={loading} onClick={() => {connectWallet()}} className="capitalize !px-4 text-lg !font-mono !font-light">Connect Web3</ColorLoadingButton>
            </form>
          </div>

          <div className="mt-10 text-sm">
            <p>Don't have an existing account? Click Here to <Link className="text-blue-500 hover:underline" href={"/signup"}>Sign Up</Link></p>
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
            <ColorIconButton
              onClick={() => {
                sellerFormRef.current.classList.add("slide-left-out");
                setTimeout(() => {
                  setView("ROLE");
                }, 300);
              }}
            >
              <WestOutlinedIcon className="text-lg text-white cursor-pointer" />
            </ColorIconButton>
            <p className="text-2xl xs:ms-8">Company Login</p>
          </div>
          <form name="orgForm" className="flex flex-col gap-4 py-4">

            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
              <label htmlFor="email">Organisation Email:</label>
              <TextField
                name="email"
                label="Email"
                id="outlined-size-small"
                size="small"
                defaultValue={existingEmail}
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
                className="w-full xs:w-auto"
                onChange={(e) => { handler(e) }}
              />
            </div>
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between">
              <label htmlFor="metaMaskId">Connect metamask: </label>
              <LoadingButton variant="outlined" loadingPosition="end" loading={loading} onClick={() => { connectWallet() }} className="capitalize !px-4 text-lg !font-mono !font-light">Connect Web3</LoadingButton>
            </div>
            <ColorLoadingButton loading={submitLoading} onClick={()=>{loginSeller()}} loadingPosition="end" variant="contained" >Submit</ColorLoadingButton>
          </form>
        </motion.div>
      )}

    </div>
  );
};

export default LoginForm;

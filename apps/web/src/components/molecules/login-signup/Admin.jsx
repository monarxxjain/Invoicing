"use client"
import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { styled } from "@mui/material";
import Image from "next/image";
import Bg1 from '@/assets/admin/AdminBg1.png'
import Bg2 from '@/assets/admin/AdminBg2.png'
import axios from "axios";
import { BACKEND_URL } from "@/content/values";
import { useRouter } from "next/navigation";
import Snackbar from '@mui/joy/Snackbar';
import LoadingButton from '@mui/lab/LoadingButton';
import { initWallet } from "@/utils/etherInterface";

const Admin = ({email}) => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    color: "",
    open: "",
    message: "",
    autoHideDuration: null
  })
  const ColorLoadingButton = styled(LoadingButton)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    "&:hover": {
      backgroundColor: "#061c37",
    },
  }));

  const [formData, setFormData] = useState({
    email: email || "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev, 
      [name] : value
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    console.log(formData)
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login/company`,
        { 
          email: formData.email,
          password: formData.password
        },
        {withCredentials: true}
      )
      if(res.data.message) {
        await initWallet()
        setSnackbar({
          open: true,
          message: res.data.message,
          color: "success",
          autoHideDuration: false
        })

        const result = res.data.result
        sessionStorage.setItem("TOKEN", result.access_token)
        localStorage.setItem("NAME", result.name)
        localStorage.setItem("EMAIL", result.email)
        localStorage.setItem("ROLE", result.role)

        router.push("/admin/sellers")
        setLoading(false)
      } 
      else if(res.data.error){
        console.log(res.data.error)
        setSnackbar({
          open:true,
          message: res.data.error,
          color: "danger",
          autoHideDuration: 4000
        })
        setLoading(false)
      }
    } catch (error) {
      console.log("Error Logging in Employee")
      setSnackbar({
        open:true,
        message: "Error Logging in Employee",
        color: "danger",
        autoHideDuration: 4000
      })
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="absolute text-center w-full text-5xl text-blue-500 top-10 font-mono">Investo</h1>
      <div className="flex items-center justify-center h-screen w-screen overflow-hidden bg-[#0a1727]">4
        <Image className="fixed bottom-0 right-0 w-[450px]" src={Bg1} />
        <Image className="absolute left-0 bottom-0 z-10 w-[500px]" src={Bg2} />
        <div className="absolute top-0 left-0 h-screen w-1/2 bg-[#062744]/50 triangle-clip"></div>
        <div className="z-10  px-32 py-16 shadow-xl hover:shadow-lg rounded-[40px]  flex flex-col gap-10 items-center bg-gray-100">
          <h1 className="text-4xl text-center">Welcome</h1>
          <form className="flex flex-col gap-6">
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="w-96  border border-gray-300 rounded-md py-2 px-4"
                onChange={(e) => {handleChange(e)}}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600 mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                className=" w-96 border border-gray-300 rounded-md py-2 px-4"
                onChange={(e) => {handleChange(e)}}
              />
            </div>
          </form>
          <ColorLoadingButton loadingPosition="end" loading={loading} variant="contained" type="submit" onClick={() => {handleSubmit()}}><div className="me-3">Login</div></ColorLoadingButton>
        </div>
      </div>
      <Snackbar
        autoHideDuration={snackbar.autoHideDuration || 1000000}
        open={snackbar.open} 
        variant={"outlined"}
        color={snackbar.color}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setSnackbar({
            open: false,
            color: null,
            message: null
          });
        }}
      >
        {snackbar.message}
      </Snackbar>
    </>
  );
};

export default Admin;

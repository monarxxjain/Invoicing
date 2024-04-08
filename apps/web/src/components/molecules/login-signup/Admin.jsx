"use client"
import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { styled } from "@mui/material";
import Image from "next/image";
import Bg1 from '@/assets/admin/AdminBg1.png'
import axios from "axios";
import { BACKEND_URL } from "@/content/values";
import { useRouter } from "next/navigation";

const Admin = ({email}) => {

  const router = useRouter()
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    '&:hover': {
      backgroundColor: "#061c37",
    }
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
        router.push("/admin/dashboard")
      } 
      else if(res.data.error){
        console.log(res.data.error)
      }
    } catch (error) {
      console.log("Error Logging in Employee")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden bg-[#0a1727]">4
      <Image className="fixed -bottom-20 -right-24" src={Bg1} />
      <div className="absolute top-0 left-0 h-screen w-1/2 bg-[#062744]/50 triangle-clip"></div>
      <div className="z-10  px-32 py-10 hover:shadow-lg rounded-3xl  flex flex-col gap-10 items-center bg-gray-100">
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
        <ColorButton variant="contained" type="submit" onClick={() => {handleSubmit()}}>Login</ColorButton>
      </div>
    </div>
  );
};

export default Admin;

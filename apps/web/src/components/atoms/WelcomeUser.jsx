"use client"
import React from 'react'
import { useContext, useRef } from 'react';
import ThemeContext from '../context/ThemeContext';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken';

const WelcomeUser = () => {
    const { user } = useContext(ThemeContext);
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')
    const role = cookieStore.get('ROLE')
    const decodedToken = jwt.decode(token?.value);
    console.log(token, role, decodedToken)
    if(!decodedToken?.wolleteAddr){
      redirect("/")
    }
  return (
    <h1 className="text-2xl">Welcome, <span className="font-serif font-semibold italic">{user?.name || "Monark Jain"}</span> 👋</h1>
  )
}

export default WelcomeUser

"use client"
import React from 'react'
import { useContext, useRef } from 'react';
import ThemeContext from '../context/ThemeContext';

const WelcomeUser = () => {
    const { user } = useContext(ThemeContext);
  return (
    <h1 className="text-2xl">Welcome, <span className="font-serif font-semibold italic">{user?.name || "Monark Jain"}</span> 👋</h1>
  )
}

export default WelcomeUser

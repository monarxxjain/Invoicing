"use client"
import { useState, useEffect } from "react";
import HeroSection from "@/components/molecules/homePage/HeroSection";
import "./home.css"
import { motion } from "framer-motion";
import Features from "@/components/molecules/homePage/Features";

export default function Home() {

  const [mousePosition, setMousePosition] = useState({
    x: 183,
    y: 170
  })

  const [cursorVariant, setCursorVariant] = useState("title")

  useEffect(()=>{

    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  },[])

  const variants = {
    default: {
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
      transition: {
        type: "smooth",
        duration: 0,
      },
    },

    title: {
      height: 70,
      width: 70,
      x: mousePosition.x - 35,
      y: mousePosition.y - 35,
      transition: {
        type: "smooth",
        duration: 0,
      },
      backgroundColor: "white",
      mixBlendMode: "difference"
    },

    text: {
      height: 30,
      width: 30,
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      transition: {
        type: "smooth",
        duration: 0,
      },
      backgroundColor: "white",
      mixBlendMode: "difference"
    },

    button: {
      height: 20,
      width: 20,
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      transition: {
        type: "smooth",
        duration: 0,
      },
      backgroundColor: "white",
      mixBlendMode: "difference"
    },

    scrollBtn: {
      height: 48,
      width: 48,
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      transition: {
        type: "smooth",
        duration: 0,
      },
      backgroundColor: "white",
      mixBlendMode: "difference"
    },

  }

  return (
    <div>
      <motion.div 
        className="cursor"
        variants={variants}
        animate={cursorVariant}
      />
      <HeroSection setCursorVariant={setCursorVariant} />
      <Features setCursorVariant={setCursorVariant} />
    </div>
  );
}
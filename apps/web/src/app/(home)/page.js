"use client"
import { useState, useEffect } from "react";
import HeroSection from "@/components/molecules/homePage/HeroSection";
import "./home.css"
import { motion } from "framer-motion";

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
    }

  }

  return (
    <div>
      <motion.div 
        className="cursor"
        variants={variants}
        animate={cursorVariant}
      />
      <HeroSection setCursorVariant={setCursorVariant} />
    </div>
  );
}
// export default function Home() {
//     const cookieStore = cookies()
//     const wolleteAddr = cookieStore.get('WOLLETEADDR')
//     const role = cookieStore.get('ROLE')
//     const token = cookieStore.get('access_token')
//     const decodedToken = jwt.decode(token?.value);
//   return (
//     <div>
//       <Navbar role={role} wolleteAddr={wolleteAddr} token={token}/>
//       <HeroSection role={role} wolleteAddr={wolleteAddr} token={token} />
//       <div className="flex flex-col gap-16">
//         <TheProcess />
//         <FAQS />
//         <Footer/>
//       </div>
//     </div>
//   );
// }

"use client"
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import { relative } from "path";
import { useRef, useEffect } from "react";


export default function RootLayout({ children, width="fit-content" }) {

  const ref = useRef(null)
  const isInView = useInView(ref, {once:true});

  const mainControls = useAnimation();
  const sideControls = useAnimation();

  useEffect(()=>{
    if(isInView) {
      mainControls.start("visible")
      sideControls.start("visible")
    }
  },[isInView])

  return (
    <html lang="en">
      <body>
        <Image src="/homeImages/4.jpg" width={1600} height={900} className="w-screen h-screen absolute -z-10" />
        <div ref={ref} style={{position: relative, width, overflow: "hidden"}}>
          <motion.div
            variants={{
              hidden: {opacity: 0, y: 75},
              visible: {opacity: 1, y: 0},
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration:0.5, delay: 0.25 }}
          >
            {children}
          </motion.div>
          
          
            
        </div>
      </body>
    </html>
  );
}

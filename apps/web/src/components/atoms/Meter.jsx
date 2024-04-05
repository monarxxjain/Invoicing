import { useEffect, useRef, useState } from "react";
import img from "@/assets/icons/pointer.png";
import Image from 'next/image'

export default function Meter({ totalAmount, receivedAmount }) {
  const received = useRef(null);
  const intigat = useRef(null);
  const [roted, setRoted] = useState(180);
  const [intigatRoted, setIntigatRoted] = useState(-110);

  useEffect(() => {
    received.current.style.transform = `rotate(${roted}deg) translateX(-50%)`;
    intigat.current.style.transform = `translateX(-50%) rotate(${intigatRoted}deg)`;

    const interval = setInterval(() => {
      if (roted >= 180 && roted < 180 + (totalAmount / receivedAmount) * 100) {
        setRoted(roted + 1);
      }

      if (intigatRoted < (totalAmount / receivedAmount) * 100 - 80) {
        setIntigatRoted(intigatRoted + 1);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="metter border-b border-b-gray-300 ">
      <div ref={received} className="metter-confirmd"></div>
      <div className="metter-inner"></div>
      <div className="metter-border"></div>
      <div ref={intigat} className="metter-intigator">
        <Image alt="altText" src={img} alt="" />
        <div className="metter-intigator-inner"></div>
      </div>
    </div>
  );
}

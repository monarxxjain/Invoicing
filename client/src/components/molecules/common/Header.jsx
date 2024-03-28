'use client'
import { usePathname } from 'next/navigation'
import ThemeContext from '@/components/context/ThemeContext';
import { useContext, useEffect, useRef, useState } from "react";

import { RiNotification2Fill } from "react-icons/ri";
import Dropdown from "@/components/atoms/Dropdown";
import Profile from "@/components/atoms/Profile";
import Search from '@/components/atoms/Search';

export default function Header() {
  const [isNotifix, setIsNotific] = useState(false);
  const ref = useRef(null);

  const { user } = useContext(ThemeContext);

  const [title, setTitle] = useState("");

  let { pathname } = usePathname();

  

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsNotific(false);
      }
    });
  }, []);

  const notificHandler = () => {
    setIsNotific(!isNotifix);
  };
  return (
    <header className="py-5 w-full px-5">
      <div className="flex justify-between">
        <div className="text-4xl font-semibold">
          <h3>{title || "Dashboard"}</h3>
        </div>
        <div className="flex group bg-gray-100 rounded ">
          <Search />
        </div>
        <div className="flex items-center gap-5">
          <div ref={ref} className="">
            <button onClick={notificHandler} className='relative'>
              <RiNotification2Fill className='text-gray-500 text-2xl' />
              <span className='absolute right-0 -top-2 text-white text-[8px] w-3  bg-red-600 rounded-full'>5</span>
            </button>
            {isNotifix && <Dropdown data={values.notific} />}
          </div>
          <Profile user={user} />
        </div>
      </div>
    </header>
  );
}

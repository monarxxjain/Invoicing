import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BiSolidUserVoice } from "react-icons/bi";
import { FaAngleLeft, FaCarSide } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { PiSquaresFourFill } from "react-icons/pi";
import { RiHotelFill } from "react-icons/ri";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Sidebar({ isFull, setIsFull }) {
  const menu = [
    {
      name: "dashboard",
      icon: <PiSquaresFourFill />,
      url: "/",
    },
    {
      name: "Quote Requests",
      icon: <BiSolidUserVoice />,
      notific: 5,
      url: "/booking",
    },
    {
      name: "Hotel Management",
      icon: <RiHotelFill />,
      url: "/hotel",
    },
    {
      name: "Modules",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.4635 1.37373C15.3214 1.24999 13.8818 1.24999 12.0453 1.25H11.9547C10.1182 1.24999 8.67861 1.24999 7.53648 1.37373C6.37094 1.50001 5.42656 1.76232 4.62024 2.34815C4.13209 2.70281 3.70281 3.13209 3.34815 3.62024C2.76232 4.42656 2.50001 5.37094 2.37373 6.53648C2.24999 7.67861 2.24999 9.11822 2.25 10.9548V13.0453C2.24999 14.8818 2.24999 16.3214 2.37373 17.4635C2.50001 18.6291 2.76232 19.5734 3.34815 20.3798C3.70281 20.8679 4.13209 21.2972 4.62024 21.6518C5.42656 22.2377 6.37094 22.5 7.53648 22.6263C8.67859 22.75 10.1182 22.75 11.9547 22.75H12.0453C13.8818 22.75 15.3214 22.75 16.4635 22.6263C17.6291 22.5 18.5734 22.2377 19.3798 21.6518C19.8679 21.2972 20.2972 20.8679 20.6518 20.3798C21.2377 19.5734 21.5 18.6291 21.6263 17.4635C21.75 16.3214 21.75 14.8818 21.75 13.0453V10.9547C21.75 9.11824 21.75 7.67859 21.6263 6.53648C21.5 5.37094 21.2377 4.42656 20.6518 3.62024C20.2972 3.13209 19.8679 2.70281 19.3798 2.34815C18.5734 1.76232 17.6291 1.50001 16.4635 1.37373ZM6 9.5C6 8.94772 6.44771 8.5 7 8.5H15C15.5523 8.5 16 8.94772 16 9.5C16 10.0523 15.5523 10.5 15 10.5H7C6.44771 10.5 6 10.0523 6 9.5ZM6 14.5C6 13.9477 6.44771 13.5 7 13.5H10C10.5523 13.5 11 13.9477 11 14.5C11 15.0523 10.5523 15.5 10 15.5H7C6.44771 15.5 6 15.0523 6 14.5Z"
            fill="#161616"
          />
        </svg>
      ),
      url: "/module",
    },
    {
      name: "Transport",
      icon: <FaCarSide />,
      url: "/transport",
    },
    {
      name: "Settings",
      icon: <IoSettingsSharp />,
      url: "/setting",
    },
  ];

  const [activeMenu, setActiveMenu] = useState(menu[0].url);
  const location = usePathname();

  useEffect(() => {
    setActiveMenu(location.pathname);
  });

  return (
    <nav className={`${isFull ? "-mt-[0.05rem]" : ""} h-screen max-h-[50vh]`} id="nav">
      <div className={`flex justify-center relative my-auto items-center ${isFull ? "py-2 pb-3" : "py-4"} border-e border-e-gray-300`}>
        <div className="flex items-center mx-3 ">
          <Image src={logo} className={`${isFull ? "w-[60px]" : "w-[50px]"} `} />
          {isFull && <div className="text-2xl font-bold">Investo</div>}
        </div>
        <button
          style={{
            transform: !isFull
              ? "translate(50%, -50%) rotate(180deg)"
              : "translate(50%, -50%)",
          }}
          onClick={() => setIsFull(!isFull)}
          className="absolute right-0 rounded-full shadow-md bg-white p-1 mt-5"
        >
          <FaAngleLeft />
        </button>
        
      </div>

      <section className={`${isFull ? "px-8" : "px-2"} border-e flex flex-col justify-between  h-full`}>
        <div className="nav-main">
          <ul className="nav-menu">
            {menu.map((d, i) => (
              <li key={i}>
                <Link
                  // onClick={() => setActiveMenu(d.url.replace("/", ""))}
                  className={(d.url === activeMenu && "active") || ""}
                  href={d.url}
                >
                  {d.icon}
                  {isFull && <p>{d.name}</p>}
                  {isFull && d.notific && (
                    <span className="nofic">{d.notific}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-logout">
          <Link href="/ login"
            onClick={() => {
              Cookies.remove("login");
            }}
          >
            <FiLogOut />
            {isFull && <span>logout</span>}
          </Link>
        </div>
      </section>

    </nav>
  );
}

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BiSolidUserVoice } from "react-icons/bi";
import { FaAngleLeft, FaCarSide } from "react-icons/fa";
import LogoutIcon from '@mui/icons-material/Logout';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { PiSquaresFourFill } from "react-icons/pi";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { usePathname } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Sidebar({ isFull, setIsFull }) {
  const menu = [
    {
      name: "Discover",
      icon: <LocalLibraryIcon />,
      url: "/investor",
    },
    {
      name: "Overview",
      icon: <InsertChartIcon />,
      url: "/booking",
    },
    {
      name: "Portfolio",
      icon: <BusinessCenterIcon />,
      url: "/hotel",
    },
    {
      name: "Profile",
      icon: <PersonIcon />,
      url: "/transport",
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      url: "/setting",
    },
  ];

  const [activeMenu, setActiveMenu] = useState(menu[0].url);
  const location = usePathname();

  useEffect(() => {
    setActiveMenu(location.pathname);
  });

  return (
    <nav className={`${isFull ? "-mt-[0.05rem]" : ""}`} id="nav">
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

      <section className={`${isFull ? " py-4" : "py-4"} bg-[#061C37] text-white border-e flex flex-col justify-between h-[90vh] sticky`}>
        <div className="">
          <ul className="flex flex-col gap-2 font-light">
            {menu.map((d, i) => (
              <li key={i} className="hover:text-blue-500 hover:font-medium group flex w-min">
                {/* <div className="invisible group-hover:visible w-2 rounded-e bg-green-300 z-10"></div> */}
                <Link
                  // onClick={() => setActiveMenu(d.url.replace("/", ""))}
                  className={(d.url === activeMenu && "active") || `flex items-center gap-3 p-2 rounded tab transition-all ${isFull ? "w-48 mx-2" : "ms-3"}`}
                  href={d.url}
                >
                  {d.icon}
                  {isFull && <p>{d.name}</p>}
                  {isFull && d.notific && (
                    <span className="text-white bg-red-600 text-sm px-1 text-center  rounded-full">{d.notific}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          
          <div className="flex w-min">
            <Link href="/ login"
              className={`flex tab hover:text-blue-500 hover:font-medium items-center gap-3 p-2 rounded transition-all ${isFull ? "w-48 mx-2" : "ms-3"}`}
              onClick={() => {
                Cookies.remove("login");
              }}
            >
              <LiveHelpIcon />
              {isFull && <span>FAQ</span>}
            </Link>
          </div>
          <div className="flex w-min">
            <Link href="/ login"
              className={`flex tab hover:text-blue-500 hover:font-medium items-center gap-3 p-2 rounded transition-all ${isFull ? "w-48 mx-2" : "ms-3"}`}
              onClick={() => {
                Cookies.remove("login");
              }}
            >
              <LogoutIcon />
              {isFull && <span>Logout</span>}
            </Link>
          </div>
        </div>
      </section>

    </nav>
  );
}
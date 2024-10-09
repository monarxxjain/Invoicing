import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import logo from "@/assets/logo.png";
import { FaAngleLeft } from "react-icons/fa";
import LogoutIcon from '@mui/icons-material/Logout';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useContext } from "react";
import ThemeContext from "@/components/context/ThemeContext";
import { Logout } from "@mui/icons-material";
import axios from "axios";
import { BACKEND_URL } from "@/content/values";

export default function Sidebar({ menu, isFull, setIsFull }) {

  const { user } = useContext(ThemeContext)
  const role = user?.role?.toLowerCase()
  const [activeMenu, setActiveMenu] = useState(menu[0].url);
  const location = usePathname();

  useEffect(() => {
    setActiveMenu(location);
  });

  const logout = async () => {
    try {
      console.log("object")
      const response = await axios.get(`${BACKEND_URL}/auth/logout`,{withCredentials: true})
      sessionStorage.clear()
      console.log(response.message)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  } 
  

  return (
    <nav className={`${isFull ? "-mt-[0.05rem]" : ""}`} id="nav">
      <div className={`flex justify-center relative my-auto items-center ${isFull ? "py-2 pb-3" : "py-4"} border-e border-e-gray-300`}>
        <div className="flex items-center mx-3 ">
          <Image alt="altText" src={logo} className={`${isFull ? "w-[60px]" : "w-[50px]"} `} />
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
            {menu.map((d, i) => {
              return (
                <li key={i} className={`hover:text-blue-500 hover:font-medium ${d.url === activeMenu && "text-blue-500 font-medium"} group flex w-min`}>
                  <Link
                    className={`flex items-center gap-3 p-2 rounded tab transition-all duration-75 ${d.url === activeMenu && "active"} ${isFull ? "w-48 mx-2" : "ms-3"}`}
                    href={d.url}
                  >
                    {d.icon}
                    {isFull && <p>{d.name}</p>}
                    {isFull && d.notific && (
                      <span className="text-white bg-red-600 text-sm px-1 text-center  rounded-full">{d.notific}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-2">

          <div className="flex w-min">
            <Link href={`/${role}/ask`}
              className={`flex tab hover:text-blue-500 hover:font-medium items-center gap-3 p-2 rounded transition-all duration-75 ${isFull ? "w-48 mx-2" : "ms-3"}`}
            >
              <LiveHelpIcon />
              {isFull && <span>Ask A.I.</span>}
              {isFull && <AutoAwesomeIcon className="text-base" />}
            </Link>
          </div>
          <div className="flex w-min">
            <Link href={"/"}
              className={`flex tab hover:text-blue-500 hover:font-medium items-center gap-3 p-2 rounded transition-all duration-75 ${isFull ? "w-48 mx-2" : "ms-3"}`}
              onClick={() => {
                logout()
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

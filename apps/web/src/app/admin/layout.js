"use client"
import ThemeContext from "@/components/context/ThemeContext";
import Header from "@/components/molecules/common/Header";
import Sidebar from "@/components/molecules/common/Sidebar";
import { Inter } from "next/font/google";
import { useState } from "react";
import WindowIcon from '@mui/icons-material/Window';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BusinessIcon from '@mui/icons-material/Business';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useEffect } from "react";
import { initWallet } from "@/utils/etherInterface";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {

  const router = useRouter();

  const [render, setRender] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("TOKEN");
    const decodedToken = jwt.decode(token);

    if (!token || decodedToken?.role !== "ADMIN") {
      router.push("/");
    } else {
      setRender(true);
    }
  }, [router]);

  let name, email, role = "";
  const [user, setUser] = useState()
  

  const [isFull, setIsFull] = useState(true);
  const [wolleteInfo, setWolleteInfo] = useState(null)
  const notifications = [
    {
      title: "This is tilte 1",
      description: "Desc",
      read: true,
      time: "4h"
    },
    {
      title: "This is tilte 2",
      description: "Desc",
      read: false,
      time: "4h"
    },
    {
      title: "This is tilte 3",
      description: "Desc",
      read: true,
      time: "4h"
    },
    {
      title: "This is tilte 4",
      description: "Desc",
      read: false,
      time: "4h"
    },
    {
      title: "This is tilte 5",
      description: "Desc",
      read: false,
      time: "4h"
    }
  ]

  const menu = [
    // {
    //   name: "Dashboard",
    //   icon: <WindowIcon />,
    //   url: "/admin/dashboard",
    // },
    {
      name: "Sellers",
      icon: <AccountBoxIcon />,
      url: "/admin/sellers",
    },
    {
      name: "Deals",
      icon: <BusinessCenterIcon />,
      url: "/admin/deals",
    },
    {
      name: "Company",
      icon: <BusinessIcon />,
      url: "/admin/company",
    },
    {
      name: "Transactions",
      icon: <ManageHistoryIcon />,
      url: "/admin/transactions",
    }
  ];

  const InitWeb3Wallete = async () => {
    const data = await initWallet()
    setWolleteInfo(data)
  }

  useEffect(()=>{
    name = localStorage.getItem("NAME")
    email = localStorage.getItem("EMAIL")
    role = "ADMIN"

    setUser({ name, email, role })
    InitWeb3Wallete()
  },[])



  return (
    <ThemeContext.Provider value={{user, notifications, wolleteInfo}}>
        <div className="absolute w-screen h-[0.5px] z-10 top-20 bg-gray-300"></div>
        <div className="flex overflow-y-hidden h-screen">
          <Sidebar menu={menu} isFull={isFull} setIsFull={setIsFull} />
          <div className="w-full">
            <Header />  
            <div className={inter.className + " hide-scrollbars overflow-y-scroll"}>{children}</div>
          </div>
        </div>
    </ThemeContext.Provider>
  );
}

"use client"
import ThemeContext from "@/components/context/ThemeContext";
import Header from "@/components/molecules/common/Header";
import Sidebar from "@/components/molecules/common/Sidebar";
import { Inter } from "next/font/google";
import { useState } from "react";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { initWallet } from "@/utils/etherInterface";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const router = useRouter();

  const [render, setRender] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("TOKEN");
    const decodedToken = jwt.decode(token);

    if (!token || decodedToken?.role !== "INVESTOR") {
      router.push("/login");
    } else {
      setRender(true);
    }
  }, [router]);


  const [user, setUser] = useState({role: "INVESTOR"})
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
    {
      name: "Discover",
      icon: <LocalLibraryIcon />,
      url: "/investor",
    },
    {
      name: "Portfolio",
      icon: <BusinessCenterIcon />,
      url: "/investor/portfolio",
    },
    {
      name: "Overview",
      icon: <InsertChartIcon />,
      url: "/investor/overview",
    },
    {
      name: "Transactions",
      icon: <ManageHistoryIcon />,
      url: "/investor/transactions",
    }
  ];

  const InitWeb3Wallete = async () => {
    const data = await initWallet()
    setWolleteInfo(data)
  }

  useEffect(()=>{
    InitWeb3Wallete()
  },[])


  if(render) return (
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
  else return null;
}

"use client"
import ThemeContext from "@/components/context/ThemeContext";
import Header from "@/components/molecules/common/Header";
import Sidebar from "@/components/molecules/common/Sidebar";
import { Inter } from "next/font/google";
import { useState } from "react";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const name = localStorage.getItem("NAME")
  const email = localStorage.getItem("EMAIL")
  const role = "ADMIN"
  const user = { name, email, role }

  const [isFull, setIsFull] = useState(true);
  
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
      url: "/admin/dashboard",
    },
    {
      name: "Sellers",
      icon: <BusinessCenterIcon />,
      url: "/admin/sellers",
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

  return (
    <ThemeContext.Provider value={{user, notifications}}>
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
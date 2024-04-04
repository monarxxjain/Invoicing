'use client'
import ThemeContext from '@/components/context/ThemeContext';
import { useContext, useEffect, useRef, useState } from "react";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Dropdown from "@/components/atoms/Dropdown";
import Profile from "@/components/atoms/Profile";
import Search from '@/components/atoms/Search';
import IconButton from '@mui/material/IconButton';

export default function Header() {
  const [notificationDialog, setNotificationDialog] = useState(false);

  const { user, notifications } = useContext(ThemeContext);

  const [title, setTitle] = useState("");


  


  const notificationHandler = () => {
    setNotificationDialog(!notificationDialog);
  };
  
  return (
    <header className="py-4 w-full px-5">
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">
          <h3>{title || "Dashboard"}</h3>
        </div>
        <div className="flex group bg-gray-100 rounded ">
          <Search />
        </div>
        <div className="flex items-center gap-5">
          <div onClick={notificationHandler} className='relative'>
              <IconButton>
                <NotificationsNoneIcon className='text-gray-500 text-3xl' />
              </IconButton>
              <span className='absolute right-2 top-2 w-1.5 h-1.5 bg-red-600 rounded-full'></span>
              {notificationDialog && <Dropdown data={notifications} setNotificationDialog={setNotificationDialog} />}
          </div>
          <Profile user={user} />
        </div>
      </div>
    </header>
  );
}

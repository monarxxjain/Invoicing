import Link from 'next/link'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { useEffect, useRef } from 'react';

export default function Dropdown({ data, setNotificationDialog }) {
  const ref = useRef(null)

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        ref.current.classList.add('fade-out')

        setTimeout(() => {
          console.log("hello")
          setNotificationDialog(false);
        }, 10);
      }
    });
  }, []);

  return (
    <div ref={ref} className='absolute fade-in right-0 border border-gray-300 rounded top-10 z-20 bg-white w-80 '>
      <div className='border-b border-b-gray-300 flex gap-2 items-center text-gray-700 px-2 py-1'>
          <NotificationsNoneIcon className='text-lg' />
        <div className='text-sm'>
          Notifications ({data.length})
        </div>
      </div>
      <ul className="overflow-y-scroll h-80">
        {data.map((notification, i) => (
          <li key={i} className={`flex gap-2 py-2 border-b border-gray-300 px-3 ${notification.read ? "bg-blue-100 hover:bg-gray-100" : ""} `}>
            <CircleNotificationsIcon className='text-blue-500 text-5xl' />
            <div className='flex flex-col gap-2'>
              <p className='font-semibold text-gray-800'>{notification.title}</p>
              <p className='text-left text-xs text-gray-600'>{notification.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

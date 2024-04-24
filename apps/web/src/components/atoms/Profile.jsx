import Image from 'next/image'
import { useRef, useState } from "react";
import profileImg from "@/assets/icons/profile.png";

export default function Profile({ user }) {
  const ref = useRef(null);

  return (
    <div className="flex gap-3 select-none rounded hover:bg-gray-100 items-center active:bg-gray-200 transition-all px-2 cursor-pointer py-1" ref={ref}>
      <div className="">
        <Image src={user?.img || profileImg} alt="Profile img" className="rounded-full" />
      </div>
      <div className="profile-body -mt-1">
        {user?.name}
        <div className="text-blue-500 text-sm">{user?.role} </div>
      </div>
    </div>
  );
}

import Cookies from "js-cookie";
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { usePathname } from "next/navigation";
import profileImg from "@/assets/icons/profile.png";
import Dropdown from "./Dropdown";
import { menu } from "@/content/headerContent";

export default function Profile({ user }) {
  const [isDropdown, setIsDropdown] = useState(false);
  const ref = useRef(null);
  const navigate = usePathname();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsDropdown(false);
      }
    });
  }, []);

  const dropdownHandler = () => {
    setIsDropdown(!isDropdown);
  };

  const logout = () => {
    Cookies.remove("login");
    navigate("/login");
  };

  return (
    <div className="flex gap-3" ref={ref}>
      <div className="">
        <Image src={user?.img || profileImg} alt="Profile img" className="rounded-full" />
      </div>
      <div onClick={dropdownHandler} className="profile-body -mt-1">
          {user?.firstName} {user?.lastName} rrer ergr
          <div className="text-blue-500 text-sm">{user?.role} admin</div>
      </div>
      <div className="text-gray-500 relative self-end">
        <button onClick={dropdownHandler}>
          <BiSolidDownArrow />
        </button>
        {isDropdown && <Dropdown handler={logout} data={menu} />}
      </div>
    </div>
  );
}

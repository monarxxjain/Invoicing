import Link from "next/link";
import React from "react";
import { useEffect } from "react";


// this is [view] = "ROLE"
const LoginRole = ({existingSellerStatus, existingRole, userData, setUserData, view, setView}) => {


  
    const handler = (role) => {
        setUserData((prev) => ({ ...prev, role: role }))

        if(role=="INVESTOR") {
            setView("INVESTOR")
        }
        else{
            setView("SELLER")
        }
    }

    useEffect(()=>{
      if(existingRole) {
        handler(existingRole)
      }
    },[])


  return (
    view == "ROLE" &&
    <>
        <div>
            <h1 className="text-3xl">Welcome Back!!</h1>
            <h3 className="text-left text-gray-600 mt-4">Hop into website as:</h3>
        </div>

      <div className="flex flex-col gap-4 mt-1">
        <form className="flex flex-col gap-4">
          <div
            type={"submit"}
            onClick={() => handler("INVESTOR")}
            className="border border-gray-300 rounded p-4 flex gap-4 hover:bg-gray-100 active:bg-gray-200  transition-all"
            >
            <input
              type="radio"
              name="role"
              value="INVESTOR"
              onChange={() => handler("INVESTOR")}
              checked={userData.role === "INVESTOR"}
              className="radioButton"
            />
            <label className="">Investor</label>
          </div>
          <div
            type={"submit"}
            onClick={() => handler("SELLER")}
            className="border border-gray-300 rounded p-4 flex gap-4 hover:bg-gray-100 active:bg-gray-200 transition-all"
            >
            <input
              type="radio"
              name="role"
              value="option2"
              checked={userData.role === "SELLER"}
              className="radioButton"
              onChange={() => handler("SELLER")}
            />
            <label className="">Company</label>
          </div>
        </form>
      </div>

      <div className="text-left mt-2">
        <p>Don't have an existing account? Click Here to <Link className="text-blue-500 hover:underline" href={"/signup"}>SignUp</Link></p>
      </div>
    </>
  );
};

export default LoginRole;

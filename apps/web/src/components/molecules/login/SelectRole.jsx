import Link from "next/link";
import React from "react";


// this is [view] = "ROLE"
const SelectRole = ({userData, setUserData, view, setView}) => {

    const handler = (role) => {
        setUserData((prev) => ({ ...prev, role: role }))

        if(role=="INVESTOR") {
            setView("DATA_INVESTOR")
        }
        else{
            setView("DATA_SELLER")
        }
    }

  return (
    view == "ROLE" &&
    <>
        <div>
            <h1 className="text-3xl font-medium">Welcome to TradeCred</h1>
            <h3 className="text-l text-gray-600">How would you like to proceed:</h3>
        </div>

      <div className="flex flex-col gap-4 text-justify ">
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
              checked={userData.role === "INVESTOR"}
            //   onChange={() => handler("INVESTOR")}
            />
            <label className="">Signup to invest in invoices</label>
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
            //   onChange={() => handler("SELLER")}
            />
            <label className="">Signup to discount your invoices</label>
          </div>
        </form>
      </div>

      <div>
        <p>Have an account already? Click Here to <Link className="text-blue-500 hover:underline" href={"/auth/login"}>login</Link></p>
      </div>
    </>
  );
};

export default SelectRole;

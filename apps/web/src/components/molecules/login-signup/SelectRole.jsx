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
            <h1 className="text-3xl">Welcome to <span className="text-green-600">Investo!</span></h1>
            <h3 className="text-left text-gray-600 mt-4">How would you like to Join Us:</h3>
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
              checked={userData.role === "INVESTOR"}
              className="radioButton"
              onChange={() => handler("INVESTOR")}
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
              className="radioButton"
              onChange={() => handler("SELLER")}
            />
            <label className="">Signup to discount your invoices</label>
          </div>
        </form>
      </div>

      <div className="text-left mt-2">
        <p>Have an account already? Click Here to <Link className="text-blue-500 hover:underline" href={"/login"}>login</Link></p>
      </div>
    </>
  );
};

export default SelectRole;

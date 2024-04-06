import React from "react";
import Button from "@mui/material/Button";

const Admin = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="  px-32 py-10 hover:shadow-lg rounded-3xl  flex flex-col gap-10 items-center bg-gray-100">
        <h1 className="text-4xl text-center">Welcome</h1>
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-96  border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className=" w-96 border border-gray-300 rounded-md py-2 px-4"
            />
          </div>
        </div>
        <Button variant="contained">Login</Button>
      </div>
    </div>
  );
};

export default Admin;

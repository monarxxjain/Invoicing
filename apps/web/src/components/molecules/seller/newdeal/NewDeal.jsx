"use client";
import pinata from "@/utils/pinata";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateDealForm = () => {
  const [billFile,setBillFile] = useState(null);
  const [formData, setFormData] = useState({
    targetAmount: "",
    tentativeDuration: "",
    interestRate: "",
    unpaidInvoices: null,
    dealDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    // setFormData({
    //   ...formData,
    //   unpaidInvoices: e.target.files[0],
    // });
    setBillFile(e.target.files[0])
    // const link = await pinata(e.target.files[0]);
    // console.log("link", link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const link = 'https://lime-adjacent-gamefowl-120.mypinata.cloud/ipfs/'+(await pinata(billFile)).IpfsHash;
     setFormData({
      ...formData,
      bill: link,
    });
    console.log(link)
    toast.success("Deal Created Successfully!", {
      position: "bottom-right",
    });
    console.log({
        ...formData,
        bill: link,
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-md shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Create Deal</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="targetAmount" className="block text-gray-600">
            Target Amount
          </label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md py-2 px-4 mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="tentativeDuration" className="block text-gray-600">
            Tentative Duration (Days)
          </label>
          <input
            type="number"
            id="tentativeDuration"
            name="tentativeDuration"
            value={formData.tentativeDuration}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md py-2 px-4 mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block text-gray-600">
            Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md py-2 px-4 mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="unpaidInvoices" className="block text-gray-600">
            Unpaid Invoices
          </label>
          <input
            type="file"
            accept=".pdf"
            id="unpaidInvoices"
            name="unpaidInvoices"
            onChange={handleFileChange}
            className="w-full border-gray-300 rounded-md py-2 px-4 mt-1"
            required
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="dealDescription" className="block text-gray-600">
            Deal Description
          </label>
          <textarea
            id="dealDescription"
            name="dealDescription"
            value={formData.dealDescription}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md py-2 px-4 mt-1"
            rows="3"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 mt-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Create Deal
      </button>
      <ToastContainer />
    </form>
  );
};

export default CreateDealForm;
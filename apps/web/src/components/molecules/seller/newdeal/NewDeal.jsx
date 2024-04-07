"use client";
import { BACKEND_URL } from "@/content/values";
import pinata from "@/utils/pinata";
import axios from "axios";
import React, { useState } from "react";
import Snackbar from '@mui/joy/Snackbar';
import LoadingButton from '@mui/lab/LoadingButton';
import { initWallet, mintAndTransferToSystem } from "@/utils/etherInterface";


const CreateDealForm = ({ sellerId, token }) => {
  const [open, setOpen] = useState()
  const [billFile, setBillFile] = useState(null);
  const [formData, setFormData] = useState({
    targetAmount: "",
    tentativeDuration: "",
    interestRate: "",
    dealAim: "",
  });

  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    const ipfshash = await pinata(billFile);
    console.log("ipfs hash ",ipfshash);
    const link = 'https://lime-adjacent-gamefowl-120.mypinata.cloud/ipfs/' + (ipfshash).IpfsHash;
    // const link =  "sdfs";
    setFormData({
      ...formData,
      bill: link,
    });
    // console.log(link)
    setOpen(true)
    console.log({
      ...formData,
      bill: link,
    });

    axios.post(BACKEND_URL + '/deal/postDeal', {
      ...formData,
      bill: link,
      sellerId: Number(sellerId.value),
      tentativeDuration: Number(formData.tentativeDuration),
      minInvestmentAmount: Number(formData.minInvestmentAmount),
      targetAmount: Number(formData.targetAmount),
    }, {
      withCredentials: true
    })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      let wallet = await initWallet();
      mintAndTransferToSystem(wallet.contractInstance, "0x94e3361495bD110114ac0b6e35Ed75E77E6a6cFA", link)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md"
    >
      <h2 className="text-2xl mb-4">Create Deal</h2>
      <div className="grid grid-cols-2 gap-8 bg-white p-6 rounded-md shadow-md">
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
            className="w-full border-gray-300 border shadow rounded-md py-2 px-4 mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="minInvestmentAmount" className="block text-gray-600">
            Minimum Investment
          </label>
          <input
            type="number"
            id="minInvestmentAmount"
            name="minInvestmentAmount"
            value={formData.minInvestmentAmount}
            onChange={handleChange}
            className="w-full border-gray-300 border shadow rounded-md py-2 px-4 mt-1"
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
            className="w-full border-gray-300 border shadow rounded-md py-2 px-4 mt-1"
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
            className="w-full border-gray-300 border shadow rounded-md py-2 px-4 mt-1"
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
            className="w-full border-gray-300 border shadow rounded-md py-2 px-4 mt-1"
            required
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="dealAim" className="block text-gray-600">
            Deal Description
          </label>
          <textarea
            id="dealAim"
            name="dealAim"
            value={formData.dealAim}
            onChange={handleChange}
            className="w-full border-gray-300 border shadow rounded-md py-2 px-4 mt-1"
            rows="3"
          />
        </div>
      </div>
      <LoadingButton
        variant="contained"
        type="submit"
        loading={loading}
        className="bg-blue-500 text-white font-semibold py-2 px-4 !mt-6 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Create Deal
      </LoadingButton>
      <Snackbar
        autoHideDuration={4000}
        open={open}
        variant={"outlined"}
        color={"success"}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
          setLoading(false)
        }}
      >
        Deal Created Successfully !!
      </Snackbar>
    </form>
  );
};

export default CreateDealForm;

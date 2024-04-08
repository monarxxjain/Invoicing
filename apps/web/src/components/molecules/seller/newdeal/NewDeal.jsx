"use client";
import { BACKEND_URL } from "@/content/values";
import pinata from "@/utils/pinata";
import axios from "axios";
import React, { useState } from "react";
import Snackbar from '@mui/joy/Snackbar';
import LoadingButton from '@mui/lab/LoadingButton';
import { initWallet, mintAndTransferToSystem } from "@/utils/etherInterface";
import { CircularProgress, IconButton, TextField } from "@mui/material";
import PDFUpload from "@/components/atoms/PDFUpload";
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import DescriptionIcon from '@mui/icons-material/Description';
import BasicDatePicker from "@/components/atoms/DatePicker";

const CreateDealForm = ({ sellerId, token }) => {
  const [open, setOpen] = useState()
  const [billFile, setBillFile] = useState(null);
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)
  const [formData, setFormData] = useState({
    targetAmount: "",
    completionDate: "",
    freezingDate: "",
    interestRate: "",
    dealAim: "",
  });

  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(message){
      setOpen(false)
      setOpen(true)

    }
  },[message])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Helper function to pad single digit numbers with leading zeros
function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

// Helper function to pad milliseconds with leading zeros
function padMilliseconds(milliseconds) {
  if (milliseconds < 10) {
    return '00' + milliseconds;
  } else if (milliseconds < 100) {
    return '0' + milliseconds;
  }
  return milliseconds;
}

  const handleDateChange = (name, value) => {
    // Extract date components
    const year = value.$y;
    const month = value.$M + 1; // JavaScript months are 0-indexed, so we add 1
    const day = value.$d.getDate();
    const hours = value.$H || 0; // Assuming $H is the hour
    const minutes = value.$m || 0; // Assuming $m is the minute
    const seconds = value.$s || 0; // Assuming $s is the second
    const milliseconds = value.$ms || 0; // Assuming $ms is the millisecond

    // Format the date components
    const formattedDate = `${year}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;

  console.log(formattedDate);
    setFormData({
      ...formData,
      [name]: formattedDate
    })
  }

  const handleFileChange = async (e) => {
    setBillFile(e.target.files[0])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setMessage("Uploading Invoices")
    const ipfshash = await pinata(billFile);
    // console.log("ipfs hash ",ipfshash);
    const link = 'https://lime-adjacent-gamefowl-120.mypinata.cloud/ipfs/' + (ipfshash).IpfsHash;

    setFormData({
      ...formData,
      bill: link,
    });

    // console.log({
    //   ...formData,
    //   bill: link,
    // });

    await axios.post(BACKEND_URL + '/deal/postDeal', {
      ...formData,
      bill: link,
      sellerId: Number(sellerId.value),
      completionDate: Number(formData.completionDate),
      freezingDate: formData.freezingDate,
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
        setLoading(false)
      });

      setMessage("Connecting Wallet")
      let wallet = await initWallet();
      setMessage("Minting and Transferring NFT to PAMU")
      await mintAndTransferToSystem(wallet.contractInstance, wallet.walletAddress, link)
      setOpen(false)

      setSuccess(true)
      setLoading(false)
      setFormData({
        targetAmount: "",
        completionDate: "",
        freezingDate: "",
        interestRate: "",
        dealAim: "",
        minInvestmentAmount: ""
      })
      setBillFile(null)
  };

  const ColorLoadingButton = styled(LoadingButton)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    "&:hover": {
      backgroundColor: "#061c37",
    },
  }));

  useEffect(()=>{
    console.log(formData)
  },[formData])
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md"
    >
      <h2 className="text-2xl mb-4">Create Deal</h2>
      <div className="grid grid-cols-2 gap-8 bg-white p-6 rounded-md shadow-md">
        <div>
          <label htmlFor="targetAmount" className="text-sm text-blue-950 block  mb-2">
            Total Target Amount which you wish to raise :-
          </label>
          <TextField
            className="w-full"
            type="number"
            label="Target Amount"
            value={formData.targetAmount}
            onChange={handleChange}
            id="targetAmount"
            name="targetAmount"
            size="small"
            required
          />
        </div>
        <div>
          <label htmlFor="minInvestmentAmount" className="text-sm text-blue-950 block  mb-2">
            Minimum amount that anyone can invest :-
          </label>
          <TextField
            className="w-full"
            type="number"
            label="Minimum Investment"
            onChange={handleChange}
            id="minInvestmentAmount"
            name="minInvestmentAmount"
            value={formData.minInvestmentAmount}
            size="small"
            required
          />
        </div>
        <div className="datePicker">
          <label htmlFor="interestRate" className="text-sm text-blue-950 block  mb-2">
            Tentative date when you will be returning money back to investors:-
          </label>
          <BasicDatePicker 
            label="Money Returning Date"
            handler={handleDateChange}
            id="completionDate"
            name="completionDate"
            value={formData.completionDate}
          />
        </div>
        <div className="datePicker">
          <label htmlFor="interestRate" className="text-sm text-blue-950 block  mb-2">
            Date on which deal will be Freezed :-
          </label>
          <BasicDatePicker 
            label="Freezing point Date"
            handler={handleDateChange}
            id="freezingDate"
            name="freezingDate"
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block text-gray-600 mb-2">
            Interest rate per year (%)
          </label>

          <TextField
            className="w-full"
            type="number"
            label="Interest Rate (%)"
            onChange={handleChange}
            id="interestRate"
            name="interestRate"
            value={formData.interestRate}
            size="small"
            required
          />
        </div>
        <div>
          <label htmlFor="unpaidInvoices" className="block text-gray-600 mb-2">
            Invoices at Stake
          </label>
          <div className="flex gap-6 items-center">
            <PDFUpload billFile={billFile} handleFileChange={handleFileChange} />
            {billFile && <IconButton className='w-fit' onClick={()=>{window.open(URL.createObjectURL(billFile))}}><DescriptionIcon className='text-3xl text-blue-950' /></IconButton>}          </div>
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
      <ColorLoadingButton
        loadingPosition="end"
        variant="contained"
        type="submit"
        loading={loading}
        className=" text-white py-2 !px-6 !mt-6 rounded-md"
      >
        <div className="me-3">Create Deal</div>
      </ColorLoadingButton>
      <Snackbar
        open={open} 
        variant={"outlined"}
        color={"warning"}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
      >
        {message}
        <div className="warningLoader"><CircularProgress /></div>
      </Snackbar>
      {success && <Snackbar
        autoHideDuration={4000}
        open={success}
        variant={"outlined"}
        color={"success"}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
          setSuccess(false)
        }}
      >
        Deal Created Successfully
      </Snackbar>}
    </form>
  );
};

export default CreateDealForm;

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

const CreateDealForm = ({ sellerId }) => {
  const [open, setOpen] = useState()
  const [billFile, setBillFile] = useState(null);
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
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


  const handleDateChange = (name, value) => {
    // Extract date components
    const year = value.$y;
    const month = value.$M + 1; // JavaScript months are 0-indexed, so we add 1
    const day = value.$d.getDate();


    // Format the date components
    let date = new Date(`${year}-${pad(month)}-${pad(day)}`);
    date = date.toISOString()
    console.log(date);
    setFormData({
      ...formData,
      [name]: date
    })
  }

  const handleFileChange = async (e) => {
    setBillFile(e.target.files[0])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    // Uploading PDF to Pinata
    setMessage("Uploading Invoices")
    const ipfshash = await pinata(billFile);
    const link = 'https://ipfs.io/ipfs/' + (ipfshash).IpfsHash;

    setFormData({
      ...formData,
      bill: link,
    });

    console.log({
      ...formData,
      bill: link,
    });

    

    setMessage("Connecting Wallet")
    let wallet = await initWallet();
    setMessage("Minting and Transferring NFT to PAMU")

    try {

      // Creating NFT and Transferring to Admin
      const nft = await mintAndTransferToSystem(wallet.contractInstance, wallet.walletAddress, link)

      // Adding the Deal to the Database
      await axios.post(BACKEND_URL + '/deal/postDeal', {
        ...formData,
        bill: link,
        sellerId: Number(sellerId.value),
        completionDate: formData.completionDate,
        freezingDate: formData.freezingDate,
        minInvestmentAmount: Number(formData.minInvestmentAmount),
        targetAmount: Number(formData.targetAmount),
        nftTokenId: (nft.tokenID).toString(),
        nftAddress: nft.nftAddress
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

      // Reset the States
      setOpen(false)
      setSuccess("Deal Created Successfully !")
      setLoading(false)
      setFormData({
        targetAmount: "",
        completionDate: null,
        freezingDate: null,
        interestRate: "",
        dealAim: "",
        minInvestmentAmount: ""
      })
      setBillFile(null)
      
    } catch (error) {
      setOpen(false)
      setError("Unable to transfer NFT")
      setLoading(false)
    }
        


  };

  const ColorLoadingButton = styled(LoadingButton)(({ theme }) => ({
    color: theme.palette.getContrastText("#061c37"),
    backgroundColor: "#061c37",
    "&:hover": {
      backgroundColor: "#061c37",
    },
  }));


  const saveAsDraft = async () => {
    setLoading(true)
    try {
      setMessage("Uploading Invoices")
      const ipfshash = await pinata(billFile);
      setOpen(false)
      setMessage(false)
      const link = 'https://ipfs.io/ipfs/' + (ipfshash).IpfsHash;

      setFormData({
        ...formData,
        bill: link,
      });
      const res = await axios.post(`${BACKEND_URL}/deal/saveDraft`,
        {
          ...formData,
          bill: link,
          sellerId: Number(sellerId.value),
          completionDate: formData.completionDate,
          freezingDate: formData.freezingDate,
          minInvestmentAmount: Number(formData.minInvestmentAmount),
          targetAmount: Number(formData.targetAmount),
        },
        {withCredentials: true}
      )

      if(res.data.message) {
        setOpen(false)
        setSuccess(res.data.message)
        setLoading(false)
        setFormData({
          targetAmount: "",
          completionDate: null,
          freezingDate: null,
          interestRate: "",
          dealAim: "",
          minInvestmentAmount: ""
        })
        setBillFile(null)
      }
      else if(res.data.error) {
        console.log(res.data.error)
        setOpen(false)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md"
    >
      <h2 className="text-2xl mb-4">Create Deal</h2>
      <div className="grid grid-cols-2 gap-8 bg-white p-6 rounded-md shadow-md">
        <div>
          <label htmlFor="targetAmount" className="text-sm text-blue-950 block mb-4">
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
          <label htmlFor="minInvestmentAmount" className="text-sm text-blue-950 block  mb-4">
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
          <label htmlFor="interestRate" className="text-sm text-blue-950 block  mb-4">
            Tentative date when you will be returning money back to investors:-
          </label>
          <BasicDatePicker 
            label="Money Returning Date"
            handler={handleDateChange}
            id="completionDate"
            name="completionDate"
          />
        </div>
        <div className="datePicker">
          <label htmlFor="interestRate" className="text-sm text-blue-950 block  mb-4">
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
          <label htmlFor="interestRate" className="block text-gray-600 mb-4">
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
          <label htmlFor="unpaidInvoices" className="block text-gray-600 mb-4">
            Invoices at Stake
          </label>
          <div className="flex gap-6 items-center">
            <PDFUpload loading={loading} billFile={billFile} handleFileChange={handleFileChange} />
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
      <section className="flex justify-between">
        <ColorLoadingButton
          loadingPosition="end"
          variant="contained"
          type="submit"
          loading={loading}
          className=" text-white py-2 !px-6 !mt-6 rounded-md"
        >
          <div className="me-3">Create Deal</div>
        </ColorLoadingButton>

        <LoadingButton
          loadingPosition="end"
          variant="outlined"
          onClick={()=>saveAsDraft()}
          loading={loading}
          className=" py-2 !px-6 !mt-6 rounded-md"
        >
          <div className="me-3">Save as Draft</div>
        </LoadingButton>

      </section>
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
        {success}
      </Snackbar>}
      {error && <Snackbar
        autoHideDuration={4000}
        open={error}
        variant={"outlined"}
        color={"danger"}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setError(false)
        }}
      >
        {error}
      </Snackbar>}
    </form>
  );
};

export default CreateDealForm;

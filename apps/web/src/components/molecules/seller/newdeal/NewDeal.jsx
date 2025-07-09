"use client";
import { BACKEND_URL } from "@/content/values";
import pinata from "@/utils/pinata";
import axios from "axios";
import logo from "@/assets/logo.png";
import React, { useState } from "react";
import Snackbar from '@mui/joy/Snackbar';
import LoadingButton from '@mui/lab/LoadingButton';
import { initWallet } from "@/utils/blockchain";
import { CircularProgress, IconButton, TextField } from "@mui/material";
import PDFUpload from "@/components/atoms/PDFUpload";
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import DescriptionIcon from '@mui/icons-material/Description';
import BasicDatePicker from "@/components/atoms/DatePicker";
import { addDeal } from "@/utils/blockchain";
import Image from "next/image";

const CreateDealForm = ({ sellerId }) => {
  const [open, setOpen] = useState()
  const [billFile, setBillFile] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    minInvestmentAmount: 0,
    targetAmount: 0,
    endDate: null,
    startDate: null,
    interestRate: 0,
    bill: "",
    tokenId: null,
    nft_address: null,
  });

  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(message){
      setOpen(false)
      setOpen(true)

    }
  },[message])

  useEffect(() => {
    fetchNFTs();
  },[])

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


  function shortenAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-3)}`;
  }

  const fetchNFTs = async () => {

    let wallet = await initWallet();
    const address = wallet.walletAddress;
    if (!address) return alert('Enter a wallet address!');

    const baseURL = "https://eth-sepolia.g.alchemy.com/nft/v2/nRt9ALS9znWen17KP0FXrO7rkVDxjabG/getNFTs";

    try {
      const url = `${baseURL}?owner=${address}`;
      const response = await fetch(url);
      const data = await response.json();

      setNfts(data.ownedNfts || []);
      console.log(data.ownedNfts);
    } catch (err) {
      console.error('Error fetching NFTs:', err);
      alert('Something went wrong while fetching NFTs.');
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    // Uploading PDF to Pinata
    

    try {

      setMessage("Uploading Invoices")
      // const ipfshash = await pinata(billFile);
      const link = 'https://ipfs.io/ipfs/';

      setFormData({
        ...formData,
        bill: link,
      });
      
      setMessage(null)
      let wallet = await initWallet();

      const deal = await addDeal(wallet.contractInstance, 
        formData.minInvestmentAmount,
        formData.targetAmount,
        formData.interestRate,
        formData.startDate,
        formData.endDate,
        formData.tokenId,
        formData.nft_address
      )
      console.log(deal)
      setMessage("Deal is being created, please wait...")
      
      // Adding the Deal to the Database
      await axios.post(BACKEND_URL + '/deal/postDeal', {
        ...formData,
        id: (deal.toString()),
        sellerId: Number(sellerId),
        nftTokenId: formData.tokenId,
        nftAddress: formData.nft_address
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
        startDate: null,
        endDate: null,
        interestRate: "",
        dealAim: "",
        minInvestmentAmount: ""
      })
      setBillFile(null)
      
    } catch (error) {
      setOpen(false)
      console.log(error)
      setError("Unable to create deal")
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
          startDate: formData.startDate,
          endDate: formData.endDate,
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
          startDate: null,
          endDate: null,
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
      <div className="flex flex-col gap-8 bg-white p-6 rounded-md shadow-md">
        <div className="grid grid-cols-2 gap-8">
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
              Date when deal will be freezed:-
            </label>
            <BasicDatePicker 
              label="Start Date"
              handler={handleDateChange}
              id="startDate"
              name="startDate"
            />
          </div>
          <div className="datePicker">
            <label htmlFor="interestRate" className="text-sm text-blue-950 block  mb-4">
              Date before which money has to be returned back to investors:-
            </label>
            <BasicDatePicker 
              label="End Date"
              handler={handleDateChange}
              id="endDate"
              name="endDate"
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
        </div>

        <div className="col-span-2">
          <label htmlFor="dealAim" className="block text-gray-600 mb-4">
            Select NFT for Collateral
          </label>
          <div className="flex gap-8">
            {nfts.map((nft) => (
              <div
                key={nft.tokenId}
                className={`border rounded-lg hover:opacity-80 hover:border-blue-900 cursor-pointer ${formData.tokenId === nft.id.tokenId ? 'border-blue-900 bg-blue-200' : ''}`}
                onClick={() => {
                  setFormData({
                    ...formData,
                    tokenId: nft.id.tokenId,
                    nft_address: nft.contract.address
                  });
                }}
              >
                <Image className="rounded-lg" src={logo} width={100} height={150} alt={nft.name} />
                <h3 className="text-center text-sm text-blue-900 mt-1">{shortenAddress(nft.id.tokenId)}</h3>
              </div>
            ))}
          </div>
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

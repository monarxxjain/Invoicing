"use client"
import { Button, styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/image';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { BACKEND_URL } from '@/content/values';
import Snackbar from '@mui/joy/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function VerifiedSellers({data}) {

  const [imageLoaded, setImageLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wolleteAddr, setWolleteAddr] = useState(false)
  const [idToRemove, setIdToRemove] = useState(null)

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleSubmit = async () => {
    setLoading(true)

    try {
        console.log(wolleteAddr)
        const res = await axios.post(`${BACKEND_URL}/seller/delete`, 
          {
            wolleteAddr: wolleteAddr,
          },
          {withCredentials: true}
        )
        console.log(res)
        if(res.data.message) {
          setOpenSnackbar(res.data.message)
          handleRemoveRow(idToRemove)
          setOpenModal(false)
        }
        else if(res.data.error){
            setOpenSnackbar(res.data.error)
            setOpenModal(false)
            setLoading(false)
        }
    } catch (error) {
        setLoading(false)
        setOpenSnackbar("Error while Deleting Seller")
    }
      
  }
  
  const columns = [
    
    { field: 'logo', headerName: 'Logo', width: 100, sortable: false, renderCell: (params) => 
      <>
        {!imageLoaded && (
          <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full my-2" />
        )}
        <Image alt='Company Logo' onLoad={() => handleImageLoad()} className='flex justify-center items-center my-auto h-full w-auto py-2' src={params.value} width={60} height={60} />
      </> 
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'contactNumber', headerName: 'Contact Number', sortable: false, width: 200 },
    { field: 'gstNumber', headerName: 'Company GST Number', sortable: false, width: 200 },
    { field: 'wolleteAddr', headerName: 'Wollete Address', sortable: false, width: 200 },
    { field: 'deleteSeller', headerName: '', sortable: false, width: 50, renderCell: (params) =>
        <IconButton aria-label="delete" onClick={() => {setOpenModal(true); setIdToRemove(params.row.id); setWolleteAddr(params.value)}}>
            <DeleteIcon className='text-red-500' />
        </IconButton>
    },
    
  ];


  const [rows, setRows] = useState(data?.map((seller) => {
    return {
      id: seller.id,
      logo: seller.logo,
      name: seller.name,
      email: seller.email,
      contactNumber: seller.contactNumber,
      gstNumber: seller.gstNumber,
      wolleteAddr: seller.wolleteAddr,
      deleteSeller: seller.wolleteAddr
    }
  }))

  const handleRemoveRow = (idToRemove) => {
    setRows(rows.filter(row => row.id !== idToRemove));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
  };


  return (
    <div style={{ height: "100%", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      {openModal && <Modal
        className='fade-in text-white'
        open={openModal}
        onClose={() => {setOpenModal(false);}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <div style={style} className='flex flex-col bg-white rounded'>
            <p className='px-5 text-lg py-3 bg-[#061c37] rounded-t '>Are you Sure ?</p>
            <p className='px-5 py-3 text-[#061c37]'>Do you want to Delete this seller ?</p>
            <div className='flex gap-6 px-5 py-3 justify-between'>
              <Button onClick={() => {setOpenModal(false); setLoading(false)}}>Cancel</Button>
              <LoadingButton className='loading-button' loadingPosition='end' loading={loading} color='error' variant='outlined' onClick={() => handleSubmit()} ><div className={`${loading && "me-3"}`}>DELETE</div></LoadingButton>
            </div>
        </div>
            
      </Modal>}




      <Snackbar
        autoHideDuration={3000}
        open={openSnackbar}
        variant="outlined"
        color={"success"}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpenSnackbar(false);
        }}
      >
        {openSnackbar}
      </Snackbar>


    </div>
  );
}

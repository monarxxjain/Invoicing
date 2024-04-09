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


export default function PendingSellers({data}) {

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
      const res = await axios.put(`${BACKEND_URL}/seller/approveSeller`, 
        {
          wolleteAddr: wolleteAddr,
          status: openModal
        },
        {withCredentials: true}
      )
      if(res.data.message) {
        setOpenSnackbar(res.data.message)
        handleRemoveRow(idToRemove)
        setOpenModal(false)
      }
  }
  
  const columns = [
    
    { field: 'logo', headerName: 'Logo', width: 100, sortable: false, renderCell: (params) => 
      <>
        {!imageLoaded && (
          <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full my-2" />
        )}
        <Image onLoad={() => handleImageLoad()} className='flex justify-center items-center my-auto h-full py-2' src={params.value} width={60} height={60} />
      </> 
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'contactNumber', headerName: 'Contact Number', sortable: false, width: 200 },
    { field: 'gstNumber', headerName: 'Company GST Number', sortable: false, width: 200 },
    { field: 'status', headerName: 'Decision', sortable: false, width: 300, renderCell: (params) => 
        <div className='flex gap-8 items-center py-2'>
          <Button onClick={() => {setOpenModal("APPROVED"); setIdToRemove(params.row.id); setWolleteAddr(params.value)}} color='success' variant='contained'>Approve</Button>
          <Button onClick={() => {setOpenModal("REJECTED"); setIdToRemove(params.row.id); setWolleteAddr(params.value)}} color='error' variant='contained'>Reject</Button>
        </div>
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
      status: seller.wolleteAddr
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
      {openModal == "APPROVED" && <Modal
        className='fade-in text-white'
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <div style={style} className='flex flex-col bg-white rounded'>
            <p className='px-5 text-lg py-3 bg-[#061c37] rounded-t '>Are you Sure ?</p>
            <p className='px-5 py-3 text-[#061c37]'>Do you want to mark this seller as `Approved`?</p>
            <div className='flex gap-6 px-5 py-3 justify-between'>
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
              <LoadingButton className='loading-button' loadingPosition='end' loading={loading} color='success' variant='outlined' onClick={() => handleSubmit()} ><div className={`${loading && "me-3"}`}>Approve</div></LoadingButton>
            </div>
        </div>
            
      </Modal>}


      {openModal == "REJECTED" && <Modal
        className='fade-in text-white'
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <div style={style} className='flex flex-col bg-white rounded'>
              <p className='px-5 text-lg py-3 bg-[#061c37] rounded-t '>Are you Sure ?</p>
              <p className='px-5 py-3 text-[#061c37]'>Do you want to `Reject` this Seller ?</p>
              <div className='flex gap-6 px-5 py-3 justify-between'>
                <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                <LoadingButton loadingPosition='end' loading={loading} color='error' variant='outlined' onClick={() => handleSubmit()}><div className={`${loading && "me-3"}`}>Reject</div></LoadingButton>
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

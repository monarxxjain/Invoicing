import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'senderAddress',
    headerName: 'Sender',
    width: 250,
  },
  {
    field: 'receiverAddress',
    headerName: 'Receiver',
    width: 250,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 130,
  },
  {
    field: 'dealId',
    headerName: 'Deal ID',
    headerAlign: "right",
    width: 300,
    align: "right"
  },
];

const rows = [
  { id: 1, receiverAddress: 'Snow', senderAddress: 'Jon', amount: 14 , dealId: "ICT123412341234234"},
  { id: 2, receiverAddress: 'Lannister', senderAddress: 'Cersei', amount: 31 , dealId: "ICT123412341234234"},
  { id: 3, receiverAddress: 'Lannister', senderAddress: 'Jaime', amount: 31 , dealId: "ICT123412341234234"},
  { id: 4, receiverAddress: 'Stark', senderAddress: 'Arya', amount: 11 , dealId: "ICT123412341234234"},
  { id: 5, receiverAddress: 'Targaryen', senderAddress: 'Daenerys', amount: 230 , dealId: "ICT123412341234234"},
  { id: 6, receiverAddress: 'Melisandre', senderAddress: 'Monark', amount: 150 , dealId: "ICT123412341234234"},
  { id: 7, receiverAddress: 'Clifford', senderAddress: 'Ferrara', amount: 44 , dealId: "ICT123412341234234"},
  { id: 8, receiverAddress: 'Frances', senderAddress: 'Rossini', amount: 36 , dealId: "ICT123412341234234"},
  { id: 9, receiverAddress: 'Roxie', senderAddress: 'Harvey', amount: 65 , dealId: "ICT123412341234234"},
];

export default function Transactions() {
  return (
    <Box sx={{ height: "70vh", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pamountSize: 10,
            },
          },
        }}
        pamountSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
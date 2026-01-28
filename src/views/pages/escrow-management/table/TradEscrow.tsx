// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ----------------------------------------------------------------------

const rowsData = [
  {
    id: 1,
    transferFrom: '7352012357935562',
    transferTo: '7777777777777777',
    amount: 100,
    feesPaidBy: 'Sender',
    transactionFees: 3.25
  },
  {
    id: 2,
    transferFrom: '7352012357935562',
    transferTo: '7001501151826232',
    amount: 1500,
    feesPaidBy: 'Sender',
    transactionFees: 44.55
  },
  {
    id: 3,
    transferFrom: '7352012357935562',
    transferTo: '7345958904452512',
    amount: 1234,
    feesPaidBy: 'Receiver',
    transactionFees: 36.7
  }
]

// ----------------------------------------------------------------------

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70
  },
  {
    field: 'transferFrom',
    headerName: 'Transfer From',
    flex: 1,
    renderCell: params => <Typography variant='body2'>{params.value}</Typography>
  },
  {
    field: 'transferTo',
    headerName: 'Transfer To',
    flex: 1,
    renderCell: params => <Typography variant='body2'>{params.value}</Typography>
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 120
  },
  {
    field: 'feesPaidBy',
    headerName: 'Fees Paid By',
    width: 150
  },
  {
    field: 'transactionFees',
    headerName: 'Transaction Fees',
    width: 160
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 220,
    sortable: false,
    renderCell: () => (
      <Box display='flex' gap={1}>
        <Button size='small' variant='contained'>
          View Escrow
        </Button>
        <Button size='small' variant='outlined' color='secondary'>
          Cancel Escrow
        </Button>
      </Box>
    )
  }
]

// ----------------------------------------------------------------------

const EscrowSenderTable = () => {
  const [pageSize, setPageSize] = useState(10)

  return (
    <Card>
      <CardHeader title='Escrow Sender' />
      <DataGrid
        autoHeight
        rows={rowsData}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50]}
        onPageSizeChange={newSize => setPageSize(newSize)}
        disableSelectionOnClick
      />
    </Card>
  )
}

export default EscrowSenderTable

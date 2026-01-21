// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Types Imports
import { BankAccount, bankAccounts } from 'src/@fake-db/pages/add-money'

const BankTable = () => {
  const [pageSize, setPageSize] = useState<number>(5)

  const handleLoad = (id: number) => {
    console.log('Load clicked for:', id)
  }

  const handleUnlink = (id: number) => {
    console.log('Unlink clicked for:', id)
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 70,
      flex: 0.1
    },
    {
      field: 'name',
      headerName: 'Name On Account',
      minWidth: 200,
      flex: 0.2,
      renderCell: params => (
        <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{params.value || '-'}</Typography>
      )
    },
    {
      field: 'accountNumber',
      headerName: 'Account Number',
      minWidth: 180,
      flex: 0.2
    },
    {
      field: 'routingNumber',
      headerName: 'Routing Number',
      minWidth: 160,
      flex: 0.2,
      renderCell: params => params.value || '-'
    },
    {
      field: 'accountType',
      headerName: 'Type Of Account',
      minWidth: 180,
      flex: 0.2
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 180,
      flex: 0.2,
      renderCell: params => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size='small' variant='contained' onClick={() => handleLoad(params.row.id)}>
            Load
          </Button>
          <Button size='small' variant='outlined' color='error' onClick={() => handleUnlink(params.row.id)}>
            Unlink
          </Button>
        </Box>
      )
    }
  ]

  return (
    <>
      <CardHeader title='Bank Accounts' titleTypographyProps={{ fontWeight: 600 }} />

      <DataGrid
        autoHeight
        rows={bankAccounts}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10]}
        onPageSizeChange={size => setPageSize(size)}
        checkboxSelection
        disableSelectionOnClick
      />
    </>
  )
}

export default BankTable

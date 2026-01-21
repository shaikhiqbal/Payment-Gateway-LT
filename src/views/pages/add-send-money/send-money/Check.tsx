import * as React from 'react'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Stack
} from '@mui/material'

type CheckRow = {
  id: number
  transactionId: string
  transactionDate: string
  amount: number
  checkType: string
  userName: string
  userEmail: string
  userPhone: string
  bankDetails: string
  status: 'IN_PROCESS' | 'UNPAID'
}

const rows: CheckRow[] = [
  {
    id: 1,
    transactionId: '1205d915c4914c35a9079c390f20f617',
    transactionDate: '2025-07-21',
    amount: 1,
    checkType: 'Print/Mail',
    userName: 'Sagar Kotak',
    userEmail: 'sagarkotak@gmail.com',
    userPhone: '+17275990518',
    bankDetails: 'Citibank Online-0000',
    status: 'IN_PROCESS'
  },
  {
    id: 2,
    transactionId: '3782a848a99048e7973638198bc7ab04',
    transactionDate: '2025-07-22',
    amount: 1,
    checkType: 'Print/Mail',
    userName: 'Gidget LeBlanc',
    userEmail: 'gidget@locktrust.com',
    userPhone: '+14079379458',
    bankDetails: 'Citibank Online-0000',
    status: 'IN_PROCESS'
  },
  {
    id: 3,
    transactionId: '8b07e6c4c53f45c6aa7d5e05ec17db88',
    transactionDate: '2025-07-23',
    amount: 1,
    checkType: 'Print/Mail',
    userName: 'Sneha',
    userEmail: 'sneha@binarysoftech.co.in',
    userPhone: '+919359583345',
    bankDetails: 'Citibank Online-0000',
    status: 'IN_PROCESS'
  },
  {
    id: 4,
    transactionId: '95e02ce1764d4c6f9e67ec9c99bele8b',
    transactionDate: '2025-09-05',
    amount: 1,
    checkType: 'Print/Mail',
    userName: '-',
    userEmail: '-',
    userPhone: '-',
    bankDetails: 'Citibank Online-1111',
    status: 'UNPAID'
  },
  {
    id: 5,
    transactionId: 'db434bd6e1734c7693aa00d991790f30',
    transactionDate: '2025-09-05',
    amount: 1,
    checkType: 'Print/Mail',
    userName: '-',
    userEmail: '-',
    userPhone: '-',
    bankDetails: 'Citibank Online-1111',
    status: 'UNPAID'
  }
]
const Check = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [search, setSearch] = React.useState('')

  const filteredRows = rows.filter(
    row =>
      row.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      row.userName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
        <Typography variant='h6'>CHECK LIST</Typography>
        <Button variant='contained'>Create Check</Button>
      </Stack>

      {/* Search */}
      <Box mb={2} display='flex' justifyContent='flex-end'>
        <TextField size='small' label='Search' value={search} onChange={e => setSearch(e.target.value)} />
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Transaction Id</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Check Type</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>User Phone</TableCell>
              <TableCell>Bank Details</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.transactionId}</TableCell>
                <TableCell>{row.transactionDate}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.checkType}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.userEmail}</TableCell>
                <TableCell>{row.userPhone}</TableCell>
                <TableCell>{row.bankDetails}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component='div'
        count={filteredRows.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Paper>
  )
}
export default Check

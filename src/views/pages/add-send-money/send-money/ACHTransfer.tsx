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
  Typography,
  Stack
} from '@mui/material'

type Beneficiary = {
  id: number
  name: string
  accountNumber: string
  routingNumber?: string
  accountType: string
}

const rows: Beneficiary[] = [
  { id: 1, name: 'LORETTA', accountNumber: 'xxxx8878', accountType: 'Saving Account' },
  {
    id: 2,
    name: 'NerkarNerkar',
    accountNumber: '6005223223',
    routingNumber: '45698731',
    accountType: 'Saving Account'
  },
  { id: 3, name: 'NerkarNerkar', accountNumber: '91106296647', accountType: 'Saving Account' },
  { id: 4, name: 'NerkarNerkar', accountNumber: '-', accountType: 'Checking Account' },
  {
    id: 5,
    name: 'NerkarNerkar',
    accountNumber: '2323233',
    routingNumber: '232-323-232',
    accountType: 'Checking Account'
  },
  {
    id: 6,
    name: 'PlaidChecking',
    accountNumber: '111222233330000',
    routingNumber: '011401533',
    accountType: 'Checking'
  },
  { id: 7, name: 'PlaidSaving', accountNumber: '111222233331111', routingNumber: '011401533', accountType: 'Savings' }
]

const ACHTransfer = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
        <Typography variant='h6'>Beneficiary Bank Account</Typography>
        <Button variant='contained'>Add Beneficiary</Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name On Account</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Routing Number</TableCell>
              <TableCell>Type Of Account</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.accountNumber}</TableCell>
                <TableCell>{row.routingNumber || '-'}</TableCell>
                <TableCell>{row.accountType}</TableCell>
                <TableCell align='center'>
                  <Stack direction='column' spacing={1}>
                    <Button size='small' variant='outlined'>
                      Pay
                    </Button>
                    <Button size='small' color='error' variant='text'>
                      Unlink
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component='div'
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Paper>
  )
}

export default ACHTransfer

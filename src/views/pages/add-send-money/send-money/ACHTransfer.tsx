import * as React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

// **
import { useForm, Controller } from 'react-hook-form'

type Beneficiary = {
  id: number
  name: string
  accountNumber: string
  routingNumber?: string
  accountType: string
}

type FormValues = {
  firstName: string
  lastName: string
  accountNumber: string
  accountType: string
  routingNumber: string
  bankName: string
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
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = React.useState<number | ''>('')
  const [selectedRow, setSelectedRow] = React.useState<Beneficiary | null>(null)

  const handleRowSelect = (row: Beneficiary) => {
    setSelectedRow(row)
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      accountNumber: '',
      accountType: '',
      routingNumber: '',
      bankName: ''
    }
  })

  const selectedBeneficiary = React.useMemo(
    () => rows.find(row => row.id === selectedBeneficiaryId) || null,
    [selectedBeneficiaryId]
  )

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data)
  }

  useForm<Beneficiary>({
    defaultValues: {
      id: 0,
      name: '',
      accountNumber: '',
      routingNumber: '',
      accountType: ''
    }
  })

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 5 }}>
            <FormControl fullWidth>
              <InputLabel id='beneficiary-select-label'>Beneficiary Bank Account</InputLabel>

              <Select
                labelId='beneficiary-select-label'
                label='Beneficiary Bank Account'
                value={selectedBeneficiaryId}
                onChange={e => setSelectedBeneficiaryId(Number(e.target.value))}
              >
                <MenuItem value='' disabled>
                  Select Beneficiary Bank Account
                </MenuItem>
                <MenuItem value='1'>Send To Own</MenuItem>
                <MenuItem value='2'>Send To Other</MenuItem>
                <MenuItem value='3'>Existing Bank</MenuItem>
                {/* {rows.map(row => (
                  <MenuItem key={row.id} value={row.id}>
                    {row.name} — {row.accountNumber}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      {/* selectedBeneficiaryId */}

      {selectedBeneficiaryId == 2 && (
        <React.Fragment>
          {/* First Name */}
          <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
            <Controller
              name='firstName'
              control={control}
              rules={{ required: 'First Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='First Name'
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
            <Controller
              name='lastName'
              control={control}
              rules={{ required: 'Last Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Last Name'
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>

          {/* Account Number */}
          <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
            <Controller
              name='accountNumber'
              control={control}
              rules={{ required: 'Account Number is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Account Number'
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber?.message}
                />
              )}
            />
          </Grid>

          {/* Account Type */}
          <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
            <Controller
              name='accountType'
              control={control}
              rules={{ required: 'Type of Account is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.accountType}>
                  <InputLabel>Type Of Account</InputLabel>
                  <Select {...field} label='Type Of Account'>
                    <MenuItem value='savings'>Savings</MenuItem>
                    <MenuItem value='current'>Current</MenuItem>
                    <MenuItem value='checking'>Checking</MenuItem>
                  </Select>
                  <FormHelperText>{errors.accountType?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          {/* Routing Number */}
          <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
            <Controller
              name='routingNumber'
              control={control}
              rules={{ required: 'Routing Number is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Routing Number'
                  error={!!errors.routingNumber}
                  helperText={errors.routingNumber?.message}
                />
              )}
            />
          </Grid>

          {/* Bank Name */}
          <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
            <Controller
              name='bankName'
              control={control}
              rules={{ required: 'Bank Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Bank Name'
                  error={!!errors.bankName}
                  helperText={errors.bankName?.message}
                />
              )}
            />
          </Grid>
        </React.Fragment>
      )}

      {selectedBeneficiaryId == 3 && (
        <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: 1, mx: 2 }}>
          <Alert severity='info'>Please select a beneficiary by clicking on a row to make payment.</Alert>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Account Number</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Routing Number</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Account Type</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map(row => {
                  const isSelected = selectedRow?.id === row.id

                  return (
                    <TableRow
                      key={row.id}
                      hover
                      onClick={() => handleRowSelect(row)}
                      sx={{
                        cursor: 'pointer',
                        borderLeft: isSelected ? '4px solid' : '4px solid transparent',
                        borderColor: isSelected ? 'primary.main' : 'transparent',
                        backgroundColor: isSelected ? 'action.selected' : 'inherit'
                      }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.accountNumber}</TableCell>
                      <TableCell>{row.routingNumber || '—'}</TableCell>
                      <TableCell>
                        <Chip
                          size='small'
                          label={row.accountType}
                          color={row.accountType.toLowerCase().includes('saving') ? 'success' : 'primary'}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* DETAILS CARD */}
          {selectedRow && (
            <Card
              sx={{
                mt: 4,
                border: '1px solid',
                borderColor: 'primary.main'
              }}
            >
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Selected Beneficiary
                </Typography>

                <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  <Typography>
                    <strong>Name:</strong> {selectedRow.name}
                  </Typography>

                  <Typography>
                    <strong>Account:</strong> {selectedRow.accountNumber}
                  </Typography>

                  <Typography>
                    <strong>Routing:</strong> {selectedRow.routingNumber || '—'}
                  </Typography>

                  <Typography>
                    <strong>Type:</strong> {selectedRow.accountType}
                  </Typography>

                  <Typography>
                    <strong>Date:</strong> {new Date().toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
      {/* Debug / usage */}
      {selectedBeneficiary && (
        <Box mt={4}>
          <strong>Selected:</strong> {selectedBeneficiary.name} ({selectedBeneficiary.accountType})
        </Box>
      )}
    </Box>
  )
}

/*
First Name: *
Last Name: *
Account Number: *
Type Of Account: *
Routing Number: *
Bank Name: *

*/

export default ACHTransfer

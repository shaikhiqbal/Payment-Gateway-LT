import React, { Fragment, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

// ** Types Import
import { FormValues } from './index'

// ** Form Type & Controller
import { Control, UseFormWatch, Controller, UseFormClearErrors } from 'react-hook-form'

interface BankDetailsProps {
  control: Control<FormValues>
  watch: UseFormWatch<FormValues>
  clearErrors: UseFormClearErrors<FormValues>
}

export const BANK_FIELDS: Array<keyof FormValues> = [
  'bankName',
  'accountName',
  'routingNumber',
  'accountNumber',
  'chequeNumber'
]

const BankAccountDetails: React.FC<BankDetailsProps> = props => {
  const { control, watch, clearErrors } = props

  const modeOfPayment = watch('modeOfPayment')
  const isRequired = modeOfPayment === 'ACH'

  // Clear errors when modeOfPayment changes
  useEffect(() => {
    clearErrors(BANK_FIELDS)
  }, [modeOfPayment, clearErrors])

  return (
    <Fragment>
      {/* Bank Name */}
      <Grid item xs={12} sm={6}>
        <Controller
          name='bankName'
          control={control}
          rules={{
            required: isRequired ? 'Bank Name is required' : false
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label='Bank Name'
              placeholder='Enter bank name'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      {/* Name On Account */}
      <Grid item xs={12} sm={6}>
        <Controller
          name='accountName'
          control={control}
          rules={{
            required: isRequired ? 'Name On Account is required' : false
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label='Name On Account'
              placeholder='Enter account holder name'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      {/* Routing Number */}
      <Grid item xs={12} sm={6}>
        <Controller
          name='routingNumber'
          control={control}
          rules={{
            required: isRequired ? 'Routing Number is required' : false
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label='Routing Number'
              placeholder='Enter routing number'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      {/* Account Number */}
      <Grid item xs={12} sm={6}>
        <Controller
          name='accountNumber'
          control={control}
          rules={{
            required: isRequired ? 'Account Number is required' : false
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label='Account Number'
              placeholder='Enter account number'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      {/* Cheque Number */}
      <Grid item xs={12} sm={6}>
        <Controller
          name='chequeNumber'
          control={control}
          rules={{
            required: isRequired ? 'Cheque Number is required' : false
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label='Cheque Number'
              placeholder='Enter cheque number'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
    </Fragment>
  )
}

export default BankAccountDetails

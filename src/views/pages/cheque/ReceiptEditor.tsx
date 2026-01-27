import React, { Fragment } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import { AnimatePresence, motion } from 'framer-motion'

import ReceiptPreview from './ReceiptPreview'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface ReceiptFormValues {
  sendVia: 'echeck' | 'printmail'
  paymentForm: 'bank' | 'wallet'
  fullName: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  email: string
  bank: string
  amount: string
  description: string
}

/* ================= REGEX ================= */

const nameRegex = /^[A-Za-z\s]{2,50}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const zipRegex = /^[0-9]{4,10}$/
const amountRegex = /^\d+(\.\d{1,2})?$/
const bankRegex = /^[0-9]{8,18}$/

/* ================= DEFAULT VALUES ================= */

const defaultValues: ReceiptFormValues = {
  sendVia: 'echeck',
  paymentForm: 'bank',
  fullName: '',
  address: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  email: '',
  bank: '',
  amount: '',
  description: ''
}

const ReceiptEditor = () => {
  const [submittedData, setSubmittedData] = React.useState<ReceiptFormValues | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ReceiptFormValues>({ defaultValues })

  const onSubmit: SubmitHandler<ReceiptFormValues> = data => {
    setSubmittedData(data)
  }
  return (
    <AnimatePresence mode='wait'>
      {!submittedData ? (
        <motion.div
          key='editor'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
        >
          <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: 1, padding: 4 }}>
            <Typography variant='h6' sx={{ mb: 4 }}>
              Cheque Details
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={5}>
                {/* Send Via + Payment Form */}
                <Grid item xs={12} sm={6}>
                  <Typography>Send this check via</Typography>
                  <Controller
                    name='sendVia'
                    control={control}
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel value='echeck' control={<Radio />} label='eCheck' />
                        <FormControlLabel value='printmail' control={<Radio />} label='Print + Mail' />
                      </RadioGroup>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography>Payment Form</Typography>
                  <Controller
                    name='paymentForm'
                    control={control}
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel value='bank' control={<Radio />} label='Bank' />
                        <FormControlLabel value='wallet' control={<Radio />} label='Wallet Balance' />
                      </RadioGroup>
                    )}
                  />
                </Grid>

                {/* Full Name + Email */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='fullName'
                    control={control}
                    rules={{
                      required: 'Full name is required',
                      pattern: { value: nameRegex, message: 'Only letters allowed (2–50 chars)' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Full Name'
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{
                      required: 'Email is required',
                      pattern: { value: emailRegex, message: 'Invalid email address' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Email'
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Address (full width) */}
                <Grid item xs={12}>
                  <Controller
                    name='address'
                    control={control}
                    rules={{ required: 'Address is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Address'
                        error={!!errors.address}
                        helperText={errors.address?.message}
                      />
                    )}
                  />
                </Grid>

                {/* City + State */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='city'
                    control={control}
                    rules={{ required: 'City is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='City'
                        error={!!errors.city}
                        helperText={errors.city?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='state'
                    control={control}
                    rules={{ required: 'State is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='State'
                        error={!!errors.state}
                        helperText={errors.state?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Country + Zip Code */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='country'
                    control={control}
                    rules={{ required: 'Country is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Country'
                        error={!!errors.country}
                        helperText={errors.country?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='zipCode'
                    control={control}
                    rules={{
                      required: 'Zip code is required',
                      pattern: { value: zipRegex, message: 'Invalid zip code' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Zip Code'
                        error={!!errors.zipCode}
                        helperText={errors.zipCode?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Bank + Amount */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='bank'
                    control={control}
                    rules={{
                      required: 'Bank number is required',
                      pattern: { value: bankRegex, message: '8–18 digits only' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Bank'
                        error={!!errors.bank}
                        helperText={errors.bank?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='amount'
                    control={control}
                    rules={{
                      required: 'Amount is required',
                      pattern: { value: amountRegex, message: 'Invalid amount format' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Amount'
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Description (full width) */}
                <Grid item xs={12}>
                  <Controller
                    name='description'
                    control={control}
                    rules={{ required: 'Description is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        minRows={3}
                        label='Description'
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Submit */}
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' size='large'>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </motion.div>
      ) : (
        <motion.div
          key='preview'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
        >
          <ReceiptPreview data={submittedData} onEdit={() => setSubmittedData(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ReceiptEditor

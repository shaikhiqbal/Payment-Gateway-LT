import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Grid, TextField, Button } from '@mui/material'

// ** Customer Props Types

type CustomerFormProps = {
  storeCustomerData: (data: { name: string; id: number }) => void
}

// ** Form Value Types
type FormValues = {
  customerName: string
  phone: string
  email?: string
  address?: string
  city?: string
  country?: string
}

const CustomerForm: React.FC<CustomerFormProps> = props => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      customerName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      country: ''
    }
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    props.storeCustomerData({ name: data.customerName, id: 0 })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* Customer Name */}
        <Grid item sx={{ mb: 2 }} xs={12} sm={6}>
          <Controller
            name='customerName'
            control={control}
            rules={{ required: 'Customer Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Customer Name'
                fullWidth
                error={!!errors.customerName}
                helperText={errors.customerName?.message}
              />
            )}
          />
        </Grid>

        {/* Phone */}
        <Grid item sx={{ mb: 2 }} xs={12} sm={6}>
          <Controller
            name='phone'
            control={control}
            rules={{
              required: 'Phone is required',
              pattern: { value: /^[0-9]+$/, message: 'Only numbers allowed' }
            }}
            render={({ field }) => (
              <TextField {...field} label='Phone' fullWidth error={!!errors.phone} helperText={errors.phone?.message} />
            )}
          />
        </Grid>

        {/* Email */}
        <Grid item sx={{ mb: 2 }} xs={12}>
          <Controller
            name='email'
            control={control}
            rules={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            }}
            render={({ field }) => (
              <TextField {...field} label='Email' fullWidth error={!!errors.email} helperText={errors.email?.message} />
            )}
          />
        </Grid>

        {/* Address */}
        <Grid item sx={{ mb: 2 }} xs={12}>
          <Controller
            name='address'
            control={control}
            render={({ field }) => <TextField {...field} label='Address' fullWidth />}
          />
        </Grid>

        {/* City */}
        <Grid item sx={{ mb: 2 }} xs={12} sm={6}>
          <Controller
            name='city'
            control={control}
            render={({ field }) => <TextField {...field} label='City' fullWidth />}
          />
        </Grid>

        {/* Country */}
        <Grid item sx={{ mb: 2 }} xs={12} sm={6}>
          <Controller
            name='country'
            control={control}
            render={({ field }) => <TextField {...field} label='Country' fullWidth />}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item sx={{ mb: 2, borderTop: theme => `1px solid ${theme.palette.divider}` }} xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
          <Button type='reset' variant='contained' color='secondary' sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default CustomerForm

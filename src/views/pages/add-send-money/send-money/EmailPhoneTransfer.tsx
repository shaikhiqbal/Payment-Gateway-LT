import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material'

import Select from '@mui/material/Select'

import CountryField from 'src/pages/components/form-element/location/CountryField'

// ** Data
import { countries } from 'src/@fake-db/autocomplete'

type FormValues = {
  amount: number
  transactionPercentage: number
  percentageValue: number
  transactionFees: number
  finalAmount: number
  remarks: string
  recipientDetails: string
  countryCode?: string | null
  mobileNum?: string
  emailId?: string
}

const EmailPhoneTransfer = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      amount: 0,
      transactionPercentage: 1.75,
      percentageValue: 0,
      transactionFees: 0,
      finalAmount: 0,
      remarks: ''
    }
  })

  const amount = watch('amount')
  const percentage = watch('transactionPercentage')
  const fees = watch('transactionFees')

  useEffect(() => {
    const percentageValue = (amount * percentage) / 100
    const finalAmount = amount - percentageValue - fees

    setValue('percentageValue', Number(percentageValue.toFixed(2)))
    setValue('finalAmount', Number(finalAmount.toFixed(2)))
  }, [amount, percentage, fees, setValue])

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data)
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name='recipientDetails'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id='controlled-select-label'>Recipient details to *</InputLabel>
                  <Select
                    {...field}
                    labelId='controlled-select-label'
                    id='controlled-select'
                    label='Recipient details to *'
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'phone'}>Via Phone</MenuItem>
                    <MenuItem value={'email'}>Via Email</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {watch('recipientDetails') === 'phone' && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='countryCode'
                      control={control}
                      rules={{ required: 'Contact Number is required' }}
                      render={({ field }) => {
                        const selectedCountry = countries.find(c => c.phone === field.value) || null

                        return (
                          <CountryField
                            {...field}
                            value={selectedCountry}
                            onChange={(event, newValue) => {
                              field.onChange(newValue?.phone || null)
                            }}
                            valueType='phone'
                            label='Country Code *'
                            error={!!errors.countryCode}
                            helperText={errors.countryCode?.message}
                            fullWidth
                            ref={field.ref}
                          />
                        )
                      }}
                    />
                    {/* {errors.countryCode && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.countryCode.message}</FormHelperText>
            )} */}
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='mobileNum'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Phone'
                          placeholder='1234567890'
                          error={Boolean(errors.mobileNum)}
                        />
                      )}
                    />
                    {errors.mobileNum && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.mobileNum.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          )}

          {watch('recipientDetails') === 'email' && (
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='emailId'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type='email'
                      label='Email'
                      placeholder='johndoe@email.com'
                      error={Boolean(errors.emailId)}
                    />
                  )}
                />
                {errors.emailId && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.emailId.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <Controller
              name='amount'
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextField {...field} label='Amount *' type='number' fullWidth />}
            />
          </Grid>
          {/* Transaction Percentage */}
          <Grid item xs={12}>
            <Controller
              name='transactionPercentage'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Transaction Percentage *'
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>%</InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
          {/* Calculated Percentage Value */}
          <Grid item xs={12}>
            <Controller
              name='percentageValue'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Calculate Percentage Value *'
                  fullWidth
                  disabled
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>USD</InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
          {/* Transaction Fees */}
          <Grid item xs={12}>
            <Controller
              name='transactionFees'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Transaction Fees *'
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>USD</InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
          {/* Final Amount */}
          <Grid item xs={12}>
            <Controller
              name='finalAmount'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Final Amount *'
                  fullWidth
                  disabled
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>USD</InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
          {/* Remarks */}
          <Grid item xs={12}>
            <Controller
              name='remarks'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label='Remarks *' placeholder='Eg: Bill Payment' fullWidth />
              )}
            />
          </Grid>
          {/* Actions */}
          {/* <Grid item xs={12}>
            <Stack direction='row' spacing={2}>
              <Button type='submit' variant='contained' color='warning'>
                Submit
              </Button>
              <Button variant='outlined' onClick={() => reset()}>
                Reset
              </Button>
            </Stack>
          </Grid> */}
        </Grid>
      </Box>
    </Paper>
  )
}

export default EmailPhoneTransfer

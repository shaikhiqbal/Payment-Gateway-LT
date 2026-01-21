import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Button, Grid, TextField, Typography, InputAdornment, Paper, Stack } from '@mui/material'

type FormValues = {
  amount: number
  transactionPercentage: number
  percentageValue: number
  transactionFees: number
  finalAmount: number
  remarks: string
}

const EmailPhoneTransfer = () => {
  const { control, watch, setValue, handleSubmit, reset } = useForm<FormValues>({
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
      <Typography variant='h6' mb={3}>
        Recipient Details
      </Typography>

      <Stack direction='row' spacing={2} mb={3}>
        <Button variant='contained'>Send To Email</Button>
        <Button variant='contained'>Send To Phone</Button>
      </Stack>

      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Amount */}
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
          <Grid item xs={12}>
            <Stack direction='row' spacing={2}>
              <Button type='submit' variant='contained' color='warning'>
                Submit
              </Button>
              <Button variant='outlined' onClick={() => reset()}>
                Reset
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default EmailPhoneTransfer

// src/components/modals/PaymentFormModal.tsx
import React, { useEffect } from 'react'
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import { useForm, Controller, useWatch } from 'react-hook-form'
import BasePaymentModal from '../BasePaymentModal'

interface PaymentFormModalProps {
  open: boolean
  onClose: () => void
}

interface PaymentFormValues {
  receivedAmount: number
  payingAmount: number
  change: number
  paymentType: string
  quickCash: number
  paymentReceiver: string
  paymentNote: string
  saleNote: string
  staffNote: string
}

const paymentTypes = ['Cash', 'Card', 'Points', 'Deposit', 'Cheque', 'Gift Card', 'Scan', 'Pay Later']

const quickCashOptions = [10, 20, 50, 100, 500, 1000]

const PaymentFormModal: React.FC<PaymentFormModalProps> = ({ open, onClose }) => {
  const { control, handleSubmit, setValue } = useForm<PaymentFormValues>({
    defaultValues: {
      receivedAmount: 0,
      payingAmount: 0,
      change: 0,
      paymentType: '',
      quickCash: 0,
      paymentReceiver: '',
      paymentNote: '',
      saleNote: '',
      staffNote: ''
    }
  })

  const receivedAmount = useWatch({ control, name: 'receivedAmount' })
  const payingAmount = useWatch({ control, name: 'payingAmount' })

  // Calculate change automatically
  useEffect(() => {
    setValue('change', Math.max(receivedAmount - payingAmount, 0))
  }, [receivedAmount, payingAmount, setValue])

  const onSubmit = (data: PaymentFormValues) => {
    console.log('Payment Data:', data)
    onClose()
  }

  return (
    <BasePaymentModal open={open} title='Payment' onClose={onClose}>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          {/* Amount Fields */}
          <Grid item xs={12} sm={4}>
            <Controller
              name='receivedAmount'
              control={control}
              rules={{ required: 'Received amount is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Received Amount'
                  type='number'
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name='payingAmount'
              control={control}
              rules={{ required: 'Paying amount is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Paying Amount'
                  type='number'
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name='change'
              control={control}
              render={({ field }) => <TextField {...field} label='Change' type='number' fullWidth disabled />}
            />
          </Grid>
          {/* Payment Type */}
          <Grid item xs={12}>
            <Controller
              name='paymentType'
              control={control}
              rules={{ required: 'Select a payment type' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label='Payment Type'
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  {paymentTypes.map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* Quick Cash */}
          <Grid item xs={12}>
            <FormControl>
              <FormLabel>Quick Cash</FormLabel>
              <Controller
                name='quickCash'
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    {quickCashOptions.map(amount => (
                      <FormControlLabel key={amount} value={amount} control={<Radio />} label={amount} />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
          {/* Payment Receiver */}
          <Grid item xs={12}>
            <Controller
              name='paymentReceiver'
              control={control}
              render={({ field }) => <TextField {...field} label='Payment Receiver' fullWidth />}
            />
          </Grid>
          {/* Notes */}
          <Grid item xs={12}>
            <Controller
              name='paymentNote'
              control={control}
              render={({ field }) => <TextField {...field} label='Payment Note' fullWidth multiline rows={3} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='saleNote'
              control={control}
              render={({ field }) => <TextField {...field} label='Sale Note' fullWidth multiline rows={3} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='staffNote'
              control={control}
              render={({ field }) => <TextField {...field} label='Staff Note' fullWidth multiline rows={3} />}
            />
          </Grid>

          {/* <Grid item xs={12} display='flex' justifyContent='flex-end' gap={2}>
            <Button variant='outlined' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' variant='contained'>
              Confirm
            </Button>
          </Grid> */}
        </Grid>
      </Box>
    </BasePaymentModal>
  )
}

export default PaymentFormModal

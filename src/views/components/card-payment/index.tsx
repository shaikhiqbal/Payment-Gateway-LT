// ** React Imports
import React, { useState, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import { Box, Grid, TextField, FormControlLabel, Switch } from '@mui/material'

// ** Third Party Imports
import Cards, { Focused } from 'react-credit-cards'
import Payment from 'payment'
import 'react-credit-cards/es/styles-compiled.css'

// ** React Hook Form Imports
import {
  Control,
  UseFormWatch,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetValue,
  Controller,
  Path
} from 'react-hook-form'

// ** Utility Imports
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Constant for card fields
export const CARD_FIELDS = ['cardNumber', 'expiryDate', 'nameOnCard', 'cvv'] as const

// ** Props interface for generic CardPayment component
interface CardPaymentProps<T extends {}> {
  control: Control<T>
  watch: UseFormWatch<T>
  setValue: UseFormSetValue<T>
  clearErrors: UseFormClearErrors<T>
  errors?: FieldErrors<T>
}

/**
 * CardPayment Component
 *
 * A generic, type-safe component for rendering credit card input fields
 * and a live card preview using `react-credit-cards`.
 *
 * @template T - Type of form values used with react-hook-form
 */
const CardPayment = <
  T extends {
    cardNumber?: string
    expiryDate?: string
    nameOnCard?: string
    cvv?: string
    issuingBank?: string
    cardType?: string
    modeOfPayment?: string
  }
>({
  control,
  watch,
  setValue,
}: CardPaymentProps<T>) => {
  const [focus, setFocus] = useState<Focused | undefined>()

  // ** Include modeOfPayment in destructuring and remove 'as any'
  const formValues = watch()
  const {
    cardNumber = '',
    expiryDate = '',
    nameOnCard = '',
    cvv = '',
    modeOfPayment = ''
  } = formValues as Partial<T>

  // ** Check if card payment is required based on modeOfPayment
  const isRequired = modeOfPayment === 'CREDIT_CARD'

  // ** Update card type based on card number
  useEffect(() => {
    const detectedCardType = Payment.fns.cardType(cardNumber) || ''
    setValue('cardType' as Path<T>, detectedCardType as any)
  }, [cardNumber, setValue])

  // ** Handle input formatting for card fields
  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (target.name === 'cardNumber') return formatCreditCardNumber(target.value, Payment)
    if (target.name === 'expiryDate') return formatExpirationDate(target.value)
    if (target.name === 'cvv') return formatCVC(target.value, cardNumber, Payment)
    
return target.value
  }

  const handleBlur = () => setFocus(undefined)

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Card Preview */}
        <Grid item xs={12}>
          <Box sx={{ '& .rccs': { m: '0 auto', display: { xs: 'none', sm: 'block' } } }}>
            <Cards cvc={cvv} focused={focus} expiry={expiryDate} name={nameOnCard} number={cardNumber} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {/* Card Number */}
            <Grid item xs={12}>
              <Controller
                control={control}
                name={'cardNumber' as Path<T>}
                rules={isRequired ? { required: 'Card Number is required' } : {}}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    autoComplete='off'
                    label='Card Number'
                    placeholder='0000 0000 0000 0000'
                    onBlur={handleBlur}
                    onFocus={e => setFocus(e.target.name as Focused)}
                    onChange={e => field.onChange(handleInputChange(e))}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            {/* Name on Card */}
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name={'nameOnCard' as Path<T>}
                rules={isRequired ? { required: 'Name on Card is required' } : {}}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Name on Card'
                    placeholder='John Doe'
                    onFocus={e => setFocus(e.target.name as Focused)}
                    onBlur={handleBlur}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            {/* Expiry Date */}
            <Grid item xs={12} sm={3}>
              <Controller
                control={control}
                name={'expiryDate' as Path<T>}
                rules={{
                  ...(isRequired ? { required: 'Expiry date is required' } : {}),
                  validate: value => {
                    if (!value) return true
                    const [mm, yy] = value.split('/')
                    if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return 'Invalid expiry format'
                    const month = parseInt(mm, 10)
                    const year = parseInt(yy, 10) + 2000
                    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return 'Invalid expiry date'
                    const now = new Date()
                    const expiry = new Date(year, month - 1, 1)
                    expiry.setMonth(expiry.getMonth() + 1)
                    expiry.setDate(0)
                    if (expiry < now) return 'Expiry date must be in the future'

                    return true
                  }
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Expiry'
                    placeholder='MM/YY'
                    onFocus={e => setFocus(e.target.name as Focused)}
                    onBlur={handleBlur}
                    onChange={e => field.onChange(handleInputChange(e))}
                    inputProps={{ maxLength: 5 }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            {/* CVV */}
            <Grid item xs={12} sm={3}>
              <Controller
                control={control}
                name={'cvv' as Path<T>}
                rules={isRequired ? { required: 'CVC is required' } : {}}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='CVC'
                    placeholder={Payment.fns.cardType(cardNumber || '') === 'amex' ? '1234' : '123'}
                    autoComplete='off'
                    onFocus={e => setFocus(e.target.name as Focused)}
                    onBlur={handleBlur}
                    onChange={e => field.onChange(handleInputChange(e))}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            {/* Save Card Switch */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label='Save Card for future billing?'
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CardPayment

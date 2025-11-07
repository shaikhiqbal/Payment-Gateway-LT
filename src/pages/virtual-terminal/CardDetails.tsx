// ** React Imports
import { useState, Fragment, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import Payment from 'payment'
import Cards, { Focused } from 'react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Form Type & Controller
import { Control, UseFormWatch, Controller, FieldErrors, UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

// ** Types Import
import { FormValues } from './index'

// ** Types Import
interface CardDetailsProps {
  control: Control<FormValues>
  watch: UseFormWatch<FormValues>
  errors?: FieldErrors | undefined
  clearErrors: UseFormClearErrors<FormValues>
  setValue: UseFormSetValue<FormValues>
}

export const CARD_FIELDS: Array<keyof FormValues> = ['cardNumber', 'expiryDate', 'nameOnCard', 'cvv']

/**
 * CardDetails component renders a form section for entering and validating credit card details.
 *
 * @component
 * @param {CardDetailsProps} props - The props for the CardDetails component.
 * @param {Function} props.watch - Function to watch form field values.
 * @param {any} props.control - Control object for react-hook-form.
 * @param {Function} props.clearErrors - Function to clear form errors.
 *
 * @returns {JSX.Element} The rendered CardDetails form section.
 *
 * @remarks
 * - Uses react-hook-form's Controller for controlled form fields.
 * - Formats card number, expiry date, and CVC input values.
 * - Displays a credit card preview using the `Cards` component.
 * - Handles focus and blur events for input fields.
 * - Clears card field errors when the mode of payment changes.
 */

const CardDetails: React.FC<CardDetailsProps> = (props: CardDetailsProps): JSX.Element => {
  // ** Props
  const { watch, control, clearErrors, setValue } = props

  // ** States
  const [focus, setFocus] = useState<Focused | undefined>()

  // ** Handle Blure
  const handleBlur = () => setFocus(undefined)

  // ** Field Value
  const { cardNumber = '', expiryDate = '', nameOnCard = '', cvv = '' } = watch()

  // ** Handle Input Fromatted Value
  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'cardNumber') {
      return (target.value = formatCreditCardNumber(target.value, Payment))
    } else if (target.name === 'expiryDate') {
      return (target.value = formatExpirationDate(target.value))
    } else if (target.name === 'cvv') {
      return (target.value = formatCVC(target.value, cardNumber, Payment))
    }
  }

  // ** Field Watch
  const modeOfPayment = watch('modeOfPayment')
  const isRequired = modeOfPayment === 'CREDIT_CARD'

  useEffect(() => {
    clearErrors(CARD_FIELDS)
  }, [modeOfPayment, clearErrors])

  useEffect(() => {
    setValue('cardType' as keyof FormValues, Payment.fns.cardType(cardNumber) || '')
  }, [cardNumber, setValue])

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name='issuingBank'
                rules={isRequired ? { required: 'Issuing Bank is required' } : {}}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <TextField
                      {...field}
                      fullWidth
                      label='Issuing Bank'
                      placeholder='Enter issuing bank name'
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  </Fragment>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name='cardNumber'
                rules={isRequired ? { required: 'Card Number is required' } : {}}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <TextField
                      {...field}
                      fullWidth
                      autoComplete='off'
                      label='Card Number'
                      onBlur={handleBlur}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = handleInputChange(e)
                        field.onChange(value)
                      }}
                      placeholder='0000 0000 0000 0000'
                      onFocus={(e: React.FocusEvent<HTMLInputElement>) => setFocus(e.target.name as Focused)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  </Fragment>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name='nameOnCard'
                rules={isRequired ? { required: 'Name on Card is required' } : {}}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <TextField
                      {...field}
                      fullWidth
                      autoComplete='off'
                      onBlur={handleBlur}
                      label='Name on Card'
                      placeholder='John Doe'
                      onFocus={e => setFocus(e.target.name as Focused)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  </Fragment>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                control={control}
                name='expiryDate'
                rules={{
                  ...(isRequired ? { required: 'Expiry date is required' } : {}),
                  validate: value => {
                    if (!value) return true

                    // Expecting MM/YY
                    const [mm, yy] = value.split('/')
                    if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return 'Invalid expiry format'
                    const month = parseInt(mm, 10)
                    const year = parseInt(yy, 10) + 2000
                    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return 'Invalid expiry date'
                    const now = new Date()
                    const expiry = new Date(year, month - 1, 1)

                    // Set expiry to last day of the month
                    expiry.setMonth(expiry.getMonth() + 1)
                    expiry.setDate(0)
                    if (expiry < now) return 'Expiry date must be in the future'

                    return true
                  }
                }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <TextField
                      {...field}
                      fullWidth
                      label='Expiry'
                      onBlur={handleBlur}
                      placeholder='MM/YY'
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = handleInputChange(e)
                        field.onChange(value)
                      }}
                      inputProps={{ maxLength: '5' }}
                      onFocus={e => setFocus(e.target.name as Focused)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  </Fragment>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                control={control}
                name='cvv'
                rules={isRequired ? { required: 'CVC is required' } : {}}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <TextField
                      {...field}
                      fullWidth
                      label='CVC'
                      autoComplete='off'
                      onBlur={handleBlur}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = handleInputChange(e)

                        // Log card type for debugging
                        console.log('cardType', value, Payment)
                        field.onChange(value)
                      }}
                      onFocus={e => setFocus(e.target.name as Focused)}
                      placeholder={Payment.fns.cardType(watch('cardNumber') || '') === 'amex' ? '1234' : '123'}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  </Fragment>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label='Save Card for future billing?'
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              '& .rccs': {
                m: '0 auto',
                display: { xs: 'none', sm: 'block' }
              }
            }}
          >
            <Cards cvc={cvv} focused={focus} expiry={expiryDate} name={nameOnCard} number={cardNumber} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CardDetails

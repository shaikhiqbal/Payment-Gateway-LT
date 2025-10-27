import { Fragment } from 'react'

// ** MUI
import {
  TextField,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Typography,
  Card,
  CardHeader,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material'

// ** Form Controller
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import CountryField from 'src/pages/components/form-element/location/CountryField'

// ** Data
import { countries } from 'src/@fake-db/autocomplete'

// ** Custom Components
import CardDetails from './CardDetails'
import BankAccountDetails from './BankAccountDetails'
import VoiceUploader from './VoiceUploader'

// ** Spinners
import { BeatLoader } from 'react-spinners'

// ** Axios
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'

// ** Types
type PaymentMode = 'CREDIT_CARD' | 'ACH'

// ** Keys
import { BANK_FIELDS } from './BankAccountDetails'
import { CARD_FIELDS } from './CardDetails'

// ** Third Party Imports
import toast from 'react-hot-toast'

export interface FormValues {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  country: string
  countryCode: string
  zipCode: string
  contactNumber: string
  email: string
  product: string
  amount: string
  transactionType: number
  modeOfPayment: PaymentMode
  audio: File | null
  cardNumber?: string
  nameOnCard?: string
  expiryDate?: string
  cvv?: string
  issuingBank?: string
  cardType?: string
  bankName?: string
  accountName?: string
  routingNumber?: string
  accountNumber?: string
  chequeNumber?: string
  expiryMonth?: string
  expiryYear?: string
}

// ** Transaction Type Options
const groupedOptions = [
  { label: 'Sale', value: 1 },
  { label: 'Refund', value: 2 },
  { label: 'Chargeback', value: 3 }
]

// ** Main Component

const VirtualTerminal = () => {
  /**
   * Initializes the form using React Hook Form's `useForm` hook with typed form values.
   *
   * @typeParam FormValues - The shape of the form data.
   *
   * @returns An object containing:
   * - `control`: Control object for form fields, used with Controller components.
   * - `handleSubmit`: Function to handle form submission.
   * - `setValue`: Function to programmatically set a field value.
   * - `watch`: Function to watch specific form values for changes.
   * - `clearErrors`: Function to clear validation errors.
   * - `formState.errors`: Object containing validation errors for each field.
   *
   * @remarks
   * The form is initialized with default values for fields such as `firstName`, `lastName`, `address`, etc.
   * The `modeOfPayment` field defaults to 'Credit Card', and `audio` is initialized as `null`.
   */
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      country: '',
      countryCode: '',
      zipCode: '',
      contactNumber: '',
      email: '',
      product: '',
      amount: '',
      transactionType: 1,
      modeOfPayment: 'CREDIT_CARD',
      audio: null,
      cardNumber: '',
      nameOnCard: '',
      expiryDate: '',
      cvv: '',
      bankName: '',
      accountName: '',
      routingNumber: '',
      accountNumber: '',
      chequeNumber: '',
      issuingBank: '',
      cardType: ''
    }
  })

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()

    const deleteToKey = data.modeOfPayment === 'CREDIT_CARD' ? BANK_FIELDS : CARD_FIELDS

    deleteToKey.forEach(key => {
      delete data[key as keyof FormValues]
    })

    if (data.modeOfPayment === 'CREDIT_CARD') {
      const [month, year] = data.expiryDate ? data.expiryDate.split('/') : ['', '']
      data.expiryMonth = month

      // Convert 2-digit year to 4-digit (assume 20xx for 00-99)
      if (year && year.length === 2) {
        data.expiryYear = `20${year}`
      } else {
        data.expiryYear = year
      }
      data.cardNumber = data.cardNumber ? data.cardNumber.replaceAll(' ', '') : undefined
      delete data.expiryDate
    }

    Object.keys(data).forEach(key => {
      const value = data[key as keyof FormValues]
      if (value !== undefined && value !== null) {
        formData.append(key, value as any)
      }
    })

    try {
      await axios.post(endpoints.virtualTerminal.create, formData)
      reset()

      // Reset the form after successful submission
      toast.success('Successfully submitted form!')
    } catch (error) {
      console.error('Error submitting form:', error)

      // Handle error appropriately, e.g., show a notification
    }
  }

  return (
    <Card>
      <CardHeader title='Virtual Terminal' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: 'First Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='First Name *'
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: 'Last Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Last Name *'
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='address'
                control={control}
                rules={{ required: 'Address is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Address *'
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            {/* City */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='city'
                control={control}
                rules={{ required: 'City is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='City *'
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='state'
                control={control}
                rules={{ required: 'State/Province is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='State/Province *'
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                )}
              />
            </Grid>

            {/* Country */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='country'
                control={control}
                rules={{ required: 'Country is required' }}
                render={({ field }) => {
                  const selectedCountry = countries.find(c => c.code === field.value) || null
                  
return (
                    <CountryField
                      {...field}
                      value={selectedCountry}
                      onChange={(event, newValue) => {
                        field.onChange(newValue?.code || null)
                      }}
                      label='Country *'
                      valueType='label'
                      error={!!errors.country}
                      helperText={errors.country?.message}
                      fullWidth
                      ref={field.ref}
                    />
                  )
                }}
              />
            </Grid>

            {/* Zip */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='zipCode'
                control={control}
                rules={{ required: 'Zip/Post Code is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Zip/Post Code *'
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                  />
                )}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Email *'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            {/* Country Code */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='countryCode'
                control={control}
                rules={{ required: 'Country Code is required' }}
                render={({ field }) => {
                  const selectedCountry = countries.find(c => c.code === field.value) || null
                  
return (
                    <Fragment>
                      <CountryField
                        {...field}
                        value={selectedCountry}
                        onChange={(event, newValue) => {
                          field.onChange(newValue?.code || null)
                        }}
                        valueType='phone'
                        label='Country Code *'
                        error={!!errors.countryCode}
                        helperText={errors.countryCode?.message}
                        fullWidth
                        ref={field.ref}
                      />
                    </Fragment>
                  )
                }}
              />
            </Grid>

            {/* Country Number */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='contactNumber'
                control={control}
                rules={{ required: 'Contact Number is required' }}
                render={({ field }) => (
                  <Fragment>
                    <TextField
                      {...field}
                      fullWidth
                      label='Contact Number *'
                      error={!!errors.contactNumber}
                      helperText={errors.contactNumber?.message}
                    />
                  </Fragment>
                )}
              />
            </Grid>

            {/* Product */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='product'
                control={control}
                rules={{ required: 'Product is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Product *'
                    error={!!errors.product}
                    helperText={errors.product?.message}
                  />
                )}
              />
            </Grid>

            {/* Amount */}
            <Grid item xs={12} sm={6}>
              <Controller
                name='amount'
                control={control}
                rules={{ required: 'Amount is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Amount *'
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.transactionType}>
                <InputLabel id='grouped-select-label'>Transaction Type *</InputLabel>
                <Controller
                  name='transactionType'
                  control={control}
                  rules={{ required: 'Transaction type is required' }}
                  render={({ field }) => (
                    <Select
                      labelId='grouped-select-label'
                      id='grouped-select'
                      label='Transaction Type *'
                      value={field.value || ''}
                      onChange={event => {
                        field.onChange(event.target.value)

                        // Update form value
                        console.log(event.target.value)

                        // Optional: log the value
                      }}
                    >
                      {groupedOptions.map(group => (
                        <MenuItem key={group.value} value={group.value}>
                          {group.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.transactionType && <FormHelperText>{errors.transactionType.message}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Mode Of Payment */}
            <Grid item xs={12}>
              <FormControl component='fieldset' error={!!errors.modeOfPayment}>
                <FormLabel component='legend'>Mode Of Payment *</FormLabel>
                <Controller
                  name='modeOfPayment'
                  control={control}
                  rules={{ required: 'Mode of Payment is required' }}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value='CREDIT_CARD' control={<Radio />} label='Credit Card' />
                      <FormControlLabel value='ACH' control={<Radio />} label='ACH / Check 21' />
                    </RadioGroup>
                  )}
                />
                {errors.modeOfPayment && (
                  <Typography color='error' variant='caption'>
                    {errors.modeOfPayment.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {watch('modeOfPayment') === 'CREDIT_CARD' ? (
              <Grid item xs={12}>
                <CardDetails control={control} watch={watch} clearErrors={clearErrors} setValue={setValue} />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <BankAccountDetails control={control} watch={watch} clearErrors={clearErrors} />
              </Grid>
            )}

            {/* Upload Audio */}
            <Grid item xs={12}>
              <FormLabel>Upload Audio</FormLabel>
              <VoiceUploader setValue={setValue} />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
                {isSubmitting ? <BeatLoader size={15} color='#ffffff' /> : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

VirtualTerminal.acl = {
  action: 'read',
  subject: 'virtual-terminal'
}

export default VirtualTerminal

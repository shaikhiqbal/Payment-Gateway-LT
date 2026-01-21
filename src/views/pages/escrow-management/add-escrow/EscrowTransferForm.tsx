import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, TextField, Button, MenuItem, Typography, Grid, Autocomplete } from '@mui/material'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PickersComponent from 'src/views/forms/form-elements/pickers/PickersCustomInput'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

/* ---------------- TYPES ---------------- */

type ValidityType = 'days' | 'date'

interface User {
  id: string
  fullName: string
  email: string
  phone: string
}

interface FormValues {
  transferTo: User | null
  amount: number
  validityType: ValidityType
  validityDays?: number
  validityDate?: Date
  remarks: string
}

/* ---------------- FAKE API ---------------- */

const USERS: User[] = [
  { id: '1', fullName: 'John Doe', email: 'john@mail.com', phone: '+91 9876543210' },
  { id: '2', fullName: 'Alice Smith', email: 'alice@mail.com', phone: '+91 9988776655' },
  { id: '3', fullName: 'Rahul Verma', email: 'rahul@mail.com', phone: '+91 9123456789' }
]

const searchUsers = (query: string): Promise<User[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        USERS.filter(
          u =>
            u.fullName.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase()) ||
            u.phone.includes(query)
        )
      )
    }, 500)
  })
}

/* ---------------- DEBOUNCE HOOK ---------------- */

const useDebounce = <T,>(value: T, delay = 500): T => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

/* ---------------- COMPONENT ---------------- */

interface EscrowTransferFormProps {
  onNext: () => void
}
const EscrowTransferForm = ({ onNext }: EscrowTransferFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      validityType: 'days',
      transferTo: null
    }
  })

  const [options, setOptions] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useDebounce(search)
  const validityType = watch('validityType')
  const selectedUser = watch('transferTo')

  useEffect(() => {
    if (!debouncedSearch) {
      setOptions([])
      return
    }

    setLoading(true)
    searchUsers(debouncedSearch).then(res => {
      setOptions(res)
      setLoading(false)
    })
  }, [debouncedSearch])

  const onSubmit = (data: FormValues) => {
    console.log('SUBMIT PAYLOAD:', data)
    onNext()
  }

  return (
    <DatePickerWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          {/* Transfer To */}
          <Grid item xs={12}>
            <Controller
              name='transferTo'
              control={control}
              rules={{ required: 'Transfer To is required' }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={options}
                  loading={loading}
                  onInputChange={(_, value) => setSearch(value)}
                  onChange={(_, value) => field.onChange(value)}
                  getOptionLabel={o => `${o.fullName} (${o.email})`}
                  renderInput={params => (
                    <TextField
                      {...params}
                      fullWidth
                      label='Transfer To *'
                      placeholder='Wallet ID / Email / Phone'
                      error={!!errors.transferTo}
                      helperText={errors.transferTo?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          {/* User Details */}
          {selectedUser && (
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#f5f7fa',
                  borderRadius: 1
                }}
              >
                <Typography fontWeight={600}>{selectedUser.fullName}</Typography>
                <Typography variant='body2'>{selectedUser.email}</Typography>
                <Typography variant='body2'>{selectedUser.phone}</Typography>
              </Box>
            </Grid>
          )}

          {/* Amount */}
          <Grid item xs={12}>
            <Controller
              name='amount'
              control={control}
              rules={{ required: 'Amount is required', min: 1 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='number'
                  label='Amount *'
                  placeholder='Eg: 100'
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              )}
            />
          </Grid>

          {/* Validity Type */}
          <Grid item xs={12}>
            <Controller
              name='validityType'
              control={control}
              render={({ field }) => (
                <TextField {...field} select fullWidth label='Escrow Validity *'>
                  <MenuItem value='days'>Days</MenuItem>
                  <MenuItem value='date'>Date</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Validity Days */}
          {validityType === 'days' && (
            <Grid item xs={12}>
              <Controller
                name='validityDays'
                control={control}
                rules={{ required: 'Days required', min: 1 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Validity Days *'
                    error={!!errors.validityDays}
                    helperText={errors.validityDays?.message}
                  />
                )}
              />
            </Grid>
          )}

          {/* Validity Date */}
          {validityType === 'date' && (
            <Grid item xs={12}>
              <Controller
                name='validityDate'
                control={control}
                rules={{ required: 'Date required' }}
                render={({ field }) => (
                  <Box>
                    <Typography sx={{ mb: 1 }}>Validity Date *</Typography>
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      minDate={new Date(Date.now() + 86400000)}
                      dateFormat='dd/MM/yyyy'
                      placeholderText='Select future date'
                      customInput={<PickersComponent label='Basic' />}
                    />
                    {errors.validityDate && (
                      <Typography color='error' variant='body2' sx={{ mt: 1 }}>
                        {errors.validityDate.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Grid>
          )}

          {/* Remarks */}
          <Grid item xs={12}>
            <Controller
              name='remarks'
              control={control}
              rules={{ required: 'Remarks required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Remarks *'
                  placeholder='Eg: Bill Payment'
                  error={!!errors.remarks}
                  helperText={errors.remarks?.message}
                />
              )}
            />
          </Grid>

          {/* Actions */}
          <Grid item xs={12}>
            <Box
              sx={{
                gap: 5,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}
            >
              <Button type='submit' variant='contained' size='large'>
                Submit
              </Button>
              <Button variant='outlined' size='large'>
                Close
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </DatePickerWrapper>
  )
}

export default EscrowTransferForm

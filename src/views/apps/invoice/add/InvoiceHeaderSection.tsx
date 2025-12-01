import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Grid } from '@mui/material'

import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'

// ** Custom Styled
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CustomInput from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material'

// **Styled Logo Wrapper
const InvoiceLogoWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `2px dashed ${theme.palette.mode === 'light' ? 'rgba(93,89,98,0.2)' : 'rgba(247,244,254,0.2)'}`,
  cursor: 'pointer',
  transition: '0.3s',
  padding: 0,

  '& img': {
    padding: theme.spacing(1),
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  }
}))

//**  Main Section
const InvoiceHeaderSection = () => {
  const { control } = useFormContext()

  return (
    <DatePickerWrapper>
      <Box>
        <Typography variant='h6'>Invoice Details</Typography>

        <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'space-between' }}>
          <Grid sx={{ mb: 2 }} item xs={12} sm={6} md={4}>
            <Grid container spacing={2}>
              {/* Logo */}
              <Grid sx={{ mb: 2, padding: 0 }} item xs={12}>
                <InvoiceLogoWrapper>
                  <img src='/images/website-logo/locktrust-logo.png' alt='Invoice Logo' />
                </InvoiceLogoWrapper>
              </Grid>

              {/* Status Select */}
              <Grid sx={{ mb: 2 }} item xs={6}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='invoice-status-label'>Status</InputLabel>

                  <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                      <Select {...field} labelId='invoice-status-label' label='Status'>
                        <MenuItem value='Draft'>Draft</MenuItem>
                        <MenuItem value='Sent'>Sent</MenuItem>
                        <MenuItem value='Paid'>Paid</MenuItem>
                        <MenuItem value='Partial Payment'>Partial Payment</MenuItem>
                        <MenuItem value='Cancelled'>Cancelled</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid sx={{ mb: 2 }} item xs={6}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='invoice-currency-label'>Currency</InputLabel>

                  <Controller
                    name='currency'
                    control={control}
                    render={({ field }) => (
                      <Select {...field} labelId='invoice-currency-label' label='Currency'>
                        <MenuItem value='USD'>USD — US Dollar</MenuItem>
                        <MenuItem value='EUR'>EUR — Euro</MenuItem>
                        <MenuItem value='GBP'>GBP — British Pound</MenuItem>
                        <MenuItem value='JPY'>JPY — Japanese Yen</MenuItem>
                        <MenuItem value='AUD'>AUD — Australian Dollar</MenuItem>
                        <MenuItem value='CAD'>CAD — Canadian Dollar</MenuItem>
                        <MenuItem value='CHF'>CHF — Swiss Franc</MenuItem>
                        <MenuItem value='CNY'>CNY — Chinese Yuan</MenuItem>
                        <MenuItem value='INR'>INR — Indian Rupee</MenuItem>
                        <MenuItem value='AED'>AED — UAE Dirham</MenuItem>
                        <MenuItem value='SAR'>SAR — Saudi Riyal</MenuItem>
                        <MenuItem value='BDT'>BDT — Bangladeshi Taka</MenuItem>
                        <MenuItem value='PKR'>PKR — Pakistani Rupee</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ mb: 2 }} item xs={12} sm={6} md={5}>
            <Grid container spacing={2}>
              {/* Invoice Number */}
              <Grid sx={{ mb: 2 }} item xs={12} sm={6}>
                <Controller
                  name='invoiceNumber'
                  control={control}
                  render={({ field }) => <TextField {...field} fullWidth size='small' label='Invoice Number' />}
                />
              </Grid>

              {/* Reference Number */}
              <Grid sx={{ mb: 2 }} item xs={12} sm={6}>
                <Controller
                  name='referenceNumber'
                  control={control}
                  render={({ field }) => <TextField {...field} fullWidth size='small' label='Reference Number' />}
                />
              </Grid>

              {/* Date Picker */}
              <Grid sx={{ mb: 2 }} item xs={12}>
                <Controller
                  name='date'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      onChange={onChange}
                      todayButton='Today'
                      id='invoice-date-picker'
                      customInput={<CustomInput label='Date' />}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </DatePickerWrapper>
  )
}

export default InvoiceHeaderSection

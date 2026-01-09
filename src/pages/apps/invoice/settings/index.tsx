import { useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Switch,
  FormControl,
  MenuItem,
  FormHelperText,
  InputLabel,
  Select
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'

// ---------------------------
// Types
// ---------------------------
interface InvoiceFormInputs {
  invoiceLogo?: File
  invoicePrefix: string
  invoiceDue: string
  roundOff: boolean
  roundOffType: string
  showCompanyDetails: boolean
  headerTerms: string
  footerTerms: string
}

const ROW_SPACING = { mb: 4 }

const InvoiceSettings = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<InvoiceFormInputs>({
    defaultValues: {
      invoicePrefix: 'INV -',
      invoiceDue: '',
      roundOff: true,
      roundOffType: '',
      showCompanyDetails: true,
      headerTerms: '',
      footerTerms: ''
    }
  })

  const onSubmit = (data: InvoiceFormInputs) => {
    console.log(data)
    alert('Saved!')
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLogoPreview(URL.createObjectURL(file))
    setValue('invoiceLogo', file)
  }

  return (
    <Box sx={{ p: 4, background: '#fff', borderRadius: 2 }}>
      <Typography variant='h6' sx={{ mb: 4 }}>
        Invoice Settings
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ====================================================================================== */}
        {/* ROW: INVOICE LOGO */}
        {/* ====================================================================================== */}
        <Grid container spacing={2} alignItems='flex-start' sx={ROW_SPACING}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Invoice Logo</Typography>
            <Typography variant='body2'>Upload Logo of your Company</Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Button variant='contained' component='label' startIcon={<Icon icon='tabler:upload' />} sx={{ mb: 1 }}>
              Upload Photo
              <input hidden type='file' accept='image/*' onChange={handleLogoUpload} />
            </Button>

            {logoPreview && (
              <Box
                component='img'
                src={logoPreview}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  border: '1px solid #eee',
                  display: 'block',
                  mb: 1
                }}
              />
            )}
            <br />
            <Typography variant='caption' color='text.secondary'>
              Recommended: 450×450px, Max size: 5MB
            </Typography>
          </Grid>
        </Grid>

        {/* ====================================================================================== */}
        {/* ROW: INVOICE PREFIX */}
        {/* ====================================================================================== */}
        <Grid container spacing={2} alignItems='center' sx={ROW_SPACING}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Invoice Prefix</Typography>
            <Typography variant='body2'>Add prefix to your invoice</Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Controller
              name='invoicePrefix'
              control={control}
              rules={{ required: 'Prefix is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Prefix'
                  fullWidth
                  error={!!errors.invoicePrefix}
                  helperText={errors.invoicePrefix?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* ====================================================================================== */}
        {/* ROW: INVOICE DUE */}
        {/* ====================================================================================== */}
        <Grid container spacing={2} alignItems='center' sx={ROW_SPACING}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Invoice Due</Typography>
            <Typography variant='body2'>Select due date</Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Controller
              name='invoiceDue'
              control={control}
              rules={{ required: 'Please select due days' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.invoiceDue}>
                  <InputLabel>Choose</InputLabel>
                  <Select {...field} label='Choose'>
                    <MenuItem value='7'>7 Days</MenuItem>
                    <MenuItem value='15'>15 Days</MenuItem>
                    <MenuItem value='30'>30 Days</MenuItem>
                  </Select>
                  <FormHelperText>{errors.invoiceDue?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        {/* ====================================================================================== */}
        {/* ROW: INVOICE ROUND OFF */}
        {/* ====================================================================================== */}
        <Grid container spacing={2} alignItems='center' sx={ROW_SPACING}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Invoice Round Off</Typography>
            <Typography variant='body2'>Value Roundoff in Invoice</Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Controller
              name='roundOff'
              control={control}
              render={({ field }) => <Switch {...field} checked={field.value} />}
            />

            {/* ROUND OFF TYPE SELECT */}
            <Box mt={2}>
              <Controller
                name='roundOffType'
                control={control}
                rules={{ required: 'Select round off type' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.roundOffType}>
                    <InputLabel>Choose</InputLabel>
                    <Select {...field} label='Choose'>
                      <MenuItem value='up'>Round Up</MenuItem>
                      <MenuItem value='down'>Round Down</MenuItem>
                    </Select>
                    <FormHelperText>{errors.roundOffType?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Box>
          </Grid>
        </Grid>

        {/* ====================================================================================== */}
        {/* ROW: SHOW COMPANY DETAILS */}
        {/* ====================================================================================== */}
        <Grid container spacing={2} alignItems='center' sx={ROW_SPACING}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Show Company Details</Typography>
            <Typography variant='body2'>Show / Hide Company Details</Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Controller
              name='showCompanyDetails'
              control={control}
              render={({ field }) => <Switch {...field} checked={field.value} />}
            />
          </Grid>
        </Grid>

        {/* ====================================================================================== */}
        {/* ROW: HEADER TERMS */}
        {/* ====================================================================================== */}
        <Grid container spacing={2} alignItems='flex-start' sx={ROW_SPACING}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Invoice Header Terms</Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Controller
              name='headerTerms'
              control={control}
              render={({ field }) => <TextField {...field} label='Header Terms' multiline minRows={3} fullWidth />}
            />
          </Grid>
        </Grid>

        {/* ====================================================================================== */}
        {/* ROW: FOOTER TERMS */}
        {/* ====================================================================================== */}
        <Grid container spacing={2} alignItems='flex-start' sx={ROW_SPACING}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600}>Invoice Footer Terms</Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Controller
              name='footerTerms'
              control={control}
              render={({ field }) => <TextField {...field} label='Footer Terms' multiline minRows={3} fullWidth />}
            />
          </Grid>
        </Grid>

        {/* ====================================================================================== */}
        {/* FOOTER BUTTONS */}
        {/* ====================================================================================== */}
        <Grid container justifyContent='flex-end' spacing={2} sx={{ mt: 4 }}>
          <Grid item>
            <Button variant='outlined' color='secondary'>
              Cancel
            </Button>
          </Grid>

          <Grid item>
            <Button type='submit' variant='contained' color='warning' endIcon={<Icon icon='tabler:check' />}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

InvoiceSettings.acl = {
  action: 'read',
  subject: 'user-management'
}

export default InvoiceSettings

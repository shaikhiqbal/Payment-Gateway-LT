import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

// ** Styled Component Import
import { EscrowDropzoneWrapper } from 'src/@core/styles/libs/react-dropzone'

import FileUploader from './FileUploader'

// EscrowDropzoneWrapper

interface ProductAndServiceProps {
  onBack: () => void
}

type FormValues = {
  type: 'product' | 'service' | ''
  file?: FileList
  video?: FileList
}

const ProductAndService = ({ onBack }: ProductAndServiceProps) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      type: ''
    }
  })

  const selectedType = watch('type')

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', {
      type: data.type,
      file: data.file?.[0],
      video: data.video?.[0]
    })
  }

  return (
    <EscrowDropzoneWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          {/* Select Product or Service */}
          <Grid item xs={12}>
            <Controller
              name='type'
              control={control}
              rules={{ required: 'Please select product or service' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label='Choose Type *'
                  error={!!errors.type}
                  helperText={errors.type?.message}
                >
                  <MenuItem value='product'>Product</MenuItem>
                  <MenuItem value='service'>Service</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FileUploader />
          </Grid>

          <Grid item xs={12}>
            <Box display='flex' gap={3}>
              <Button variant='outlined' onClick={onBack}>
                Back
              </Button>

              <Button type='submit' variant='contained'>
                Continue
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </EscrowDropzoneWrapper>
  )
}

export default ProductAndService

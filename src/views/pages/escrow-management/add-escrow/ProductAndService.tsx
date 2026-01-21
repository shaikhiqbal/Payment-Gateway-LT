import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import FileUploader, { MediaItem } from './FileUploader'

type FormValues = {
  type: 'product' | 'service' | ''
  media: MediaItem[]
}

interface Props {
  onBack: () => void
  closeDialog: () => void
}

const ProductAndService = ({ onBack, closeDialog }: Props) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      type: '',
      media: []
    }
  })

  const selectedType = watch('type')

  const onSubmit = (data: FormValues) => {
    console.log('SUBMITTED DATA:', data)
    closeDialog()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        {/* Select type */}
        <Grid item xs={12}>
          <Controller
            name='type'
            control={control}
            rules={{ required: 'Please select type' }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label='Choose Type'
                error={!!errors.type}
                helperText={errors.type?.message}
              >
                <MenuItem value='product'>Product</MenuItem>
                <MenuItem value='service'>Service</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        {/* Media uploader */}
        <Grid item xs={12}>
          <Controller
            name='media'
            control={control}
            rules={{
              validate: value => {
                if (!selectedType) return 'Select type first'
                if (value.length === 0)
                  return selectedType === 'product' ? 'Product image or video required' : 'Service video required'
                return true
              }
            }}
            render={({ field }) => (
              <>
                <FileUploader value={field.value} onChange={field.onChange} allowImage={selectedType === 'product'} />
                {errors.media && (
                  <Typography color='error' mt={1}>
                    {errors.media.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Box display='flex' gap={2}>
            <Button variant='outlined' onClick={onBack}>
              Back
            </Button>
            <Button variant='contained' type='submit'>
              Continue
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default ProductAndService

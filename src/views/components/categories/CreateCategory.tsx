// src/components/CreateCategory.tsx

import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'

// ** MUI Imports
import {
  Box,
  Grid,
  Card,
  Dialog,
  Button,
  TextField,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
  CardContent,
  Fade,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  SelectChangeEvent,
  FadeProps,
  Autocomplete,
  Chip
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** React Hook Form Imports
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import ColorPicker from '../product/ColorPicker'
import SizeSelect from '../product/SizeSelect'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type Variation = {
  name: string
  values: string[]
}

interface CategoryFormData {
  name: string
  slug: string
  description?: string
  status: 'Active' | 'Inactive'
  variations: Variation[]
}

const defaultVariations = ['Color', 'Size', 'Style']

const CreateCategory = (props: { show: boolean; setShow: (show: boolean) => void }) => {
  // ** Props
  const { show, setShow } = props

  // ** States
  const [options, setOptions] = useState<string[]>(defaultVariations)
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      status: 'Active',
      variations: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variations'
  })

  const handleVariationChange = (_: any, newValue: string[]) => {
    debugger
    const lastValue = newValue[newValue.length - 1]
    if (lastValue && !options.includes(lastValue)) {
      setOptions(prev => [...prev, lastValue])
    }
    setSelectedValues(newValue)
  }

  const onSubmit = (data: CategoryFormData) => {
    console.log('Category Created:', data)
    // Here you can send data to API, e.g.:
    // await axios.post('/api/categories', data)
    // alert(`✅ Category "${data.name}" created successfully!`)
    // reset()
    // setShow(false)
  }

  useEffect(() => {
    const existing = fields.map(f => f.name)
    const newOnes = selectedValues.filter(v => !existing.includes(v))
    const removed = existing.filter(e => !selectedValues.includes(e))

    newOnes.forEach(v => append({ name: v, values: [] }))
    removed.forEach(rm => {
      const index = fields.findIndex(f => f.name === rm)
      if (index !== -1) remove(index)
    })
  }, [selectedValues])

  const renderInput = (
    field: Variation & { id: string }, // ensure includes RHF's id field
    index: number
  ) => {
    const { name } = field

    switch (name) {
      case 'Color':
        return (
          <ColorPicker
            label='Choose Colors'
            setValue={setValue}
            fieldName={`variations.${index}.values`}
            required={true}
          />
        )

      case 'Size':
        return (
          <SizeSelect
            label='Select Sizes'
            setValue={setValue}
            fieldName={`variations.${index}.values`}
            required={true}
          />
        )

      default:
        return (
          <Controller
            name={`variations.${index}.values`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                value={field.value?.join(', ') || ''}
                onChange={e => field.onChange(e.target.value.split(',').map(v => v.trim()))}
                label={`Enter ${name} values (comma separated)`}
              />
            )}
          />
        )
    }
  }
  return (
    <Dialog
      fullWidth
      open={show}
      maxWidth='sm'
      scroll='body'
      onClose={() => setShow(false)}
      TransitionComponent={Transition}
      onBackdropClick={() => setShow(false)}
    >
      <DialogContent
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
          pt: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`]
        }}
      >
        <IconButton
          size='small'
          onClick={() => setShow(false)}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Icon icon='tabler:x' />
        </IconButton>

        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3 }}>
            Create Category
          </Typography>
          <Typography variant='body2'>Fill in the details below to create a new category.</Typography>
        </Box>

        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            {/* Category Name */}
            <Grid item xs={12}>
              <Controller
                name='name'
                control={control}
                rules={{ required: 'Category name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Category Name'
                    placeholder='e.g. Electronics'
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            {/* Slug */}
            <Grid item xs={12}>
              <Controller
                name='slug'
                control={control}
                rules={{
                  required: 'Slug is required',
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: 'Slug can only contain lowercase letters, numbers, and dashes'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Slug'
                    placeholder='e.g. electronics'
                    error={!!errors.slug}
                    helperText={errors.slug?.message}
                  />
                )}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                rules={{
                  maxLength: { value: 200, message: 'Max 200 characters allowed' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    label='Description'
                    placeholder='Enter short description about the category...'
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='status-select-label'>Status</InputLabel>
                <Controller
                  name='status'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} labelId='status-select-label' label='Status'>
                      <MenuItem value='Active'>Active</MenuItem>
                      <MenuItem value='Inactive'>Inactive</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Autocomplete
                  multiple
                  freeSolo
                  options={options}
                  value={selectedValues}
                  onChange={handleVariationChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        color={
                          option.toLowerCase() === 'color'
                            ? 'primary'
                            : option.toLowerCase() === 'size'
                            ? 'secondary'
                            : 'default'
                        }
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={params => (
                    <TextField {...params} label='Select or create variations' placeholder='Color, Size, Style...' />
                  )}
                />
              </FormControl>
            </Grid>
            {fields.map((field, index) => {
              return (
                <Grid item xs={12}>
                  {renderInput(field, index)}
                </Grid>
              )
            })}
          </Grid>

          {/* Submit Buttons */}
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
              pt: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`]
            }}
          >
            <Button type='submit' variant='contained' sx={{ mr: 1 }}>
              Create
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => {
                reset()
                setShow(false)
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCategory

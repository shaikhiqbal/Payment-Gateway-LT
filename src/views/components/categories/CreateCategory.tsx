// src/components/CreateCategory.tsx

import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'

// ** MUI Imports
import {
  Box,
  Grid,
  Dialog,
  Button,
  TextField,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
  Fade,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FadeProps,
  Autocomplete,
  Chip
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** React Hook Form Imports
import { useForm, Controller, useFieldArray } from 'react-hook-form'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Custom Component Imports
import ColorPicker, { ColorItemShape } from '../product/ColorPicker'
import SizeSelect, { SizeItemShape } from '../product/SizeSelect'

// ** Redux Imports
import { useDispatch } from 'react-redux'

// ** Redux Actions Imports
import { addCategory } from 'src/store/pages/categories'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type Variation =
  | {
      name: 'Color'
      values: ColorItemShape[]
    }
  | {
      name: 'Size'
      values: SizeItemShape[]
    }
  | {
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

  // ** Redux Hooks
  const dispatch = useDispatch()

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
    const lastValue = newValue[newValue.length - 1]
    if (lastValue && !options.includes(lastValue)) {
      setOptions(prev => [...prev, lastValue])
    }
    setSelectedValues(newValue)
  }

  const onSubmit = (data: CategoryFormData) => {
    dispatch(addCategory(data))

    setSelectedValues([])
    toast.success(`Category "${data.name}" created successfully!`)
    reset()
    setShow(false)
  }

  useEffect(() => {
    const existing = fields.map(f => f.name)
    const newOnes = selectedValues.filter(v => !existing.includes(v))
    const removed = existing.filter(e => !selectedValues.includes(e))

    // Append new variations
    newOnes.forEach(v => append({ name: v, values: [] }))

    // Remove those that are no longer selected
    if (removed.length > 0) {
      // Find indices to remove, sort descending to avoid shifting
      const indicesToRemove = fields
        .map((f, i) => ({ name: f.name.toLowerCase(), index: i }))
        .filter(f => removed.map(r => r.toLowerCase()).includes(f.name))
        .map(f => f.index)
        .sort((a, b) => b - a) // remove from end to start
      indicesToRemove.forEach(i => remove(i))
    }
  }, [selectedValues])

  const renderInput = (field: Variation & { id: string }, index: number) => {
    const { name } = field

    switch (name) {
      case 'Color':
        return (
          <Controller
            name={`variations.${index}.values`}
            control={control}
            rules={{
              required: 'Please select at least one color'
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ColorPicker
                label='Choose Colors'
                setValue={setValue}
                fieldName={`variations.${index}.values`}
                value={Array.isArray(value) ? (value as ColorItemShape[]) : []}
                onChange={onChange}
                required={true}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )

      case 'Size':
        return (
          <Controller
            name={`variations.${index}.values`}
            control={control}
            rules={{
              required: 'Please select at least one size'
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <SizeSelect
                label='Select Sizes'
                setValue={setValue}
                fieldName={`variations.${index}.values`}
                required={true}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )

      default:
        return (
          <Controller
            name={`variations.${index}.values`}
            control={control}
            rules={{
              required: `Please enter at least one ${name} value`
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                value={field.value?.join(', ') || ''}
                onChange={e => field.onChange(e.target.value.split(',').map(v => v.trim()))}
                label={`Enter ${name} values (comma separated)`}
                error={!!error}
                helperText={error?.message}
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

        <Box>
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
            <Button type='button' variant='contained' sx={{ mr: 1 }} onClick={() => handleSubmit(onSubmit)()}>
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

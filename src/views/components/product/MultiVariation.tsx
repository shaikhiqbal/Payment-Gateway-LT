// ** React Imports
import { useState, useEffect } from 'react'

// ** React Hook Form Imports
import { useForm, Controller, useFieldArray, UseFormSetValue } from 'react-hook-form'

// ** MUI Imports
import {
  Box,
  Grid,
  Chip,
  Divider,
  TextField,
  Autocomplete,
  Typography,
  FormControl,
  IconButton,
  DialogContentText
} from '@mui/material'

// ** Custom Components
import ColorPicker from './ColorPicker'
import SizeSelect from './SizeSelect'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ProductFormData, LabelValue, Variant } from 'src/pages/products/create-product'

const defaultVariations = ['Color', 'Size', 'Style']

interface VariationField {
  name: string
  values: string[] | LabelValue[]
}

interface ProductForm {
  variations: VariationField[]
}

interface MultiVariationProps {
  setValue: UseFormSetValue<ProductFormData>
}

const emptyVariant = {
  key: '',
  name: '',
  sku: '',
  buyingPrice: 0,
  sellingPrice: 0,
  discountPrice: 0,
  quantity: 0,
  alertQuantity: 0,
  weight: '',
  gtin: ''
}

// ✅ Generate all combinations
function generateCombinations(variations: VariationField[]): Record<string, string>[] {
  return variations.reduce<Record<string, string>[]>(
    (acc, variation) => {
      const temp: Record<string, string>[] = []
      const values =
        typeof variation.values[0] === 'object'
          ? (variation.values as LabelValue[]).map(v => v.value)
          : (variation.values as string[])
      acc.forEach(a => {
        values.forEach(v => {
          if (v) temp.push({ ...a, [variation.name]: v })
        })
      })
      return temp
    },
    [{}]
  )
}

// ✅ Map combinations into typed variants
function mapToVariants(combinations: Record<string, string>[], variations: VariationField[]): Variant[] {
  return combinations.map((combo, index) => {
    const variantName: Record<string, any> = {}

    for (const [key, value] of Object.entries(combo)) {
      const original = variations.find(v => v.name === key)

      if (key === 'Color' || key === 'Size' || key === 'Style') {
        const labelValue = (original?.values as LabelValue[])?.find(lv => lv.value === value)
        variantName[key] = labelValue ? [labelValue] : []
      }
    }

    return {
      ...emptyVariant,
      key: `VAR-${index + 1}`,
      name: Object.values(combo).join(' / '),
      sku: `SKU-${index + 1}`,
      variantName
    }
  })
}

const MultiVariation = ({ setValue }: MultiVariationProps) => {
  const [options, setOptions] = useState<string[]>(defaultVariations)
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const {
    control,
    setValue: setLocalValue,
    handleSubmit
  } = useForm<ProductForm>({
    defaultValues: { variations: [] }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variations'
  })

  useEffect(() => {
    const existing = fields.map(f => f.name)
    const newOnes = selectedValues.filter(v => !existing.includes(v))
    const removed = existing.filter(e => !selectedValues.includes(e))

    newOnes.forEach(v => append({ name: v, values: [] }))
    removed.forEach(rm => {
      const index = fields.findIndex(f => f.name === rm)
      if (index !== -1) remove(index)
    })
  }, [selectedValues, append, remove, fields])

  const handleVariationChange = (_: any, newValue: string[]) => {
    const lastValue = newValue[newValue.length - 1]
    if (lastValue && !options.includes(lastValue)) {
      setOptions(prev => [...prev, lastValue])
    }
    setSelectedValues(newValue)
  }

  const handleRemoveVariation = (index: number) => {
    const fieldName = fields[index].name
    setSelectedValues(prev => prev.filter(v => v !== fieldName))
    remove(index)
  }

  const onSubmit = (data: ProductForm) => {
    const combos = generateCombinations(data.variations)
    const variants = mapToVariants(combos, data.variations)
    setValue('variants', variants)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography id='variant-dialog-title' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
        Add Variants
      </Typography>

      <DialogContentText variant='body2' sx={{ textAlign: 'center', mb: 4 }}>
        Customize your product by adding Color, Size, and Style variations.
      </DialogContentText>

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

      {fields.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant='subtitle1' sx={{ mb: 2 }}>
            Define Variation Values
          </Typography>

          <Grid container spacing={3}>
            {fields.map((field, index) => {
              const fieldName = field.name.toLowerCase()
              return (
                <Grid item xs={12} key={field.id}>
                  <Box
                    sx={{
                      p: 2,
                      border: '1px solid #ddd',
                      borderRadius: 2,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant='subtitle2'>{field.name}</Typography>
                      <IconButton color='error' onClick={() => handleRemoveVariation(index)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </Box>

                    {fieldName === 'color' && (
                      <ColorPicker
                        label='Choose Colors'
                        setValue={setLocalValue}
                        fieldName={`variations.${index}.values`}
                      />
                    )}

                    {fieldName === 'size' && (
                      <SizeSelect
                        label='Select Sizes'
                        setValue={setLocalValue}
                        fieldName={`variations.${index}.values`}
                      />
                    )}

                    {fieldName === 'style' && (
                      <Controller
                        name={`variations.${index}.values`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            value={field.value?.join(', ') || ''}
                            onChange={e => field.onChange(e.target.value.split(',').map(v => v.trim()))}
                            label='Enter Styles (comma separated)'
                          />
                        )}
                      />
                    )}
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      )}
    </form>
  )
}

export default MultiVariation

// ** React Imports
import { useState, useEffect } from 'react'

// ** React Hook Form Imports
import { useForm, Controller, useFieldArray } from 'react-hook-form'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'

// ** Custom Components
import ColorPicker from './ColorPicker'
import SizeSelect from './SizeSelect'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ✅ Base Variation Options — Color & Size at top
const defaultVariations = [
  'Color',
  'Size',
  'Material',
  'Pattern',
  'Style',
  'Storage',
  'RAM',
  'Finish',
  'Dimension',
  'Weight'
]

// ✅ Form type
interface VariationField {
  name: string
  values: string[] // e.g. multiple color or size options
}

interface ProductForm {
  variations: VariationField[]
}

const MultiVariation = () => {
  const [options, setOptions] = useState<string[]>(defaultVariations)
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const { control, setValue, watch } = useForm<ProductForm>({
    defaultValues: {
      variations: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variations'
  })

  // Add new variation field when selected
  useEffect(() => {
    // find missing variations
    const existing = fields.map(f => f.name)
    const newOnes = selectedValues.filter(v => !existing.includes(v))
    const removed = existing.filter(e => !selectedValues.includes(e))

    // Add new variations
    newOnes.forEach(v =>
      append({
        name: v,
        values: []
      })
    )

    // Remove unselected ones
    removed.forEach(rm => {
      const index = fields.findIndex(f => f.name === rm)
      if (index !== -1) remove(index)
    })
  }, [selectedValues])

  const handleVariationChange = (event: any, newValue: string[]) => {
    const lastValue = newValue[newValue.length - 1]
    if (lastValue && !options.includes(lastValue)) {
      setOptions(prev => [...prev, lastValue])
    }
    setSelectedValues(newValue)
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Product Variations
      </Typography>

      {/* Main Select */}
      <FormControl fullWidth>
        <Autocomplete
          multiple
          freeSolo
          options={options}
          value={selectedValues}
          onChange={handleVariationChange}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
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
            <TextField {...params} label='Select or create variations' placeholder='Type to add or select...' />
          )}
        />
      </FormControl>

      {/* Variation Inputs */}
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
                <Grid item xs={12} md={12} key={field.id}>
                  <Box
                    sx={{
                      p: 2,
                      border: '1px solid #ddd',
                      borderRadius: 2,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      position: 'relative'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Typography variant='subtitle2'>{field.name}</Typography>
                      <IconButton aria-label='capture screenshot' color='error'>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </Box>

                    {/* Conditional Inputs */}
                    {fieldName === 'color' && (
                      <Controller
                        name={`variations.${index}.values`}
                        control={control}
                        render={({ field }) => <ColorPicker label='Choose Colors' />}
                      />
                    )}

                    {fieldName === 'size' && (
                      <Controller
                        name={`variations.${index}.values`}
                        control={control}
                        render={({ field }) => <SizeSelect label='Select Sizes' />}
                      />
                    )}

                    {fieldName !== 'color' && fieldName !== 'size' && (
                      <Controller
                        name={`variations.${index}.values`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label={`Enter ${fields[index].name} options (comma separated)`}
                            placeholder={`e.g. ${
                              fields[index].name.toLowerCase() === 'material'
                                ? 'Cotton, Silk, Denim'
                                : 'Option1, Option2'
                            }`}
                            value={(field.value || []).join(', ')}
                            onChange={e =>
                              field.onChange(
                                e.target.value
                                  .split(',')
                                  .map(v => v.trim())
                                  .filter(Boolean)
                              )
                            }
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
    </Box>
  )
}

export default MultiVariation

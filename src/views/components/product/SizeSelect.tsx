import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField, Chip, Box, createFilterOptions } from '@mui/material'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

interface SizeItemShape {
  label: string
  value: string
}

interface SizeSelectProps<T extends FieldValues = any> {
  label?: string
  options?: SizeItemShape[]
  error?: boolean
  helperText?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  setValue: UseFormSetValue<T>
  fieldName: string
}

const defaultSizes: SizeItemShape[] = [
  { label: 'XS', value: 'xs' },
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l' },
  { label: 'XL', value: 'xl' },
  { label: 'XXL', value: 'xxl' }
]

const filter = createFilterOptions<SizeItemShape>()

const SizeSelect: React.FC<SizeSelectProps> = ({
  label = 'Sizes',
  options = defaultSizes,
  error = false,
  helperText,
  required = false,
  disabled = false,
  placeholder = 'Select or create sizes...',
  setValue,
  fieldName
}) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedSizes, setSelectedSizes] = useState<SizeItemShape[]>([])
  const [customOptions, setCustomOptions] = useState<SizeItemShape[]>([])

  const handleFilterOptions = (opts: SizeItemShape[], params: any) => {
    const filtered = filter([...options, ...customOptions], params)
    const { inputValue } = params
    const isExisting = filtered.some(opt => inputValue === opt.label)

    if (inputValue !== '' && !isExisting) {
      filtered.push({
        label: `Add "${inputValue}"`,
        value: inputValue.toLowerCase().replace(/\s+/g, '-')
      })
    }

    return filtered
  }

  const handleSelect = (_event: any, newValue: SizeItemShape[]) => {
    // Detect newly added option (starts with Add “text”)
    const lastItem = newValue[newValue.length - 1]
    if (lastItem?.label.startsWith('Add "')) {
      const newLabel = lastItem.label.replace(/^Add\s"|"$/g, '')
      const newOption = { label: newLabel, value: newLabel.toLowerCase().replace(/\s+/g, '-') }
      setCustomOptions(prev => [...prev, newOption])
      setSelectedSizes(prev => [...prev, newOption])
    } else {
      setSelectedSizes(newValue)
    }
  }

  useEffect(() => {
    if (selectedSizes.length) {
      setValue(fieldName as any, selectedSizes, { shouldDirty: true, shouldValidate: true })
    }
  }, [selectedSizes, setValue, fieldName])

  return (
    <Box sx={{ mt: 3 }}>
      <Autocomplete
        multiple
        value={selectedSizes}
        onChange={handleSelect}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
        options={[...options, ...customOptions]}
        filterOptions={handleFilterOptions}
        getOptionLabel={option => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index })
            return <Chip key={key} variant='outlined' label={option.label} size='small' {...tagProps} />
          })
        }
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            placeholder={selectedSizes.length === 0 ? placeholder : ''}
            error={error}
            helperText={helperText}
            required={required}
            disabled={disabled}
          />
        )}
        renderOption={(props, option) => (
          <Box component='li' {...props}>
            {option.label}
          </Box>
        )}
        selectOnFocus
        clearOnBlur={false}
        handleHomeEndKeys
        disabled={disabled}
      />
    </Box>
  )
}

export default SizeSelect
export type { SizeItemShape, SizeSelectProps }

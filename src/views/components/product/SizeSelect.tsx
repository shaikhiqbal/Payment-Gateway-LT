import React, { useState } from 'react'
import { Autocomplete, TextField, Chip, Box, createFilterOptions } from '@mui/material'

interface SizeItem {
  label: string
  value: string
}

interface SizeSelectProps {
  label?: string
  options?: SizeItem[]
  error?: boolean
  helperText?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
}

const defaultSizes: SizeItem[] = [
  { label: 'XS', value: 'xs' },
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l' },
  { label: 'XL', value: 'xl' },
  { label: 'XXL', value: 'xxl' }
]

const filter = createFilterOptions<SizeItem>()

const SizeSelect: React.FC<SizeSelectProps> = ({
  label = 'Sizes',
  options = defaultSizes,
  error = false,
  helperText,
  required = false,
  disabled = false,
  placeholder = 'Select or create sizes...'
}) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedSizes, setSelectedSizes] = useState<SizeItem[]>([])
  const [customOptions, setCustomOptions] = useState<SizeItem[]>([])

  const handleChange = (_event: React.SyntheticEvent, newValue: SizeItem[]) => {
    setSelectedSizes(newValue)
  }

  const handleFilterOptions = (opts: SizeItem[], params: any) => {
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

  const handleSelect = (_event: any, newValue: SizeItem[]) => {
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

  return (
    <Box sx={{ mt: 3 }}>
      <Autocomplete
        multiple
        value={selectedSizes}
        onChange={handleSelect}
        size='small'
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
export type { SizeItem, SizeSelectProps }

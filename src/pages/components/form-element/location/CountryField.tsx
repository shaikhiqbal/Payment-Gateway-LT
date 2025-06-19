import React, { forwardRef } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete, { AutocompleteProps, createFilterOptions } from '@mui/material/Autocomplete'

// ** Data
import { countries } from 'src/@fake-db/autocomplete'

export interface CountryType {
  code: string
  label: string
  phone: string
}

// Props including everything Autocomplete needs, plus label and error helpers
type Props = Partial<AutocompleteProps<CountryType, false, false, false>> & {
  label?: string
  error?: boolean
  helperText?: React.ReactNode
  valueType: 'code' | 'label' | 'phone'
}

const filterOptions = createFilterOptions<CountryType>({
  stringify: option => `${option.label} ${option.code} ${option.phone}`
})

// ✅ Use forwardRef here!
const CountryField = forwardRef<HTMLDivElement, Props>(({ error, helperText, label, valueType, ...props }, ref) => {
  return (
    <Autocomplete
      autoHighlight
      id='autocomplete-country-select'
      options={countries as CountryType[]}
      getOptionLabel={option => {
        if (typeof option === 'string') return option
        return valueType == 'phone' ? `+${option[valueType]}` : option[valueType] || ''
      }}
      filterOptions={filterOptions}
      renderOption={(optionProps, option) => (
        <Box component='li' sx={{ '& > img': { mr: 4, flexShrink: 0 } }} {...optionProps}>
          <img
            alt=''
            width='20'
            loading='lazy'
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={params => {
        return (
          <TextField
            {...params}
            label={label ?? 'Choose a country'}
            error={error}
            helperText={helperText}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password'
            }}
          />
        )
      }}
      ref={ref}
      {...props}
    />
  )
})

CountryField.displayName = 'CountryField'

export default CountryField

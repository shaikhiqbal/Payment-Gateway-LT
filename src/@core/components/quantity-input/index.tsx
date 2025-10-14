import React from 'react'
import { Box, IconButton, TextField } from '@mui/material'

interface QuantityInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

const QuantityInput: React.FC<QuantityInputProps> = ({ value, onChange, min = 1, max = 99 }) => {
  const handleIncrease = () => {
    if (value < max) onChange(value + 1)
  }

  const handleDecrease = () => {
    if (value > min) onChange(value - 1)
  }

  return (
    <Box display='flex' alignItems='center'>
      <IconButton size='small' color='error' onClick={handleDecrease}>
        {/* <Remove fontSize='small' /> */}-
      </IconButton>

      <TextField
        value={value}
        type='number'
        size='small'
        variant='outlined'
        onChange={e => onChange(Number(e.target.value))}
        inputProps={{
          style: { textAlign: 'center', width: 50 },
          min,
          max
        }}
      />

      <IconButton size='small' color='primary' onClick={handleIncrease}>
        {/* <Add fontSize='small' /> */}+
      </IconButton>
    </Box>
  )
}

export default QuantityInput

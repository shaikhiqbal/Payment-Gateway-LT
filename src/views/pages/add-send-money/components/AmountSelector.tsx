// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'

// ** Motion Imports
import { motion } from 'motion/react'

interface AmountSelectorProps {
  presetAmounts: number[]
  selectedAmount: number | null
  customAmount: string
  currency: string
  onAmountSelect: (amount: number) => void
  onCustomAmountChange: (value: string) => void
}

const AmountSelector = ({
  presetAmounts,
  selectedAmount,
  customAmount,
  currency,
  onAmountSelect,
  onCustomAmountChange
}: AmountSelectorProps) => {
  const theme = useTheme()

  const handleCustomAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onCustomAmountChange(value)
    }
  }

  const isPresetSelected = (amount: number) => {
    return selectedAmount === amount && !customAmount
  }

  return (
    <Box>
      {/* Preset Amount Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {presetAmounts.map((amount) => (
          <motion.div
            key={amount}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <Button
              variant={isPresetSelected(amount) ? 'contained' : 'outlined'}
              onClick={() => onAmountSelect(amount)}
              sx={{
                minWidth: 80,
                py: 1.5,
                px: 3,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                ...(isPresetSelected(amount) && {
                  transform: 'scale(1.05)',
                  boxShadow: theme.shadows[4]
                })
              }}
            >
              {currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£'}{amount}
            </Button>
          </motion.div>
        ))}
      </Box>

      {/* Custom Amount Input */}
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <TextField
          fullWidth
          label="Custom Amount"
          value={customAmount}
          onChange={handleCustomAmountChange}
          placeholder="Enter amount"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£'}
              </InputAdornment>
            )
          }}
          sx={{
            maxWidth: 300,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&.Mui-focused': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease'
              }
            }
          }}
        />
      </motion.div>
    </Box>
  )
}

export default AmountSelector
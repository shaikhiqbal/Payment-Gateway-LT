import React, { useState } from 'react'

// ** MUI Imports
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** React Hook Form
import { Controller, useFormContext } from 'react-hook-form'

type ActiveStepType = 1 | 2 | 3

const ExtraInformation = () => {
  const [active, setActive] = useState<ActiveStepType>(1)

  const { control } = useFormContext()

  const renderInputSection = () => {
    switch (active) {
      // -------------------- STEP 1 --------------------
      case 1:
        return (
          <FormControl fullWidth>
            {/* Add Notes Input Section */}
            <Controller
              name='notes'
              control={control}
              render={({ field }) => <TextField {...field} label='Notes' size='small' multiline rows={4} />}
            />
          </FormControl>
        )

      // -------------------- STEP 2 --------------------
      case 2:
        return (
          <FormControl fullWidth>
            {/* Add Notes & Conditions Input Section */}
            <Controller
              name='termsCondition'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Terms & Conditions' multiline size='small' rows={4} />
              )}
            />
          </FormControl>
        )

      // -------------------- STEP 3 --------------------
      case 3:
        return (
          <FormControl fullWidth>
            {/* Bank Details Input Section */}
            <InputLabel id='bank-select-label'>Bank Details</InputLabel>

            <Controller
              name='bankDetails'
              control={control}
              render={({ field }) => (
                <Select {...field} labelId='bank-select-label' size='small' label='Bank Details'>
                  <MenuItem value='menu4'>Menu 4</MenuItem>
                  <MenuItem value='usbank'>US Bank</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        )

      default:
        return null
    }
  }

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 4, fontWeight: 'bold' }}>
        Extra Information
      </Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Button 1 */}
        <Button
          size='small'
          variant={active === 1 ? 'contained' : 'outlined'}
          color={active === 1 ? 'primary' : 'secondary'}
          onClick={() => setActive(1)}
          startIcon={<Icon icon='iconamoon:invoice-duotone' />}
        >
          Add Notes
        </Button>

        {/* Button 2 */}
        <Button
          size='small'
          variant={active === 2 ? 'contained' : 'outlined'}
          color={active === 2 ? 'primary' : 'secondary'}
          onClick={() => setActive(2)}
          startIcon={<Icon icon='iconamoon:invoice-duotone' />}
        >
          Add Notes & Conditions
        </Button>

        {/* Button 3 */}
        <Button
          size='small'
          variant={active === 3 ? 'contained' : 'outlined'}
          color={active === 3 ? 'primary' : 'secondary'}
          onClick={() => setActive(3)}
          startIcon={<Icon icon='mdi:bank-outline' />}
        >
          Bank Details
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>{renderInputSection()}</Box>
    </Box>
  )
}

export default ExtraInformation

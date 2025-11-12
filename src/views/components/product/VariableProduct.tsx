// components/VariableProduct.tsx
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Button, Checkbox, Snackbar, Alert, Typography } from '@mui/material'

// ** Component Imports
import { AddSize, ColorPicker } from './VariationOptionDialog'

export default function VariableProduct(): JSX.Element {
  // ** State
  const [colorModalOpen, setColorModalOpen] = useState(false)
  const [sizeModalOpen, setSizeModalOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // const [selectedVariation, setSelectedVariation] = useState<{ label: string; value: string }[]>([])

  const onSaveVariation = (list: { label: string; value: string }[]) => {
    console.log('onSaveVariation', list)

    // setSelectedVariation(list)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h6' sx={{ mb: 1 }}>
          Variant Options
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box>
            <Checkbox checked={colorModalOpen} onChange={e => setColorModalOpen(e.target.checked)} />
            <Typography component='span'>Color</Typography>
          </Box>

          <Box>
            <Checkbox checked={sizeModalOpen} onChange={e => setSizeModalOpen(e.target.checked)} />
            <Typography component='span'>Size</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type='submit' variant='contained' size='large'>
          Save Product
        </Button>

        <Button
          variant='outlined'
          onClick={() => {
            // Cleanup object URLs before reset
          }}
        >
          Reset Variants
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity='success' sx={{ width: '100%' }}>
          Product saved successfully!
        </Alert>
      </Snackbar>

      {/* Color Picker Dialog */}
      <ColorPicker
        open={colorModalOpen}
        onClose={() => {
          setSnackbarOpen(true)
          setColorModalOpen(false)
        }}
        onSave={onSaveVariation}
      />
      {/* Add Size Dialog */}
      <AddSize
        open={sizeModalOpen}
        onClose={() => {
          setSizeModalOpen(false)
          setSnackbarOpen(true)
        }}
        onSave={onSaveVariation}
      />
    </Box>
  )
}

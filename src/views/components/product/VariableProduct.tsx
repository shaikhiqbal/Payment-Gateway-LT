// components/VariableProduct.tsx
import React, { useEffect, useState, useCallback } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Box, Button, Checkbox, TextField, Snackbar, Alert, Typography, Grid } from '@mui/material'

import { styled, useTheme } from '@mui/material/styles'
import { AddSize, ColorPicker } from './VariationOptionDialog'

interface VariationData {
  img?: File | null
  imagePreview?: string | null
  sku: string
  buying_price: string
  selling_price: string
  discount: string
  qty: string
  minimum_quantity: string
  weight: string
  weightUnit: string
  gtin: string
  name: string
  parentName: string
}

type ColorOption = { label: string; value: string } | string

type FormData = {
  productName: string
  sku: string
  price: number
  colors: { label: string; value: string }[]
  sizes: string[]
  variants: VariationData[]
}

const schema = yup.object({
  productName: yup.string().required('Product name is required'),
  sku: yup.string().required('SKU is required'),
  price: yup.number().typeError('Price must be a number').positive('Price must be > 0').required('Price is required'),
  // Accept array of objects with value hex string
  colors: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required(),
        value: yup
          .string()
          .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Invalid color code')
          .required()
      })
    )
    .optional(),
  sizes: yup.array().of(yup.string()).optional()
})

export default function VariableProduct(): JSX.Element {
  const [colorModalOpen, setColorModalOpen] = useState(false)
  const [sizeModalOpen, setSizeModalOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [selectedVariation, setSelectedVariation] = useState<{ label: string; value: string }[]>([])

  const onSaveVariation = (list: { label: string; value: string }[]) => {
    console.log('onSaveVariation')
    setSelectedVariation(list)
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

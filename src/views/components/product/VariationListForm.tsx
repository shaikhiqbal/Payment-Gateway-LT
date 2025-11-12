import React from 'react'
import { Card, Grid, TextField, Box, Typography, Stack, InputAdornment, alpha } from '@mui/material'
import { Controller, useFieldArray, Control, UseFormWatch } from 'react-hook-form'
import ProductOverview from './ProductOverview'
import ImageUploader from './ImageUploader'
import type { ProductFormData } from 'src/pages/products/create-product'

interface VariantFormProps {
  control: Control<ProductFormData>
  watch: UseFormWatch<ProductFormData>
}

const VariantForm = ({ control, watch }: VariantFormProps) => {
  const { fields } = useFieldArray({
    control,
    name: 'variants'
  })

  if (!fields.length) return null

  console.clear()
  console.log(fields)

  return (
    <Stack spacing={3}>
      {fields.map((field, index) => (
        <Card
          key={field.id}
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: theme => `0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`
            }
          }}
        >
          <Grid container>
            {/* Left Section - Product Preview */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                bgcolor: theme => alpha(theme.palette.primary.main, 0.02),
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRight: theme => ({ md: `1px dashed ${theme.palette.divider}` }),
                borderBottom: { xs: '1px solid', md: 'none' },
                borderColor: 'divider'
              }}
            >
              <ProductOverview ImageUploader={<ImageUploader />} watch={watch} />
            </Grid>

            {/* Right Section - Form Fields */}
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 3 }}>
                {/* Pricing Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant='overline'
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      letterSpacing: 1,
                      mb: 2,
                      display: 'block'
                    }}
                  >
                    Pricing
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name={`variants.${index}.buyingPrice`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size='small'
                            type='number'
                            label='Buying Price'
                            fullWidth
                            InputProps={{
                              startAdornment: <InputAdornment position='start'>$</InputAdornment>
                            }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Controller
                        name={`variants.${index}.sellingPrice`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size='small'
                            type='number'
                            label='Selling Price'
                            fullWidth
                            InputProps={{
                              startAdornment: <InputAdornment position='start'>$</InputAdornment>
                            }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Controller
                        name={`variants.${index}.discountPrice`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size='small'
                            type='number'
                            label='Discount Price'
                            fullWidth
                            InputProps={{
                              startAdornment: <InputAdornment position='start'>$</InputAdornment>
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Inventory Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant='overline'
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      letterSpacing: 1,
                      mb: 2,
                      display: 'block'
                    }}
                  >
                    Inventory
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name={`variants.${index}.quantity`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size='small'
                            type='number'
                            label='Available Quantity'
                            fullWidth
                            InputProps={{
                              endAdornment: <InputAdornment position='end'>units</InputAdornment>
                            }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name={`variants.${index}.alertQuantity`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size='small'
                            type='number'
                            label='Low Stock Alert'
                            fullWidth
                            InputProps={{
                              endAdornment: <InputAdornment position='end'>units</InputAdornment>
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Product Details Section */}
                <Box>
                  <Typography
                    variant='overline'
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      letterSpacing: 1,
                      mb: 2,
                      display: 'block'
                    }}
                  >
                    Product Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name={`variants.${index}.weight`}
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} size='small' label='Weight' fullWidth placeholder='e.g., 0.5 kg' />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name={`variants.${index}.gtin`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size='small'
                            label='GTIN / Barcode'
                            fullWidth
                            placeholder='Global Trade Item Number'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Stack>
  )
}

export default VariantForm

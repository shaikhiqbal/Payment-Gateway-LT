// import React, { Fragment } from 'react'
// import { Box, Grid, TextField, Typography, Divider, Paper, Chip, Card } from '@mui/material'
// import { useForm, Controller, useFieldArray, Control } from 'react-hook-form'
// import { ProductFormData } from 'src/pages/products/create-product'
// import ImageUploader from './ImageUploader'
// import ProductOverview from './ProductOverview'

// // ✅ Types
// interface LabelValue {
//   label: string
//   value: string
// }

// interface Variant {
//   key: string
//   name: string
//   sku: string
//   buyingPrice: number
//   sellingPrice: number
//   discountPrice: number
//   quantity: number
//   alertQuantity: number
//   weight: string
//   gtin: string
//   variantName: {
//     Color?: LabelValue[]
//     Style?: string[]
//     Size?: LabelValue[]
//   }
// }
// interface VariantFormProps {
//   control: Control<ProductFormData>
// }
// const VariantForm = ({ control }: VariantFormProps) => {
//   const { fields } = useFieldArray({
//     control,
//     name: 'variants'
//   })

//   if (!fields.length) return null

//   return (
//     <Card sx={{ p: 3, mx: 'auto' }}>
//       <Grid container spacing={2}>
//         {fields.map((field, index) => (
//           <Grid item xs={12} key={field.id} sx={{ mb: 3 }}>
//             <Grid container spacing={2}>
//               {/* Variation Info */}
//               <Grid item xs={12} md={4}>
//                 {/* <ImageUploader /> */}
//                 <ProductOverview ImageUploader={<ImageUploader />} />
//               </Grid>
//               {/* Editable Fields */}
//               <Grid item xs={12} md={8}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <Controller
//                       name={`variants.${index}.buyingPrice`}
//                       control={control}
//                       render={({ field }) => (
//                         <TextField {...field} size='small' type='number' label='Buying Price' fullWidth />
//                       )}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6} md={4}>
//                     <Controller
//                       name={`variants.${index}.sellingPrice`}
//                       control={control}
//                       render={({ field }) => (
//                         <TextField {...field} size='small' type='number' label='Selling Price' fullWidth />
//                       )}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6} md={4}>
//                     <Controller
//                       name={`variants.${index}.discountPrice`}
//                       control={control}
//                       render={({ field }) => (
//                         <TextField {...field} size='small' type='number' label='Discount Price' fullWidth />
//                       )}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6} md={4}>
//                     <Controller
//                       name={`variants.${index}.quantity`}
//                       control={control}
//                       render={({ field }) => (
//                         <TextField {...field} size='small' type='number' label='Quantity' fullWidth />
//                       )}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6} md={4}>
//                     <Controller
//                       name={`variants.${index}.alertQuantity`}
//                       control={control}
//                       render={({ field }) => (
//                         <TextField {...field} size='small' type='number' label='Alert Qty' fullWidth />
//                       )}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6} md={4}>
//                     <Controller
//                       name={`variants.${index}.weight`}
//                       control={control}
//                       render={({ field }) => <TextField {...field} size='small' label='Weight' fullWidth />}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6} md={4}>
//                     <Controller
//                       name={`variants.${index}.gtin`}
//                       control={control}
//                       render={({ field }) => <TextField {...field} size='small' label='GTIN' fullWidth />}
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         ))}
//       </Grid>
//     </Card>
//   )
// }

// export default VariantForm

import React from 'react'
import { Card, Grid, TextField, Divider, Box } from '@mui/material'
import { Controller, useFieldArray, Control } from 'react-hook-form'
import ProductOverview from './ProductOverview'
import ImageUploader from './ImageUploader'
import type { ProductFormData } from 'src/pages/products/create-product'

interface VariantFormProps {
  control: Control<ProductFormData>
}

const VariantForm = ({ control }: VariantFormProps) => {
  const { fields } = useFieldArray({
    control,
    name: 'variants'
  })

  if (!fields.length) return null

  return (
    <Grid container spacing={2}>
      {fields.map((field, index) => (
        <Card sx={{ p: 3, mx: 'auto', maxWidth: 1200, mb: 2 }}>
          <Grid item xs={12} key={field.id} sx={{ mb: 4 }}>
            <Grid
              container
              spacing={0}
              alignItems='stretch'
              sx={{
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              {/* Left: Product Overview */}
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <ProductOverview ImageUploader={<ImageUploader />} />
              </Grid>

              {/* Vertical Divider */}
              <Grid
                item
                xs={12}
                md='auto'
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'stretch'
                }}
              >
                <Divider
                  orientation='vertical'
                  flexItem
                  sx={{
                    width: '1px',
                    // backgroundColor: '#e0e0e0',
                    mx: 1
                  }}
                />
              </Grid>

              {/* Right: Form Fields */}
              <Grid
                item
                xs={12}
                md
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name={`variants.${index}.buyingPrice`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} size='small' type='number' label='Buying Price' fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name={`variants.${index}.sellingPrice`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} size='small' type='number' label='Selling Price' fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name={`variants.${index}.discountPrice`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} size='small' type='number' label='Discount Price' fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name={`variants.${index}.quantity`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} size='small' type='number' label='Quantity' fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name={`variants.${index}.alertQuantity`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} size='small' type='number' label='Alert Qty' fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name={`variants.${index}.weight`}
                      control={control}
                      render={({ field }) => <TextField {...field} size='small' label='Weight' fullWidth />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name={`variants.${index}.gtin`}
                      control={control}
                      render={({ field }) => <TextField {...field} size='small' label='GTIN' fullWidth />}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Grid>
  )
}

export default VariantForm

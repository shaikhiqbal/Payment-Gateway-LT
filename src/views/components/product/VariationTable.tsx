import React, { Fragment, useEffect, useState } from 'react'
import { useFieldArray, Controller } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Avatar,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Box
} from '@mui/material'
// import { Delete } from '@mui/icons-material'

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

interface VariationSelected {
  optionName: string
  optionValues: string[]
}

interface VariationTableProps {
  control: any
  watch: any
  //   handleToggle: (key: string) => void
  variationSelected: VariationSelected[]
}

const defaultVal: Partial<VariationData> = {
  buying_price: '1000',
  selling_price: '1000',
  discount: '100',
  sku: '',
  qty: '1',
  minimum_quantity: '1',
  weight: '',
  weightUnit: 'kg',
  gtin: ''
}

const unitList = ['kg', 'g', 'ltr', 'ml']

export default function VariationTable({ control, watch, variationSelected }: VariationTableProps) {
  const {
    fields: variationFields,
    append,
    remove
  } = useFieldArray({
    name: 'variations',
    control
  })

  const handleFileChange = (index: number, file: File | null) => {
    if (file) {
      const preview = URL.createObjectURL(file)
      const current = watch('variations')[index]
      const updated = { ...current, img: file, imagePreview: preview }

      const newVariations = [...watch('variations')]
      newVariations[index] = updated
      // Update form value here based on your form library setup
    }
  }

  useEffect(() => {
    if (variationSelected?.length > 0) {
      //   handleVariationList(variationSelected)
    }
  }, [variationSelected])

  const variations = watch('variations')

  return (
    <Card>
      <CardHeader title='Variants' subheader='Manage your stock levels seamlessly to keep up with customer demand.' />

      {variations?.length ? (
        <Fragment>
          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button
              variant='outlined'
              //   startIcon={<Edit />}
              onClick={() => handleToggle('v')}
            >
              Edit
            </Button>
          </Box> */}

          <TableContainer sx={{ overflowX: 'auto', maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 300 }}>Variants</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>SKU ID</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Buying Price</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Selling Price</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Discount Price</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Quantity</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Alert Quantity</TableCell>
                  <TableCell sx={{ minWidth: 200 }}>Weight</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>GTIN</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {variationFields.map((field, index) => {
                  const variation = variations[index]

                  return (
                    <TableRow key={field.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Controller
                            name={`variations.${index}.img`}
                            control={control}
                            rules={{ required: 'Upload Image' }}
                            render={({ field: imgField, fieldState }) => (
                              <Box>
                                <input
                                  accept='image/*'
                                  style={{ display: 'none' }}
                                  id={`image-upload-${index}`}
                                  type='file'
                                  onChange={e => {
                                    const file = e.target.files?.[0] || null
                                    imgField.onChange(file)
                                    handleFileChange(index, file)
                                  }}
                                />
                                <label htmlFor={`image-upload-${index}`}>
                                  {/* <Avatar
                                    sx={{ width: 64, height: 64, cursor: 'pointer' }}
                                    variant="square"
                                    src={variation?.imagePreview}
                                  >
                                    <PhotoCamera />
                                  </Avatar> */}
                                </label>
                                {fieldState?.error && (
                                  <Typography variant='caption' color='error'>
                                    {fieldState.error.message}
                                  </Typography>
                                )}
                              </Box>
                            )}
                          />
                          <Typography variant='body2' fontWeight='bold'>
                            {variation?.name || ''}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`variations.${index}.sku`}
                          control={control}
                          rules={{ required: 'This field is required' }}
                          render={({ field, fieldState }) => (
                            <Box>
                              <TextField {...field} size='small' fullWidth error={!!fieldState?.error} />
                              {fieldState?.error && (
                                <Typography variant='caption' color='error'>
                                  {fieldState.error.message}
                                </Typography>
                              )}
                            </Box>
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`variations.${index}.buying_price`}
                          control={control}
                          rules={{ required: 'This field is required' }}
                          render={({ field, fieldState }) => (
                            <Box>
                              <TextField
                                {...field}
                                size='small'
                                fullWidth
                                InputProps={{
                                  startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                                }}
                                error={!!fieldState?.error}
                              />
                              {fieldState?.error && (
                                <Typography variant='caption' color='error'>
                                  {fieldState.error.message}
                                </Typography>
                              )}
                            </Box>
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`variations.${index}.selling_price`}
                          control={control}
                          rules={{ required: 'This field is required' }}
                          render={({ field, fieldState }) => (
                            <Box>
                              <TextField
                                {...field}
                                size='small'
                                fullWidth
                                InputProps={{
                                  startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                                }}
                                error={!!fieldState?.error}
                              />
                              {fieldState?.error && (
                                <Typography variant='caption' color='error'>
                                  {fieldState.error.message}
                                </Typography>
                              )}
                            </Box>
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`variations.${index}.discount`}
                          control={control}
                          rules={{ required: 'This field is required' }}
                          render={({ field, fieldState }) => (
                            <Box>
                              <TextField
                                {...field}
                                size='small'
                                fullWidth
                                InputProps={{
                                  startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                                }}
                                error={!!fieldState?.error}
                              />
                              {fieldState?.error && (
                                <Typography variant='caption' color='error'>
                                  {fieldState.error.message}
                                </Typography>
                              )}
                            </Box>
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`variations.${index}.qty`}
                          control={control}
                          rules={{ required: 'This field is required' }}
                          render={({ field, fieldState }) => (
                            <Box>
                              <TextField
                                {...field}
                                size='small'
                                fullWidth
                                InputProps={{
                                  endAdornment: <InputAdornment position='end'>PCS</InputAdornment>
                                }}
                                error={!!fieldState?.error}
                              />
                              {fieldState?.error && (
                                <Typography variant='caption' color='error'>
                                  {fieldState.error.message}
                                </Typography>
                              )}
                            </Box>
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`variations.${index}.minimum_quantity`}
                          control={control}
                          rules={{ required: 'This field is required' }}
                          render={({ field, fieldState }) => (
                            <Box>
                              <TextField
                                {...field}
                                size='small'
                                fullWidth
                                InputProps={{
                                  endAdornment: <InputAdornment position='end'>PCS</InputAdornment>
                                }}
                                error={!!fieldState?.error}
                              />
                              {fieldState?.error && (
                                <Typography variant='caption' color='error'>
                                  {fieldState.error.message}
                                </Typography>
                              )}
                            </Box>
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Controller
                            name={`variations.${index}.weight`}
                            control={control}
                            rules={{ required: 'This field is required' }}
                            render={({ field, fieldState }) => (
                              <Box sx={{ flex: 1 }}>
                                <TextField {...field} size='small' fullWidth error={!!fieldState?.error} />
                                {fieldState?.error && (
                                  <Typography variant='caption' color='error'>
                                    {fieldState.error.message}
                                  </Typography>
                                )}
                              </Box>
                            )}
                          />
                          <Controller
                            name={`variations.${index}.weightUnit`}
                            control={control}
                            render={({ field }) => (
                              <FormControl size='small' sx={{ minWidth: 80 }}>
                                <Select {...field} defaultValue='kg'>
                                  {unitList.map(unit => (
                                    <MenuItem key={unit} value={unit}>
                                      {unit}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          />
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Controller
                          name={`variations.${index}.gtin`}
                          control={control}
                          rules={{ required: 'This field is required' }}
                          render={({ field, fieldState }) => (
                            <Box>
                              <TextField {...field} size='small' fullWidth error={!!fieldState?.error} />
                              {fieldState?.error && (
                                <Typography variant='caption' color='error'>
                                  {fieldState.error.message}
                                </Typography>
                              )}
                            </Box>
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <IconButton color='error' onClick={() => remove(index)}>
                          {/* <Delete /> */}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      ) : (
        <CardContent>
          <Button variant='outlined' size='small'>
            Add Variation
          </Button>
        </CardContent>
      )}
    </Card>
  )
}

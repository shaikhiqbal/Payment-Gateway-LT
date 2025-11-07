import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  InputAdornment
} from '@mui/material'

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

//**  Form data interface
interface ProductFormData {
  store: string
  warehouse: string
  productName: string
  slug: string
  sku: string
  sellingType: string
  category: string
  subCategory: string
  brand: string
  unit: string
  barcodeSymbology: string
  itemCode: string
  description: string
}

// Props interface (if you need to pass any props)
interface ProductFormProps {
  onSubmit?: (data: ProductFormData) => void
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit: externalOnSubmit }) => {
  const [expanded, setExpanded] = useState<boolean>(true)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProductFormData>({
    defaultValues: {
      store: '',
      warehouse: '',
      productName: '',
      slug: '',
      sku: '',
      sellingType: '',
      category: '',
      subCategory: '',
      brand: '',
      unit: '',
      barcodeSymbology: '',
      itemCode: '',
      description: ''
    }
  })

  const onSubmit: SubmitHandler<ProductFormData> = data => {
    console.log('Form Data:', data)
    if (externalOnSubmit) {
      externalOnSubmit(data)
    }
  }

  const generateSKU = (): void => {
    const randomSKU = 'SKU-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    setValue('sku', randomSKU)
  }

  const generateItemCode = (): void => {
    const randomCode = 'ITEM-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    setValue('itemCode', randomCode)
  }

  // Mock options for selects
  const stores: string[] = ['Store 1', 'Store 2', 'Store 3']
  const warehouses: string[] = ['Warehouse A', 'Warehouse B', 'Warehouse C']
  const sellingTypes: string[] = ['Retail', 'Wholesale', 'Both']
  const categories: string[] = ['Electronics', 'Clothing', 'Food']
  const subCategories: string[] = ['Smartphones', 'Laptops', 'Accessories']
  const brands: string[] = ['Brand A', 'Brand B', 'Brand C']
  const units: string[] = ['Piece', 'Box', 'Kg', 'Liter']
  const barcodeTypes: string[] = ['CODE128', 'EAN13', 'UPC', 'QR Code']

  return (
    <Box sx={{ p: 3, mx: 'auto' }}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<Icon icon='tabler:trash' fontSize='inherit' />}>
          <Typography variant='h6'>Product Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Store */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='store'
                  control={control}
                  rules={{ required: 'Store is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.store}>
                      <InputLabel>Store *</InputLabel>
                      <Select {...field} label='Store *'>
                        <MenuItem value=''>Choose</MenuItem>
                        {stores.map(store => (
                          <MenuItem key={store} value={store}>
                            {store}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.store && <FormHelperText>{errors.store.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Warehouse */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='warehouse'
                  control={control}
                  rules={{ required: 'Warehouse is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.warehouse}>
                      <InputLabel>Warehouse *</InputLabel>
                      <Select {...field} label='Warehouse *'>
                        <MenuItem value=''>Choose</MenuItem>
                        {warehouses.map(warehouse => (
                          <MenuItem key={warehouse} value={warehouse}>
                            {warehouse}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.warehouse && <FormHelperText>{errors.warehouse.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Product Name */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='productName'
                  control={control}
                  rules={{
                    required: 'Product name is required',
                    minLength: { value: 3, message: 'Minimum 3 characters required' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Product Name'
                      required
                      error={!!errors.productName}
                      helperText={errors.productName?.message}
                    />
                  )}
                />
              </Grid>

              {/* Slug */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='slug'
                  control={control}
                  rules={{
                    required: 'Slug is required',
                    pattern: {
                      value: /^[a-z0-9-]+$/,
                      message: 'Slug must be lowercase with hyphens only'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Slug'
                      required
                      error={!!errors.slug}
                      helperText={errors.slug?.message}
                    />
                  )}
                />
              </Grid>

              {/* SKU with Generate Button */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='sku'
                  control={control}
                  rules={{ required: 'SKU is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='SKU'
                      required
                      error={!!errors.sku}
                      helperText={errors.sku?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Button variant='contained' size='small' onClick={generateSKU} type='button'>
                              Generate
                            </Button>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Selling Type */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='sellingType'
                  control={control}
                  rules={{ required: 'Selling type is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.sellingType}>
                      <InputLabel>Selling Type *</InputLabel>
                      <Select {...field} label='Selling Type *'>
                        <MenuItem value=''>Choose</MenuItem>
                        {sellingTypes.map(type => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.sellingType && <FormHelperText>{errors.sellingType.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Controller
                    name='category'
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.category}>
                        <InputLabel>Category *</InputLabel>
                        <Select {...field} label='Category *'>
                          <MenuItem value=''>Choose</MenuItem>
                          {categories.map(cat => (
                            <MenuItem key={cat} value={cat}>
                              {cat}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                  <IconButton color='primary' sx={{ flexShrink: 0 }}>
                    <Icon icon='tabler:trash' fontSize='inherit' />
                  </IconButton>
                </Box>
              </Grid>

              {/* Sub Category */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='subCategory'
                  control={control}
                  rules={{ required: 'Sub category is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.subCategory}>
                      <InputLabel>Sub Category *</InputLabel>
                      <Select {...field} label='Sub Category *'>
                        <MenuItem value=''>Choose</MenuItem>
                        {subCategories.map(subCat => (
                          <MenuItem key={subCat} value={subCat}>
                            {subCat}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.subCategory && <FormHelperText>{errors.subCategory.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Brand */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='brand'
                  control={control}
                  rules={{ required: 'Brand is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.brand}>
                      <InputLabel>Brand *</InputLabel>
                      <Select {...field} label='Brand *'>
                        <MenuItem value=''>Choose</MenuItem>
                        {brands.map(brand => (
                          <MenuItem key={brand} value={brand}>
                            {brand}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.brand && <FormHelperText>{errors.brand.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Unit */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='unit'
                  control={control}
                  rules={{ required: 'Unit is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.unit}>
                      <InputLabel>Unit *</InputLabel>
                      <Select {...field} label='Unit *'>
                        <MenuItem value=''>Choose</MenuItem>
                        {units.map(unit => (
                          <MenuItem key={unit} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.unit && <FormHelperText>{errors.unit.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Barcode Symbology */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='barcodeSymbology'
                  control={control}
                  rules={{ required: 'Barcode symbology is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.barcodeSymbology}>
                      <InputLabel>Barcode Symbology *</InputLabel>
                      <Select {...field} label='Barcode Symbology *'>
                        <MenuItem value=''>Choose</MenuItem>
                        {barcodeTypes.map(type => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.barcodeSymbology && <FormHelperText>{errors.barcodeSymbology.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Item Code with Generate Button */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='itemCode'
                  control={control}
                  rules={{ required: 'Item code is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Item Code'
                      required
                      error={!!errors.itemCode}
                      helperText={errors.itemCode?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Button variant='contained' size='small' onClick={generateItemCode} type='button'>
                              Generate
                            </Button>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <Controller
                  name='description'
                  control={control}
                  rules={{
                    maxLength: {
                      value: 300,
                      message: 'Maximum 60 words allowed'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Description'
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message || 'Maximum 60 Words'}
                    />
                  )}
                />
              </Grid>

              {/* Submit Button */}
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default ProductForm

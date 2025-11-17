import React, { useEffect, useState } from 'react'

// ** MUI Imports
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  Grid,
  InputAdornment,
  Autocomplete,
  Card,
  CardContent,
  CardHeader
} from '@mui/material'

// ** React Hook Form Imports
import { Controller, Control, FieldErrorsImpl, UseFormSetValue, UseFormWatch } from 'react-hook-form'

// ** Redux Imports
import { RootState } from 'src/store'
import { useSelector } from 'react-redux'

// ** Components
import CreateCategory from '../categories/CreateCategory'

// ** Types Imports
import { LabelValue } from 'src/pages/products/create-product'

// ✅ Form Data Interface (same as before)
export interface ProductFormData {
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
  variants: any[]
}

interface VariationField {
  name: string
  values: string[] | LabelValue[]
}

interface ProductFormProps {
  control: Control<ProductFormData>
  setValue: UseFormSetValue<ProductFormData>
  errors: FieldErrorsImpl<ProductFormData>
  watch: UseFormWatch<ProductFormData>
}

const ProductForm: React.FC<ProductFormProps> = ({ control, setValue, errors, watch }) => {
  // ** States
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false)

  const handleToggle = () => {
    setOpenCategoryModal(!openCategoryModal)
  }

  // ** Mock options for selects

  const subCategories: string[] = ['Smartphones', 'Laptops', 'Accessories']
  const brands: string[] = ['Brand A', 'Brand B', 'Brand C']
  const barcodeTypes: string[] = ['CODE128', 'EAN13', 'UPC', 'QR Code']

  // ** Redux States
  const categories = useSelector((state: RootState) => state.categories.categories)

  // ** SKU & Item Code Generators
  const generateSKU = (): void => {
    const randomSKU = 'SKU-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    setValue('sku', randomSKU)
  }

  const generateItemCode = (): void => {
    const randomCode = 'ITEM-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    setValue('itemCode', randomCode)
  }

  function generateCombinations(variations: VariationField[]): Record<string, string>[] {
    return variations.reduce<Record<string, string>[]>(
      (acc, variation) => {
        const temp: Record<string, string>[] = []
        const values =
          typeof variation.values[0] === 'object'
            ? (variation.values as LabelValue[]).map(v => v.value)
            : (variation.values as string[])
        acc.forEach(a => {
          values.forEach(v => {
            if (v) temp.push({ ...a, [variation.name]: v })
          })
        })
        return temp
      },
      [{}]
    )
  }

  const categoryValue = watch('category')

  useEffect(() => {
    if (!categoryValue) return
    const findedCategory = categories.find(cat => cat.slug === categoryValue)
    if (findedCategory) {
      setValue(
        'variants',
        generateCombinations(findedCategory.variations).map(variantNames => ({ variantNames }))
      )
    }
  }, [categoryValue, categories, setValue])

  return (
    <Card sx={{ p: 3, mx: 'auto' }}>
      <CardHeader title='Product Information' sx={{ mb: 0 }} />
      <CardContent>
        <Grid container spacing={3}>
          {/* Store */}

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

          {/* SKU */}
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

          {/* Category */}
          <Grid item xs={12} sm={6}>
            <Controller
              name='category'
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                  fullWidth
                  options={[{ name: '➕ Add New Category', slug: 'new' }, ...categories]}
                  getOptionLabel={option =>
                    typeof option === 'string' ? option : option.slug === 'new' ? option.name : option.name
                  }
                  value={typeof value === 'string' ? categories.find(cat => cat.slug === value) || null : value || null}
                  onChange={(_, newValue) => {
                    if (newValue?.slug === 'new') {
                      handleToggle()
                      return
                    }
                    onChange(newValue ? newValue.slug : '')
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Category *'
                      placeholder='Search or select category'
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                  isOptionEqualToValue={(option, val) => option.slug === val.slug}
                />
              )}
            />
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
                  <FormHelperText>{errors.subCategory?.message}</FormHelperText>
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
                  <FormHelperText>{errors.brand?.message}</FormHelperText>
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
                  <FormHelperText>{errors.barcodeSymbology?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          {/* Item Code */}
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
                maxLength: { value: 300, message: 'Maximum 300 characters allowed' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  label='Description'
                  error={!!errors.description}
                  helperText={errors.description?.message || 'Maximum 60 Words'}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>

      <CreateCategory show={openCategoryModal} setShow={handleToggle} />
    </Card>
  )
}

export default ProductForm

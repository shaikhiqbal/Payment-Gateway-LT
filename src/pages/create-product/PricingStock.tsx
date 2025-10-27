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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  IconButton
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Form data interface
interface PricingStocksFormData {
  productType: 'single' | 'variable'
  // Single Product fields
  quantity?: number
  price?: number
  taxType?: string
  discountType?: string
  discountValue?: number
  quantityAlert?: number
  // Variable Product fields
  variantAttribute?: string
  variantColor?: string
}

// Props interface
interface PricingStocksFormProps {
  onSubmit?: (data: PricingStocksFormData) => void
}

const PricingStocksForm: React.FC<PricingStocksFormProps> = ({ onSubmit: externalOnSubmit }) => {
  const [expanded, setExpanded] = useState<boolean>(true)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PricingStocksFormData>({
    defaultValues: {
      productType: 'single',
      quantity: undefined,
      price: undefined,
      taxType: '',
      discountType: '',
      discountValue: undefined,
      quantityAlert: undefined,
      variantAttribute: '',
      variantColor: ''
    }
  })

  // Watch product type to conditionally render fields
  const productType = watch('productType')

  const onSubmit: SubmitHandler<PricingStocksFormData> = data => {
    console.log('Pricing & Stocks Data:', data)
    if (externalOnSubmit) {
      externalOnSubmit(data)
    }
  }

  // Mock options for selects
  const taxTypes: string[] = ['Exclusive', 'Inclusive', 'No Tax']
  const discountTypes: string[] = ['Percentage', 'Fixed']
  const variantAttributes: string[] = ['Color', 'Size', 'Material', 'Style']
  const colors: string[] = ['Red', 'Black', 'Blue', 'White', 'Green']

  return (
    <Box sx={{}}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<Icon icon='tabler:trash' fontSize='inherit' />}
          sx={{
            bgcolor: 'white',
            '& .MuiAccordionSummary-content': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon icon='tabler:lifebuoy' />
            <Typography variant='h6'>Pricing & Stocks</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ borderTop: 1, borderColor: 'divider' }}>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            {/* Product Type Radio Group */}
            <Box sx={{ mb: 3 }}>
              <FormLabel component='legend' required>
                Product Type
              </FormLabel>
              <Controller
                name='productType'
                control={control}
                rules={{ required: 'Product type is required' }}
                render={({ field }) => (
                  <RadioGroup {...field} row sx={{ mt: 1 }}>
                    <FormControlLabel value='single' control={<Radio />} label='Single Product' sx={{ mr: 4 }} />
                    <FormControlLabel value='variable' control={<Radio />} label='Variable Product' />
                  </RadioGroup>
                )}
              />
              {errors.productType && <FormHelperText error>{errors.productType.message}</FormHelperText>}
            </Box>

            {/* Single Product Fields */}
            {productType === 'single' && (
              <Grid container spacing={3}>
                {/* Quantity */}
                <Grid item xs={12} lg={4} sm={6}>
                  <Controller
                    name='quantity'
                    control={control}
                    rules={{
                      required: 'Quantity is required',
                      min: { value: 1, message: 'Quantity must be at least 1' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Quantity'
                        type='number'
                        required
                        error={!!errors.quantity}
                        helperText={errors.quantity?.message}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    )}
                  />
                </Grid>

                {/* Price */}
                <Grid item xs={12} lg={4} sm={6}>
                  <Controller
                    name='price'
                    control={control}
                    rules={{
                      required: 'Price is required',
                      min: { value: 0.01, message: 'Price must be greater than 0' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Price'
                        type='number'
                        required
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        inputProps={{ step: '0.01' }}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    )}
                  />
                </Grid>

                {/* Tax Type */}
                <Grid item xs={12} lg={4} sm={6}>
                  <Controller
                    name='taxType'
                    control={control}
                    rules={{ required: 'Tax type is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.taxType}>
                        <InputLabel>Tax Type *</InputLabel>
                        <Select {...field} label='Tax Type *'>
                          <MenuItem value=''>Select Option</MenuItem>
                          {taxTypes.map(type => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.taxType && <FormHelperText>{errors.taxType.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Discount Type */}
                <Grid item xs={12} lg={4} sm={6}>
                  <Controller
                    name='discountType'
                    control={control}
                    rules={{ required: 'Discount type is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.discountType}>
                        <InputLabel>Discount Type *</InputLabel>
                        <Select {...field} label='Discount Type *'>
                          <MenuItem value=''>Choose</MenuItem>
                          {discountTypes.map(type => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.discountType && <FormHelperText>{errors.discountType.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Discount Value */}
                <Grid item xs={12} lg={4} sm={6}>
                  <Controller
                    name='discountValue'
                    control={control}
                    rules={{
                      required: 'Discount value is required',
                      min: { value: 0, message: 'Discount value cannot be negative' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Discount Value'
                        type='number'
                        required
                        error={!!errors.discountValue}
                        helperText={errors.discountValue?.message}
                        inputProps={{ step: '0.01' }}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    )}
                  />
                </Grid>

                {/* Quantity Alert */}
                <Grid item xs={12} lg={4} sm={6}>
                  <Controller
                    name='quantityAlert'
                    control={control}
                    rules={{
                      required: 'Quantity alert is required',
                      min: { value: 1, message: 'Quantity alert must be at least 1' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Quantity Alert'
                        type='number'
                        required
                        error={!!errors.quantityAlert}
                        helperText={errors.quantityAlert?.message}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}

            {/* Variable Product Fields */}
            {productType === 'variable' && (
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6} sm={6}>
                  <FormLabel required>Variant Attribute</FormLabel>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Controller
                      name='variantAttribute'
                      control={control}
                      rules={{ required: 'Variant attribute is required' }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.variantAttribute} sx={{ flex: 1 }}>
                          <Select {...field} displayEmpty>
                            <MenuItem value=''>Choose</MenuItem>
                            {variantAttributes.map(attr => (
                              <MenuItem key={attr} value={attr}>
                                {attr}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.variantAttribute && (
                            <FormHelperText>{errors.variantAttribute.message}</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                    <IconButton
                      color='primary'
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1
                      }}
                    >
                      <Icon icon='tabler:trash' fontSize='inherit' />
                    </IconButton>
                  </Box>
                </Grid>

                {/* Color Selection (shown when Color is selected) */}
                {watch('variantAttribute') === 'Color' && (
                  <Grid item xs={12} lg={6} sm={6}>
                    <Controller
                      name='variantColor'
                      control={control}
                      rules={{ required: 'Color is required when Color attribute is selected' }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.variantColor}>
                          <InputLabel>Select Color *</InputLabel>
                          <Select {...field} label='Select Color *'>
                            <MenuItem value=''>Choose</MenuItem>
                            {colors.map(color => (
                              <MenuItem key={color} value={color}>
                                {color}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.variantColor && <FormHelperText>{errors.variantColor.message}</FormHelperText>}
                        </FormControl>
                      )}
                    />
                  </Grid>
                )}
              </Grid>
            )}

            {/* Submit Button */}
            <Box sx={{ mt: 3 }}>
              <Button type='submit' variant='contained' color='primary' size='large'>
                Save Pricing & Stocks
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default PricingStocksForm

import React, { useEffect } from 'react'

// ** MUI Imports
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  TableRowProps,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material'

// ** React Hook Form Imports
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Animation Imports
import { AnimatePresence, motion } from 'framer-motion'

// ** Styled Table Cells
const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    minWidth: 130
  }
}))

const StyledTableRow = styled(TableRow)<TableRowProps>(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const MotionTableRow = motion(StyledTableRow)

const rowVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.95 }
}

const ItemsDetails = () => {
  const { control } = useFormContext()

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'items'
  })

  const handleAddRow = () => {
    append({
      productServices: '',
      quantity: '',
      unit: '',
      rate: '',
      discount: '',
      tax: '',
      amount: ''
    })
  }

  useEffect(() => {
    if (fields.length === 0) {
      handleAddRow()
    }
  }, [])

  // ------- Shared Compact Error UI -------
  const CompactError = ({ message }: { message?: string }) =>
    message ? (
      <Typography variant='caption' color='error' sx={{ mt: 0.3, lineHeight: 1 }}>
        {message}
      </Typography>
    ) : null

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 4, fontWeight: 'bold' }}>
        Items & Details
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* PRODUCT / SERVICE TYPE */}
        <Grid item xs={12} sm={8}>
          <FormControl>
            <Controller
              name='itemType'
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value='Product' control={<Radio />} label='Product' />
                  <FormControlLabel value='Service' control={<Radio />} label='Service' />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>

        {/* Single Select Above Table */}
        <Grid item xs={12} sm={5}>
          <FormControl fullWidth size='small'>
            <InputLabel id='invoice-product-services-label'>Product / Services</InputLabel>
            <Controller
              name='productServices'
              control={control}
              render={({ field }) => (
                <Select {...field} labelId='invoice-product-services-label' label='Product / Services'>
                  <MenuItem value='Laptop'>Laptop</MenuItem>
                  <MenuItem value='Smartphone'>Smartphone</MenuItem>
                  <MenuItem value='Headphones'>Headphones</MenuItem>
                  <MenuItem value='Keyboard'>Keyboard</MenuItem>
                  <MenuItem value='Monitor'>Monitor</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>

        {/* Add Row */}
        <Grid item xs={12} sm={7} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='outlined' color='primary' startIcon={<Icon icon='tabler:plus' />} onClick={handleAddRow}>
            Add Row
          </Button>
        </Grid>

        {/* TABLE */}
        <Grid item xs={12} sx={{ mt: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label='items table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ minWidth: '300px' }}>Product/Services</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Unit</StyledTableCell>
                  <StyledTableCell>Rate</StyledTableCell>
                  <StyledTableCell>Discount</StyledTableCell>
                  <StyledTableCell>Tax</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Remove</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <AnimatePresence>
                  {fields.map((field, index) => (
                    <MotionTableRow
                      key={field.id}
                      variants={rowVariants}
                      initial='hidden'
                      animate='visible'
                      exit='exit'
                      transition={{ duration: 0.25 }}
                    >
                      {/* PRODUCT/SERVICES */}
                      <StyledTableCell>
                        <Controller
                          name={`items.${index}.productServices`}
                          control={control}
                          rules={{ required: 'Required' }}
                          render={({ field, fieldState }) => (
                            <Box display='flex' flexDirection='column'>
                              <FormControl fullWidth size='small' error={!!fieldState.error}>
                                <InputLabel id={`ps-${index}`}>Product / Services</InputLabel>
                                <Select {...field} labelId={`ps-${index}`} label='Product / Services'>
                                  <MenuItem value='Laptop'>Laptop</MenuItem>
                                  <MenuItem value='Smartphone'>Smartphone</MenuItem>
                                  <MenuItem value='Headphones'>Headphones</MenuItem>
                                  <MenuItem value='Keyboard'>Keyboard</MenuItem>
                                  <MenuItem value='Monitor'>Monitor</MenuItem>
                                </Select>
                              </FormControl>
                              <CompactError message={fieldState.error?.message} />
                            </Box>
                          )}
                        />
                      </StyledTableCell>

                      {/* QUANTITY */}
                      <StyledTableCell>
                        <Controller
                          name={`items.${index}.quantity`}
                          control={control}
                          rules={{ required: 'Required' }}
                          render={({ field, fieldState }) => (
                            <Box display='flex' flexDirection='column'>
                              <TextField {...field} size='small' type='number' error={!!fieldState.error} />
                              <CompactError message={fieldState.error?.message} />
                            </Box>
                          )}
                        />
                      </StyledTableCell>

                      {/* UNIT */}
                      <StyledTableCell>
                        <Controller
                          name={`items.${index}.unit`}
                          control={control}
                          rules={{ required: 'Required' }}
                          render={({ field, fieldState }) => (
                            <Box display='flex' flexDirection='column'>
                              <TextField {...field} size='small' error={!!fieldState.error} />
                              <CompactError message={fieldState.error?.message} />
                            </Box>
                          )}
                        />
                      </StyledTableCell>

                      {/* RATE */}
                      <StyledTableCell>
                        <Controller
                          name={`items.${index}.rate`}
                          control={control}
                          rules={{ required: 'Required' }}
                          render={({ field, fieldState }) => (
                            <Box display='flex' flexDirection='column'>
                              <TextField {...field} size='small' type='number' error={!!fieldState.error} />
                              <CompactError message={fieldState.error?.message} />
                            </Box>
                          )}
                        />
                      </StyledTableCell>

                      {/* DISCOUNT */}
                      <StyledTableCell>
                        <Controller
                          name={`items.${index}.discount`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <Box display='flex' flexDirection='column'>
                              <TextField {...field} size='small' type='number' error={!!fieldState.error} />
                              <CompactError message={fieldState.error?.message} />
                            </Box>
                          )}
                        />
                      </StyledTableCell>

                      {/* TAX */}
                      <StyledTableCell>
                        <Controller
                          name={`items.${index}.tax`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <Box display='flex' flexDirection='column'>
                              <TextField {...field} size='small' type='number' error={!!fieldState.error} />
                              <CompactError message={fieldState.error?.message} />
                            </Box>
                          )}
                        />
                      </StyledTableCell>

                      {/* AMOUNT */}
                      <StyledTableCell>
                        <Controller
                          name={`items.${index}.amount`}
                          control={control}
                          rules={{ required: 'Required' }}
                          render={({ field, fieldState }) => (
                            <Box display='flex' flexDirection='column'>
                              <TextField {...field} size='small' type='number' error={!!fieldState.error} />
                              <CompactError message={fieldState.error?.message} />
                            </Box>
                          )}
                        />
                      </StyledTableCell>

                      {/* REMOVE BUTTON */}
                      <StyledTableCell>
                        <IconButton color='error' onClick={() => remove(index)}>
                          <Icon icon='tabler:trash' />
                        </IconButton>
                      </StyledTableCell>
                    </MotionTableRow>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ItemsDetails

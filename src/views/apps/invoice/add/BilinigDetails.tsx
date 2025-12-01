import React from 'react'
import { useForm, Controller, useFormContext } from 'react-hook-form'
import {
  Box,
  Grid,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Paper,
  Button,
  Divider
} from '@mui/material'

const BillingDetails = () => {
  const { control } = useFormContext()
  return (
    <Grid container spacing={3}>
      {/* Amount Row */}
      <Grid item xs={8}>
        <Typography fontWeight={600}>Amount</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align='right'>$565</Typography>
      </Grid>

      {/* CGST */}
      <Grid item xs={8}>
        <Typography fontWeight={600}>CGST (9%)</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align='right'>$18</Typography>
      </Grid>

      {/* SGST */}
      <Grid item xs={8}>
        <Typography fontWeight={600}>SGST (9%)</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align='right'>$18</Typography>
      </Grid>

      {/* Additional Charges */}
      <Grid item xs={12}>
        <Button variant='text' color='primary' startIcon={<span>＋</span>}>
          Add Additional Charges
        </Button>
      </Grid>

      {/* Discount */}
      <Grid item xs={8}>
        <Typography fontWeight={600}>Discount</Typography>
      </Grid>
      <Grid item xs={4}>
        <Controller
          name='discount'
          control={control}
          render={({ field }) => <TextField {...field} size='small' fullWidth placeholder='0%' />}
        />
      </Grid>

      {/* Round Off */}
      <Grid item xs={12}>
        <Controller
          name='roundOff'
          control={control}
          render={({ field }) => (
            <FormControlLabel control={<Switch {...field} checked={field.value} />} label='Round Off Total' />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider className='my-4' />
      </Grid>

      {/* Total */}
      <Grid item xs={8}>
        <Typography variant='h6' fontWeight={700}>
          Total (USD)
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='h6' fontWeight={700} align='right'>
          $596
        </Typography>
      </Grid>

      {/* Total in Words */}
      <Grid item xs={12}>
        <Typography fontWeight={600}>Total In Words</Typography>
        <Typography variant='body2' color='text.secondary'>
          Five Hundred & Ninety Six Dollars
        </Typography>
      </Grid>

      {/* Dropdown */}
      <Grid item xs={12}>
        <Controller
          name='person'
          control={control}
          render={({ field }) => (
            <Select {...field} fullWidth size='small' displayEmpty>
              <MenuItem value='John Carter'>John Carter</MenuItem>
              <MenuItem value='Michael'>Michael</MenuItem>
              <MenuItem value='Sarah'>Sarah</MenuItem>
            </Select>
          )}
        />
      </Grid>

      <Grid item xs={12} className='text-center text-gray-400 py-2'>
        OR
      </Grid>

      {/* Signature Name */}
      <Grid item xs={12}>
        <Typography fontWeight={600}>Signature Name</Typography>
        <Controller
          name='signatureName'
          control={control}
          render={({ field }) => <TextField size='small' {...field} fullWidth />}
        />
      </Grid>

      {/* Upload Signature */}
      <Grid item xs={12}>
        <Button fullWidth variant='outlined' startIcon={<span>🖊️</span>} sx={{ borderStyle: 'dashed', py: 2 }}>
          Upload Signature
        </Button>
      </Grid>
    </Grid>
  )
}

export default BillingDetails

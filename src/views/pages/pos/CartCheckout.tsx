import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Fab from '@mui/material/Fab'

// ** Thirdparty Imports
import InputNumber from 'rc-input-number'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Data
import { top100Films } from 'src/@fake-db/autocomplete'
import { IconButton, InputAdornment } from '@mui/material'

// ** Components
import OrderListTable from './OrderListTable'
import PaymentSummary from './PaymentSummary'

const CartCheckout = () => {
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>Order List</Typography>}
        action={<Chip label='#345746' color='primary' />}
        sx={{
          borderBottom: theme => `1px dashed ${theme.palette.divider}`,
          mb: 2
        }}
      />

      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Autocomplete
            freeSolo
            id='autocomplete-free-solo'
            sx={{ flexGrow: 1 }}
            options={top100Films.map(option => option.title)}
            renderInput={params => <TextField {...params} label='Select Customer' size='small' />}
          />
          <Fab color='error' aria-label='add' size='small'>
            <Icon icon='tabler:plus' />
          </Fab>
          <Fab color='warning' aria-label='add' size='small'>
            <Icon icon='material-symbols-light:qr-code-scanner-rounded' />
          </Fab>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: theme => `1px solid ${theme.palette.error.main}`,
            borderRadius: 1,
            p: 3,
            mt: 4,
            // bgcolor: theme => theme.palette.primary.main,
            bgcolor: '#ffeee9',
            pr: 2
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant='subtitle1' fontWeight='bold'>
              Coupon Available
            </Typography>
            <Typography variant='body2'>
              Use code <b>DISCOUNT10</b> to save 10%
            </Typography>
          </Box>

          <Button variant='contained' size='small' color='error'>
            Apply
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
            Order Details
          </Typography>
          <Button variant='outlined' size='small' color='error'>
            Clear All
          </Button>
        </Box>
        <OrderListTable />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: theme => `1px solid ${theme.palette.info.main}`,
            borderRadius: 1,
            p: 3,
            mt: 4,
            // bgcolor: theme => theme.palette.primary.main,
            bgcolor: '#c7eef3ff',
            pr: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'white',
              borderRadius: '8px',
              width: 32,
              height: 32,
              mr: 2
            }}
          >
            <Icon icon='material-symbols-light:kid-star-outline' width={20} height={20} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant='subtitle1' fontWeight='bold' color='info.main'>
              Discount
            </Typography>
            <Typography variant='body2'>For $20 Minimum Purchase, all Items</Typography>
          </Box>

          <Button variant='contained' size='small' color='info'>
            Apply
          </Button>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
            Payment Summary
          </Typography>
        </Box>
        <PaymentSummary />
      </CardContent>
    </Card>
  )
}

export default CartCheckout

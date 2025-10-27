import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import OrderListTable from './OrderListTable'
import PaymentSummary from './PaymentSummary'
import ChooseCustomer from './ChooseCustomer'

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
        {/* Choose Customer */}
        <ChooseCustomer />

        {/* Select Product */}

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

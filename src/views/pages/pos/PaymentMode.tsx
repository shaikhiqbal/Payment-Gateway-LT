import React from 'react'

// ** MUI Imports
import { Grid, Box, Typography, Paper, Card, CardContent, CardHeader } from '@mui/material'

interface PaymentMethod {
  id: number
  name: string
  imgSrc?: string
  onClick?: () => void
}

const paymentMethods: PaymentMethod[] = [
  { id: 1, name: 'Cash', imgSrc: '/images/icons/payment/cash-icon.svg' },
  { id: 2, name: 'Card', imgSrc: '/images/icons/payment/card.svg' },
  { id: 3, name: 'Points', imgSrc: '/images/icons/payment/points.svg' },
  { id: 4, name: 'Deposit', imgSrc: '/images/icons/payment/deposit.svg' },
  { id: 5, name: 'Cheque', imgSrc: '/images/icons/payment/cheque.svg' },
  { id: 6, name: 'Gift Card', imgSrc: '/images/icons/payment/giftcard.svg' },
  { id: 7, name: 'Scan', imgSrc: '/images/icons/payment/scan-icon.svg' },
  { id: 8, name: 'Pay Later', imgSrc: '/images/icons/payment/paylater.svg' },
  { id: 9, name: 'External', imgSrc: '/images/icons/payment/external.svg' },
  { id: 10, name: 'Split Bill', imgSrc: '/images/icons/payment/split-bill.svg' }
]

const PaymentMethodsGrid = () => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardHeader title={<Typography variant='h6'>Order List</Typography>} />
      <CardContent>
        {' '}
        <Grid container spacing={2}>
          {paymentMethods.map(method => (
            <Grid item xs={6} sm={4} md={4} key={method.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  border: '1px dashed #ccc',
                  borderRadius: 1,
                  minHeight: 60
                }}
                onClick={method.onClick}
              >
                {/* Image or placeholder box */}
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: method.imgSrc ? 'transparent' : 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 0.5
                  }}
                >
                  {method.imgSrc && <img src={method.imgSrc} alt={method.name} width={24} height={24} />}
                </Box>

                {/* Name */}
                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                  {method.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PaymentMethodsGrid

import React, { Fragment, useEffect } from 'react'
// ** MUI Imports
import { Box, Button, Grid } from '@mui/material'

// ** Components
import TopBar from 'src/views/pages/pos/TopBar'
import ProductArea from 'src/views/pages/pos/ProductArea'
import CartCheckout from 'src/views/pages/pos/CartCheckout'

// ** Redux Function
import { fetchProducts, fetchCategories } from 'src/store/pages/pos'

// ** Redux Hook
import { useDispatch } from 'react-redux'

// ** Types
import { AppDispatch, RootState } from 'src/store'
import PaymentMethodsGrid from 'src/views/pages/pos/PaymentMode'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const POS = () => {
  // ** Hook

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts())
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [dispatch])
  return (
    <Fragment>
      <Box p={2}>
        <TopBar />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' } // ✅ stack on small, row on md+
        }}
      >
        {/* Right Side - TopBar + Product Area */}
        <Box flex={1} display='flex' flexDirection='column'>
          {/* Top Bar */}

          {/* Product Area */}
          <Box flex={1} overflow='auto' p={2}>
            <ProductArea />
          </Box>
        </Box>

        {/* Left Side - Checkout */}
        <Box
          sx={{
            width: { xs: '100%', md: 550 }, // ✅ full width on xs, 400px fixed on md+
            borderLeft: { xs: 'none' },
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme => (theme.palette.mode === 'light' ? '#E6EAED' : '#2C2F33'),
            borderRadius: 2
          }}
        >
          <CartCheckout />
          <PaymentMethodsGrid />
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={6} sm={4} md={6}>
              <Button
                variant='contained'
                color='secondary'
                startIcon={<Icon icon='ic:baseline-local-printshop' />}
                sx={{ width: '100%' }}
              >
                Print
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={6}>
              <Button
                variant='contained'
                color='warning'
                startIcon={<Icon icon='ic:outline-local-grocery-store' />}
                sx={{ width: '100%' }}
              >
                Place Order
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Fragment>
  )
}

POS.acl = { subject: 'pos', action: 'read' }

export default POS

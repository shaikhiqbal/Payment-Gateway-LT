import React, { Fragment, ReactNode, useEffect } from 'react'
// ** MUI Imports
import { Box, Button, Grid, Paper } from '@mui/material'

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

// ** Layout Import
import PosLayout from 'src/@core/layouts/PosLayout'

import PerfectScrollbar from 'react-perfect-scrollbar'

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
    <Grid
      container
      spacing={4}
      sx={{
        pb: '60px',
        height: theme => `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`,
        mt: 1
      }}
    >
      {/* Product Area */}
      <Grid item xs={12} md={7} lg={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Paper sx={{ flex: 1, minHeight: 0 }}>
          <PerfectScrollbar style={{ padding: '1rem' }}>
            <TopBar />
            <ProductArea />
          </PerfectScrollbar>
        </Paper>
      </Grid>

      {/* Cart + Checkout */}
      <Grid item xs={12} md={5} lg={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PerfectScrollbar>
          <CartCheckout />
          <PaymentMethodsGrid />
        </PerfectScrollbar>
      </Grid>
    </Grid>
  )
}

POS.acl = { subject: 'pos', action: 'read' }

POS.getLayout = (page: ReactNode) => <PosLayout>{page}</PosLayout>

export default POS

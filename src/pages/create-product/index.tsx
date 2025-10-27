import React from 'react'

// ** MUI Imports
import { Grid } from '@mui/material'

// ** Form Imports
import ProductInformation from './ProductInformation'
import PricingStock from './PricingStock'

const CreateProduct = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProductInformation />
      </Grid>
      <Grid item xs={12}>
        <PricingStock />
      </Grid>
    </Grid>
  )
}

CreateProduct.acl = {
  action: 'read',
  subject: 'user-management'
}
export default CreateProduct

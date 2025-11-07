import React, { Fragment, useState } from 'react'

// ** MUI Imports
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material'

// ** Form Imports
import ProductInformation from '../../../views/components/product/ProductInformation'
import PricingStock from '../../../views/components/product/PricingStock'

// ** Components
import MultiVariation from 'src/views/components/product/MultiVariation'

interface Variant {
  key: string
  name: string
  sku: string
  buyingPrice: number
  sellingPrice: number
  discountPrice: number
  quantity: number
  alertQuantity: number
  weight: string
  gtin: string
}

interface ProductFormData {
  store: string
  warehouse: string
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
  variants: Variant[]
}

const CreateProduct = () => {
  // ** Sates
  const [openVariationModal, setOpenVariationModal] = useState<boolean>(false)

  // ** Handle Close
  const handleToggle = () => setOpenVariationModal(!openVariationModal)

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <ProductInformation />
        </Grid>
        <Grid item xs={12} md={12}>
          <PricingStock handleToggle={handleToggle} />
        </Grid>
      </Grid>

      <Dialog
        open={openVariationModal}
        onClose={handleToggle}
        aria-labelledby='user-view-edit'
        aria-describedby='user-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      >
        <DialogTitle
          id='user-view-edit'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          Add Varaints
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
            Customize your product by adding variants with different colors and sizes. You can pick from existing
            options or create new ones that best fit your product range.
          </DialogContentText>
          <MultiVariation />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleToggle}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleToggle}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

CreateProduct.acl = {
  action: 'read',
  subject: 'user-management'
}
export default CreateProduct

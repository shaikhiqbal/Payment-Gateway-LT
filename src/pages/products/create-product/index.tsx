import React, { Fragment, useState } from 'react'

// ** MUI Imports
import { Grid } from '@mui/material'

// ** Custom Components
import ProductInformation from '../../../views/components/product/ProductInformation'
import PricingStock from '../../../views/components/product/PricingStock'
import MultiVariation from 'src/views/components/product/MultiVariation'

// ** React Hook Form Imports
import { useForm, useFieldArray } from 'react-hook-form'
import VariantForm from 'src/views/components/product/VariationListForm'

// ✅ Types
export interface LabelValue {
  label: string
  value: string
}

export type VariantNameType<T extends string> = T extends 'Color' | 'Size' | 'Style' ? LabelValue[] : string[]

export interface Variant {
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
  variantName: {
    [K in 'Color' | 'Size' | 'Style']?: VariantNameType<K>
  }
}

export interface ProductFormData {
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
  const [openVariationModal, setOpenVariationModal] = useState(false)

  const { control, setValue, handleSubmit, watch } = useForm<ProductFormData>({
    defaultValues: {
      variants: []
    }
  })

  const { fields: variantFields } = useFieldArray({
    control,
    name: 'variants'
  })

  const handleToggle = () => setOpenVariationModal(prev => !prev)

  const onSubmit = (data: ProductFormData) => {
    console.log('✅ Final Product Data:', data)
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProductInformation />
          </Grid>
          <Grid item xs={12}>
            <PricingStock handleToggle={handleToggle} />
          </Grid>
          <Grid item xs={12}>
            <VariantForm control={control} />
          </Grid>
        </Grid>
      </form>
      {/* <MultiVariation openVariationModal={openVariationModal} handleToggle={handleToggle} setValue={setValue} /> */}
    </Fragment>
  )
}

CreateProduct.acl = {
  action: 'read',
  subject: 'user-management'
}

export default CreateProduct

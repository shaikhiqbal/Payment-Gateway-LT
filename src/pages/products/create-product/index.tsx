import React, { Fragment } from 'react'

// ** MUI Imports
import { Button, Grid } from '@mui/material'

// ** Custom Components
import ProductInformation from '../../../views/components/product/ProductInformation'

// ** React Hook Form Imports
import { useForm } from 'react-hook-form'

import VariantForm from 'src/views/components/product/VariationListForm'

//**  ✅ Types
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
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ProductFormData>({
    defaultValues: {
      productName: '',
      slug: '',
      sku: '',
      sellingType: '',
      category: '',
      subCategory: '',
      brand: '',
      unit: '',
      barcodeSymbology: '',
      itemCode: '',
      description: '',
      variants: []
    }
  })

  const onSubmit = (data: ProductFormData) => {
    console.log('✅ Final Product Data:', data)
  }
  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProductInformation control={control} setValue={setValue} errors={errors} watch={watch} />
          </Grid>

          <Grid item xs={12}>
            <VariantForm control={control} watch={watch} />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button type='button' variant='contained' sx={{ mr: 1 }}>
              Create
            </Button>

            <Button variant='outlined' color='secondary'>
              Cancel
            </Button>
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

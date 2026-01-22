// ** MUI Imports
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import Link from 'next/link'

// ** React Hook Form Imports
import { FormProvider, useForm } from 'react-hook-form'

// ** Custome Component Imports
import Icon from 'src/@core/components/icon'
import BilingToFrom from 'src/views/apps/invoice/add/BilingToFrom'
import BilinigDetails from 'src/views/apps/invoice/add/BilinigDetails'
import ExtraInformation from 'src/views/apps/invoice/add/ExtraInformation'
import InvoiceHeaderSection from 'src/views/apps/invoice/add/InvoiceHeaderSection'
import ItemsDetails from 'src/views/apps/invoice/add/ItemsDetails'

// ** Types
export interface InvoiceItem {
  productServices: string
  quantity: number | string
  unit: string
  rate: number | string
  discount: number | string
  tax: number | string
  amount: number | string
}

export interface InvoiceFormType {
  status: string
  currency: string
  invoiceNumber: string
  referenceNumber: string
  date: Date | null
  billedBy: string
  customerName: string
  itemType: 'Product' | 'Service'
  productServices: string
  items: InvoiceItem[]
  notes: string
  termsCondition: string
  bankDetails: string
  discount: string
  roundOff: boolean
  person: string
  signatureName: string
  signatureFile: File | null
}

const InvoiceAdd = () => {
  const method = useForm<InvoiceFormType>({
    defaultValues: {
      status: 'Draft',
      currency: 'USD',
      invoiceNumber: '',
      referenceNumber: '',
      date: new Date(),

      billedBy: '',
      customerName: '',
      itemType: 'Product',
      productServices: '',
      items: [
        {
          productServices: '',
          quantity: '',
          unit: '',
          rate: '',
          discount: '',
          tax: '',
          amount: ''
        }
      ],

      notes: '',
      termsCondition: '',
      bankDetails: '',
      discount: '',
      roundOff: false,
      person: '',
      signatureName: '',
      signatureFile: null
    }
  })

  const { handleSubmit } = method
  const onSubmit = (data: InvoiceFormType) => {
    console.log(data)
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h6' sx={{ mb: 4, fontWeight: 'bold' }}>
          Invoice
        </Typography>
        <Link href={'/apps/invoice/preview/12345'}>
          <Button
            variant='outlined'
            color='secondary'
            size='small'
            sx={theme => ({
              mr: 2,
              m: 0,
              color: theme.palette.mode === 'dark' ? theme.palette.grey[200] : '#101010',
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(16,16,16,0.12)',
              backgroundColor: 'transparent',
              '&:hover': {
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.24)' : 'rgba(16,16,16,0.24)',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(16,16,16,0.04)'
              }
            })}
          >
            <Icon icon='tabler:eye' style={{ marginRight: '4px', fontSize: '16px', color: 'inherit' }} />
            Preview
          </Button>
        </Link>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className='invoice-details'>
          <FormProvider {...method}>
            <CardContent>
              <InvoiceHeaderSection />
            </CardContent>

            <Divider />

            <CardContent>
              <Grid container spacing={6}>
                <BilingToFrom title='Billed To:' name='billedBy' />
                <BilingToFrom title='Billed From:' name='customerName' />
              </Grid>
            </CardContent>

            <Divider />

            <CardContent>
              <ItemsDetails />
            </CardContent>

            <Divider />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={7}>
                  <ExtraInformation />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <BilinigDetails />
                </Grid>
              </Grid>
            </CardContent>
          </FormProvider>
        </Card>
        <Button variant='contained' color='primary' sx={{ mt: 4 }} type='submit'>
          Save
        </Button>
      </form>
    </>
  )
}

InvoiceAdd.acl = {
  action: 'read',
  subject: 'user-management'
}

export default InvoiceAdd

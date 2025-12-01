import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Divider,
  Button,
  Stack,
  useTheme,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import Icon from 'src/@core/components/icon'

// ==================== TYPES ====================
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
  // Header Section
  status: string
  currency: string
  invoiceNumber: string
  referenceNumber: string
  date: Date | null

  // Billing To/From
  billedBy: string
  customerName: string

  // Item Section
  itemType: 'Product' | 'Service'
  productServices: string
  items: InvoiceItem[]

  // Extra Information
  notes: string
  termsCondition: string
  bankDetails: string

  // Billing Details
  discount: string
  roundOff: boolean
  person: string
  signatureName: string
  signatureFile: File | null
}

// ==================== HELPER: NUMBER TO WORDS ====================
const numberToWords = (num: number): string => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  const teens = [
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen'
  ]

  if (num === 0) return 'Zero'

  const convert = (n: number): string => {
    if (n < 10) return ones[n]
    if (n < 20) return teens[n - 10]
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '')
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convert(n % 100) : '')
    if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '')
    if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convert(n % 100000) : '')
    return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + convert(n % 10000000) : '')
  }

  const intPart = Math.floor(num)
  const decPart = Math.round((num - intPart) * 100)

  let result = convert(intPart) + ' Dollars'
  if (decPart > 0) result += ' and ' + convert(decPart) + ' Cents'

  return result
}

const fakeInvoiceData: InvoiceFormType = {
  status: 'Draft',
  currency: 'USD',
  invoiceNumber: 'INV-2025-001',
  referenceNumber: 'REF-98231',
  date: new Date(),

  billedBy: 'LockTrust Pvt Ltd\nHyderabad\nGST: 29AASCM1234E1Z2',
  customerName: 'Iqbal Shaikh\nMumbai\nPhone: 9876543210',

  itemType: 'Product',
  productServices: '',
  items: [
    {
      productServices: 'Website Development',
      quantity: 1,
      unit: 'Project',
      rate: 500,
      discount: 0,
      tax: 18,
      amount: 500
    },
    {
      productServices: 'UI/UX Design',
      quantity: 2,
      unit: 'Screens',
      rate: 100,
      discount: 0,
      tax: 18,
      amount: 200
    }
  ],

  notes: 'Thank you for your business!',
  termsCondition: 'Payment due within 7 days.\nLate payment fee may apply.',
  bankDetails: 'HDFC Bank\nA/C: 123456789\nIFSC: HDFC0001234',

  discount: '5',
  roundOff: true,
  person: 'Manager',
  signatureName: 'Iqbal Shaikh',
  signatureFile: null
}

// ==================== MAIN COMPONENT ====================
const InvoicePreview = () => {
  const theme = useTheme()

  // ==================== CALCULATIONS ====================
  const calculateSubtotal = () => {
    return fakeInvoiceData.items.reduce((sum, item) => {
      const rate = Number(item.rate) || 0
      const qty = Number(item.quantity) || 0
      const discount = Number(item.discount) || 0
      return sum + rate * qty * (1 - discount / 100)
    }, 0)
  }

  const calculateTotalTax = () => {
    return fakeInvoiceData.items.reduce((sum, item) => {
      const rate = Number(item.rate) || 0
      const qty = Number(item.quantity) || 0
      const discount = Number(item.discount) || 0
      const tax = Number(item.tax) || 0
      const itemSubtotal = rate * qty * (1 - discount / 100)
      return sum + (itemSubtotal * tax) / 100
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const totalTax = calculateTotalTax()
  const cgst = totalTax / 2
  const sgst = totalTax / 2
  const discountAmount = (subtotal * Number(fakeInvoiceData.discount || 0)) / 100
  const totalBeforeRound = subtotal + totalTax - discountAmount
  const finalTotal = fakeInvoiceData.roundOff ? Math.round(totalBeforeRound) : totalBeforeRound
  const roundOffAmount = finalTotal - totalBeforeRound

  // ==================== HANDLERS ====================
  const handlePrint = () => {
    window.print()
  }

  const handleEdit = () => {
    // onEdit?.()
  }

  const handleDownload = () => {
    // onDownload?.()
  }

  // ==================== STATUS COLOR ====================
  const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'default' | 'info' => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'success'
      case 'pending':
        return 'warning'
      case 'overdue':
        return 'error'
      case 'draft':
        return 'default'
      default:
        return 'info'
    }
  }

  // ==================== RENDER ====================
  return (
    <Box>
      {/* ==================== ACTION BUTTONS ==================== */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          mb: 3,
          px: 3,
          '@media print': {
            display: 'none'
          }
        }}
      >
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          <Button
            size='small'
            variant='outlined'
            color='secondary'
            startIcon={<Icon icon='tabler:edit' fontSize={20} />}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            size='small'
            variant='outlined'
            color='info'
            startIcon={<Icon icon='tabler:download' fontSize={20} />}
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button
            size='small'
            variant='contained'
            color='primary'
            startIcon={<Icon icon='tabler:printer' fontSize={20} />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Stack>
      </Box>

      {/* ==================== INVOICE CARD ==================== */}
      <Card
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          boxShadow: 3,
          '@media print': {
            boxShadow: 'none',
            maxWidth: '100%'
          }
        }}
      >
        <CardContent sx={{ p: 5, '@media print': { p: 3 } }}>
          {/* ==================== HEADER SECTION ==================== */}
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                {/* LOGO IMPLEMENTATION */}
                <img
                  src='/images/website-logo/locktrust-logo.png'
                  alt='LockTrust Logo'
                  style={{
                    height: '60px', // Fixed height ensures layout stability
                    maxWidth: '200px',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon icon='tabler:file-invoice' fontSize={32} color='white' />
                </Box>
                <Typography variant='h3' fontWeight='700' color='text.primary'>
                  INVOICE
                </Typography>
              </Box> */}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Chip
                  label={fakeInvoiceData.status.toUpperCase()}
                  color={getStatusColor(fakeInvoiceData.status)}
                  sx={{ mb: 2, fontWeight: 600, fontSize: '0.875rem' }}
                />
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  Invoice Number
                </Typography>
                <Typography variant='h6' fontWeight='600' gutterBottom>
                  {fakeInvoiceData.invoiceNumber}
                </Typography>
                <Typography variant='body2' color='text.secondary' gutterBottom sx={{ mt: 2 }}>
                  Reference Number
                </Typography>
                <Typography variant='body1' fontWeight='500' gutterBottom>
                  {fakeInvoiceData.referenceNumber}
                </Typography>
                <Typography variant='body2' color='text.secondary' gutterBottom sx={{ mt: 2 }}>
                  Date
                </Typography>
                <Typography variant='body1' fontWeight='500'>
                  {fakeInvoiceData.date?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* ==================== BILLING INFORMATION ==================== */}
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Icon icon='tabler:building' fontSize={18} color={theme.palette.primary.main} />
                  <Typography variant='overline' fontWeight='700' color='primary' fontSize='0.875rem'>
                    Billed By
                  </Typography>
                </Box>
                <Typography variant='body1' sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                  {fakeInvoiceData.billedBy}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: alpha(theme.palette.secondary.main, 0.05),
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Icon icon='tabler:user' fontSize={18} color={theme.palette.secondary.main} />
                  <Typography variant='overline' fontWeight='700' color='secondary' fontSize='0.875rem'>
                    Billed To
                  </Typography>
                </Box>
                <Typography variant='body1' sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                  {fakeInvoiceData.customerName}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* ==================== ITEMS TABLE ==================== */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Icon icon='tabler:list-details' fontSize={20} />
              <Typography variant='h6' fontWeight='600'>
                Items
              </Typography>
            </Box>
            <TableContainer
              component={Paper}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 'none'
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08) }}>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Product/Service</TableCell>
                    <TableCell align='center' sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Qty
                    </TableCell>
                    <TableCell align='center' sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Unit
                    </TableCell>
                    <TableCell align='right' sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Rate
                    </TableCell>
                    <TableCell align='right' sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Discount
                    </TableCell>
                    <TableCell align='right' sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Tax
                    </TableCell>
                    <TableCell align='right' sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fakeInvoiceData.items.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) },
                        '&:last-child td': { borderBottom: 0 }
                      }}
                    >
                      <TableCell>
                        <Typography variant='body2' fontWeight='500'>
                          {item.productServices}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.quantity}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.unit}</Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography variant='body2'>
                          {fakeInvoiceData.currency} {Number(item.rate).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography variant='body2'>{item.discount}%</Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography variant='body2'>{item.tax}%</Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography variant='body2' fontWeight='600'>
                          {fakeInvoiceData.currency} {Number(item.amount).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* ==================== SUMMARY & EXTRA INFO ==================== */}
          <Grid container spacing={4}>
            {/* LEFT SIDE: NOTES, TERMS, BANK DETAILS */}
            <Grid item xs={12} md={7}>
              {fakeInvoiceData.notes && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Icon icon='tabler:notes' fontSize={18} />
                    <Typography variant='subtitle2' fontWeight='700'>
                      Notes
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary' sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                    {fakeInvoiceData.notes}
                  </Typography>
                </Box>
              )}

              {fakeInvoiceData.termsCondition && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Icon icon='tabler:file-text' fontSize={18} />
                    <Typography variant='subtitle2' fontWeight='700'>
                      Terms & Conditions
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary' sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                    {fakeInvoiceData.termsCondition}
                  </Typography>
                </Box>
              )}

              {fakeInvoiceData.bankDetails && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Icon icon='tabler:building-bank' fontSize={18} />
                    <Typography variant='subtitle2' fontWeight='700'>
                      Bank Details
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary' sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                    {fakeInvoiceData.bankDetails}
                  </Typography>
                </Box>
              )}
            </Grid>

            {/* RIGHT SIDE: TOTALS SUMMARY */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: alpha(theme.palette.grey[500], 0.05),
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='body2' color='text.secondary'>
                      Subtotal
                    </Typography>
                    <Typography variant='body2' fontWeight='500'>
                      {fakeInvoiceData.currency} {subtotal.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='body2' color='text.secondary'>
                      CGST (9%)
                    </Typography>
                    <Typography variant='body2' fontWeight='500'>
                      {fakeInvoiceData.currency} {cgst.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='body2' color='text.secondary'>
                      SGST (9%)
                    </Typography>
                    <Typography variant='body2' fontWeight='500'>
                      {fakeInvoiceData.currency} {sgst.toFixed(2)}
                    </Typography>
                  </Box>

                  {Number(fakeInvoiceData.discount) > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='body2' color='error.main'>
                        Discount ({fakeInvoiceData.discount}%)
                      </Typography>
                      <Typography variant='body2' fontWeight='500' color='error.main'>
                        - {fakeInvoiceData.currency} {discountAmount.toFixed(2)}
                      </Typography>
                    </Box>
                  )}

                  {fakeInvoiceData.roundOff && Math.abs(roundOffAmount) > 0.01 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='body2' color='text.secondary'>
                        Round Off
                      </Typography>
                      <Typography variant='body2' fontWeight='500'>
                        {roundOffAmount >= 0 ? '+' : ''} {fakeInvoiceData.currency} {roundOffAmount.toFixed(2)}
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                    <Typography variant='h6' fontWeight='700'>
                      Total ({fakeInvoiceData.currency})
                    </Typography>
                    <Typography variant='h6' fontWeight='700' color='primary.main'>
                      {fakeInvoiceData.currency} {finalTotal.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      pt: 2,
                      mt: 1,
                      borderTop: `1px dashed ${theme.palette.divider}`
                    }}
                  >
                    <Typography variant='caption' color='text.secondary' fontWeight='600' display='block' gutterBottom>
                      Total in Words:
                    </Typography>
                    <Typography variant='body2' fontWeight='600' color='text.primary' sx={{ fontStyle: 'italic' }}>
                      {numberToWords(finalTotal)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>

          {/* ==================== SIGNATURE SECTION ==================== */}
          {fakeInvoiceData.signatureName && (
            <Box sx={{ mt: 6, pt: 4, borderTop: `1px dashed ${theme.palette.divider}` }}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  {/* Empty space for future use */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Box
                      sx={{
                        display: 'inline-block',
                        minWidth: 250,
                        textAlign: 'center'
                      }}
                    >
                      {fakeInvoiceData.signatureFile ? (
                        <Box
                          sx={{
                            mb: 2,
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `1px dashed ${theme.palette.divider}`,
                            borderRadius: 1,
                            bgcolor: alpha(theme.palette.grey[500], 0.02)
                          }}
                        >
                          <Typography variant='caption' color='text.secondary' fontStyle='italic'>
                            <Icon
                              icon='tabler:signature'
                              fontSize={24}
                              style={{ display: 'block', margin: '0 auto 4px' }}
                            />
                            [Signature Image]
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{ mb: 2, height: 60 }} />
                      )}
                      <Divider sx={{ mb: 1, borderColor: theme.palette.text.primary, borderWidth: 1 }} />
                      <Typography variant='body2' fontWeight='700'>
                        {fakeInvoiceData.signatureName}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        Authorized Signatory
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* ==================== FOOTER ==================== */}
          <Box
            sx={{
              mt: 6,
              pt: 3,
              borderTop: `1px solid ${theme.palette.divider}`,
              textAlign: 'center'
            }}
          >
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
            >
              <Icon icon='tabler:shield-check' fontSize={14} />
              This is a computer-generated invoice and does not require a physical signature.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* ==================== PRINT STYLES ==================== */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          @page {
            margin: 1cm;
            size: A4;
          }
        }
      `}</style>
    </Box>
  )
}

InvoicePreview.acl = {
  action: 'read',
  subject: 'user-management'
}
export default InvoicePreview

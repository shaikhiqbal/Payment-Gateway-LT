import React, { useState, SyntheticEvent, useCallback } from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import InvoiceHeader from 'src/views/apps/invoice/list/invoice-header/InvoiceHeader'
import InvoiceTable from 'src/views/apps/invoice/list/invoice-table/InvoiceTable'
import TableFilter from 'src/views/apps/invoice/list/table-fillter/TableFilter'

// ** Tabs
const invoiceTabsList = [
  'All',
  'Paid',
  'Overdue',
  'Upcoming',
  'Cancelled',
  'Partially Paid',
  'Unpaid',
  'Refunded',
  'Draft'
]

const InvoiceList = () => {
  const [activeTab, setActiveTab] = useState<string>('1')

  const handleChange = useCallback((event: SyntheticEvent, newNumber: string) => {
    setActiveTab(newNumber)
  }, [])
  return (
    <Container maxWidth='xl'>
      <Typography variant='h5' sx={{ mb: 4 }}>
        Invoices
      </Typography>
      <InvoiceHeader />
      <TableFilter value={activeTab} handleChange={handleChange} invoiceTabsList={invoiceTabsList}>
        <InvoiceTable invoiceTabsList={invoiceTabsList} activeTab={activeTab} />
      </TableFilter>
    </Container>
  )
}

InvoiceList.acl = {
  action: 'read',
  subject: 'user-management'
}

export default InvoiceList

/*

import InvoiceHeader from 'src/components/InvoiceHeader/InvoiceHeader'
import InvoiceTable from 'src/components/InvoiceTable/InvoiceTable'

export default function InvoicePage() {
  return (
    <Container maxWidth='xl'>
      <Typography variant='h5' sx={{ mb: 4 }}>Invoices</Typography>
      <InvoiceHeader />
      <InvoiceTable />
    </Container>
  )
}

*/

import { useState, ChangeEvent, useEffect } from 'react'

// MUI
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

// Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// Utils
import { getInitials } from 'src/@core/utils/get-initials'

const escapeRegExp = (value: string) => value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

// Avatar Cell
const renderCustomer = (params: GridRenderCellParams) => {
  const { row } = params

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 30, height: 30 }}>
        {getInitials(row.customer)}
      </CustomAvatar>

      <Typography variant='body2' sx={{ fontWeight: 600 }}>
        {row.customer}
      </Typography>
    </Box>
  )
}

// Status colors
const statusColors: any = {
  Paid: 'success',
  Overdue: 'error',
  Upcoming: 'warning',
  Cancelled: 'secondary',
  'Partially Paid': 'info',
  Unpaid: 'error',
  Refunded: 'primary',
  Draft: 'secondary'
}

// Columns
const columns: GridColumns = [
  {
    field: 'id',
    headerName: 'ID',
    minWidth: 130,
    flex: 0.15
  },
  {
    field: 'customer',
    headerName: 'Customer',
    minWidth: 220,
    flex: 0.3,
    renderCell: renderCustomer
  },
  {
    field: 'createdOn',
    headerName: 'Created On',
    minWidth: 140,
    flex: 0.2,
    renderCell: params => <Typography variant='body2'>{params.row.createdOn}</Typography>
  },
  {
    field: 'amount',
    headerName: 'Amount',
    minWidth: 120,
    flex: 0.15,
    renderCell: params => <Typography variant='body2'>{params.row.amount}</Typography>
  },
  {
    field: 'paid',
    headerName: 'Paid',
    minWidth: 120,
    flex: 0.15,
    renderCell: params => <Typography variant='body2'>{params.row.paid}</Typography>
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 140,
    flex: 0.2,
    renderCell: params => (
      <CustomChip
        rounded
        size='small'
        skin='light'
        label={params.row.status}
        color={statusColors[params.row.status]}
        sx={{ textTransform: 'capitalize' }}
      />
    )
  },
  {
    field: 'paymentMode',
    headerName: 'Payment Mode',
    minWidth: 130,
    flex: 0.18,
    renderCell: params => <Typography variant='body2'>{params.row.paymentMode}</Typography>
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    minWidth: 150,
    flex: 0.18,
    renderCell: params => <Typography variant='body2'>{params.row.dueDate}</Typography>
  }
]

const invoices = [
  {
    id: 'INV00001',
    customer: 'Emily Clark',
    avatar: '/images/avatars/1.png',
    createdOn: '02 Jan 2025',
    amount: '$10,000',
    paid: '$5,000',
    status: 'Paid',
    paymentMode: 'Cash',
    dueDate: '10 Jan 2025'
  },
  {
    id: 'INV00002',
    customer: 'John Carter',
    avatar: '/images/avatars/2.png',
    createdOn: '05 Jan 2025',
    amount: '$8,500',
    paid: '$0',
    status: 'Unpaid',
    paymentMode: 'UPI',
    dueDate: '15 Jan 2025'
  },
  {
    id: 'INV00003',
    customer: 'Sophia Miller',
    avatar: '/images/avatars/3.png',
    createdOn: '08 Jan 2025',
    amount: '$12,000',
    paid: '$6,000',
    status: 'Partially Paid',
    paymentMode: 'Bank Transfer',
    dueDate: '20 Jan 2025'
  },
  {
    id: 'INV00004',
    customer: 'Liam Johnson',
    avatar: '/images/avatars/4.png',
    createdOn: '10 Jan 2025',
    amount: '$4,200',
    paid: '$4,200',
    status: 'Paid',
    paymentMode: 'Card',
    dueDate: '18 Jan 2025'
  },
  {
    id: 'INV00005',
    customer: 'Mia Wilson',
    avatar: '/images/avatars/5.png',
    createdOn: '12 Jan 2025',
    amount: '$7,900',
    paid: '$0',
    status: 'Overdue',
    paymentMode: 'Cash',
    dueDate: '22 Jan 2025'
  },
  {
    id: 'INV00006',
    customer: 'David Lee',
    avatar: '/images/avatars/6.png',
    createdOn: '14 Jan 2025',
    amount: '$5,600',
    paid: '$5,600',
    status: 'Paid',
    paymentMode: 'Card',
    dueDate: '25 Jan 2025'
  },
  {
    id: 'INV00007',
    customer: 'Olivia Brown',
    avatar: '/images/avatars/7.png',
    createdOn: '16 Jan 2025',
    amount: '$9,300',
    paid: '$0',
    status: 'Cancelled',
    paymentMode: 'UPI',
    dueDate: '28 Jan 2025'
  },
  {
    id: 'INV00008',
    customer: 'Noah Davis',
    avatar: '/images/avatars/8.png',
    createdOn: '18 Jan 2025',
    amount: '$11,400',
    paid: '$7,000',
    status: 'Partially Paid',
    paymentMode: 'Cash',
    dueDate: '02 Feb 2025'
  },
  {
    id: 'INV00009',
    customer: 'Ava Thompson',
    avatar: '/images/avatars/9.png',
    createdOn: '20 Jan 2025',
    amount: '$6,800',
    paid: '$6,800',
    status: 'Paid',
    paymentMode: 'Bank Transfer',
    dueDate: '05 Feb 2025'
  },
  {
    id: 'INV00010',
    customer: 'William Harris',
    avatar: '/images/avatars/10.png',
    createdOn: '22 Jan 2025',
    amount: '$15,000',
    paid: '$0',
    status: 'Overdue',
    paymentMode: 'Card',
    dueDate: '01 Feb 2025'
  },
  {
    id: 'INV00011',
    customer: 'Isabella King',
    avatar: '/images/avatars/11.png',
    createdOn: '25 Jan 2025',
    amount: '$3,900',
    paid: '$3,900',
    status: 'Paid',
    paymentMode: 'Cash',
    dueDate: '03 Feb 2025'
  },
  {
    id: 'INV00012',
    customer: 'Ethan Martinez',
    avatar: '/images/avatars/12.png',
    createdOn: '28 Jan 2025',
    amount: '$18,200',
    paid: '$5,000',
    status: 'Upcoming',
    paymentMode: 'Bank Transfer',
    dueDate: '10 Mar 2025'
  },
  {
    id: 'INV00013',
    customer: 'Charlotte Moore',
    avatar: '/images/avatars/13.png',
    createdOn: '30 Jan 2025',
    amount: '$2,700',
    paid: '$0',
    status: 'Draft',
    paymentMode: 'UPI',
    dueDate: '—'
  },
  {
    id: 'INV00014',
    customer: 'James Taylor',
    avatar: '/images/avatars/14.png',
    createdOn: '01 Feb 2025',
    amount: '$13,100',
    paid: '$13,100',
    status: 'Paid',
    paymentMode: 'Card',
    dueDate: '12 Feb 2025'
  },
  {
    id: 'INV00015',
    customer: 'Amelia Anderson',
    avatar: '/images/avatars/15.png',
    createdOn: '03 Feb 2025',
    amount: '$9,750',
    paid: '$2,000',
    status: 'Partially Paid',
    paymentMode: 'Cash',
    dueDate: '15 Feb 2025'
  },
  {
    id: 'INV00016',
    customer: 'Benjamin Thomas',
    avatar: '/images/avatars/16.png',
    createdOn: '06 Feb 2025',
    amount: '$4,500',
    paid: '$0',
    status: 'Unpaid',
    paymentMode: 'UPI',
    dueDate: '18 Feb 2025'
  },
  {
    id: 'INV00017',
    customer: 'Harper Jackson',
    avatar: '/images/avatars/17.png',
    createdOn: '08 Feb 2025',
    amount: '$21,000',
    paid: '$21,000',
    status: 'Paid',
    paymentMode: 'Bank Transfer',
    dueDate: '20 Feb 2025'
  },
  {
    id: 'INV00018',
    customer: 'Lucas White',
    avatar: '/images/avatars/18.png',
    createdOn: '10 Feb 2025',
    amount: '$6,400',
    paid: '$0',
    status: 'Cancelled',
    paymentMode: 'Cash',
    dueDate: '22 Feb 2025'
  },
  {
    id: 'INV00019',
    customer: 'Ella Martin',
    avatar: '/images/avatars/19.png',
    createdOn: '12 Feb 2025',
    amount: '$17,800',
    paid: '$10,000',
    status: 'Partially Paid',
    paymentMode: 'Card',
    dueDate: '28 Feb 2025'
  },
  {
    id: 'INV00020',
    customer: 'Henry Garcia',
    avatar: '/images/avatars/20.png',
    createdOn: '14 Feb 2025',
    amount: '$5,200',
    paid: '$5,200',
    status: 'Paid',
    paymentMode: 'Bank Transfer',
    dueDate: '01 Mar 2025'
  },
  {
    id: 'INV00021',
    customer: 'Scarlett Rodriguez',
    avatar: '/images/avatars/21.png',
    createdOn: '16 Feb 2025',
    amount: '$11,600',
    paid: '$0',
    status: 'Refunded',
    paymentMode: 'UPI',
    dueDate: '—'
  },
  {
    id: 'INV00022',
    customer: 'Daniel Perez',
    avatar: '/images/avatars/22.png',
    createdOn: '18 Feb 2025',
    amount: '$14,900',
    paid: '$14,900',
    status: 'Paid',
    paymentMode: 'Card',
    dueDate: '05 Mar 2025'
  },
  {
    id: 'INV00023',
    customer: 'Grace Hall',
    avatar: '/images/avatars/23.png',
    createdOn: '20 Feb 2025',
    amount: '$3,300',
    paid: '$0',
    status: 'Upcoming',
    paymentMode: 'Cash',
    dueDate: '12 Mar 2025'
  },
  {
    id: 'INV00024',
    customer: 'Matthew Young',
    avatar: '/images/avatars/24.png',
    createdOn: '21 Feb 2025',
    amount: '$22,500',
    paid: '$22,500',
    status: 'Paid',
    paymentMode: 'Bank Transfer',
    dueDate: '10 Mar 2025'
  },
  {
    id: 'INV00025',
    customer: 'Victoria Allen',
    avatar: '/images/avatars/25.png',
    createdOn: '22 Feb 2025',
    amount: '$10,000',
    paid: '$5,000',
    status: 'Paid',
    paymentMode: 'Cash',
    dueDate: '04 Mar 2025'
  },
  {
    id: 'INV00026',
    customer: 'Jack Scott',
    avatar: '/images/avatars/26.png',
    createdOn: '23 Feb 2025',
    amount: '$9,900',
    paid: '$0',
    status: 'Draft',
    paymentMode: 'UPI',
    dueDate: '—'
  },
  {
    id: 'INV00027',
    customer: 'Chloe Adams',
    avatar: '/images/avatars/27.png',
    createdOn: '24 Feb 2025',
    amount: '$7,100',
    paid: '$7,100',
    status: 'Paid',
    paymentMode: 'Card',
    dueDate: '08 Mar 2025'
  },
  {
    id: 'INV00028',
    customer: 'Samuel Baker',
    avatar: '/images/avatars/28.png',
    createdOn: '25 Feb 2025',
    amount: '$19,200',
    paid: '$12,000',
    status: 'Partially Paid',
    paymentMode: 'Bank Transfer',
    dueDate: '15 Mar 2025'
  },
  {
    id: 'INV00029',
    customer: 'Zoe Phillips',
    avatar: '/images/avatars/29.png',
    createdOn: '26 Feb 2025',
    amount: '$8,300',
    paid: '$0',
    status: 'Overdue',
    paymentMode: 'Cash',
    dueDate: '10 Mar 2025'
  },
  {
    id: 'INV00030',
    customer: 'Andrew Campbell',
    avatar: '/images/avatars/30.png',
    createdOn: '27 Feb 2025',
    amount: '$16,700',
    paid: '$16,700',
    status: 'Refunded',
    paymentMode: 'Card',
    dueDate: '—'
  }
]

interface InvoiceTableProps {
  invoiceTabsList: string[]
  activeTab: string
}
const InvoiceTableGrid = ({ invoiceTabsList, activeTab }: InvoiceTableProps) => {
  // ** States
  const [data] = useState(invoices)
  const [pageSize, setPageSize] = useState(10)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<any[]>([])

  // ** Tabs
  const invoiceTabsKeysValue = invoiceTabsList.reduce((acc, curr, index) => {
    acc[`${index + 1}`] = curr
    return acc
  }, {} as Record<string, string>)

  // ** Handle Search
  const handleSearch = (value: string) => {
    setSearchText(value)
    const regex = new RegExp(escapeRegExp(value), 'i')

    const rows = data.filter(row => Object.keys(row).some(field => regex.test(String((row as any)[field]))))

    setFilteredData(value.length ? rows : [])
  }

  useEffect(() => {
    if (activeTab == '1') {
      setFilteredData([])
    }
    setFilteredData(data.filter(invoice => invoice.status == invoiceTabsKeysValue[activeTab]))
  }, [activeTab])
  return (
    <Card>
      <DataGrid
        autoHeight
        rows={filteredData.length ? filteredData : data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 50]}
        onPageSizeChange={size => setPageSize(size)}
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)
          }
        }}
      />
    </Card>
  )
}

export default InvoiceTableGrid

/*


*/

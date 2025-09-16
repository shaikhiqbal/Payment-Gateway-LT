import { Box, Button, Skeleton, Typography } from '@mui/material'

const column: any[] = [
  {
    flex: 0.25,
    field: 'createdAt',
    minWidth: 120,
    headerName: 'Date',
    renderCell: ({ row }: any) => <Typography>{row.createdAt}</Typography>
  },
  {
    flex: 0.25,
    field: 'customerName',
    minWidth: 120,
    headerName: 'Name',
    renderCell: ({ row }: any) => <Typography>{row.customerName}</Typography>
  },
  {
    flex: 0.25,
    field: 'product',
    minWidth: 120,
    headerName: 'Product',
    renderCell: ({ row }: any) => <Typography>{row.product}</Typography>
  },
  {
    flex: 0.25,
    field: 'amount',
    minWidth: 120,
    headerName: 'Amount',
    renderCell: ({ row }: any) => <Typography>{row.amount}</Typography>
  },
  {
    flex: 0.25,
    field: 'contact',
    minWidth: 120,
    headerName: 'Contact',
    renderCell: ({ row }: any) => <Typography>{row.contact}</Typography>
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: (params: any) => (
      <Typography
        sx={{
          color:
            params.value === 'Approved'
              ? 'green'
              : params.value === 'Declined'
              ? 'red'
              : params.value === 'Pending'
              ? 'orange'
              : 'blue'
        }}
      >
        {params.value}
      </Typography>
    )
  },
  {
    flex: 0.25,
    field: 'remark',
    minWidth: 120,
    headerName: 'Remark',
    renderCell: ({ row }: any) => <Typography>{row.remark}</Typography>
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 120,
    renderCell: () => (
      <Button variant='contained' size='small'>
        View
      </Button>
    )
  }
]

// Fake array according to column length, should be 10
export const fakeRows = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  createdAt: '2024-06-01',
  customerName: `Customer ${i + 1}`,
  product: `Product ${i + 1}`,
  amount: `$${(100 + i * 10).toFixed(2)}`,
  contact: `contact${i + 1}@email.com`,
  status: ['Approved', 'Declined', 'Pending', 'Processing'][i % 4],
  remark: `Remark ${i + 1}`,
  action: ''
}))

const columnSkeleton = []

export { columnSkeleton }
export default column

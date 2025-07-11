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

const columnSkeleton = []

export const SkeletonLoader = () => (
  <Box sx={{ width: '100%', height: 400, p: 2 }}>
    {[...Array(10)].map((_, i) => (
      <Skeleton key={i} height={50} sx={{ mb: 1 }} />
    ))}
  </Box>
)

export { columnSkeleton }
export default column

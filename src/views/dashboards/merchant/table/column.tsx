// ** MUI
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Componensts
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

export const columns: GridColumns = [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'date',
    headerName: 'Date',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.date}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'id',
    headerName: 'ID',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.id}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'customer_name',
    headerName: 'Customer Name',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.customer_name}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'product',
    headerName: 'Product',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.product}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'amount',
    headerName: 'Amount',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        ${params.row.amount}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'contact',
    headerName: 'Contact Number',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.contact}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 160,
    field: 'remark',
    headerName: 'Remark',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.remark}
      </Typography>
    )
  }
]

export const loaderColumns: GridColumns = [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'date',
    headerName: 'Date',
    renderCell: () => <Skeleton variant='text' width={80} height={20} />
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'id',
    headerName: 'ID',
    renderCell: () => <Skeleton variant='text' width={40} height={20} />
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'customer_name',
    headerName: 'Customer Name',
    renderCell: () => <Skeleton variant='text' width={100} height={20} />
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'product',
    headerName: 'Product',
    renderCell: () => <Skeleton variant='text' width={80} height={20} />
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'amount',
    headerName: 'Amount',
    renderCell: () => <Skeleton variant='text' width={60} height={20} />
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'contact',
    headerName: 'Contact Number',
    renderCell: () => <Skeleton variant='text' width={120} height={20} />
  },
  {
    flex: 0.25,
    minWidth: 160,
    field: 'remark',
    headerName: 'Remark',
    renderCell: () => <Skeleton variant='text' width={140} height={20} />
  }
]

export const fakeRows = new Array(10).fill(null).map((_, index) => ({
  id: `loading-${index}`
}))

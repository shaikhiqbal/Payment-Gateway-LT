// ** MUI Imports
import Typography from '@mui/material/Typography'
import { Skeleton } from '@mui/material'

// ** Utils
import { formatDate } from 'src/@core/utils/format'

// ** Types Import
import { PermissionTableRowType } from 'src/types/pages/permission'

// ** Types
export interface CellType {
  row: PermissionTableRowType
}

export const defaultColumns = [
  {
    flex: 0.25,
    field: 'name',
    minWidth: 240,
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.roleName}</Typography>
  },

  {
    flex: 0.25,
    minWidth: 210,
    field: 'createdDate',
    headerName: 'Created Date',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{formatDate(row.createdAt)}</Typography>
    )
  }
]

export const skeletonColumns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.25,
    minWidth: 240,
    renderCell: () => <Skeleton variant='text' width='80%' height={24} />
  },
  {
    field: 'createdDate',
    headerName: 'Created Date',
    flex: 0.25,
    minWidth: 210,
    renderCell: () => <Skeleton variant='text' width='60%' height={24} />
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 0.15,
    minWidth: 120,
    sortable: false,
    renderCell: () => (
      <>
        <Skeleton variant='circular' width={24} height={24} sx={{ mr: 2 }} />
        <Skeleton variant='circular' width={24} height={24} />
      </>
    )
  }
]

// ** Sekeleton Row
export const skeletonRows = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  uid: `skeleton-${i}` // only needed if you use getRowId
}))

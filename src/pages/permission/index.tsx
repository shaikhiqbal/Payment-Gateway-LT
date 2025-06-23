import { useState, useEffect, useCallback, FormEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import CustomChip from 'src/@core/components/mui/chip'

// ** Redux Action & Hook
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/permissions'
import { RootState, AppDispatch } from 'src/store'

// ** Custome Components
import Icon from 'src/@core/components/icon'

// ** Theme
import { ThemeColor } from 'src/@core/layouts/types'

// ** Components
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/pages/permission/TableHeader'

// ** Types Import
import { PermissionRowType } from 'src/types/apps/permissionTypes'
import { PermissionFormValueType, PermissionListType, ActionType } from 'src/types/pages/permission'

// ** Axios
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'
import { convertListToFormat } from 'src/views/pages/permission/utils'

// ** Types
interface Colors {
  [key: string]: ThemeColor
}

interface CellType {
  row: PermissionRowType
}

const colors: Colors = {
  support: 'info',
  users: 'success',
  manager: 'warning',
  administrator: 'primary',
  'restricted-user': 'error'
}

const defaultColumns = [
  {
    flex: 0.25,
    field: 'name',
    minWidth: 240,
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
  },
  {
    flex: 0.35,
    minWidth: 290,
    field: 'assignedTo',
    headerName: 'Assigned To',
    renderCell: ({ row }: CellType) => {
      return row.assignedTo.map((assignee: string, index: number) => (
        <CustomChip
          rounded
          size='small'
          key={index}
          skin='light'
          color={colors[assignee]}
          label={assignee.replace('-', ' ')}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, '&:not(:last-of-type)': { mr: 3 } }}
        />
      ))
    }
  },
  {
    flex: 0.25,
    minWidth: 210,
    field: 'createdDate',
    headerName: 'Created Date',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.createdDate}</Typography>
  }
]

const Permission = () => {
  // ** States
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [permissionList, setPermissionList] = useState<PermissionFormValueType<ActionType>[]>([])

  // ** Redux Hook & States
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.permissions)

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  // ** Columns
  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <Icon icon='tabler:edit' />
          </IconButton>
          <IconButton>
            <Icon icon='tabler:trash' />
          </IconButton>
        </Box>
      )
    }
  ]

  // ** Fetch Permission
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(endpoints.permission.getAll)
        const { data } = response
        setPermissionList(convertListToFormat(data))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant='h5' sx={{ mb: 6 }}>
                Permissions List
              </Typography>
            }
            subtitle={
              <Typography sx={{ color: 'text.secondary' }}>
                Each category (Basic, Professional, and Business) includes the four predefined roles shown below.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} permissionList={permissionList} />
            <DataGrid
              autoHeight
              rows={store.data}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

Permission.acl = {
  action: 'read',
  subject: 'permission'
}

export default Permission

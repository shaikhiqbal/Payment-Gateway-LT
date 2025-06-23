import { useState, useEffect, useCallback, FormEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { Backdrop, Skeleton } from '@mui/material'

// ** Utils
import { formatDate } from 'src/@core/utils/format'

// ** Custome Components
import Icon from 'src/@core/components/icon'

// ** Components
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/pages/permission/TableHeader'

// ** Types Import
import { PermissionRowType } from 'src/types/apps/permissionTypes'
import { PermissionFormValueType, ActionType, PermissionTableRowType } from 'src/types/pages/permission'

// ** Axios
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'
import { convertListToFormat } from 'src/views/pages/permission/utils'
import { BounceLoader } from 'react-spinners'
import PermisionRoleTrashDialog from 'src/views/pages/permission/PermisionRoleTrashDialog'

// ** Types

interface CellType {
  row: PermissionTableRowType
}

const defaultColumns = [
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

const skeletonColumns = [
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

const Permission = () => {
  // ** States
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [permissionList, setPermissionList] = useState<PermissionFormValueType<ActionType>[]>([])
  const [rows, setRows] = useState<PermissionTableRowType[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [editLoader, setEditLoader] = useState<boolean>(false)
  const [selectedRowUid, setSelectedRowUid] = useState<string>('')

  // ** Handle Dialog Trash
  const handleTrashToggle = (id: string | undefined) => {
    const isOpen = open
    if (!isOpen) {
      setOpen(true)
      if (typeof id === 'string') {
        setSelectedRowUid(id)
      }
    } else {
      setSelectedRowUid('')
      setOpen(false)
    }
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  // ** Handle Delete
  const handleDelete = async (id: string) => {
    try {
    } catch (error) {
    } finally {
    }
  }

  // ** Edit Permission
  const handleEdit = async (uid: string) => {
    try {
      setEditLoader(true)
      const response = await axios.get(`${endpoints.rolePermission.endpoint}/${uid}`)
      console.log(response)
    } catch (error) {
    } finally {
      setEditLoader(false)
    }
  }

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
          <IconButton onClick={() => handleEdit(row.uid)}>
            <Icon icon='tabler:edit' />
          </IconButton>
          <IconButton onClick={() => handleTrashToggle(row.uid)}>
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

  // ** Fetch Table List
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoints.rolePermission.endpoint)
        const result = response.data.content.result

        const transformed: PermissionTableRowType[] = result.map((item: any, id: number) => ({
          id,
          uid: item.uid,
          roleName: item.roleName,
          createdAt: item.createdAt
        }))

        setRows(transformed)
      } catch (error) {
        console.log('Error fetching permission data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      setLoading(true)
    }
  }, [])

  // ** Sekeleton Row
  const skeletonRows = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    uid: `skeleton-${i}` // only needed if you use getRowId
  }))

  return (
    <>
      {/* For Edit Backdrop */}
      <Backdrop sx={theme => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={editLoader}>
        <BounceLoader color='#fff' />
      </Backdrop>
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
            {loading ? (
              <DataGrid
                autoHeight
                rows={skeletonRows}
                columns={skeletonColumns}
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50]}
                getRowId={row => row.uid}
              />
            ) : (
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50]}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                getRowId={row => row.uid}
              />
            )}
          </Card>
        </Grid>
      </Grid>
      <PermisionRoleTrashDialog open={open} handleTrashToggle={handleTrashToggle} />
    </>
  )
}

Permission.acl = {
  action: 'read',
  subject: 'permission'
}

export default Permission

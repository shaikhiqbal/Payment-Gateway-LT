import { useState, useEffect, useCallback, FormEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { Backdrop, Skeleton } from '@mui/material'

// ** Coloumn & Skeleton
import { skeletonRows, skeletonColumns, defaultColumns, CellType } from 'src/views/pages/permission/column'

// ** Custome Components
import Icon from 'src/@core/components/icon'

// ** Components
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/pages/permission/TableHeader'

// ** Types Import
import { PermissionFormValueType, ActionType, PermissionTableRowType } from 'src/types/pages/permission'

// ** Axios
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'

// ** Third Party Imports
import { BounceLoader } from 'react-spinners'

// ** Dialog Imports
import PermisionRoleTrashDialog from 'src/views/pages/permission/PermisionRoleTrashDialog'

// ** Utils
import { convertListToFormat, formEditPermisions } from 'src/views/pages/permission/utils'

type Mode = 'add' | 'edit' | 'cancle'

interface EditFormValueType {
  roleName: string
  permissions: PermissionFormValueType<ActionType>[]
  uid: string
}

const Permission = () => {
  // ** States
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [permissionList, setPermissionList] = useState<PermissionFormValueType<ActionType>[]>([])
  const [rows, setRows] = useState<PermissionTableRowType[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [editLoader, setEditLoader] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<PermissionTableRowType | null>(null)
  const [editRowData, setEditRowData] = useState<EditFormValueType>({
    roleName: '',
    permissions: [],
    uid: ''
  })

  // ** Handle Dialog Trash
  const handleTrashToggle = (row: PermissionTableRowType | null, resetTable?: boolean | undefined) => {
    const isOpen = open
    if (!isOpen) {
      setOpen(true)
      if (typeof row === 'object') {
        setSelectedRow(row)
      }
    } else {
      setSelectedRow(null)
      setOpen(false)
    }
    if (resetTable) {
      fetchData()
    }
  }

  const handleEditToggle = (submitType: Mode) => {
    if (submitType === 'edit') {
      setEditRowData({ roleName: '', permissions: [], uid: '' })
      fetchData()
    } else if (submitType == 'add') {
      fetchData()
    } else if (submitType == 'cancle' && Object.values(editRowData).every(v => v.length)) {
      setEditRowData({ roleName: '', permissions: [], uid: '' })
    }
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  // ** Edit Permission
  const handleEdit = async (uid: string) => {
    try {
      setEditLoader(true)
      const response = await axios.get(`${endpoints.rolePermission.endpoint}/${uid}`)
      setEditRowData({
        roleName: response.data.content.roleName,
        permissions: formEditPermisions([...permissionList], response.data.content),
        uid: response.data.content.uid
      })
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
          <IconButton onClick={() => handleTrashToggle(row)}>
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

  async function fetchData() {
    setLoading(true)
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

  // ** Fetch Table List
  useEffect(() => {
    fetchData()
    return () => {
      setRows([])
    }
  }, [])

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
                Roles List
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
            <TableHeader
              value={value}
              handleFilter={handleFilter}
              permissionList={permissionList}
              editRowFormDetails={{ ...editRowData }}
              handleEditToggle={handleEditToggle}
            />
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
      <PermisionRoleTrashDialog open={open} handleTrashToggle={handleTrashToggle} selectedRow={selectedRow} />
    </>
  )
}

Permission.acl = {
  action: 'read',
  subject: 'permission'
}

export default Permission

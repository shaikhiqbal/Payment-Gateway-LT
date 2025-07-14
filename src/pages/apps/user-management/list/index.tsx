import React, { useState, useCallback, MouseEvent, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Menu from '@mui/material/Menu'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Axios
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user-management/list/TableHeader'
import AddMerchantDrawer from 'src/views/apps/user-management/list/AddMerchantDrawer'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { MerchantType } from 'src/types/apps/merchantTypes'
import { PermissionTableRowType } from 'src/types/pages/permission'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { TextField } from '@mui/material'

// ** Types Imports

// ** Types
interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: MerchantType
}

// ** renders client column

const renderClient = ({ firstName }: MerchantType) => {
  return (
    <CustomAvatar
      skin='light'
      color={'primary'}
      sx={{ mr: 2.5, width: 38, height: 38, fontSize: '1rem', fontWeight: 500 }}
    >
      {getInitials(firstName ? firstName : 'John Doe')}
    </CustomAvatar>
  )
}

const columns = [
  {
    flex: 0.2,
    minWidth: 280,
    field: 'firstName',
    headerName: 'Full Name',
    renderCell: ({ row }: CellType) => {
      const { firstName, lastName, emailId } = row
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/apps/user/view/account'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {emailId}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.15,
    minWidth: 150,
    field: 'phone',
    headerName: 'Phone',
    renderCell: ({ row }: CellType) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row.mobileNum}
      </Typography>
    )
  }
]

const UserList = () => {
  // ** State

  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [roleList, setRoleList] = useState<PermissionTableRowType[]>([])
  const [rows, setRows] = useState<MerchantType[]>([])
  const [editRow, setEditRow] = useState<MerchantType | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const columnmWithAction = [
    ...columns,
    {
      flex: 0.1,
      minWidth: 120,
      field: 'report',
      headerName: 'Report',
      renderCell: ({ row }: CellType) => (
        <Link href={`/apps/user-management/reports/${row.id}`}>
          <IconButton aria-label='capture screenshot' color='secondary'>
            <Icon icon='material-symbols:bar-chart-4-bars' />
          </IconButton>
        </Link>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'manage',
      headerName: 'Manage',
      renderCell: ({ row }: CellType) => (
        <IconButton aria-label='capture screenshot' color='secondary'>
          <Icon icon='material-symbols:manage-accounts-outline' />
        </IconButton>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <>
          <IconButton size='small' onClick={handleRowOptionsClick}>
            <Icon icon='tabler:dots-vertical' />
          </IconButton>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={rowOptionsOpen}
            onClose={handleRowOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            PaperProps={{ style: { minWidth: '8rem' } }}
          >
            <MenuItem
              onClick={() => {
                toggleAddUserDrawer()
                handleRowOptionsClose()
                setEditRow(row)
              }}
              sx={{ '& svg': { mr: 2 } }}
            >
              <Icon icon='tabler:edit' fontSize={20} />
              Edit
            </MenuItem>
            <MenuItem
              component={Link}
              sx={{ '& svg': { mr: 2 } }}
              href='/apps/user/view/account'
              onClick={handleRowOptionsClose}
            >
              <Icon icon='material-symbols:block' fontSize={20} />
              Block
            </MenuItem>
            <MenuItem sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='tabler:trash' fontSize={20} />
              Delete
            </MenuItem>
          </Menu>
        </>
      )
    }
  ]

  // ** Fetch Role Names & Permission
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
        setRoleList(transformed)
      } catch (error) {
        console.log('Error fetching permission data:', error)
      } finally {
      }
    }
    fetchData()
    return () => {}
  }, [])

  // ** fetch user data
  function fetchUsers() {
    axios.get(endpoints.userManagement.getAll).then(response => {
      const result = response.data.content.result.map((obj: MerchantType, id: number) => ({ ...obj, id }))
      setRows(result)
    })
  }

  // ** Fetch User Data
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id='search'
                    label='Full Name & Username'
                    placeholder='Search'
                    variant='outlined'
                  />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField fullWidth id='search' label='Email' placeholder='Search' variant='outlined' />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <FormControl fullWidth>
                    <TextField fullWidth id='search' label='Phone' placeholder='Search' variant='outlined' />
                  </FormControl>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={rows}
            columns={columnmWithAction}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      <AddMerchantDrawer
        open={addUserOpen}
        toggle={toggleAddUserDrawer}
        roleList={roleList}
        editRow={editRow}
        setEditRow={setEditRow}
        fetchUsers={fetchUsers}
      />
    </Grid>
  )
}

UserList.acl = {
  action: 'read',
  subject: 'user-management'
}

export default UserList

/*
/apps/user-management/list/
 */

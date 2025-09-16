import React, { useState, useCallback, MouseEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Menu from '@mui/material/Menu'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { TextField, Alert, Button } from '@mui/material'

// ** Axios
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user-management/list/TableHeader'
import AddMerchantDrawer from 'src/views/apps/user-management/list/AddMerchantDrawer'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { MerchantType } from 'src/types/apps/merchantTypes'
import { PermissionTableRowType } from 'src/types/pages/permission'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ————————————————————————————————————————
// Helpers & column defs
// ————————————————————————————————————————

interface CellType {
  row: MerchantType
}

const renderClient = ({ firstName }: MerchantType) => {
  return (
    <CustomAvatar
      skin='light'
      color='primary'
      sx={{ mr: 2.5, width: 38, height: 38, fontSize: '1rem', fontWeight: 500 }}
    >
      {getInitials(firstName || 'John Doe')}
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

// ————————————————————————————————————————
// Data fetchers
// ————————————————————————————————————————

const fetchUsers = async (): Promise<MerchantType[]> => {
  const response = await axios.get(endpoints.userManagement.getAll)
  // Ensure each row has a unique "id" for DataGrid
  return response.data.content.result.map((obj: MerchantType, idx: number) => ({ ...obj, id: obj.id ?? idx }))
}

const fetchRoles = async (): Promise<PermissionTableRowType[]> => {
  const response = await axios.get(endpoints.rolePermission.endpoint)
  const result = response.data.content.result
  return result.map((item: any, idx: number) => ({
    id: idx,
    uid: item.uid,
    roleName: item.roleName,
    createdAt: item.createdAt
  }))
}

// ————————————————————————————————————————
// Component
// ————————————————————————————————————————

const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [editRow, setEditRow] = useState<MerchantType | null>(null)

  //** Row actions menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleRowOptionsClose = () => setAnchorEl(null)

  const handleFilter = useCallback((val: string) => setValue(val), [])
  const toggleAddUserDrawer = () => setAddUserOpen(prev => !prev)

  // —— Users query
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
    isError: isUsersError,
    error: usersError,
    refetch: refetchUsers
  } = useQuery({
    queryKey: ['users'], // add filters/pagination here if server-side filtering
    queryFn: fetchUsers,
    staleTime: 60 * 1000, // cache as fresh for 1 min
    refetchOnWindowFocus: true // change as you prefer
  })

  // —— Roles query
  const {
    data: roleList = [],
    isLoading: isLoadingRoles,
    isError: isRolesError,
    error: rolesError,
    refetch: refetchRoles
  } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })

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
        <Link href={`/apps/user-management/manage/${row.id}`}>
          <IconButton aria-label='capture screenshot' color='secondary'>
            <Icon icon='material-symbols:manage-accounts-outline' />
          </IconButton>
        </Link>
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
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                    id='search-name'
                    label='Full Name & Username'
                    placeholder='Search'
                    value={value}
                    onChange={e => handleFilter(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField fullWidth id='search-email' label='Email' placeholder='Search' />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField fullWidth id='search-phone' label='Phone' placeholder='Search' />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>

          {/* Errors (users / roles) */}
          {(isUsersError || isRolesError) && (
            <Box px={3} pb={2}>
              {isUsersError && (
                <Alert severity='error' sx={{ mb: 2 }}>
                  Failed to load users: {(usersError as Error)?.message || 'Unknown error'}
                </Alert>
              )}
              {isRolesError && (
                <Alert severity='error'>
                  Failed to load roles: {(rolesError as Error)?.message || 'Unknown error'}
                </Alert>
              )}
            </Box>
          )}

          <Divider sx={{ m: '0 !important' }} />

          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />

          <DataGrid
            autoHeight
            rowHeight={62}
            rows={users}
            columns={columnmWithAction}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            loading={isLoadingUsers || isFetchingUsers}
            // If your API returns a different primary key, you can set getRowId here instead of mapping id above:
            // getRowId={(row) => row.uid}
          />

          {/* Optional manual refresh */}
          <Box display='flex' gap={2} p={3}>
            <Button onClick={() => refetchUsers()} variant='outlined' startIcon={<Icon icon='mdi:refresh' />}>
              Refresh Users
            </Button>
            <Button onClick={() => refetchRoles()} variant='outlined' startIcon={<Icon icon='mdi:refresh' />}>
              Refresh Roles
            </Button>
          </Box>
        </Card>
      </Grid>

      <AddMerchantDrawer
        open={addUserOpen}
        toggle={toggleAddUserDrawer}
        roleList={roleList}
        editRow={editRow}
        setEditRow={setEditRow}
        // Keep your existing prop name; under the hood we call react-query's refetch
        fetchUsers={refetchUsers}
      />
    </Grid>
  )
}

UserList.acl = {
  action: 'read',
  subject: 'user-management'
}

export default UserList

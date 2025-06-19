import React, { useState, useCallback, MouseEvent } from 'react'

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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user-management/list/TableHeader'
import AddMerchantDrawer from 'src/views/apps/user-management/list/AddMerchantDrawer'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { MerchantType } from 'src/types/apps/merchantTypes'
import { CardStatsHorizontalWithDetailsProps } from 'src/@core/components/card-statistics/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'
import { TextField } from '@mui/material'

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

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
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
// ** renders client column
const userRoleObj: UserRoleType = {
  admin: { icon: 'tabler:device-laptop', color: 'secondary' },
  author: { icon: 'tabler:circle-check', color: 'success' },
  editor: { icon: 'tabler:edit', color: 'info' },
  maintainer: { icon: 'tabler:chart-pie-2', color: 'primary' },
  subscriber: { icon: 'tabler:user', color: 'warning' }
}

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Store & Actions
  const dispatch = (action: any) => {}

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  return (
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
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
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
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
const fakeRows: MerchantType[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    countryCode: '+1',
    phone: '1234567890',
    username: 'johndoe',
    password: 'password123',
    isAdminAccess: true,
    manageTransaction: true,
    report: false,
    technicale: true,
    avatarColor: 'primary'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    countryCode: '+44',
    phone: '9876543210',
    username: 'janesmith',
    password: 'password456',
    isAdminAccess: false,
    manageTransaction: true,
    report: true,
    technicale: false,
    avatarColor: 'success'
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@email.com',
    countryCode: '+91',
    phone: '5551234567',
    username: 'michaelj',
    password: 'password789',
    isAdminAccess: false,
    manageTransaction: false,
    report: true,
    technicale: true,
    avatarColor: 'warning'
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    countryCode: '+61',
    phone: '4445556666',
    username: 'emilydavis',
    password: 'password321',
    isAdminAccess: true,
    manageTransaction: false,
    report: false,
    technicale: false,
    avatarColor: 'info'
  },
  {
    id: 5,
    firstName: 'William',
    lastName: 'Brown',
    email: 'william.brown@email.com',
    countryCode: '+81',
    phone: '3332221111',
    username: 'williambrown',
    password: 'password654',
    isAdminAccess: false,
    manageTransaction: true,
    report: false,
    technicale: true,
    avatarColor: 'secondary'
  }
]

const columns = [
  {
    flex: 0.2,
    minWidth: 280,
    field: 'firstName',
    headerName: 'Full Name',
    renderCell: ({ row }: CellType) => {
      const { firstName, lastName, email } = row
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
              {email}
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
        {row.countryCode} {row.phone}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'username',
    headerName: 'Username',
    renderCell: ({ row }: CellType) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row.username}
      </Typography>
    )
  },

  {
    flex: 0.1,
    minWidth: 120,
    field: 'report',
    headerName: 'Report',
    renderCell: ({ row }: CellType) => (
      <IconButton aria-label='capture screenshot' color='secondary'>
        <Icon icon='material-symbols:bar-chart-4-bars' />
      </IconButton>
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
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  }
]

const UserList = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        {/* {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontalWithDetails.map((item: CardStatsHorizontalWithDetailsProps, index: number) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              )
            })}
          </Grid>
        )} */}
      </Grid>
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
            rows={fakeRows}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      <AddMerchantDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

UserList.acl = {
  action: 'read',
  subject: 'user-management'
}

export default UserList

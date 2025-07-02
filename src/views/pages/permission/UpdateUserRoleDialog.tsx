import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import Alert from '@mui/material/Alert'

// ** Icon Import
import Icon from 'src/@core/components/icon'

// ** Axios
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'

// ** Third party Loader
import { BeatLoader } from 'react-spinners'

// ** Types
import { PermissionTableRowType } from 'src/types/pages/permission'
import { UserListAndDetailShap } from './PermisionRoleTrashDialog'

const userColumns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'fullName',
    headerName: 'Full Name',
    valueGetter: ({ row }) => `${row.firstName} ${row.lastName}`,
    renderCell: ({ row }) => (
      <Box>
        <strong>
          {row.firstName} {row.lastName}
        </strong>
      </Box>
    )
  },
  {
    flex: 0.25,
    minWidth: 220,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }) => (
      <Box>
        <span>{row.email}</span>
      </Box>
    )
  },
  {
    flex: 0.2,
    minWidth: 160,
    field: 'mobileNum',
    headerName: 'Phone',
    renderCell: ({ row }) => <span>{row.mobileNum}</span>
  }
]

const UpdateUserRoleDialog = (props: UserListAndDetailShap) => {
  //** Props */
  const { users, message, selectedRow, handleCloseUsers } = props

  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [roles, setRoles] = useState<PermissionTableRowType[]>([])

  const fetchData = async function () {
    try {
      const response = await axios.get(endpoints.rolePermission.endpoint)
      const result = response.data.content.result

      const transformed: PermissionTableRowType[] = result.map((item: any, id: number) => ({
        id,
        uid: item.uid,
        roleName: item.roleName,
        createdAt: item.createdAt
      }))
      return transformed
    } catch (error) {
      console.log('Error fetching permission data:', error)
    } finally {
    }
  }

  const column = [
    ...userColumns,
    {
      flex: 0.2,
      minWidth: 160,
      field: 'userRoles',
      headerName: 'Role Assigned',
      renderCell: ({ row }: { row: PermissionTableRowType }) => (
        <Box>
          <Select labelId='userRoles-label' size='small' label='Select Role Name' id='userRoles' defaultValue=''>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {fetchData?.map((role: PermissionTableRowType) => (
              <MenuItem value={role.uid} key={role.uid}>
                {role.roleName as string}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )
    }
  ]

  // ** Dialog handler
  useEffect(() => {
    if (users?.length) {
      setOpen(true)
    }
    return () => setOpen(false)
  }, [users])

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
        setRoles(transformed)
      } catch (error) {
        console.log('Error fetching permission data:', error)
      }
    }

    if (!roles.length) fetchData()
  }, [])
  return (
    <Dialog
      open={open}
      //   onClose={() => handleTrashToggle(undefined)}
      maxWidth={'lg'}
      fullWidth={true}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        <Alert severity='warning'>
          {message}
          Please Update the user role then it will be deleted
        </Alert>
      </DialogTitle>
      <DialogContent>
        <DialogContent>
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={users.map((u, i) => ({ id: i, ...u }))}
            columns={userColumns}
            pageSize={5}
            disableSelectionOnClick
            rowsPerPageOptions={[5, 10, 25]}
          />
        </DialogContent>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button color='secondary' variant='outlined'>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='error'
            startIcon={<Icon icon='tabler:trash' />}
            // onClick={() => handleDelete(selectedRowUid)}
          >
            {/* {isDeleting ? <BeatLoader size={15} color='#ffffff' /> : 'Delete'} */}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateUserRoleDialog

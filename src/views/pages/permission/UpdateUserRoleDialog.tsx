import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import Alert from '@mui/material/Alert'
import { FormControl, InputLabel, FormHelperText } from '@mui/material'

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

// ** React Hook Form Imports
import { Controller, useForm, useFieldArray } from 'react-hook-form'

// ** Types Imports
import { UserType } from 'src/types/pages/permission'

// ** Types
interface FormValues {
  users: UserType[]
  userRole: string
}

// ** Custom Components Imports
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
  const { users, message, selectedRow, handleCloseUsers, handleDelete } = props

  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [roles, setRoles] = useState<PermissionTableRowType[]>([])
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  // ** React Hook Form
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    watch,
    getValues
  } = useForm<FormValues>({
    defaultValues: {
      users: [],
      userRole: ''
    }
  })

  const { fields: userList } = useFieldArray({
    control,
    name: 'users'
  })

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

  const column: GridColDef[] = [
    ...userColumns,
    {
      flex: 0.2,
      minWidth: 160,
      field: 'userRoles',
      headerName: 'Role Assigned',
      renderCell: params => {
        const index = userList.findIndex(u => u.uid === params.row.uid)
        return (
          <Box>
            <Controller
              control={control}
              name={`users.${index}.roleName` as const}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId='userRoles-label'
                  size='small'
                  label='Select Role Name'
                  id='userRoles'
                  defaultValue=''
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {roles.map((role: PermissionTableRowType) => (
                    <MenuItem value={role.uid} key={role.uid}>
                      {role.roleName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Box>
        )
      }
    }
  ]

  // ** Dialog handler
  const handleTrashToggle = () => {
    setOpen(false)
    handleCloseUsers()
  }

  // ** Dialog handler
  useEffect(() => {
    if (users?.length) {
      reset({
        users: users.map(u => ({ ...u, roleName: selectedRow?.uid })),
        userRole: selectedRow ? selectedRow?.uid : ''
      })
      setOpen(true)
    }
    return () => setOpen(false)
  }, [users])

  // ** Form submit handler
  const onSubmit = async (data: FormValues) => {
    try {
      setIsDeleting(true)
      if (data.userRole === selectedRow?.uid) {
        setError('userRole', {
          type: 'manual',
          message: 'Please select a different role to delete this user.'
        })
        return
      }

      const results = await Promise.all(
        data.users.map((user: UserType) =>
          axios.put(endpoints.userManagement.endpoint + user.uid, {
            emailId: user.email,
            ...user,
            userRoles: { uid: data.userRole }
          })
        )
      )
      if (handleDelete) await handleDelete()
      reset()
      setOpen(false)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  // ** Fetch roles and permissions
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

  useEffect(() => {
    if (watch('userRole') === selectedRow?.uid) {
      setError('userRole', {
        type: 'manual',
        message: 'Please select a different role to delete this permission'
      })
    }

    if (watch('userRole')) {
      const users = getValues('users')
      const updatedUsers = users.map((user: UserType) => ({
        ...user,
        roleName: watch('userRole') // Update the roleName with the selected userRole
      }))
      reset({ users: updatedUsers, userRole: watch('userRole') })
    }
  }, [watch('userRole')])

  return (
    <Dialog
      open={open}
      onClose={handleTrashToggle}
      maxWidth={'lg'}
      fullWidth={true}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      disableEscapeKeyDown
    >
      <DialogTitle id='alert-dialog-title'>
        <Alert severity='warning'>
          {message}
          Please Update the user role then it will be deleted
        </Alert>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormControl
            fullWidth
            sx={{ mb: 4 }}
            //  error={Boolean(errors.userRoles)}
          >
            <InputLabel id='userRoles-label'>Select Role Name</InputLabel>
            <Controller
              control={control}
              name='userRole'
              rules={{
                required: 'Role Name is required!'
              }}
              render={({ field }) => (
                <Select labelId='userRoles-label' label='Select Role Name' {...field} error={Boolean(errors.userRole)}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {roles?.map(role => (
                    <MenuItem value={role.uid} key={role.uid}>
                      {role.roleName as string}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors?.userRole && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.userRole?.message as string}</FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogContent>
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={userList.map((u, i) => ({ ...u, id: u.id ?? i }))}
            columns={column}
            pageSize={5}
            disableSelectionOnClick
            rowsPerPageOptions={[5, 10, 25]}
          />
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
            <Button color='secondary' variant='outlined' onClick={() => handleTrashToggle()}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='error'
              type='submit'
              startIcon={<Icon icon='tabler:trash' />}
              // onClick={() => handleDelete(selectedRowUid)}
            >
              {/* BeatLoader     Update & Delete */}
              {isDeleting ? <BeatLoader size={15} color='#ffffff' /> : 'Delete'}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UpdateUserRoleDialog

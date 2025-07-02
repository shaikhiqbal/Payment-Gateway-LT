import React, { Fragment } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Box from '@mui/material/Box'

// ** Icon Import
import Icon from 'src/@core/components/icon'

// ** Axios
import axios from 'src/configs/axios'
import endpoints from 'src/configs/endpoints'

// ** Third party Loader
import { BeatLoader } from 'react-spinners'
import UpdateUserRoleDialog from './UpdateUserRoleDialog'

// ** Types
import { PermissionTableRowType, UserType } from 'src/types/pages/permission'

export interface UserListAndDetailShap {
  message: string
  selectedRow: PermissionTableRowType | null
  users: UserType[]
  handleCloseUsers: () => void
}
interface PermisionRoleTrashDialogTypes {
  open: boolean
  selectedRow: PermissionTableRowType | null
  handleTrashToggle: (row: PermissionTableRowType | null, resetTable?: boolean) => void
}

const PermisionRoleTrashDialog = (props: PermisionRoleTrashDialogTypes) => {
  // ** Props
  const { open, handleTrashToggle, selectedRow } = props

  const [userListAndDetails, setUserListAndDetails] = React.useState<UserListAndDetailShap>({
    message: '',
    selectedRow: null,
    users: [],
    handleCloseUsers
  })

  // ** States
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      if (selectedRow) {
        const response = await axios.delete(`${endpoints.rolePermission.endpoint}/${selectedRow.uid}`)
        handleTrashToggle(null, true)
      }
    } catch (error) {
      debugger
      const err = error as any
      if (err?.response?.status === 400) {
        if (err.response.data?.content?.users) {
          setUserListAndDetails({
            message: err.response.data.content.message,
            selectedRow: selectedRow,
            users: err.response.data.content.users,
            handleCloseUsers
          })
        }
      }
    } finally {
      setIsDeleting(false)
    }
  }

  function handleCloseUsers() {
    setUserListAndDetails({
      message: '',
      selectedRow: null,
      users: [],
      handleCloseUsers
    })
    handleTrashToggle(null)
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={() => handleTrashToggle(null)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You won't be able to revert this user Role.
          </DialogContentText>
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
            <Button color='secondary' variant='outlined' onClick={() => handleTrashToggle(null)}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='error'
              startIcon={<Icon icon='tabler:trash' />}
              onClick={() => handleDelete()}
            >
              {isDeleting ? <BeatLoader size={15} color='#ffffff' /> : 'Delete'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <UpdateUserRoleDialog {...userListAndDetails} />
    </Fragment>
  )
}

export default PermisionRoleTrashDialog

import React from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Box from '@mui/material/Box'

// ** Icon Import
import Icon from 'src/@core/components/icon' // adjust the path based on your project structure

interface PermisionRoleTrashDialogTypes {
  open: boolean
  handleTrashToggle: (id?: string) => void
}

const PermisionRoleTrashDialog = (props: PermisionRoleTrashDialogTypes) => {
  const { open, handleTrashToggle } = props

  return (
    <Dialog
      open={open}
      onClose={() => handleTrashToggle(undefined)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          You won't be able to revert this user action. It will be reassigned to:
          <strong> John Doe (john@example.com)</strong>
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color='secondary' variant='outlined' onClick={() => handleTrashToggle(undefined)}>
            Cancel
          </Button>
          <Button variant='contained' color='error' startIcon={<Icon icon='tabler:trash' />}>
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default PermisionRoleTrashDialog

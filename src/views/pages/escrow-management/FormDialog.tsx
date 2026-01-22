// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddEcrowForm from './add-escrow'

const FormDialog = () => {
  const theme = useTheme()

  // 📱 Detect screen size
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [open, setOpen] = useState(false)

  //   const [maxWidth] = useState<'xs' | 'sm' | 'md'>('sm')

  return (
    <Fragment>
      <Button variant='outlined' onClick={() => setOpen(true)}>
        Add Escrow
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={isMobile}
        fullWidth
        maxWidth={isMobile ? 'sm' : 'md'}
        aria-labelledby='escrow-dialog-title'
      >
        <DialogTitle id='escrow-dialog-title'>Add Escrow</DialogTitle>
        <DialogContent>
          <AddEcrowForm closeDialog={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default FormDialog

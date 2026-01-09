'use client'

import React from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
// import ACH from './ACH'
// import EVoucherList from './EVoucherList'
// import Wire from '../Wire'
// import QrCode from '../QrCode'

interface ModalHelperProps {
  method: 'ACH' | 'EVoucherList' | 'Wire' | 'QrCode'
  isOpen: boolean
  toggle: () => void
}

const modalSize: Record<ModalHelperProps['method'], 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false> = {
  ACH: 'lg',
  EVoucherList: 'md',
  Wire: 'md',
  QrCode: 'sm'
}

const ModalHelper = ({ method, isOpen, toggle }: ModalHelperProps) => {
  const renderMethod = () => {
    switch (
      method
      // case 'ACH':
      //   return <ACH />
      // case 'EVoucherList':
      //   return <EVoucherList />
      // case 'Wire':
      //   return <Wire />
      // case 'QrCode':
      //   return <QrCode />
      // default:
      //   return null
    ) {
    }
  }

  return (
    <Dialog open={isOpen} onClose={toggle} fullWidth maxWidth={modalSize[method]}>
      {/* Header */}
      {/* <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <span>{method}</span>

          <IconButton onClick={toggle}>
            <Icon icon='tabler:x' fontSize={20} />
          </IconButton>
        </Box>
      </DialogTitle> */}

      {/* Content */}
      <DialogContent dividers>{}</DialogContent>
    </Dialog>
  )
}

export default ModalHelper

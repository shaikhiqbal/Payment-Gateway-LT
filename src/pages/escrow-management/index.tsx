import React, { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import AddEcrowForm from 'src/views/pages/escrow-management/add-escrow'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

import SenderEscrow from 'src/views/pages/escrow-management/table/SenderEscrow'
import RecieverEscrow from 'src/views/pages/escrow-management/table/RecieverEscrow'
import InspectionEscrow from 'src/views/pages/escrow-management/table/InspectionEscrow'
import Trade from 'src/views/pages/escrow-management/table/trade'

const EscrowManagement = () => {
  // ** State
  const [value, setValue] = useState<string>('1')
  const [open, setOpen] = useState(false)

  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ scrollBehavior: 'auto' }}>
      <PageHeader
        title={
          <Typography variant='h5' sx={{ mb: 6 }}>
            Escrow Management
          </Typography>
        }
      />

      <Box sx={{ mb: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          size='small'
          color='primary'
          startIcon={<Icon icon='tabler:plus' />}
          onClick={() => setOpen(true)}
        >
          Add Escrow
        </Button>
        <Button variant='contained' size='small' color='primary' startIcon={<Icon icon='tabler:plus' />}>
          Multi Party Escrow
        </Button>
        <Button variant='contained' size='small' color='primary' startIcon={<Icon icon='tabler:plus' />}>
          Trade Deal
        </Button>
      </Box>

      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='transaction table'>
          <Tab value='1' label='Sender Escrow' />
          <Tab value='2' label='Reciever Escrow' />
          <Tab value='3' label='Inspection Escrow' />
          <Tab value='4' label='Trade Escrow' />
        </TabList>
        <TabPanel value='1' sx={{ p: 0 }}>
          <SenderEscrow />
        </TabPanel>
        <TabPanel value='2' sx={{ p: 0 }}>
          <RecieverEscrow />
        </TabPanel>
        <TabPanel value='3' sx={{ p: 0 }}>
          <InspectionEscrow />
        </TabPanel>
        <TabPanel value='4' sx={{ p: 0 }}>
          <Trade />
        </TabPanel>
      </TabContext>

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
    </Box>
  )
}

EscrowManagement.acl = {
  action: 'read',
  subject: 'permission'
}
export default EscrowManagement

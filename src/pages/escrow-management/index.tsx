import React, { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import ForDialog from 'src/views/pages/escrow-management/FormDialog'

import SenderEscrow from 'src/views/pages/escrow-management/table/SenderEscrow'
import RecieverEscrow from 'src/views/pages/escrow-management/table/RecieverEscrow'
import InspectionEscrow from 'src/views/pages/escrow-management/table/InspectionEscrow'
import Trade from 'src/views/pages/escrow-management/table/trade'

const EscrowManagement = () => {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ scrollBehavior: 'auto' }}>
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
    </Box>
  )
}

EscrowManagement.acl = {
  action: 'read',
  subject: 'permission'
}
export default EscrowManagement

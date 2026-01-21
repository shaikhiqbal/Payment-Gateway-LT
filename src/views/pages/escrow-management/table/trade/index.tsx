import React, { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// ** Components Imports
import Buyer from './Buyer'
import Seller from './Seller'
import Trader from './Trader'

const index = () => {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card sx={{ mt: 2, px: 4 }}>
      <Box sx={{ scrollBehavior: 'auto' }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='transaction table'>
            <Tab value='1' label='Buyer' />
            <Tab value='2' label='Seller' />
            <Tab value='3' label='Trader' />
          </TabList>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Buyer />
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
            <Seller />
          </TabPanel>
          <TabPanel value='3' sx={{ p: 0 }}>
            <Trader />
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  )
}

export default index

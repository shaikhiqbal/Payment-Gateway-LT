// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'

// ** Components
import PreAuth from './PreAuth'
import OnHold from './OnHold'
import { Box } from '@mui/material'

const index = () => {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ scrollBehavior: 'auto' }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='transaction table'>
          <Tab value='1' label='PreAuth Transactions' />
          <Tab value='2' label='onHold Transactions' />
        </TabList>
        <TabPanel value='1' sx={{ p: 0 }}>
          <PreAuth />
        </TabPanel>
        <TabPanel value='2' sx={{ p: 0 }}>
          <OnHold />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default index

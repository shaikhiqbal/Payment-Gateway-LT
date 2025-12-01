// ** React Imports
import React, { Fragment, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Props Types
interface TableFilterProps {
  children: React.ReactNode
  value: string
  handleChange: (event: SyntheticEvent, newValue: string) => void
  invoiceTabsList: string[]
}

const TableFilter = ({ children, value, handleChange, invoiceTabsList }: TableFilterProps) => {
  return (
    <Fragment>
      <Card sx={{ my: 4 }}>
        <TabContext value={`${value}`}>
          <TabList onChange={handleChange} aria-label='invoice tabs'>
            {invoiceTabsList.map((tab, index) => (
              <Tab key={index} value={String(index + 1)} label={tab} />
            ))}
          </TabList>
        </TabContext>
      </Card>

      {children}
    </Fragment>
  )
}

export default TableFilter

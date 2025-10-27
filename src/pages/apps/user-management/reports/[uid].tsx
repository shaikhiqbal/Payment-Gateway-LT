import React from 'react'

// ** Next Imports */
import { useRouter } from 'next/router'

// ** MUI Imports */
import { Box, Grid } from '@mui/material'

//** Types Imports */
import { GrapDataType } from 'src/types/apps/graphTypes'

//** Components Imports */
import ReportGraph from 'src/views/apps/user-management/reports/ReportGraph'
import Table from 'src/views/apps/user-management/reports/table'

const index = () => {
  // ** Hook
  const router = useRouter()
  const { uid } = router.query

  // ** Graph Data */
  const data1: GrapDataType[] = [
    { label: 'Approved', value: 54, color: '#4CAF50' }, // Cool green
    { label: 'Declined', value: 20, color: '#F44336' }, // Strong red
    { label: 'Failed', value: 0, color: '#FF5722' }, // Vivid orange
    { label: 'Pre Auth', value: 4, color: '#00BCD4' }, // Cyan
    { label: 'Void', value: 2, color: '#9E9E9E' }, // Neutral grey
    { label: 'Refund', value: 14, color: '#FFC107' }, // Amber
    { label: 'Partial Refund', value: 2, color: '#673AB7' }, // Deep purple
    { label: 'Chargeback', value: 0, color: '#3F51B5' } // Indigo
  ]
  const data2: GrapDataType[] = [
    { label: 'Approved', value: 54, color: '#4CAF50' }, // Cool green
    { label: 'Declined', value: 20, color: '#F44336' }, // Strong red
    { label: 'Failed', value: 0, color: '#FF5722' }, // Vivid orange
    { label: 'Pre Auth', value: 4, color: '#00BCD4' }, // Cyan
    { label: 'Void', value: 2, color: '#9E9E9E' }, // Neutral grey
    { label: 'Refund', value: 14, color: '#FFC107' }, // Amber
    { label: 'Partial Refund', value: 2, color: '#673AB7' }, // Deep purple
    { label: 'Chargeback', value: 0, color: '#3F51B5' } // Indigo
  ]

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item sm={12} xs={12} md={6}>
          <ReportGraph
            title='Statistics and sort by volume ($)'
            subtitle={'Statistics According to the status by volume'}
            data={data1}
          />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
          <ReportGraph
            title='Statistics and sort by count (Number Of Transactions)'
            subtitle={'Statistics According to the status by count'}
            data={data2}
          />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </Box>
  )
}

index.acl = {
  action: 'read',
  subject: 'user-management'
}
export default index

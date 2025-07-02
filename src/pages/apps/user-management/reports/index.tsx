import React from 'react'
// ** MUI Imports */
import { Box, Grid } from '@mui/material'

//** Types Imports */
import { GrapDataType } from 'src/types/apps/graphTypes'

//** Components Imports */
import ReportGraph from 'src/views/apps/user-management/reports/ReportGraph'

const Reports = () => {
  const data1: GrapDataType[] = [
    { label: 'Approved', value: 83, color: '#fdd835' },
    { label: 'Declined', value: 0, color: '#00d4bd' },
    { label: 'Failed', value: 3, color: '#FF7F50' },
    { label: 'Pre Auth', value: 0, color: '#1FD5EB' },
    { label: 'Void', value: 0, color: '#ffa1a1' },

    { label: 'Refund', value: 14, color: '#826bf8' },
    { label: 'Partial Refund', value: 0, color: '#7B68EE' },
    { label: 'Chargeback', value: 0, color: '#5cb85c' }
  ]
  const data2: GrapDataType[] = [
    { label: 'Approved', value: 54, color: '#fdd835' },
    { label: 'Declined', value: 20, color: '#00d4bd' },
    { label: 'Failed', value: 0, color: '#FF7F50' },
    { label: 'Pre Auth', value: 4, color: '#1FD5EB' },
    { label: 'Void', value: 2, color: '#ffa1a1' },
    { label: 'Refund', value: 14, color: '#826bf8' },
    { label: 'Partial Refund', value: 2, color: '#7B68EE' },
    { label: 'Chargeback', value: 0, color: '#5cb85c' }
  ]
  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item sm={4} xs={12} md={6}>
          <ReportGraph title='Statistics According to the status by volume' data={data1} />
        </Grid>
        <Grid item sm={4} xs={12} md={6}>
          <ReportGraph title='Statistics According to the status by count' data={data2} />
        </Grid>
      </Grid>
    </Box>
  )
}

Reports.acl = {
  action: 'read',
  subject: 'user-management'
}
export default Reports

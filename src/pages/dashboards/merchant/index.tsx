import React, { useCallback, useEffect } from 'react'

// ** Axios
import axios from 'axios'

// ** MUI
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// **  Components
import TransactionStatus from 'src/views/dashboards/merchant/TransactionStatus'
import MerchantBarChart from 'src/views/dashboards/merchant/BarChart'
import TransactionTable from 'src/views/dashboards/merchant/table'

// ** fk-Db
import { transactionStatus } from './fak-db'

// ** Third Party Styles Import
import 'chart.js/auto'

const MerchantBoard = () => {
  // ** Hook
  const theme = useTheme()

  //**  Vars
  const polarChartGreen = '#28dac6'
  const areaChartBlueLight = '#84d0ff'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  return (
    <Grid container spacing={2} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
      <Grid item xs={12} md={8}>
        <MerchantBarChart
          labelColor={labelColor}
          info={polarChartGreen}
          borderColor={borderColor}
          legendColor={legendColor}
          warning={areaChartBlueLight}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TransactionStatus />
      </Grid>
      <Grid item xs={12} style={{ marginTop: '2rem' }}>
        <TransactionTable />
      </Grid>
    </Grid>
  )
}

MerchantBoard.acl = {
  action: 'read',
  subject: 'dashboard'
}

export default MerchantBoard

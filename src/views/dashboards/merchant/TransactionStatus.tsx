import React, { useEffect, useState } from 'react'

// ** MUI
import { Grid, Skeleton } from '@mui/material'

// ** Types
import { TransactionStatusShap } from './types'

// ** Card
import CardStatsTrasnsaction from 'src/@core/components/card-statistics/card-state-transaction'
import CardStatsTransactionLoader from 'src/@core/components/card-statistics/card-loader/CardStatsTransactionLoader'

// ** Fake-DB
import { transactionStatus } from 'src/pages/dashboards/merchant/fak-db'

const TransactionStatus = () => {
  // ** States
  const [transactionStatusList, setTransactionStatusList] = useState<TransactionStatusShap[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const renderData = transactionStatusList
    ? transactionStatusList.map((item: TransactionStatusShap, index: number) => (
        <Grid item xs={12} sm={6} key={index}>
          <CardStatsTrasnsaction {...item} />
        </Grid>
      ))
    : null

  const renderLoader = [1, 2, 3, 4].map((_: number, index: number) => (
    <Grid item xs={12} sm={6} key={index}>
      <CardStatsTransactionLoader />
    </Grid>
  ))

  useEffect(() => {
    setTimeout(() => {
      setTransactionStatusList(transactionStatus)
      setLoading(false)
    }, 3000)
    return () => {
      setLoading(true)
      setTransactionStatusList([])
    }
  }, [])

  return (
    <Grid container spacing={2} style={{ height: '100%' }}>
      {loading ? renderLoader : renderData}
    </Grid>
  )
}

export default TransactionStatus

/*

<Grid container gap={2}>
    
  </Grid>
 <div>
      <Skeleton variant='circular' width={40} height={40} />
      <Skeleton variant='rectangular' width={210} height={60} />
      <Skeleton variant='rounded' width={210} height={60} />
    </div>
*/

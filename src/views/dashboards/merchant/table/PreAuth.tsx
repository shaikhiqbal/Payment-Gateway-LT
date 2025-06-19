import React, { memo, useEffect, useState } from 'react'

// ** MUI
import { Box, Button } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Component
import Table from './Table'

// ** Types
import { TransactionRowType } from 'src/@fake-db/types'

// ** Data Import
import { transactionRows } from 'src/@fake-db/table/static-data'

const actionColumn: GridColDef = {
  flex: 0.125,
  minWidth: 300,
  field: 'actions',
  headerName: 'Actions',
  renderCell: (params: GridRenderCellParams) => {
    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant='contained' size='small'>
          Capture
        </Button>
        <Button variant='contained' size='small'>
          Void
        </Button>
        <Button variant='contained' size='small'>
          View
        </Button>
      </Box>
    )
  }
}

const PreAuth = () => {
  // ** Sates
  const [rows, setRows] = useState<TransactionRowType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setRows(transactionRows)
      setLoading(false)
    }, 4000)

    return () => {
      setLoading(true)
      setRows([])
    }
  }, [])
  return <Table actionColumn={actionColumn} row={rows} loading={loading} />
}

export default memo(PreAuth)

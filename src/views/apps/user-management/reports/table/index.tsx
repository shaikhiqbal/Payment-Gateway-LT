import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Card } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import column, { columnSkeleton, fakeRows } from './column'

// ** Loader
import TableLoader from 'src/@core/components/skeleton/TableLoader'

type RowType = {
  id: number
  createdAt: string
  customerName: string
  product: string
  amount: string
  contact: string
  status: string
  remark: string
  action: string
}
const index = () => {
  // ** States

  const [rows, setRows] = useState<RowType[]>(fakeRows)
  const [pageSize, setPageSize] = useState(10)
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [])

  if (isLoading)
    return (
      <Card>
        <TableLoader />
      </Card>
    )

  return (
    <Card>
      <DataGrid
        autoHeight
        rows={rows}
        columns={column}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        // getRowId={row => row.uid}
      />
    </Card>
  )
}

export default index

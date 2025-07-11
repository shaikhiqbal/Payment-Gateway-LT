import React, { useState } from 'react'

// ** MUI Imports
import { Card } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import column, { columnSkeleton, SkeletonLoader } from './column'

const index = () => {
  // ** States
  const [rows, setRows] = useState([])
  const [pageSize, setPageSize] = useState(10)

  return (
    <Card>
      <SkeletonLoader />
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

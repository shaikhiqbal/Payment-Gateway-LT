// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

// ** ThirdParty Components
import axios from 'axios'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// import { DataGridRowType } from 'src/@fake-db/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

type SortType = 'asc' | 'desc' | undefined | null

const statusObj: StatusObj = {
  1: { title: 'Sender', color: 'primary' },
  2: { title: 'Receiver', color: 'success' }
}
interface DataGridRowType {
  id: number
  transfer_from: string
  transfer_to: string
  amount: number
  role: 'Sender' | 'Receiver'
  inspection_fees: number
  inspection_fees_paid_by: 'Sender' | 'Receiver'
  documentation: boolean
  inspection_report: boolean
}
const escrowRows: DataGridRowType[] = [
  {
    id: 1,
    transfer_from: '7352012357935562',
    transfer_to: '7777777777777777',
    amount: 100,
    role: 'Sender',
    inspection_fees: 5,
    inspection_fees_paid_by: 'Sender',
    documentation: true,
    inspection_report: false
  },
  {
    id: 2,
    transfer_from: '7352012357935562',
    transfer_to: '7001501151826232',
    amount: 1500,
    role: 'Receiver',
    inspection_fees: 25,
    inspection_fees_paid_by: 'Receiver',
    documentation: true,
    inspection_report: true
  },
  {
    id: 3,
    transfer_from: '7352012357935562',
    transfer_to: '7345958904452512',
    amount: 1200,
    role: 'Sender',
    inspection_fees: 18,
    inspection_fees_paid_by: 'Sender',
    documentation: false,
    inspection_report: false
  },
  {
    id: 4,
    transfer_from: '7352012357935562',
    transfer_to: '7453790029045194',
    amount: 500,
    role: 'Receiver',
    inspection_fees: 10,
    inspection_fees_paid_by: 'Sender',
    documentation: true,
    inspection_report: false
  },
  {
    id: 5,
    transfer_from: '7352012357935562',
    transfer_to: '7012345678901234',
    amount: 200,
    role: 'Sender',
    inspection_fees: 4,
    inspection_fees_paid_by: 'Receiver',
    documentation: false,
    inspection_report: true
  },
  {
    id: 6,
    transfer_from: '7352012357935562',
    transfer_to: '7098765432109876',
    amount: 2500,
    role: 'Receiver',
    inspection_fees: 40,
    inspection_fees_paid_by: 'Receiver',
    documentation: true,
    inspection_report: true
  },
  {
    id: 7,
    transfer_from: '7352012357935562',
    transfer_to: '7222333444555666',
    amount: 750,
    role: 'Sender',
    inspection_fees: 12,
    inspection_fees_paid_by: 'Sender',
    documentation: true,
    inspection_report: false
  },
  {
    id: 8,
    transfer_from: '7352012357935562',
    transfer_to: '7333444555666777',
    amount: 980,
    role: 'Receiver',
    inspection_fees: 16,
    inspection_fees_paid_by: 'Receiver',
    documentation: false,
    inspection_report: true
  },
  {
    id: 9,
    transfer_from: '7352012357935562',
    transfer_to: '7444555666777888',
    amount: 60,
    role: 'Sender',
    inspection_fees: 2,
    inspection_fees_paid_by: 'Sender',
    documentation: false,
    inspection_report: false
  },
  {
    id: 10,
    transfer_from: '7352012357935562',
    transfer_to: '7555666777888999',
    amount: 1800,
    role: 'Receiver',
    inspection_fees: 30,
    inspection_fees_paid_by: 'Receiver',
    documentation: true,
    inspection_report: true
  }
]
const columns: GridColumns = [
  { field: 'id', headerName: 'ID', width: 70 },

  {
    field: 'transfer_from',
    headerName: 'Transfer From',
    minWidth: 180,
    flex: 1
  },
  {
    field: 'transfer_to',
    headerName: 'Transfer To',
    minWidth: 180,
    flex: 1
  },
  {
    field: 'amount',
    headerName: 'Amount',
    minWidth: 100,
    renderCell: params => `$${params.value}`
  },
  {
    field: 'role',
    headerName: 'Role',
    minWidth: 120,
    renderCell: params => (
      <CustomChip
        size='small'
        skin='light'
        color={params.value === 'Sender' ? 'primary' : 'success'}
        label={params.value}
      />
    )
  },
  {
    field: 'inspection_fees',
    headerName: 'Inspection Fees',
    minWidth: 150,
    renderCell: params => `$${params.value}`
  },
  {
    field: 'inspection_fees_paid_by',
    headerName: 'Inspection Fees Paid By',
    minWidth: 200
  },
  {
    field: 'documentation',
    headerName: 'Documentation',
    minWidth: 150,
    renderCell: params => (params.value ? 'Available' : 'Pending')
  },
  {
    field: 'inspection_report',
    headerName: 'Inspection Report',
    minWidth: 170,
    renderCell: params => (params.value ? 'Uploaded' : 'Not Uploaded')
  },
  {
    field: 'action',
    headerName: 'Action',
    minWidth: 200,
    sortable: false,
    renderCell: () => (
      <Box display='flex' gap={1}>
        <Button size='small' variant='contained'>
          View
        </Button>
        <Button size='small' variant='outlined'>
          Cancel
        </Button>
      </Box>
    )
  }
]

const TableServerSide = () => {
  // ** State
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<SortType>('asc')
  const [pageSize, setPageSize] = useState<number>(7)
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('full_name')

  function loadServerRows(currentPage: number, data: DataGridRowType[]) {
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  }

  const fetchTableData = useCallback(
    async (sort: SortType, q: string, column: string) => {
      await axios
        .get('/api/table/data', {
          params: {
            q,
            sort,
            column
          }
        })
        .then(res => {
          setTotal(res.data.total)
          setRows(loadServerRows(page, res.data.data))
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize]
  )

  // useEffect(() => {
  //   fetchTableData(sort, searchValue, sortColumn)
  // }, [fetchTableData, searchValue, sort, sortColumn])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('full_name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    fetchTableData(sort, value, sortColumn)
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Card>
        <DataGrid
          autoHeight
          pagination
          rows={escrowRows}
          rowCount={total}
          columns={columns}
          // checkboxSelection
          pageSize={pageSize}
          sortingMode='server'
          paginationMode='server'
          onSortModelChange={handleSortModel}
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageChange={newPage => setPage(newPage)}
          components={{ Toolbar: ServerSideToolbar }}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          componentsProps={{
            baseButton: {
              variant: 'outlined'
            },
            toolbar: {
              value: searchValue,
              clearSearch: () => handleSearch(''),
              onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            }
          }}
        />
      </Card>
    </Box>
  )
}

export default TableServerSide

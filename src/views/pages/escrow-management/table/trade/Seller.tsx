// ** React Imports
import { useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { DataGrid, GridColumns, GridSortModel } from '@mui/x-data-grid'

// ** ThirdParty Components
import axios from 'axios'

// ** Custom Components
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

// import { DataGridRowType } from 'src/@fake-db/types'

type SortType = 'asc' | 'desc' | undefined | null

interface DataGridRowType {
  id: number
  transfer_from: string
  transfer_to: string
  amount: number
  transaction_fees: number
}

const escrowRows: DataGridRowType[] = [
  {
    id: 831020303,
    transfer_from: '7453790029045194',
    transfer_to: '7352012357935562',
    amount: 120,
    transaction_fees: 3.54
  },
  {
    id: 831020304,
    transfer_from: '7001501151826232',
    transfer_to: '7352012357935562',
    amount: 500,
    transaction_fees: 12.5
  },
  {
    id: 831020305,
    transfer_from: '7345958904452512',
    transfer_to: '7352012357935562',
    amount: 980,
    transaction_fees: 29.4
  }
]

const columns: GridColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 120
  },
  {
    field: 'transfer_from',
    headerName: 'Transfer From',
    minWidth: 180,
    flex: 1,
    renderCell: params => (
      <Typography variant='body2' fontWeight={600}>
        {params.value}
      </Typography>
    )
  },
  {
    field: 'transfer_to',
    headerName: 'Transfer To',
    minWidth: 180,
    flex: 1,
    renderCell: params => (
      <Typography variant='body2' fontWeight={600}>
        {params.value}
      </Typography>
    )
  },
  {
    field: 'amount',
    headerName: 'Amount',
    minWidth: 100,
    renderCell: params => <Typography variant='body2'>${params.value}</Typography>
  },
  {
    field: 'transaction_fees',
    headerName: 'Transaction Fees',
    minWidth: 180,
    renderCell: params => <Typography variant='body2'>${params.value}</Typography>
  },
  {
    field: 'action',
    headerName: 'Action',
    minWidth: 160,
    sortable: false,
    width: 280,
    renderCell: () => (
      <Box display='flex' gap={1}>
        <Button size='small' variant='contained'>
          Proof Delivery
        </Button>
        <Button size='small' variant='outlined' color='secondary'>
          Cancel
        </Button>
      </Box>
    )
  }
]

const Seller = () => {
  // ** State
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<SortType>('asc')
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('full_name')

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

export default Seller

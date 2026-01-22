// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// import { DataGridRowType } from 'src/@fake-db/types'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  1: { title: 'Sender', color: 'primary' },
  2: { title: 'Receiver', color: 'success' }
}

interface DataGridRowType {
  id: number
  transfer_from: string
  transfer_to: string
  full_name: string
  email: string
  amt: number
  salary: number
  transaction_fees: number
  age: number
  fees_paid: string
  status: number
}

const escrowRows: DataGridRowType[] = [
  {
    id: 1,
    transfer_from: '7352012357935562',
    transfer_to: '7777777777777777',
    full_name: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    amt: 100,
    salary: 100,
    transaction_fees: 3.25,
    age: 3.25,
    fees_paid: 'Sender',
    status: 1
  },
  {
    id: 2,
    transfer_from: '7352012357935562',
    transfer_to: '7001501151826232',
    full_name: 'Amit Verma',
    email: 'amit@gmail.com',
    amt: 1500,
    salary: 1500,
    transaction_fees: 44.55,
    age: 44.55,
    fees_paid: 'Sender',
    status: 2
  },
  {
    id: 3,
    transfer_from: '7352012357935562',
    transfer_to: '7345958904452512',
    full_name: 'Neha Singh',
    email: 'neha@gmail.com',
    amt: 1200,
    salary: 1200,
    transaction_fees: 35.7,
    age: 35.7,
    fees_paid: 'Receiver',
    status: 2
  },
  {
    id: 4,
    transfer_from: '7352012357935562',
    transfer_to: '7453790029045194',
    full_name: 'Pooja Patel',
    email: 'pooja@gmail.com',
    amt: 500,
    salary: 500,
    transaction_fees: 12.5,
    age: 12.5,
    fees_paid: 'Sender',
    status: 1
  },
  {
    id: 5,
    transfer_from: '7352012357935562',
    transfer_to: '7012345678901234',
    full_name: 'Vikas Kumar',
    email: 'vikas@gmail.com',
    amt: 200,
    salary: 200,
    transaction_fees: 6.1,
    age: 6.1,
    fees_paid: 'Receiver',
    status: 2
  },
  {
    id: 6,
    transfer_from: '7352012357935562',
    transfer_to: '7098765432109876',
    full_name: 'Anjali Mehta',
    email: 'anjali@gmail.com',
    amt: 2500,
    salary: 2500,
    transaction_fees: 72.3,
    age: 72.3,
    fees_paid: 'Sender',
    status: 2
  },
  {
    id: 7,
    transfer_from: '7352012357935562',
    transfer_to: '7222333444555666',
    full_name: 'Suresh Yadav',
    email: 'suresh@gmail.com',
    amt: 750,
    salary: 750,
    transaction_fees: 18.9,
    age: 18.9,
    fees_paid: 'Sender',
    status: 1
  },
  {
    id: 8,
    transfer_from: '7352012357935562',
    transfer_to: '7333444555666777',
    full_name: 'Kiran Joshi',
    email: 'kiran@gmail.com',
    amt: 980,
    salary: 980,
    transaction_fees: 29.4,
    age: 29.4,
    fees_paid: 'Receiver',
    status: 2
  },
  {
    id: 9,
    transfer_from: '7352012357935562',
    transfer_to: '7444555666777888',
    full_name: 'Manish Gupta',
    email: 'manish@gmail.com',
    amt: 60,
    salary: 60,
    transaction_fees: 1.95,
    age: 1.95,
    fees_paid: 'Sender',
    status: 1
  },
  {
    id: 10,
    transfer_from: '7352012357935562',
    transfer_to: '7555666777888999',
    full_name: 'Sneha Kapoor',
    email: 'sneha@gmail.com',
    amt: 1800,
    salary: 1800,
    transaction_fees: 52.8,
    age: 52.8,
    fees_paid: 'Receiver',
    status: 2
  }
]

const columns: GridColumns = [
  {
    flex: 0.25,
    minWidth: 190,
    field: 'transfer_from',
    headerName: 'Transfer From',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.transfer_from}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 190,
    field: 'transfer_to',
    headerName: 'Transfer To',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.transfer_to}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.175,
    minWidth: 80,
    field: 'amt',
    headerName: 'Amount',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        ${params.row.salary}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'transaction_fees',
    minWidth: 80,
    headerName: 'Transaction Fees',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        ${params.row.age}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 140,
    field: 'fees_paid',
    headerName: 'Fees Paid By',
    renderCell: () => {
      const status = statusObj[2]

      return (
        <CustomChip
          rounded
          size='small'
          skin='light'
          color={status.color}
          label={status.title}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    }
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 220,
    sortable: false,
    renderCell: () => (
      <Box display='flex' gap={1}>
        <Button size='small' variant='contained'>
          View
        </Button>
        <Button size='small' variant='outlined' color='inherit'>
          Cancel
        </Button>
      </Box>
    )
  }
]

const TableServerSide = () => {
  // ** State
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchValue, setSearchValue] = useState<string>('')

  const total = 10

  // useEffect(() => {
  //   fetchTableData(sort, searchValue, sortColumn)
  // }, [fetchTableData, searchValue, sort, sortColumn])

  const handleSortModel = (newModel: GridSortModel) => {
    console.log(newModel)
    console.log(page)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)

    // fetchTableData(sort, value, sortColumn)
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

export default TableServerSide

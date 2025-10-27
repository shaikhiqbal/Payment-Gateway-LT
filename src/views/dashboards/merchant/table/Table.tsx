// ** React Imports
import { ChangeEvent, Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Custom Components
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import { TransactionRowType } from 'src/@fake-db/types'

// ** Column
import { columns, loaderColumns, fakeRows } from './column'

interface TransactionTableProps {
  actionColumn: GridColDef
  row: TransactionRowType[]
  loading: boolean
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const TransactionTable = ({ actionColumn, row, loading }: TransactionTableProps) => {
  // ** States
  const [data, setData] = useState<TransactionRowType[]>([])
  const [pageSize, setPageSize] = useState<number>(7)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<TransactionRowType[]>([])

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  useEffect(() => {
    setData(row)
  }, [row])

  return (
    <Fragment>
      <Card style={{ paddingTop: '2rem' }}>
        <DataGrid
          autoHeight
          columns={loading ? loaderColumns : [...columns, actionColumn]}
          pageSize={pageSize}
          rowsPerPageOptions={[7, 10, 25, 50]}
          components={{ Toolbar: QuickSearchToolbar }}
          rows={loading ? fakeRows : filteredData.length ? filteredData : data}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          componentsProps={{
            baseButton: {
              variant: 'outlined'
            },
            toolbar: {
              value: searchText,
              clearSearch: () => handleSearch(''),
              onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            }
          }}
        />
      </Card>
    </Fragment>
  )
}

export default TransactionTable

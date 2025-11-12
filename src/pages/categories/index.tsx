// ============================================================
//  CategoryTable Component
//  Description: Displays all categories using MUI DataGrid with search, pagination, and actions.
// ============================================================

// ** React Imports
import React, { useState, ChangeEvent, Fragment } from 'react'

// ** MUI Imports
import { Box, Button, Card, Typography, Stack, IconButton } from '@mui/material'
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid'

// ** Custom Components
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'
import CreateCategory from 'src/views/components/categories/CreateCategory'

// ============================================================
//  Types
// ============================================================

interface Category {
  id: number
  name: string
  slug: string
  createdOn: string
  status: 'Active' | 'Inactive'
}

// ============================================================
//  Static Sample Data (Replace with API data later)
// ============================================================

const initialRows: Category[] = [
  { id: 1, name: 'Computers', slug: 'computers', createdOn: '24 Dec 2024', status: 'Active' },
  { id: 2, name: 'Electronics', slug: 'electronics', createdOn: '10 Dec 2024', status: 'Active' },
  { id: 3, name: 'Shoe', slug: 'shoe', createdOn: '27 Nov 2024', status: 'Active' },
  { id: 4, name: 'Cosmetics', slug: 'cosmetics', createdOn: '18 Nov 2024', status: 'Active' },
  { id: 5, name: 'Groceries', slug: 'groceries', createdOn: '06 Nov 2024', status: 'Active' },
  { id: 6, name: 'Furniture', slug: 'furniture', createdOn: '25 Oct 2024', status: 'Active' },
  { id: 7, name: 'Bags', slug: 'bags', createdOn: '14 Oct 2024', status: 'Active' },
  { id: 8, name: 'Phone', slug: 'phone', createdOn: '03 Oct 2024', status: 'Active' },
  { id: 9, name: 'Appliances', slug: 'appliances', createdOn: '20 Sep 2024', status: 'Active' },
  { id: 10, name: 'Clothing', slug: 'clothing', createdOn: '10 Sep 2024', status: 'Active' }
]

// ============================================================
//  Component
// ============================================================

const CategoryTable = () => {
  // ** State Management
  const [rows, setRows] = useState<Category[]>(initialRows)
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState<number>(0)
  const [searchValue, setSearchValue] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)

  // ==========================================================
  //  Event Handlers
  // ==========================================================

  // Handle deleting a row
  const handleDelete = (id: number) => {
    setRows(prev => prev.filter(row => row.id !== id))
  }

  // Handle sorting (placeholder for server-side)
  const handleSortModel = (newModel: GridSortModel) => {
    // TODO: Implement server-side sorting if needed
    console.log('Sort Model Changed: ', newModel, page)
  }

  // Handle searching (client-side filtering)
  const handleSearch = (value: string) => {
    setSearchValue(value)
    if (value === '') {
      setRows(initialRows)
    } else {
      const filtered = initialRows.filter(
        row =>
          row.name.toLowerCase().includes(value.toLowerCase()) || row.slug.toLowerCase().includes(value.toLowerCase())
      )
      setRows(filtered)
    }
  }

  // ==========================================================
  //  DataGrid Column Configuration
  // ==========================================================

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '#',
      width: 70,
      renderCell: params => <strong>{params.row.id}</strong>
    },
    { field: 'name', headerName: 'Category', flex: 1 },
    { field: 'slug', headerName: 'Slug', flex: 1 },
    { field: 'createdOn', headerName: 'Created On', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: params => (
        <CustomChip
          rounded
          size='small'
          skin='light'
          color={params.value === 'Active' ? 'success' : 'default'}
          label={params.value}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: params => (
        <Stack direction='row' spacing={1}>
          <IconButton aria-label='edit-category' color='primary'>
            <Icon icon='tabler:edit' />
          </IconButton>
          <IconButton
            aria-label='delete-category'
            color='error'
            size='small'
            onClick={() => handleDelete(params.row.id)}
          >
            <Icon icon='tabler:trash' />
          </IconButton>
        </Stack>
      )
    }
  ]

  // ==========================================================
  //  Render
  // ==========================================================

  return (
    <Fragment>
      {/* Header Section */}
      <Box mb={4} display='flex' alignItems='center' justifyContent='space-between'>
        <Typography variant='h6'>Categories</Typography>
        <Button
          variant='contained'
          color='primary'
          startIcon={<Icon icon='tabler:plus' />}
          onClick={() => setShow(true)}
        >
          Add Category
        </Button>
      </Box>

      {/* Data Table */}
      <Card sx={{ py: 4 }}>
        <DataGrid
          autoHeight
          pagination
          rows={rows}
          rowCount={rows.length}
          columns={columns}
          checkboxSelection
          pageSize={pageSize}
          sortingMode='server'
          paginationMode='server'
          onSortModelChange={handleSortModel}
          onPageChange={newPage => setPage(newPage)}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          rowsPerPageOptions={[7, 10, 25, 50]}
          components={{ Toolbar: ServerSideToolbar }}
          componentsProps={{
            toolbar: {
              value: searchValue,
              clearSearch: () => handleSearch(''),
              onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            }
          }}
        />
      </Card>

      {/* Create Category Modal */}
      <CreateCategory show={show} setShow={setShow} />
    </Fragment>
  )
}

// ============================================================
//  Access Control (If your ACL system uses it)
// ============================================================

CategoryTable.acl = {
  action: 'read',
  subject: 'permission'
}

export default CategoryTable

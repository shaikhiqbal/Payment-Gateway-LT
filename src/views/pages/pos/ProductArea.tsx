import React from 'react'

// ** MUI Imports
import { Box } from '@mui/material'

// ** Redux Hook
import { useSelector } from 'react-redux'

// ** Types
import { RootState } from 'src/store'

// ** Components
import ProductRender from './ProductRender'

const ProductArea = () => {
  const store = useSelector((state: RootState) => state.pos)

  const { list, categories, loading, catLoading, error, searchTerm } = store

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap' }
      }}
    >
      {/* <Box
        sx={{
          width: { xs: '100%', sm: '100%', md: 200 },
          p: 2
        }}
      >
        Category
      </Box> */}

      {/* Right Section */}
      <Box
        sx={{
          flexGrow: 1,
          width: { xs: '100%', sm: '100%', md: 'auto' },
          p: 2
        }}
      >
        <ProductRender list={list} loading={loading} />
      </Box>
    </Box>
  )
}

export default ProductArea

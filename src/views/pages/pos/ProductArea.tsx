import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// ** Redux Hook
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

// ** Components
import { ProductCard, ProductLoader } from './ProductRender'

// ** Types
interface Product {
  id: string
  name: string
  image: string
  price: number
}

const ProductArea = () => {
  const { list, loading } = useSelector((state: RootState) => state.pos)

  // ** Render Product
  const renderProduct = list.map((item: Product) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
      <ProductCard name={item.name} price={item.price} image={item.image} />
    </Grid>
  ))

  return (
    <Grid container spacing={4}>
      {loading ? <ProductLoader /> : renderProduct}
    </Grid>
  )
}

export default ProductArea

// import React from 'react'

// // ** MUI Imports
// import { Box } from '@mui/material'

// // ** Redux Hook
// import { useSelector } from 'react-redux'

// // ** Types
// import { RootState } from 'src/store'

// // ** Components
// import ProductRender from './ProductRender'
// import Typography from 'src/@core/theme/typography'

// const ProductArea = () => {
//   const store = useSelector((state: RootState) => state.pos)
//   const allStore = useSelector((state: RootState) => state)

//   console.log(allStore)

//   const { list, categories, loading, catLoading, error, searchTerm } = store

//   return (
//     <Box sx={{ flexGrow: 1, mt: 2 }}>
//       <ProductRender list={list} loading={loading} />
//     </Box>
//   )
// }

// export default ProductArea

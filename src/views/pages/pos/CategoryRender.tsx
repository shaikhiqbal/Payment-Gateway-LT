import { Box } from '@mui/material'
import React from 'react'

// Category type
export interface Category {
  slug: string
  name: string
  url: string
}

// ** Types
interface CategoryRenderProps {
  categories: Category[]
  loading: boolean
}

const CategoryRender = (props: CategoryRenderProps) => {
  const { categories, loading } = props

  return <Box></Box>
}

export default CategoryRender

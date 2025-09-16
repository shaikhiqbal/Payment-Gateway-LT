import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

//**   Product type
interface Product {
  id: string
  name: string
  image: string
  price: number
}

//**  State type
interface ProductsState {
  list: Product[]
  categories: string[] // ✅ Added categories
  loading: boolean
  catLoading: boolean
  error: string | null
  searchTerm: string
}

//** Initial state
const initialState: ProductsState = {
  list: [],
  categories: [], // ✅ Initialize categories
  loading: false,
  catLoading: false,
  error: null,
  searchTerm: ''
}

//** Async thunk to fetch products
export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  const res = await fetch('https://dummyjson.com/products')

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await res.json()

  // Map API fields to Product interface
  return data.products.map((p: any) => ({
    id: String(p.id),
    name: p.title,
    price: p.price,
    image: p.images[0]
  }))
})

//** Async thunk to fetch categories
export const fetchCategories = createAsyncThunk<string[]>('products/fetchCategories', async () => {
  const res = await fetch('https://dummyjson.com/products/categories')

  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }

  const data = await res.json()

  return data // array of strings
})
//**  Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    }
  },
  extraReducers: builder => {
    //**  Products
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.list = action.payload
        state.loading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error'
        console.log(action.error)
      })
    //**  Categories
    builder
      .addCase(fetchCategories.pending, state => {
        state.catLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload
        state.catLoading = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.catLoading = false
        state.error = action.error.message || 'Error'
      })
  }
})

export const { setSearchTerm } = productsSlice.actions
export default productsSlice.reducer

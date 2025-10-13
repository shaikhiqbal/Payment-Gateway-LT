// cartSlice.ts
import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

const cartAdapter = createEntityAdapter<CartItem>({
  selectId: item => item.id // default is id
})

const initialState = cartAdapter.getInitialState({
  total: 0 // keep total separately
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.entities[action.payload.id]
      if (item) {
        item.quantity += action.payload.quantity
      } else {
        cartAdapter.addOne(state, action.payload)
      }
      state.total += action.payload.price * action.payload.quantity
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.entities[action.payload]
      if (item) {
        state.total -= item.price * item.quantity
        cartAdapter.removeOne(state, action.payload)
      }
    },
    clearCart: state => {
      cartAdapter.removeAll(state)
      state.total = 0
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer

// 5️⃣ Export selectors
export const {
  selectAll: selectCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemIds
} = cartAdapter.getSelectors((state: any) => state.cart)

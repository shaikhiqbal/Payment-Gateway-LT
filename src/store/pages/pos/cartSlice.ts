// cartSlice.ts
import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const cartAdapter = createEntityAdapter<CartItem>({
  selectId: item => item.id
})

const initialState = cartAdapter.getInitialState({
  payment: {
    total: 0,
    shipping: 0,
    discount: 0,
    paid: 0,
    due: 0,
    method: 'cash'
  }
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
      state.payment.total += action.payload.price * action.payload.quantity
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.entities[action.payload.id]
      if (item) {
        debugger
        state.payment.total -= item.price * item.quantity
        item.quantity = action.payload.quantity
        state.payment.total += item.price * item.quantity
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.entities[action.payload]
      if (item) {
        state.payment.total -= item.price * item.quantity
        cartAdapter.removeOne(state, action.payload)
      }
    },
    clearCart: state => {
      cartAdapter.removeAll(state)
      state.payment.total = 0
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

// 5️⃣ Export selectors
export const {
  selectAll: selectCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemIds
} = cartAdapter.getSelectors((state: any) => state.cart)

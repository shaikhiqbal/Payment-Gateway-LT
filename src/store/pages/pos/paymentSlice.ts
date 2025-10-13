// paymentSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface PaymentState {
  orderId: string | null
  status: 'idle' | 'pending' | 'success' | 'failed'
  error: string | null
}

const initialState: PaymentState = {
  orderId: null,
  status: 'idle',
  error: null
}

export const processPayment = createAsyncThunk(
  'payment/process',
  async (paymentData: { amount: number; method: string }) => {
    const res = await axios.post('/api/payment', paymentData)
    return res.data // { orderId, status }
  }
)

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(processPayment.pending, state => {
        state.status = 'pending'
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.status = 'success'
        state.orderId = action.payload.orderId
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Payment failed'
      })
  }
})

export default paymentSlice.reducer

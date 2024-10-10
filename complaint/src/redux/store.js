import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import compSlice from './slices/compSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    comp:compSlice,
  },
})
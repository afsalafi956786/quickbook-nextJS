import { configureStore } from '@reduxjs/toolkit'
import rooms from './rooms'
import vendor from './vendor'

export const store = configureStore({
  reducer: {
    rooms:rooms,
    vendor:vendor
    
  },
})
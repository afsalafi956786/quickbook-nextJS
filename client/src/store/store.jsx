import { configureStore } from '@reduxjs/toolkit'
import rooms from './rooms'
import vendor from './vendor'
import users from './users'

export const store = configureStore({
  reducer: {
    rooms:rooms,
    vendor:vendor,
    users:users,
    
  },
})
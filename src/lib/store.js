import { configureStore } from '@reduxjs/toolkit'
import authUser from "@/lib/userSlice/authSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth:authUser,
        //others
    },
  })
}
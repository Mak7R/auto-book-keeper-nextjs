import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from "@/store/slices/auth-slice/auth-slice";

const store = configureStore({
  reducer: { auth: authReducer },
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
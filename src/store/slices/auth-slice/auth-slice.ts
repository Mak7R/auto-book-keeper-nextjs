import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User} from "@/types/user";
import {getAuthService} from "@/services/providers/service-providers";

const authService = getAuthService();

export interface AuthState {
  isLoggedIn: boolean
  userId?: string
  user?: User
}

const initialState: AuthState = {
  isLoggedIn: !!authService.userId,
  userId: authService.userId ? authService.userId : undefined,
  user: undefined,
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsLoggedIn(state: AuthState, action: PayloadAction<boolean>){
      state.isLoggedIn = action.payload;  
    },
    setUserId(state: AuthState, action: PayloadAction<string | undefined>){
      state.userId = action.payload;
    }
  },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer

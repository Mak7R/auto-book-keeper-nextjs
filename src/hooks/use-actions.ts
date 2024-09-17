import * as authActions from "@/store/slices/auth-slice/auth-actions";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {AppDispatch} from "@/store";
import {authSlice} from "@/store/slices/auth-slice/auth-slice";

const allActions = {
  // actions
}

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(allActions, dispatch);
}
'use client'

import React from 'react';
import {Provider} from 'react-redux';
import store from "@/store/index";

interface StoreProviderProps{
  children: React.ReactNode;
}

export default function StoreProvider(props: StoreProviderProps) {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}
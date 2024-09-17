'use client'

import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

interface TanStackProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function TanStackProvider(props: TanStackProviderProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {props.children}
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  );
}
"use client"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  
  const queryClient = new QueryClient()
  
  export default function QyeryProvider({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
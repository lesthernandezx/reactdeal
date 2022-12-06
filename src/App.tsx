import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import Login from './pages/login'
import { AuthProvider } from './Authprovider'
import React from 'react'

const queryClient = new QueryClient()

function App (): JSX.Element {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <AuthProvider><Login/>
      </AuthProvider>
      </QueryClientProvider>
      </div>)
}

export default App

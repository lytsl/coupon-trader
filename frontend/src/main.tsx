import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'jotai'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter as Router } from 'react-router-dom'
import { Center, Loader } from '@mantine/core'
import { queryClient } from 'lib/react-query'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <Center>
          <Loader size="xl" />
        </Center>
      }
    >
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Router>
            <App />
          </Router>
        </Provider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>,
)

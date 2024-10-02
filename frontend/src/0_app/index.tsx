import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import router from "./router"
import store from "./store"

import './index.scss'
import { useAppDispatch, useAppSelector } from '../5_shared/hooks/redux'
import React, { useEffect } from 'react'
import { getAccessToken, isAuthenticated } from '../2_widgets/authorization/auth-slice'
import AuthorizationPage from '../1_pages/AuthorizationPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


const ResolveAuthorization: React.FC = () => {

  const dispatch = useAppDispatch()

  const access_token = useAppSelector(getAccessToken)

  useEffect(() => {
    access_token && dispatch(isAuthenticated())
  }, [access_token])


  if (!access_token) {
    return <AuthorizationPage />
  }

  return <RouterProvider router={router} />
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ResolveAuthorization />
      </Provider>
    </QueryClientProvider>
  )
}

export default App

export {
  router,
  store
}
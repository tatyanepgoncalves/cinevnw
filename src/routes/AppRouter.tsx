import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import ErrorPage from '@/pages/ErrorPage'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<LoginPage />} index path="/" />
      <Route element={<SignupPage />} path="/cadastrar" />
      <Route element={<HomePage />} path="/home" />
      <Route element={<ErrorPage />} path="*" />
    </>
  )
)

export default function AppRouter() {
  return <RouterProvider router={router} />
}

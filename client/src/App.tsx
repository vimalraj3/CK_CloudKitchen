import './App.css'
import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./Components/home/Home'))
const ProductFrom = lazy(() => import('./Components/ProductFrom'))
const Login = lazy(() => import('./Components/Login/Login'))
const Footer = lazy(() => import('./Components/Footer'))
const Signup = lazy(() => import('./Components/Signup/signup'))
const Account = lazy(() => import('./Components/account/Account'))
const Cart = lazy(() => import('./Components/Cart'))
const Food = lazy(() => import('./Components/Food/Food'))
const ResetPassword = lazy(
  () => import('./Components/ResetPassword/ResetPassword')
)

import { useAppDispatch, useAppSelector } from './hooks'
import PageLoading from './Components/Loading/PageLoading'
import { Toaster } from 'react-hot-toast'
import { getAllFoods } from './state/slices/food.slice'
import { fetchUser } from './state/slices/user.slice'

function App() {
  const dispatch = useAppDispatch()

  const email = useAppSelector((state) => state.userState.data.email)

  const getUser = async () => {
    const user = await sessionStorage.getItem('User')
    if (email || user) {
      dispatch(fetchUser())
    }
  }

  useEffect(() => {
    getUser()
    dispatch(getAllFoods())
  }, [])

  return (
    <div className="app font-para scroll-smooth">
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/food/add" element={<ProductFrom />} />
              <Route path="/account" element={<Account />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/food/:id" element={<Food />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
            </Route>
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  )
}

export default App

// TODO 1. Food component
// TODO 2. Foods component

import './App.css'
import { Suspense, lazy, useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Products = lazy(() => import('./Components/Products'))
const Home = lazy(() => import('./Components/home/Home'))
const ProductFrom = lazy(() => import('./Components/ProductFrom'))
const Login = lazy(() => import('./Components/Login/Login'))
const Footer = lazy(() => import('./Components/Footer'))
const Signup = lazy(() => import('./Components/Signup/signup'))
const Account = lazy(() => import('./Components/account/Account'))
const AddRestaurant = lazy(() => import('./Components/Restaurant'))
// const Restaurant = lazy(() => import('./Components/Restaurant/RestaurantHome'))
import Restaurant from './Components/Restaurant/RestaurantHome'
const ResetPassword = lazy(() => import('./Components/ResetPassword/ResetPassword'))


import { useAppDispatch, useToast } from './hooks'
import { fetchUser } from './state/slices/user.slice'
import PageLoading from './Components/Loading/PageLoading'

function App() {
  const [showToast, ToastComponent] = useToast()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getuser = async () => {
      const user = await dispatch(fetchUser())
    }
    getuser()
  }, [])

  return (
    <div className="app font-para">
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route>
              <Route index element={<Home showToast={showToast} />} />
              <Route path="/login" element={<Login showToast={showToast} />} />
              <Route path="/signup" element={<Signup showToast={showToast} />} />
              <Route
                path="/restaurants"
                element={<Products showToast={showToast} />}
              />
              <Route
                path="/restaurant/product/add"
                element={<ProductFrom showToast={showToast} />}
              />
              <Route
                path="/account"
                element={<Account showToast={showToast} />}
              />
              <Route path="/restaurant/add" element={<Restaurant />} />
              <Route
                path="/resetpassword/:token"
                element={<ResetPassword showToast={showToast} />}
              />
            </Route>
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
      <ToastComponent />
    </div>
  )
}

export default App

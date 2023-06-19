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
const AddRestaurant = lazy(() => import('./Components/Restaurant/AddRestaurantPage'))
const Restaurant = lazy(() => import('./Components/Restaurant/AddRestaurantPage'))
// import Restaurant from './Components/Restaurant/RestaurantHome'
const ResetPassword = lazy(() => import('./Components/ResetPassword/ResetPassword'))
const RestauranProfile = lazy(() => import('./Components/Restaurant/RestaurantOrderPage/RestaurantOrderPage'))
const Cart = lazy(() => import('./Components/Cart'))
// import RestauranProfile from './Components/Restaurant/RestaurantOrderPage/RestaurantOrderPage' 


import { useAppDispatch } from './hooks'
import { fetchUser } from './state/slices/user.slice'
import PageLoading from './Components/Loading/PageLoading'
import { fetchCartByUserId } from './state/slices/cart.slice'
import { ShowToast } from './Components/Toast/Toast'
import { fetchUserAddress } from './state/slices/address.slice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchCartByUserId())
    dispatch(fetchUserAddress())
  }, [])

  return (
    <div className="app font-para">
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/restaurants"
                element={<Products />}
              />
              <Route
                path="/restaurant/product/add"
                element={<ProductFrom />}
              />
              <Route
                path="/account"
                element={<Account />}
              />
              <Route
                path="/cart"
                element={<Cart />}
              />
              <Route
                path="/restaurant/:id"
                element={<RestauranProfile />}
              />
              <Route path="/restaurant/add" element={<Restaurant />} />
              <Route
                path="/resetpassword/:token"
                element={<ResetPassword />}
              />
            </Route>
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
      <ShowToast />
    </div>
  )
}

export default App

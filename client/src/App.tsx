import './App.css'
import { useCallback, useEffect, useRef } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Products from './Components/Products'
import Home from './Components/home/Home'
import Nav from './Components/Nav'
import ProductFrom from './Components/ProductFrom'
import Footer from './Components/footer'

import Login from './Components/Login/Login'
import Signup from './Components/Signup/signup'

import { useAppDispatch, useToast } from './hooks'
import { fetchUser } from './state/slices/user.slice'

import { useNavigate } from 'react-router-dom'
import { ServerError } from './types/error.types'
import { Account } from './Components/account/Account'
import AddRestaurant from './Components/AddRestaurant'
import { ResetPassword } from './Components/ResetPassword/ResetPassword'

function App() {
  const [showToast, ToastComponent] = useToast()
  const dispatch = useAppDispatch()
  const promiseRef = useRef<any>(null)

  useEffect(() => {
    const getuser = async () => {
      const user = await dispatch(fetchUser())
    }
    getuser()
  }, [])

  return (
    <div className="app font-moutserrat">
      {/* <Nav /> */}
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home showToast={showToast} />} />
            <Route path="/login" element={<Login showToast={showToast} />} />
            <Route path="/signup" element={<Signup showToast={showToast} />} />
            <Route
              path="/products"
              element={<Products showToast={showToast} />}
            />
            <Route
              path="/product/add"
              element={<ProductFrom showToast={showToast} />}
            />
            <Route
              path="/account"
              element={<Account showToast={showToast} />}
            />
            <Route path="/cloudkitchen/add" element={<AddRestaurant />} />
            <Route
              path="/resetpassword/:token"
              element={<ResetPassword showToast={showToast} />}
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastComponent />
    </div>
  )
}

export default App

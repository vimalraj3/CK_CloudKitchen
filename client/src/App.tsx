import './App.css'
import { useCallback, useEffect, useRef } from 'react'

import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'

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

function App() {

  const [showToast, ToastComponent] = useToast();
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  const promiseRef = useRef<any>(null)

  // useCallback(async () => {

  // }, [dispatch])

  useEffect(() => {
    const getuser = async () => {

      const user = await dispatch(fetchUser());
      promiseRef.current = user;
      if (promiseRef.current.payload) {
        showToast('Welcome back', 'info');
        // navigate(-2);
      } else if (promiseRef.current.payload) {
        const data = promiseRef.current.payload as ServerError
        showToast(data?.message, 'error');
      }
    }
    console.log(promiseRef);

    getuser()
    console.log('useEffect');

    return () => {
      // console.log('aborting');
      promiseRef.current && promiseRef.current.abort()
    }
  }, [])


  return (
    <div className="app">
      {/* <Nav /> */}
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home showToast={showToast} />} />
            <Route path='/login' element={<Login showToast={showToast} />} />
            <Route path='/signup' element={<Signup showToast={showToast} />} />
            <Route path='/products' element={<Products showToast={showToast} />} />
            <Route path='/product/add' element={<ProductFrom showToast={showToast} />} />
          </Route>
        </Routes >
        <Footer />
      </BrowserRouter >
      <ToastComponent />
    </div>
  )
}

export default App

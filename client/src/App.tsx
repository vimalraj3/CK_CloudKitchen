import './App.css'

import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'

import Products from './Components/Products'
import Home from './Components/home/Home'
import Nav from './Components/Nav'
import ProductFrom from './Components/ProductFrom'
import Footer from './Components/footer'

import Login from './Components/Login/Login'
import Signup from './Components/Signup'

import { Provider } from 'react-redux'
import { store } from './state/store'

import { useToast } from './hooks'

function App() {

  const [showToast, ToastComponent] = useToast();
  return (
    <Provider store={store} >
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
    </Provider>
  )
}

export default App

import './App.css'

import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'

import Products from './Components/Products'
import Home from './Components/home/Home'
import Nav from './Components/Nav'
import ProductFrom from './Components/ProductFrom'
import Footer from './Components/footer'

import Login from './Components/Login'
import Signup from './Components/Signup'

function App() {
  return (
    <div className="app">
      {/* <Nav /> */}
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/products' element={<Products />} />
            <Route path='/product/add' element={<ProductFrom />} />
          </Route>
        </Routes >
        <Footer />
      </BrowserRouter >
    </div>
  )
}

export default App

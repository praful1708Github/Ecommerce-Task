import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Card from './Components/Card'
import CartPage from './Components/CartPage'

function App() {


  return (
    <BrowserRouter>
   <Routes>
    <Route path='/register' element={<Register/>} />
    <Route path='/' element={<Login />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/card' element={<Card />} />
    <Route path='/cart' element={<CartPage />} />
   </Routes>
    </BrowserRouter>
  )
}

export default App

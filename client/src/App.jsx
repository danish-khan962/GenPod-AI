import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast" 
import Home from './pages/Home'
import Library from './pages/Library'
import Pricing from './pages/Pricing'
import Help from './pages/Help'

const App = () => {
  return (
    <>
      
      <Toaster />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/library' element={<Library />}/>
        <Route path='/pricing' element={<Pricing />}/>
        <Route path='help' element={<Help />}/>
      </Routes>

      <Footer />

    </>
  )
}

export default App

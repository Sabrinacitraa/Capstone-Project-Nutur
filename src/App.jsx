import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import Navbar from './components/navbar'
import Home from './pages/home'
import Masuk from './pages/masuk'
import Daftar from './pages/daftar'

function App() {
  return (
    <>
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/masuk" element={<Masuk />} />
          <Route path="/daftar" element={<Daftar />} />
        </Routes>
      </div>
    </>
  )
}

export default App

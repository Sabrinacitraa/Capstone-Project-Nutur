import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ currentPath }) => {
  const isActive = (path) => currentPath === path

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="text-2xl font-bold text-indigo-600 font-amaranth">
        Nutur Be
      </div>
      <div className="space-x-4">
        <Link to="/masuk">
          <button
            className={`px-4 py-2 font-amaranth font-bold text-[20px] rounded-[12px] transition ${
              isActive('/masuk')
                ? 'bg-[#CDFF05] text-black'
                : 'bg-[#CDFF05] opacity-60 text-black'
            }`}
          >
            Masuk
          </button>
        </Link>
        <Link to="/daftar">
          <button
            className={`px-4 py-2 font-amaranth font-bold text-[20px] rounded-[12px] transition ${
              isActive('/daftar')
                ? 'bg-[#CDFF05] text-black'
                : 'bg-[#CDFF05] opacity-60 text-black'
            }`}
          >
            Daftar
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

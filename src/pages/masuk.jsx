import React from "react";
import pict from '../assets/pictHome4.png';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { IoMdArrowRoundBack } from "react-icons/io";

function Masuk() {
  return (
    <div className="bg-white font-[Amaranth] relative px-8">
      <header className="flex justify-between items-center px-12 py-6 shadow-md">
        <Link to="/" className="flex items-center gap-3 link-clean">
          <IoMdArrowRoundBack className="logo-title" />
          <h1 className="logo-title-margin">NUTUR</h1>
        </Link>
      </header>

      <main>
        <div className="masuk-container masuk-center">
          {/* Gambar budaya */}
          <div className="w-1/2 relative flex justify-start items-start">
            <img
              src={pict}
              alt="Ilustrasi Budaya"
              className="masuk-image"
            />
          </div>

          {/* Form */}
          <div className="w-1/2 masuk-form">
            <h2>Masuk</h2>

            <input
              type="text"
              placeholder="Username"
            />
            <input
              type="password"
              placeholder="Password"
            />

            <button className="masuk-button">
              Login
            </button>

            <p>
              Belum punya akun?{" "}
              <Link to="/daftar">
                Daftar sekarang
              </Link>
            </p>

            <div className="masuk-divider">or</div>

            <button className="google-button">
              <FcGoogle />
              Masuk dengan Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Masuk;
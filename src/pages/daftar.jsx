import React, { useState } from "react";
import axios from "axios";
import pict from '../assets/pictHome4.png';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

function Daftar() {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login/register", {
        Email,
        Username,
        Password,
      });

      if (response.data.success) {
        setSuccessMsg("Registrasi berhasil! Silakan login.");
        setError("");

        // Optional: redirect otomatis ke halaman login
        setTimeout(() => {
          navigate("/masuk");
        }, 2000);
      } else {
        setError(response.data.message || "Registrasi gagal");
        setSuccessMsg("");
      }

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Registrasi gagal");
      } else {
        setError("Terjadi kesalahan koneksi.");
      }
      setSuccessMsg("");
    }
  };

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

          {/* Form */}
          <div className="w-1/2 masuk-form">
            <h2>Buat Akun</h2>

            <input
              type="text"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}

            <button className="masuk-button" onClick={handleRegister}>
              Register
            </button>

            <p>
              Sudah punya akun?{" "}
              <Link to="/masuk">
                Masuk sekarang
              </Link>
            </p>
          </div>

          {/* Gambar budaya */}
          <div className="w-1/2 relative flex justify-start items-start">
            <img
              src={pict}
              alt="Ilustrasi Budaya"
              className="masuk-image"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Daftar;

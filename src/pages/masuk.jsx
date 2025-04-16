import React, { useState } from "react";
import axios from "axios";
import pict from '../assets/pictHome4.png';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";


function Masuk() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        Email,
        Password,
      });

      if (response.data.success) {
        console.log("Login berhasil:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Invalid Email or Password");
      }

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login gagal");
      } else {
        setError("Terjadi kesalahan koneksi.");
      }
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
          {/* Gambar budaya */}
          <div className="w-1/2 relative flex justify-start items-start">
            <img src={pict} alt="Ilustrasi Budaya" className="masuk-image" />
          </div>

          {/* Form */}
          <div className="w-1/2 masuk-form">
            <h2>Masuk</h2>

            <input
              type="text"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button className="masuk-button" onClick={handleLogin}>
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

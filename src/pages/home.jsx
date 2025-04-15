import React from "react";
import pict from '../assets/pictHome1.png';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-screen bg-white relative font-[Amaranth]">
            <header className="flex justify-between items-center px-12 py-6 shadow-md">
                <h1 className="logo-title">NUTUR</h1>
                <div className="flex items-center space-x-[5px] auth-container">
                    <Link to="/masuk"><button className="auth-button">masuk</button></Link>
                    <Link to="/daftar"><button className="auth-button">daftar</button></Link>
                </div>
            </header>

            <main className="flex flex-row items-center px-10 py-16 gap-8">
                <div className="w-1/2 flex justify-start items-start">
                    <img
                        src={pict}
                        alt="Ilustrasi Budaya"
                        className="max-w-full h-auto"
                    />
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center text-center">
                    <h2 className="hero-title">
                        Ngobrol Pakai Bahasa Daerah? <br /> Yuk, Belajar di Nutur!
                    </h2>
                    <button className="hero-button">
                        Jelajahi
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Home;

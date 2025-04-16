import React, { useRef } from "react";
import pict from '../assets/pictHome1.png';
import pict2 from '../assets/pictHome2.png';
import pict3 from '../assets/pictHome3.png';
import pict4 from '../assets/pictHome4.png';
import vector from '../assets/Vector1.png';
import footer from '../assets/Footer.png';
import kurva from '../assets/kurva1.png';
import kurva2 from '../assets/kurva2.png';
import { Link } from 'react-router-dom';

function Home() {
    const belajarRef = useRef(null);

    const scrollToBelajar = () => {
        if (belajarRef.current) {
            belajarRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white relative font-[Amaranth]">
            <header className="flex justify-between items-center px-12 py-6 shadow-md">
                <h1 className="logo-title">NUTUR</h1>
                <div className="flex items-center space-x-[5px] auth-container">
                    <Link to="/masuk"><button className="auth-button">masuk</button></Link>
                    <Link to="/daftar"><button className="auth-button">daftar</button></Link>
                </div>
            </header>

            <main>
                <div className="flex flex-row items-center px-10 py-16 gap-8">
                    <div className="w-1/2 relative flex justify-start items-start">
                        <img
                            src={pict}
                            alt="Ilustrasi Budaya"
                            className="relative z-10 max-w-full h-auto"
                        />
                    </div>

                    <img
                        src={vector}
                        alt="Vector"
                        className="absolute top-[calc(52%-1075px)] left-0 w-full h-auto z-0 opacity-100 pointer-events-none object-cover"
                    />

                    <div className="w-1/2 flex flex-col justify-center items-center text-center">
                        <h2 className="hero-title">
                            Ngobrol Pakai Bahasa Daerah? <br /> Yuk, Belajar di Nutur!
                        </h2>
                        <button className="hero-button" onClick={scrollToBelajar}>
                            Jelajahi
                        </button>
                    </div>
                </div>

                {/* Bagian yang akan discroll ke sini */}
                <div
                    ref={belajarRef}
                    className="flex flex-row items-center px-10 py-16 gap-8"
                >
                    <div className="w-1/2 flex flex-col justify-center items-center text-center">
                        <h2 className="hero-second-title">
                            Main, Belajar, Jago
                        </h2>
                        <h3 className="hero-second-description">
                            Mainkan kuis yang ada, pelajari bahasa dan cara pelafalannya! Jadilah Si Jago Nutur Bahasa Daerah dengan cara yang seru. Tamatkan semua rintangan yang ada lalu gapai Point tertinggimu
                        </h3>
                    </div>
                    <div className="w-1/2 flex justify-end items-end">
                        <img
                            src={pict2} alt="Ilustrasi Kesenian" className="max-w-full h-auto"
                        />
                    </div>
                </div>

                <img
                    src={kurva}
                    alt="Kurva"
                    className="absolute top-[calc(40%)] left-0 w-full h-auto z-0 opacity-100 pointer-events-none object-cover"
                />

                <div className="flex flex-row items-center px-10 py-16 gap-8">
                    <div className="w-1/2 relative flex justify-start items-start">
                        <img
                            src={pict3}
                            alt="Ilustrasi Budaya"
                            className="relative z-10 max-w-full h-auto"
                        />
                    </div>

                    <div className="w-1/2 flex flex-col justify-center items-start text-center">
                        <h2 className="hero-second-title">
                            Belajar Sambil Bermain
                        </h2>
                        <h3 className="hero-second-description">
                            Pilih bahasa daerah untuk dipelajari dengan tantangan kuis dan tantangan audio, kamu bisa melatih pemahaman dan pelafalan secara langsung. Jawab pertanyaan, dengarkan kosakata, dan lihat sejauh mana kemampuanmu berkembang!
                        </h3>
                    </div>
                </div>

                <div className="flex flex-row items-center px-10 py-16 gap-8">
                    <div className="w-1/2 flex flex-col justify-center items-center text-center">
                        <h2 className="hero-second-title">
                            Metode Belajar yang Fleksibel
                        </h2>
                        <h3 className="hero-second-description">
                            Belajar bahasa daerah kapan saja, di mana saja! Nutur menghadirkan pengalaman belajar yang bisa disesuaikan dengan waktumu, dengan Nutur kamu bisa mempelajari bahasa daerah dngan cara baru yang dapat meningkatkan kecintaan terhadap tanah air kita!
                        </h3>
                    </div>
                    <div className="w-1/2 flex justify-end items-end">
                        <img
                            src={pict4} alt="Ilustrasi Kesenian" className="max-w-full h-auto"
                        />
                    </div>
                    <img
                        src={kurva2}
                        alt="Kurva2"
                        className="absolute top-[calc(60%)] left-0 w-full h-auto z-0 opacity-100 pointer-events-none object-cover"
                    />
                </div>

                <footer className="w-full flex flex-col items-center justify-center text-center px-4 py-20">
                    <div>
                        <h2 className="center-call-title">
                            Siap menguji kemampuanmu?
                        </h2>
                        <p className="center-call-subtitle">
                            Ayo mulai Nutur pertamamu sekarang!
                        </p>
                        <Link to="/masuk">
                            <button className="start-button">
                                Mulai
                            </button>
                        </Link>
                    </div>
                    <img src={footer} alt="Footer" className="w-full" />
                </footer>
            </main>
        </div>
    );
}

export default Home;
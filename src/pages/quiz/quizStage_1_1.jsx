import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const QuizStage1Number1 = () => {
  const [jawabanUser, setJawabanUser] = useState("");
  const [hasil, setHasil] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        jawaban_asli: "Bapak",
        jawaban_user: jawabanUser,
      });
      setHasil(response.data);
    } catch (err) {
      console.error("Gagal prediksi:", err);
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '1440px',
      height: '1024px',
      background: 'rgba(216, 239, 122, 0.89)'
    }}>
      {/* Latar Putih Atas */}
      <div style={{
        position: 'absolute',
        width: '1440px',
        height: '946px',
        top: '100px',
        background: '#FFFFFF',
        borderRadius: '50px 50px 0px 0px'
      }} />

      <Link to="/quizStage">
        <img
          src="/public/back.png"
          alt="Back"
          style={{
            marginLeft: '100px',
            width: 24,
            height: 24,
            marginTop: "45px",
            marginBottom: "100px",
          }}
        />
      </Link>

      {/* Nyawa (5 hati) */}
      <div style={{
        position: 'absolute',
        top: '32px',
        left: '1064px',
        display: 'flex',
        gap: '10px'
      }}>
        <img
          src="/public/nyawa.png"
          alt="Nyawa"
          style={{ width: 200, height: 32 }}
        />
      </div>

      {/* Garis Hijau di kiri */}
      <div style={{
        position: 'absolute',
        left: '2.01%',
        top: '3.91%',
        height: '40px',
        borderLeft: '2px solid #64790D'
      }} />

      {/* Pertanyaan */}
      <div style={{
        position: 'absolute',
        top: '337px',
        left: '202px',
        width: '1069px',
        height: '104px',
        fontFamily: 'Poppins',
        fontStyle: 'italic',
        fontWeight: 600,
        fontSize: '27px',
        lineHeight: '40px',
        letterSpacing: '0.06em',
        color: '#000000'
      }}>
        Apa basa jawa saka tembung <span style={{ color: '#FF7A00', fontWeight: 700 }}>&quot;Ayah&quot;</span>?
      </div>

      {/* Input Box */}
      <div style={{
        position: 'absolute',
        top: '455px',
        left: '199px',
        width: '1030px',
        height: '118px',
        background: '#FFFFFF',
        border: '2px solid #000000',
        borderRadius: '22px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '32px',
        boxSizing: 'border-box'
      }}>
        <input
          type="text"
          value={jawabanUser}
          onChange={(e) => setJawabanUser(e.target.value)}
          placeholder="Ketikan jawabanmu disini..."
          style={{
            width: '100%',
            height: '60px',
            fontSize: '20px',
            fontFamily: 'Poppins',
            fontWeight: 300,
            letterSpacing: '0.06em',
            color: '#5C595980',
            border: 'none',
            outline: 'none',
            background: 'transparent'
          }}
        />
      </div>

      {/* Tombol Cek Jawaban */}
      <button
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          top: '600px',
          left: '199px',
          padding: '12px 24px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          cursor: 'pointer'
        }}
      >
        Cek Jawaban
      </button>

      <Link to="/quizStage/stage1number2">
        {/* Tombol Next */}
      <button
        style={{
          position: 'absolute',
          top: '600px',
          left: '1140px',
          padding: '12px 24px',
          backgroundColor: 'rgba(75, 119, 221, 0.89)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          cursor: 'pointer'
        }}
      >
        Next
      </button>
      </Link>

      {/* Hasil Prediksi */}
      {hasil && (
        <div style={{
          position: 'absolute',
          top: '670px',
          left: '199px',
          fontSize: '20px',
          fontFamily: 'Poppins',
          color: hasil.prediksi === 'Benar' ? 'green' : 'red'
        }}>
          Jawaban kamu <strong>{hasil.prediksi}</strong> (Probabilitas: {hasil.probabilitas * 100} %)
        </div>
      )}
    </div>
  );
};

export default QuizStage1Number1;
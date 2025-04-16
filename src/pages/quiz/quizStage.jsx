import React from "react";
import { Link } from "react-router-dom";

const stages = [
  "Stage 1 nama-nama anggota keluarga",
  "Stage 2 kosakata sehari-hari",
  "Stage 3 nama-nama buah",
  "Stage 4 nama-nama sayur",
  "Stage 5 nama-nama benda dirumah",
  "Stage 6 kosakata disekolah",
  "Stage 7 kosakata perkenalan diri",
  "Stage 8 nama-nama benda alam",
  "Stage 9 nama-nama hewan",
];

const QuizStage = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "1440px",
        height: "1024px",
        background: "rgba(216, 239, 122, 0.89)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "80px",
          height: "100%",
          background: "#CBE86B",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
          gap: "40px",
        }}
      >
        <Link to="/dashboard">
          <img
            src="/public/back.png"
            alt="Back"
            style={{
              width: 24,
              height: 24,
              marginTop: "45px",
              marginBottom: "100px",
            }}
          />
        </Link>
        <img
          src="/public/Vector.png"
          alt="Heart"
          style={{ width: 32, height: 32, marginBottom: "40px" }}
        />
        <img
          src="/public/Vector-1.png"
          alt="Star"
          style={{ width: 32, height: 32, marginBottom: "40px" }}
        />
        <img
          src="/public/ColorSwatch.png"
          alt="Chart"
          style={{ width: 32, height: 32, marginBottom: "40px" }}
        />
        <img
          src="/public/UserGroupOutline.png"
          alt="User Group"
          style={{ width: 32, height: 32 }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          width: "1344px",
          height: "982px",
          left: "75px",
          top: "21px",
          background: "#FFFFFF",
          borderRadius: "30px",
        }}
      />

      <h1
        style={{
          position: "absolute",
          left: "119px",
          top: "48px",
          fontFamily: "Kodchasan",
          fontWeight: 600,
          fontSize: "24px",
          letterSpacing: "0.06em",
          color: "#000",
        }}
      >
        Bahasa Jawa
      </h1>

      <h2
        style={{
          position: "absolute",
          left: "590px",
          top: "100px",
          fontFamily: "Kodchasan",
          fontWeight: 600,
          fontSize: "64px",
          letterSpacing: "0.06em",
          textAlign: "center",
          color: "#000",
        }}
      >
        Kuis
      </h2>

      <div
        style={{
          position: "absolute",
          width: "306px",
          height: "12px",
          left: "1064px",
          top: "67px",
          background: "rgba(255, 181, 5, 0.3)",
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
          borderRadius: "8px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "35px",
          height: "12px",
          left: "1064px",
          top: "67px",
          background: "#FFB505",
          borderRadius: "8px",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "1337px",
          top: "44px",
          fontFamily: "Amarante",
          fontSize: "14px",
          letterSpacing: "0.06em",
          color: "#5C5959",
        }}
      >
        1/9
      </span>

      <div
        style={{
          position: "absolute",
          width: "1100px",
          height: "631px",
          left: "197px",
          top: "345px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "40px 30px",
        }}
      >
        {stages.map((text, idx) => (
          <StageCard key={idx} text={text} />
        ))}
      </div>
    </div>
  );
};

const StageCard = ({ text }) => (
  <div
    style={{
      position: "relative",
      width: "292px",
      height: "156px",
      background:
        text.includes("Stage 2") ||
        text.includes("Stage 3") ||
        text.includes("Stage 4") ||
        text.includes("Stage 5") ||
        text.includes("Stage 6") ||
        text.includes("Stage 7") ||
        text.includes("Stage 8") ||
        text.includes("Stage 9")
          ? "#fff"
          : "rgba(216, 239, 122, 0.89)",
      border: "1px solid #64790D",
      borderRadius: "16px",
      padding: "22px 19px",
      boxSizing: "border-box",
    }}
  >
    <p
      style={{
        fontFamily: "Poppins",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "30px",
        letterSpacing: "0.06em",
        color: "#000",
      }}
    >
      {text}
    </p>
  </div>
);

export default QuizStage;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2200); // 2 detik delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="text-section font-[Amaranth]">
        <h1 className="loading-title ">Masuk...</h1>
        <div className="loading-bar">
          <div className="loading-fill" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

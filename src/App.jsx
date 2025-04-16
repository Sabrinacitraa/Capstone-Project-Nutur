import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Masuk from "./pages/masuk";
import Daftar from "./pages/daftar";
import Dashboard from "./pages/dashboard/dashboard";
import QuizStage from "./pages/quiz/quizStage";
import Language from "./pages/dashboard/language";

function App() {
  return (
    <>
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/masuk" element={<Masuk />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quizStage" element={<QuizStage />} />
          <Route path="/language" element={<Language />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

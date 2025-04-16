import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Masuk from "./pages/masuk";
import Daftar from "./pages/daftar";
import Dashboard from "./pages/dashboard/dashboard";
import QuizStage from "./pages/quiz/quizStage";
import Loading from "./pages/loading/login-load";
import LearningPage from "./pages/dashboard/pre-dashboard";

function App() {
  return (
    <>
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/masuk" element={<Masuk />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quizStage" element={<QuizStage />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

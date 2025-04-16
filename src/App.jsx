import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Masuk from "./pages/masuk";
import Daftar from "./pages/daftar";
import Dashboard from "./pages/dashboard/dashboard";
import QuizStage from "./pages/quiz/quizStage";
import QuizStage1Number1 from "./pages/quiz/quizStage_1_1";
import QuizStage1Number2 from "./pages/quiz/quizStage_1_2";

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
          <Route path="/quizStage/stage1number1" element={<QuizStage1Number1 />} />
          <Route path="/quizStage/stage1number2" element={<QuizStage1Number2 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Masuk from "./pages/masuk";
import Daftar from "./pages/daftar";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <>
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/masuk" element={<Masuk />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

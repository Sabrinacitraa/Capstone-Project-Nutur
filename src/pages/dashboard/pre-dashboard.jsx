import React, { useState } from "react";
import "../../index.css";

const LearningPage = () => {
  const [language, setLanguage] = useState("");

  return (
    <div className="center-call-container">
      <h1 className="center-call-pre">Hai User!</h1>
      <p className="center-call-subpre">Sekarang lagi mau belajar apa?</p>
      <select
        className="language-dropdown-button"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="">Pilih Bahasa</option>
        <option value="javascript">Bahasa Jawa</option>
        <option value="python">Bahasa Sunda</option>
        <option value="html">Bahasa Minang</option>
        <option value="css">Bahasa Madura</option>
        <option value="react">Bahasa Bali</option>
      </select>
    </div>
  );
};

export default LearningPage;

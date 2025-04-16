import React from "react";
import { Navbar } from "./dashboard";
import { Sidebar } from "./dashboard";
import img1 from "../../assets/mountain.png";

const languages = [
  {
    name: "Bahasa Jawa",
    description:
      "Bahasa tradisional Indonesia yang banyak digunakan di Pulau Jawa seperti Jawa Timur dan Jawa Tengah. Kuasai Bahasa ini dan lancar berdialog dengan suku yang ada di Pulau Jawa!",
    image: img1,
  },
  {
    name: "Bahasa Minang",
    description:
      "Bahasa tradisional Indonesia yang banyak digunakan di Provinsi Sumatera Barat. Kuasai Bahasa ini dan lancar berdialog dengan suku yang ada di Sumatra Barat!",
    image: img1,
  },
  {
    name: "Bahasa Bugis",
    description:
      "Bahasa tradisional Indonesia yang banyak digunakan di Pulau Sulawesi. Kuasai Bahasa ini dan lancar berdialog dengan suku yang ada di Pulau Sulawesi!",
    image: img1,
  },
  {
    name: "Bahasa Banjar",
    description:
      "Bahasa tradisional Indonesia yang banyak digunakan di Kalimantan Selatan. Pelajari Bahasa ini untuk lebih memahami budaya Kalimantan!",
    image: img1,
  },
];

const Language = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <Navbar />

        <div style={{ padding: "4rem" }}>
          <h1
            className="text-2xl font-bold mt-6 mb-4"
            style={{ marginBottom: "40px" }}
          >
            Language
          </h1>

          <div className="flex flex-col gap-4" style={{ gap: "40px" }}>
            {languages.map((lang, index) => (
              <div
                key={index}
                className="bg-lime-200 border border-gray-300 rounded-xl p-4 flex items-start gap-4 shadow-md"
                style={{
                  background: "rgba(216, 239, 122, 0.89)",
                  border: "1px solid #64790D",
                  borderRadius: "16px",
                  padding: "0 19px",
                  boxSizing: "border-box",
                  gap: "40px",
                }}
              >
                <img
                  src={lang.image}
                  alt={lang.name}
                  className="w-24 h-24 object-cover rounded-md justify-center"
                  style={{
                    width: "292px",
                    height: "156px",
                    borderRadius: "16px",
                    padding: "22px 19px",
                    boxSizing: "border-box",
                  }}
                />
                <div>
                  <h2 className="text-lg font-bold">{lang.name}</h2>
                  <p className="text-sm italic text-gray-700 mt-1">
                    {lang.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Language;

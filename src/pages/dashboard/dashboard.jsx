import React from "react";
import { FiLogOut } from "react-icons/fi";
import {
  FaHeart,
  FaStar,
  FaPalette,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";
import img from "../../assets/img1.png";
import img2 from "../../assets/progress.png";
import img3 from "../../assets/fav.png";
import img4 from "../../assets/mountain.png";

const Sidebar = () => (
  <aside className="w-60 min-h-screen bg-white border-r flex flex-col justify-between font-poppins">
    <div>
      <h1 className="logo-title-dashboard">NUTUR</h1>
      <div style={{ marginTop: "3rem" }}>
        <div
          className="flex items-center gap-4 px-6 mb-6"
          style={{ gap: "1rem" }}
        >
          <FaUserCircle
            className="text-5xl text-gray-700"
            style={{ width: "4rem", height: "4rem" }}
          />

          <div>
            <p className="text-lg font-bold text-black">User Name</p>
            <p className="text-sm text-gray-500">Lorem Ipsum</p>
          </div>
        </div>

        <hr className="border-gray-300 mb-6 mx-6" />

        <div
          className="flex flex-col gap-8 px-6 text-xl font-bold text-gray-800"
          style={{
            lineHeight: "5.5rem",
            justifyContent: "center",

            padding: "4rem 2rem",
            fontSize: "1.8rem",
          }}
        >
          <div
            className="flex items-center gap-4 cursor-pointer hover:text-yellow-600"
            style={{ gap: "2rem" }}
          >
            <FaHeart className="text-2xl" />
            <a href="#" style={{ textDecoration: "none", color: "#333" }}>
              Favorite
            </a>
          </div>
          <div
            className="flex items-center gap-4 cursor-pointer hover:text-yellow-600"
            style={{ gap: "2rem" }}
          >
            <FaStar className="text-2xl" />
            <a href="#" style={{ textDecoration: "none", color: "#333" }}>
              Point
            </a>
          </div>
          <div
            className="flex items-center gap-4 cursor-pointer hover:text-yellow-600"
            style={{ gap: "2rem" }}
          >
            <FaPalette className="text-2xl" />
            <a href="#" style={{ textDecoration: "none", color: "#333" }}>
              Completed
            </a>
          </div>
          <div
            className="flex items-center gap-4 cursor-pointer hover:text-yellow-600"
            style={{ gap: "2rem" }}
          >
            <FaUsers className="text-2xl" />
            <a href="#" style={{ textDecoration: "none", color: "#333" }}>
              Community
            </a>
          </div>
        </div>
      </div>
    </div>

    <div
      className="bg-[#FFECB3] py-3 px-6 flex justify-between items-center"
      style={{ padding: "1rem 1rem" }}
    >
      <button
        className="text-red-600 font-bold text-sm bg-transparent border-none outline-none hover:underline"
        style={{ fontSize: "1rem", color: "#B50000", fontWeight: "bold" }}
      >
        Logout
      </button>

      <FiLogOut className="text-xl text-gray-700" />
    </div>
  </aside>
);

const Navbar = () => (
  <nav
    className=" flex justify-end text-md font-semibold text-gray-700 "
    style={{
      backgroundColor: "rgba(255, 181, 5, 0.5)",
      padding: 40,
      gap: 40,
    }}
  >
    <a
      href="#"
      className="py-4 no-underline"
      style={{ color: "#333333", fontWeight: "bold" }}
    >
      Home
    </a>
    <a
      href="#"
      className="py-2  no-underline "
      style={{ color: "#333333", fontWeight: "bold" }}
    >
      Language
    </a>
    <a
      href="#"
      className="py-2  no-underline "
      style={{ color: "#333333", fontWeight: "bold" }}
    >
      Mentor
    </a>
    <a
      href="#"
      className="py-2  no-underline "
      style={{ color: "#333333", fontWeight: "bold" }}
    >
      Class
    </a>
  </nav>
);

const Dashboard = () => {
  const mentors = [
    { name: "Cak Anda", language: "Bahasa Jawa" },
    { name: "Liam Jinan hatta", language: "Bahasa Minang" },
    { name: "Marisha Alana zhar", language: "Bahasa Bugis" },
    { name: "Marisha Alana zhar", language: "Bahasa Bugis" },
    { name: "Marisha Alana zhar", language: "Bahasa Bugis" },
  ];

  return (
    <>
      <div className="flex flex overflow-x-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6">
            <div
              className="mb-6 mt-6 flex items-center gap-4"
              style={{ margin: "3rem" }}
            >
              <input
                type="text"
                placeholder="Mau cari bahasa apa?"
                className=" w-3/4 max-w-xl border p8-4 py-2 rounded-full border-gray-300 justify-center align-middle"
                style={{
                  padding: "1rem",
                  justifyContent: "center",
                  backgroundColor: "#F5F5F5",
                }}
              />
            </div>
            <section className="mb-6" style={{ margin: "3rem" }}>
              <h2 className="text-md font-semibold mb-2">
                Terakhir dipelajari
              </h2>
              <div
                className="border border-gray-300 rounded-md flex items-center gap-4 p-20 "
                style={{
                  padding: "1rem 1rem",
                  justifyContent: "center",
                  borderRadius: "1rem",
                  border: "1px solid #333",
                }}
              >
                <img
                  src={img}
                  className="rounded-md w-28 h-16 object-cover"
                  alt="Bahasa Jawa"
                />
                <div className="flex-1" style={{ marginLeft: "2rem" }}>
                  <p
                    className="font-bold"
                    style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                  >
                    Bahasa Jawa
                  </p>
                  <div className="w-full bg-yellow-100 rounded-full h-3 mt-1">
                    <img src={img2} alt="" />
                  </div>
                </div>
                <div
                  className="flex flex-col items-start gap-2"
                  style={{ marginRight: "3rem", gap: "1rem" }}
                >
                  <button className="text-red-400 text-xl bg-transparent border-none outline-none hover:underline">
                    <img src={img3} alt="" />
                  </button>
                  <button className="text-yellow-600 font-medium bg-transparent border-none outline-none hover:underline">
                    Lanjutkan
                  </button>
                </div>
              </div>
            </section>

            <section className="mb-6" style={{ margin: "3rem" }}>
              <h2 className="text-lg font-semibold mb-2">Mentor Favorit</h2>

              <div
                className="flex gap-4 whitespace-nowrap "
                style={{ margin: "4rem" }}
              >
                {mentors.map((mentor, idx) => (
                  <div key={idx} className="text-center w-36 flex-shrink-0 ">
                    {mentor.image ? (
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-1"
                      />
                    ) : (
                      <FaUserCircle
                        className="w-20 h-20 text-gray-400 mx-auto mb-1 gap-2"
                        style={{
                          width: "10rem",
                          height: "10rem",
                          marginRight: "3rem",
                        }}
                      />
                    )}
                    <p
                      className="font-semibold text-sm"
                      style={{ marginRight: "3rem" }}
                    >
                      {mentor.name || "---"}
                    </p>
                    <p
                      className="text-xs italic text-gray-500"
                      style={{ marginRight: "3rem" }}
                    >
                      ({mentor.language || "Bahasa Jawa"})
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="px-6 my-12" style={{ margin: "3rem" }}>
              <h2 className="text-lg font-semibold  mb-4">
                Rekomendasi untuk anda
              </h2>

              <div
                className="flex gap-6 flex-nowrap"
                style={{ gap: "2rem", margin: "3rem" }}
              >
                {Array(5)
                  .fill(null)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-lime-100 rounded-xl p-4 w-60 flex-shrink-0"
                      style={{
                        backgroundColor: "#D8EF7A",
                        padding: "0.5rem 1rem",
                        borderRadius: "1rem",
                      }}
                    >
                      <img
                        src={img4}
                        className="rounded-md mb-3 h-32 w-full object-cover"
                        alt="Bahasa Jawa"
                      />
                      <p className="font-bold text-base text-center mb-1">
                        Bahasa Jawa
                      </p>
                      <p className="text-xs italic text-gray-600 text-center">
                        120 pengguna
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from "react";
import img1 from "../Asset/image/Program Image.png";
import Card from "../components/Card";
import "../App.css";
import Navbar from "../components/Navbar";

const beasiswa = {
  nama: "Program Bimbingan Beasiswa IISMA 2024",
  deskripsi:
    "Program ini ditujukan untuk mahasiswa yang ingin memperoleh kesempatan kuliah ke luar negeri melalui Program IISMA 2024.",
  img: img1,
  index: 0,
};

const english = {
  nama: "Program English Test Preparation (IELTS & TOEFL ITP)",
  deskripsi:
    "Program ini ditujukan untuk mahasiswa yang ingin mempersiapkan diri untuk ujian sertifikasi bahasa inggris seperti IELTS & TOEFL ITP.",
  img: img1,
  index: 1,
};

const english2 = {
  nama: "Program English Test Preparation (IELTS & TOEFL ITP) Batch 2",
  deskripsi:
    "Program ini ditujukan untuk mahasiswa yang ingin mempersiapkan diri untuk ujian sertifikasi bahasa inggris seperti IELTS & TOEFL ITP.",
  img: img1,
  index: 2,
};

const english3 = {
  nama: "Program English Test Preparation (IELTS & TOEFL ITP) Batch 3",
  deskripsi:
    "Program ini ditujukan untuk mahasiswa yang ingin mempersiapkan diri untuk ujian sertifikasi bahasa inggris seperti IELTS & TOEFL ITP.",
  img: img1,
  index: 3,
};

const prg = [beasiswa, english, english2, english3];
export default function DashboardKelas() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="container flex flex-col items-center justify-center mt-20 bg-red">
        <h1 className="text-center text-5xl font-semibold self-center">
          Class Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {prg.map((data, index) => (
            <Card key={index} index={index} program={data} />
          ))}
        </div>
      </main>
    </div>
  );
}

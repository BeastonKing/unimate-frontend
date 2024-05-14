import React from "react";
import FAQQuestion from "./FAQQuestion";

const Question = [
  {
    question: "Apakah program ini full online?",
    answer:
      "Benar, program bimbingan beasiswa kami 100% online sehingga akan sangat fleksibel ya!",
  },
  {
    question: "Apakah siswa dapat memilih coach?",
    answer:
      "Coach akan tim ahli Unimate pilihkan sesuai dengan target beasiswa siswa yaa sehingga siswa tidak dapat memilih coach:)",
  },
  {
    question:
      "Apa saja kelebihan mengikuti program bimbingan beasiswa di Unimate?",
    answer:
      "Kami memiliki coach dari berbagai jenis beasiswa sehingga akan membantu siswa secara spesifik dan optimal. Selain itu, kami menyediakan program one stop solution yang terdiri dari IELTS, bimbingan beasiswa, proofreading essay, dan mock interview. ",
  },
  {
    question: "Apakah ada jaminan keterima beasiswa dengan program ini?",
    answer:
      "Sejatinya, banyak faktor yang menentukan keberhasilan mendapat beasiswa/kampus. Dengan mengikuti program Unimate, membuat siswa lebih dekat dengan kelulusan beasiswa!",
  },
  {
    question: "Setelah membayar, lalu bagaimana?",
    answer:
      "Admin akan menghubungi siswa dan menginvite ke grup bersama coach untuk pembahasan waktu pelaksanaan program",
  },
];

const FAQ = () => {
  return (
    <div className="w-full md:flex">
      <div className="md:w-1/2">
        <h1 className="font-semibold text-2xl">
          Frequently Asked Questions (FAQ)
        </h1>
        <h5 className="text-medium mt-7">
          Pertanyaan yang sering ditanyakan terkait program ini.
        </h5>
      </div>
      <div className="mt-8 md:w-1/2 md:mt-0 md:ml-4 w-full ">
        {Question.map((data, i) => (
          <FAQQuestion question={data} index={i} key={i} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;

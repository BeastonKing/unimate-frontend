import React from "react";
import { useState } from "react";

const FaqSection = () => {
  // State untuk mengatur tampilan jawaban
  const [answers, setAnswers] = useState({
    question1: false,
    question2: false,
    question3: false,
    question4: false,
  });

  // Fungsi untuk menampilkan/menyembunyikan jawaban
  const toggleAnswer = (id) => {
    setAnswers({
      ...answers,
      [id]: !answers[id],
    });
  };

  // Daftar pertanyaan dan jawaban
  const faqs = [
    {
      id: "question1",
      question: "How can I get started?",
      answer:
        "Getting started is easy! Sign up for an account, and you'll have access to our platform's features. No credit card required for the initial signup.",
    },
    {
      id: "question2",
      question: "What is the pricing structure?",
      answer:
        "Our pricing structure is flexible. We offer both free and paid plans. You can choose the one that suits your needs and budget.",
    },
    {
      id: "question3",
      question: "What kind of support do you provide?",
      answer:
        "We offer comprehensive customer support. You can reach out to our support team through various channels, including email, chat, and a knowledge base.",
    },
    {
      id: "question4",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time without any hidden fees. We believe in providing a hassle-free experience for our users.",
    },
  ];

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-20 sm:px-6 lg:px-8 ">
        <div className=" text-center">
          <p>FAQ UNIMATE</p>
          <h2 className="text-3xl font-bold leading-tight text-main-400 sm:text-4xl lg:text-5xl">
            Pertanyaan yang Sering Ditanyakan
          </h2>
        </div>
        <div className=" mt-8 space-y-4 md:mt-16">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 rounded-lg"
            >
              <button
                type="button"
                onClick={() => toggleAnswer(faq.id)}
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
              >
                <span className="flex text-lg font-semibold text-main-400">
                  {faq.question}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-6 h-6 text-main-400 transform transition-transform ${
                    answers[faq.id] ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                style={{ display: answers[faq.id] ? "block" : "none" }}
                className="px-4 pb-5 sm:px-6 sm:pb-6"
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-main-400 text-base mt-9">
          Masih memiliki pertanyaan?{" "}
          <span className="cursor-pointer text-main-100 font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover:underline">
            Hubungi kami
          </span>
        </p>
      </div>
    </section>
  );
};

export default FaqSection;

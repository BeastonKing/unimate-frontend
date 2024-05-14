import React from "react";
import DetailExam from "./DetailExam";
import Button from "../../components/button/Button";
import book from "../../assets/image/book.png";
import { useState } from "react";
import QuestionForm from "./QuestionForm";
import DetailQuestion from "./DetailQuestion.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const AddQuestionForm = () => {
  const location = useLocation();
  const formData = location.state;
  const navigate = useNavigate();
  const DetailExamComponent = DetailExam(); // Panggil komponen DetailExam
  console.log(formData);

  const [showQuestionForm, setShowQuestionForm] = useState(false); // State untuk menampilkan/menyembunyikan formulir pertanyaan
  const [questionData, setQuestionData] = useState(
    formData ? formData.questionContents : null
  );
  const handleAddQuestion = () => {
    setShowQuestionForm(true); // Tampilkan formulir pertanyaan saat tombol "Tambah Soal" diklik
  };

  const handleQuestionFormSubmit = (questionNewData) => {
    // Logika untuk menyimpan data pertanyaan ke dalam struktur data yang sesuai
    console.log("Data Pertanyaan yang dibuat:", questionNewData);
    setShowQuestionForm(false); // Sembunyikan formulir pertanyaan setelah disubmit
    // setQuestionData([...questionData, questionNewData]);
    const updatedFormData = {
      ...formData,
      questionContents: [...questionData, questionNewData],
    };
    setQuestionData(updatedFormData.questionContents);
    navigate(".", { state: updatedFormData }, { replace: true });
  };

  // Kemudian, jika questionData adalah array, kamu perlu memperbarui hasil query React juga

  return (
    <>
      <div>
        {/* Tampilkan DetailExam jika tidak null, jika null tampilkan pesan */}
        <DetailExam />

        {questionData && (
          <div>
            <div className="mt-10 text-2xl font-semibold">Daftar Soal</div>
            <div id="list-question" className="grid grid-cols-1 gap-4 my-5">
              {questionData.map((question, index) => (
                <DetailQuestion
                  key={question.id}
                  question={question}
                  questionNumber={index + 1}
                />
              ))}
            </div>
          </div>
        )}

        {!DetailExamComponent ? (
          <div className="flex justify-center items-center flex-col">
            <img src={book} alt="" />
            <p>Silakan buat ujian terlebih dahulu.</p>
          </div>
        ) : (
          <>
            {/* Tampilkan formulir pertanyaan jika tombol "Tambah Soal" diklik */}
            {showQuestionForm ? (
              <QuestionForm onSubmit={handleQuestionFormSubmit} />
            ) : (
              <div className="flex justify-start mt-4">
                <div className="w-1/3">
                  <Button
                    label="Tambah Soal"
                    style="primary"
                    onClick={handleAddQuestion}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AddQuestionForm;

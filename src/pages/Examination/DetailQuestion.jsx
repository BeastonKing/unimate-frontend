import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../components/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faArrowRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QuestionForm from "./QuestionForm";
import { useMutation } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
const DetailQuestion = ({ question, questionNumber }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const authHeader = useAuthHeader();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const renderOptionLabel = (optionIndex) => {
    return String.fromCharCode(65 + optionIndex); // A, B, C, D
  };

  const submitEditHandling = (formData) => {
    // Dapatkan ID pertanyaan yang akan diubah
    const questionId = question.id;
    console.log("edit:", formData);

    // Buat salinan dari questionContents
    const updatedQuestionContents = [...location.state.questionContents];

    // Cari indeks pertanyaan yang akan diubah berdasarkan ID
    const questionIndex = updatedQuestionContents.findIndex(
      (q) => q.id === questionId
    );

    // Jika indeks ditemukan
    if (questionIndex !== -1) {
      // Ubah nilai-nilai pertanyaan berdasarkan formData
      updatedQuestionContents[questionIndex] = {
        ...updatedQuestionContents[questionIndex],
        ...formData, // Menggabungkan data dari formData
      };

      // Update state dengan data yang telah dimodifikasi
      const updatedState = {
        ...location.state,
        questionContents: updatedQuestionContents,
      };
      navigate(".", { state: updatedState }, { replace: true });
      closeEditForm();
      window.location.reload();
    } else {
      console.error("Pertanyaan tidak ditemukan!");
    }
  };

  const deleteQuestionToExam = useMutation({
    mutationFn: (formData) =>
      axios.delete(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/question/delete/` +
          formData.id,
        {
          headers: {
            Authorization: authHeader, // Gantilah token_disini dengan token yang benar
          },
        }
      ),

    onSuccess: (response) => {
      console.log("Berhasil menghapus data data");
      console.log("hasil:", response);
      handleDelete();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const openEditForm = () => {
    console.log("Mode Edit");
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    console.log("Reset Mode");
    setShowEditForm(false);
  };

  const handleDelete = () => {
    // Misalkan Anda memiliki idPertanyaanYangDihapus yang menyimpan id pertanyaan yang akan dihapus

    // Filter questionContents yang tidak termasuk id pertanyaan yang akan dihapus
    const updatedQuestionContents = location.state.questionContents.filter(
      (questions) => questions.id !== question.id
    );
    console.log("menghapus question dengan id:", question.id);

    // Buat objek baru yang berisi seluruh data dari location.state
    // kecuali questionContents yang telah diperbarui
    const updatedState = {
      ...location.state,
      questionContents: updatedQuestionContents,
    };

    // Update state location.state dengan objek baru yang telah diperbarui
    navigate(".", { state: updatedState }, { replace: true });
    closeDeleteConfirmation();
    window.location.reload();

    // Jika perlu, Anda juga bisa melakukan operasi setQuestionData(updatedQuestionContents);
  };

  return (
    <div className="mt-8 shadow-md rounded-lg p-8 flex ">
      <div className="mb-6 max-h-10 mr-5 min-w-20 flex items-center justify-center text-base lg:text-lg border border-main-100 text-main-100 font-semibold max-w-[140px] rounded-3xl p-2">
        {questionNumber < 10 ? "0" : ""}
        {questionNumber}.
      </div>
      <div className="w-full">
        {showEditForm ? (
          <QuestionForm question={question} onSubmit={submitEditHandling} />
        ) : (
          <>
            {question.questionText && (
              <div className="text-sm tracking-normal lg:text-base leading-8 mt-2 p-5 bg-[#f4f1f9] bg-opacity-100 rounded-lg">
                <p>{question.questionText}</p>
              </div>
            )}

            <div className="mt-2">
              <div className="text-base border tracking-normal border-main-100 p-5 rounded-lg text-main-100">
                {question.questionSentence}
              </div>

              <div className="font-semibold text-lg mt-2">Opsi Jawaban</div>
              <div className="mb-5 mt-2">
                {["a", "b", "c", "d"].map((optionValue, optionIndex) => {
                  const optionText = question[optionValue];
                  const isCorrectAnswer =
                    question[optionValue] === question.correctAnswer;
                  const optionStyle = isCorrectAnswer
                    ? "bg-main-200"
                    : "bg-[#F7F8FA]";

                  return (
                    <label key={optionIndex} className="flex items-center my-1">
                      <span
                        className={`ml-2 p-2 flex gap-3 rounded-lg font-medium text-base w-full ${optionStyle}`}
                      >
                        <div
                          className={`p-3 text-main-200 rounded-md flex items-center justify-center font-semibold ${
                            isCorrectAnswer ? "bg-white" : "bg-[#DED3F7]"
                          }`}
                        >
                          {renderOptionLabel(optionIndex)}
                        </div>
                        <div
                          className={`p-2 rounded-lg flex items-center justify-center text-sm font-medium ${
                            isCorrectAnswer ? "text-white" : ""
                          }`}
                        >
                          {optionText}
                        </div>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <div className="flex m-5 justify-end">
          <div className="w-1/5 flex gap-2">
            <Button
              label={
                <FontAwesomeIcon icon={faTrash} style={{ color: "#800f0f" }} />
              }
              style="danger"
              onClick={openDeleteConfirmation}
            />
            {showEditForm ? (
              <Button
                label={
                  <FontAwesomeIcon
                    icon={faArrowRotateBack}
                    onClick={closeEditForm}
                  />
                }
                style="secondary"
              />
            ) : (
              <Button
                label={
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={openEditForm}
                  />
                }
                style="secondary"
              />
            )}
          </div>
        </div>
      </div>

      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-xl">
          <div className="bg-white rounded-xl p-10">
            <div className="text-center mb-4">
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  color: "#800f0f",
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              />{" "}
              <br />
              <div className="text-base mt-4">
                Apakah Anda yakin ingin menghapus pertanyaan nomor
                <strong> {questionNumber} </strong>?
              </div>
            </div>
            <div className="flex justify-center gap-2 px-4">
              <Button
                label="Batal"
                style="secondary"
                onClick={closeDeleteConfirmation}
              />
              <Button
                label="Hapus"
                style="danger"
                onClick={() => deleteQuestionToExam.mutate(question)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DetailQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    questionSentence: PropTypes.string.isRequired,
    questionText: PropTypes.string,
    a: PropTypes.string.isRequired,
    b: PropTypes.string.isRequired,
    c: PropTypes.string.isRequired,
    d: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
  }).isRequired,
  questionNumber: PropTypes.number.isRequired,
};

export default DetailQuestion;

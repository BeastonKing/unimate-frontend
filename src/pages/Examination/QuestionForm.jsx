import React from "react";
import { useState } from "react";
import InputField from "../../components/input/InputField";
import Button from "../../components/button/Button";
import TextAreaField from "../../components/input/TextAreaField";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Alert from "../../components/alert/Alert";

const QuestionForm = ({ onSubmit, question }) => {
  const authHeader = useAuthHeader();

  const location = useLocation();
  const [formData, setFormData] = useState({
    questionSentence: question?.questionSentence || "",
    questionText: question?.questionText || "",
    a: question?.a || "",
    b: question?.b || "",
    c: question?.c || "",
    d: question?.d || "",
    ujianId: location.state.id,
    id: question?.id,
  });
  const [error, setError] = useState(null);

  const updateQuestionToExam = useMutation({
    mutationFn: (formData) =>
      axios.put(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/question/update`,
        formData,
        {
          headers: {
            Authorization: authHeader, // Gantilah token_disini dengan token yang benar
          },
        }
      ),

    onSuccess: (response) => {
      console.log("Berhasil memperbaharui data");
      console.log("state:", location.state);
      console.log("hasil:", response);

      onSubmit(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const addQuestionToExam = useMutation({
    mutationFn: (formData) =>
      axios.post(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/question/create`,
        formData,
        {
          headers: {
            Authorization: authHeader, // Gantilah token_disini dengan token yang benar
          },
        }
      ),

    onSuccess: () => {
      console.log("Berhasil memperbaharui data");
      console.log("state:", location.state);

      onSubmit(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [correctAnswer, setCorrectAnswer] = useState(() => {
    if (question) {
      if (question.correctAnswer === question.a) return "a";
      else if (question.correctAnswer === question.b) return "b";
      else if (question.correctAnswer === question.c) return "c";
      else if (question.correctAnswer === question.d) return "d";
    } else return "";
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setCorrectAnswer(value);
    setFormData({ ...formData, correctAnswer: formData[value] }); // Update nilai correctAnswer di formData
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { a, b, c, d } = formData;
    if (a && b && c && d && correctAnswer) {
      if (a !== b && a !== c && a !== d && b !== c && b !== d && c !== d) {
        console.log("Form data:", formData);
        if (question) {
          updateQuestionToExam.mutate({
            ...formData,
            correctAnswer: formData[correctAnswer],
          });
        } else {
          addQuestionToExam.mutate(formData);
        }
      } else {
        setError("Input dari a, b, c, d harus berbeda satu sama lain.");
      }
    } else {
      setError("Silakan isi semua opsi dan pilih jawaban yang benar.");
    }
  };

  const formLabel = question ? "Edit Soal" : "Buat Soal";

  return (
    <>
      <div className="text-2xl font-semibold my-5">{formLabel}</div>
      <form onSubmit={handleSubmit} className="p-8 shadow-lg rounded-lg">
        {error && (
          <Alert
            type="error"
            message="Input Error"
            description={error}
            onClose={() => setError(null)}
          />
        )}
        <TextAreaField
          label="Question Text"
          value={formData.questionText}
          name="questionText"
          onChange={(value) =>
            handleChange({ target: { name: "questionText", value } })
          }
          type="text"
          required
        />
        <TextAreaField
          label="Question Sentence"
          value={formData.questionSentence}
          name="questionSentence"
          onChange={(value) =>
            handleChange({ target: { name: "questionSentence", value } })
          }
          type="text"
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <div className="mt-3">
            <InputField
              label="A"
              value={formData.a}
              name="a"
              onChange={(value) =>
                handleChange({ target: { name: "a", value } })
              }
              placeholder="Option A"
              type="text"
              required
            />
          </div>
          <div className="mt-3">
            <InputField
              label="B"
              value={formData.b}
              name="b"
              onChange={(value) =>
                handleChange({ target: { name: "b", value } })
              }
              placeholder="Option B"
              type="text"
              required
            />
          </div>
          <div className="mt-3">
            <InputField
              label="C"
              value={formData.c}
              name="c"
              onChange={(value) =>
                handleChange({ target: { name: "c", value } })
              }
              placeholder="Option C"
              type="text"
              required
            />
          </div>
          <div className="mt-3">
            <InputField
              label="D"
              value={formData.d}
              name="d"
              onChange={(value) =>
                handleChange({ target: { name: "d", value } })
              }
              placeholder="Option D"
              type="text"
              required
            />
          </div>
        </div>

        <div className="text-lg font-semibold my-5">Opsi Jawaban</div>
        <div className="mt-4 flex">
          {["a", "b", "c", "d"].map((optionValue, optionIndex) => (
            <label
              key={optionIndex}
              className={`flex text-center ${
                correctAnswer === optionValue
                  ? "bg-main-100 text-white"
                  : "bg-white text-main-100"
              } px-3 py-1 shadow-md`}
            >
              <input
                type="radio"
                className="form-radio appearance-none"
                name="correctAnswer"
                value={optionValue}
                checked={correctAnswer === optionValue}
                onChange={handleRadioChange}
              />
              <span className="text-sm">{optionValue.toUpperCase()}</span>
            </label>
          ))}
        </div>
        <div className="my-4">
          <Button type="submit" label="Submit" style="primary" />
        </div>
      </form>
    </>
  );
};

QuestionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  question: PropTypes.shape({
    questionSentence: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    a: PropTypes.string.isRequired,
    b: PropTypes.string.isRequired,
    c: PropTypes.string.isRequired,
    d: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    id: PropTypes.number,
  }),
};

export default QuestionForm;

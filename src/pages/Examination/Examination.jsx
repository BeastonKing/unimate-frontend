import React from "react";

import { NavLink, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const Examination = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const auth = useAuthUser();
  const [index, setIndex] = useState(() => {
    const storedIndex = sessionStorage.getItem("examinationIndex");
    return storedIndex ? parseInt(storedIndex) : 0;
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [question, setQuestion] = useState({ id: null });
  const [ujian, setUjian] = useState();
  const [ujianSiswa, setUjianSiswa] = useState();
  const [questionList, setQuestionList] = useState();
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUjianSiswa = async () => {
      try {
        const ujianSiswaResponse = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/ujian/ujian-siswa/by-ujian-and-siswa/${id}/${auth.id_user}`,
          { headers: { Authorization: authHeader } }
        );

        if (ujianSiswaResponse.data.grade) {
          throw Error("Ujian has already been completed");
        }

        console.log(ujianSiswaResponse);
        setUjianSiswa(ujianSiswaResponse.data);
      } catch (error) {
        console.error(`Error fetching UjianSiswa: `, error.message);
        navigate("/profile");
      }
    };

    fetchUjianSiswa();
  }, []);

  useEffect(() => {
    const fetchUjian = async () => {
      try {
        const ujianResponse = await axios.get(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/ujian/${id}`,
          { headers: { Authorization: authHeader } }
        );
        setUjian(ujianResponse.data);
        setQuestionList(ujianResponse.data.questionContents);
        setQuestion(ujianResponse.data.questionContents[index]);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ujian: `, error.response);
        setLoading(false);
        setErr(error.response);
      }
    };

    fetchUjian();
  }, []);

  useEffect(() => {
    const storedAnswers = JSON.parse(sessionStorage.getItem("questions")) || [];
    const answeredIds = storedAnswers.map((answer) => answer.id);
    setAnsweredQuestions((prevAnsweredQuestions) => {
      const updatedQuestions = [
        ...prevAnsweredQuestions,
        ...answeredIds.filter((id) => !prevAnsweredQuestions.includes(id)),
      ];

      return updatedQuestions;
    });
  }, []);

  useEffect(() => {
    // Store the current index in sessionStorage
    sessionStorage.setItem("examinationIndex", index);
    console.log(index);
  }, [index]);

  useEffect(() => {
    if (question.id) {
      // Check if question exists before accessing its properties
      setQuestion(questionList[index]);
      const storedAnswers =
        JSON.parse(sessionStorage.getItem("questions")) || [];
      const storedAnswer = storedAnswers.find((ans) => ans.id === question.id);
      if (storedAnswer) {
        setSelectedOption(storedAnswer.option);
        setAnsweredQuestions((prev) =>
          prev.includes(question.id) ? prev : [...prev, question.id]
        );
      } else {
        setSelectedOption(null); // Inisialisasi opsi yang dipilih menjadi null jika tidak ada jawaban yang tersimpan
      }
    }
  }, [index, question.id]);

  if (loading) return <h1 className="mt-24">Loading</h1>;
  if (err) return <h1 className="mt-24">An error has occurred: {err.data}</h1>;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const storedAnswers = JSON.parse(sessionStorage.getItem("questions")) || [];
    const existingAnswerIndex = storedAnswers.findIndex(
      (ans) => ans.id === question.id
    );
    if (existingAnswerIndex !== -1) {
      storedAnswers[existingAnswerIndex].option = option;
    } else {
      storedAnswers.push({ id: question.id, option: option });
    }
    sessionStorage.setItem("questions", JSON.stringify(storedAnswers));
    setAnsweredQuestions((prev) =>
      prev.includes(question.id) ? prev : [...prev, question.id]
    );
  };

  const handleNext = () => {
    if (questionList && index < questionList.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleSubmitAnswer = async (event) => {
    event.preventDefault();

    const sessionKeys = Object.keys(sessionStorage);
    const sessionValues = sessionKeys.map((key) => {
      return { [key]: sessionStorage.getItem(key) };
    });

    const submittedAnswer = {
      ujianId: ujian.id,
      siswaId: auth.id_user,
      list: JSON.parse(sessionValues[0].questions),
    };
    console.log(submittedAnswer);

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/ujian/grade`,
        submittedAnswer,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      if (response.status === 200) {
        sessionStorage.clear();
        navigate(`/examination/result/${ujianSiswa.id}`);
      }
    } catch (error) {
      console.log("Error when trying to post answers: " + error);
    }
  };

  const renderOptions = () => {
    return (
      <>
        {question && question.questionSentence && (
          <>
            <label key={0} className="flex items-center my-1">
              <input
                type="radio"
                name="options"
                value={`option1`}
                onChange={() => handleOptionSelect(question.a)} // Mengirim nilai opsi yang dipilih
                checked={selectedOption === question.a} // Memeriksa apakah opsi ini yang dipilih
                className="appearance-none"
              />
              <span
                className={`ml-2 p-2 rounded-lg font-medium text-base w-full flex gap-4 ${
                  selectedOption === question.a
                    ? "bg-main-200 text-white"
                    : "bg-[#F7F8FA]"
                }`}
              >
                <div
                  className={`p-5 text-main-200 rounded-md flex items-center justify-center font-semibold ${
                    selectedOption === question.a ? "bg-white" : "bg-[#DED3F7]"
                  }`}
                >
                  A
                </div>
                <div className="p-2 rounded-lg flex items-center justify-center">
                  {question.a}
                </div>
              </span>
            </label>

            <label key={1} className="flex items-center my-1">
              <input
                type="radio"
                name="options"
                value={`option2`}
                onChange={() => handleOptionSelect(question.b)} // Mengirim nilai opsi yang dipilih
                checked={selectedOption === question.b} // Memeriksa apakah opsi ini yang dipilih
                className="appearance-none"
              />
              <span
                className={`ml-2 p-2 rounded-lg font-medium text-base w-full flex gap-4 ${
                  selectedOption === question.b
                    ? "bg-main-200 text-white"
                    : "bg-[#F7F8FA]"
                }`}
              >
                <div
                  className={`p-5 text-main-200 rounded-md flex items-center justify-center font-semibold ${
                    selectedOption === question.b ? "bg-white" : "bg-[#DED3F7]"
                  }`}
                >
                  B
                </div>
                <div className="p-2 rounded-lg flex items-center justify-center">
                  {question.b}
                </div>
              </span>
            </label>

            <label key={2} className="flex items-center my-1">
              <input
                type="radio"
                name="options"
                value={`option3`}
                onChange={() => handleOptionSelect(question.c)} // Mengirim nilai opsi yang dipilih
                checked={selectedOption === question.c} // Memeriksa apakah opsi ini yang dipilih
                className="appearance-none"
              />
              <span
                className={`ml-2 p-2 rounded-lg font-medium text-base w-full flex gap-4 ${
                  selectedOption === question.c
                    ? "bg-main-200 text-white"
                    : "bg-[#F7F8FA]"
                }`}
              >
                <div
                  className={`p-5 text-main-200 rounded-md flex items-center justify-center font-semibold ${
                    selectedOption === question.c ? "bg-white" : "bg-[#DED3F7]"
                  }`}
                >
                  C
                </div>
                <div className="p-2 rounded-lg flex items-center justify-center">
                  {question.c}
                </div>
              </span>
            </label>

            <label key={3} className="flex items-center my-1">
              <input
                type="radio"
                name="options"
                value={`option4`}
                onChange={() => handleOptionSelect(question.d)} // Mengirim nilai opsi yang dipilih
                checked={selectedOption === question.d} // Memeriksa apakah opsi ini yang dipilih
                className="appearance-none"
              />
              <span
                className={`ml-2 p-2 rounded-lg font-medium text-base w-full flex gap-4 ${
                  selectedOption === question.d
                    ? "bg-main-200 text-white"
                    : "bg-[#F7F8FA]"
                }`}
              >
                <div
                  className={`p-5 text-main-200 rounded-md flex items-center justify-center font-semibold ${
                    selectedOption === question.d ? "bg-white" : "bg-[#DED3F7]"
                  }`}
                >
                  D
                </div>
                <div className="p-2 rounded-lg flex items-center justify-center">
                  {question.d}
                </div>
              </span>
            </label>
          </>
        )}
      </>
    );

    return (
      <>
        {question &&
          question.options &&
          question.options.map((option, optionIndex) => (
            <label key={optionIndex} className="flex items-center my-1">
              <input
                type="radio"
                name="options"
                value={`option${optionIndex + 1}`}
                onChange={() => handleOptionSelect(option)} // Mengirim nilai opsi yang dipilih
                checked={selectedOption === option} // Memeriksa apakah opsi ini yang dipilih
                className="appearance-none"
              />
              <span
                className={`ml-2 p-2 rounded-lg font-medium text-base w-full flex gap-4 ${
                  selectedOption === option
                    ? "bg-main-200 text-white"
                    : "bg-[#F7F8FA]"
                }`}
              >
                <div
                  className={`p-5 text-main-200 rounded-md flex items-center justify-center font-semibold ${
                    selectedOption === option ? "bg-white" : "bg-[#DED3F7]"
                  }`}
                >
                  {String.fromCharCode(65 + optionIndex)}
                </div>
                <div className="p-2 rounded-lg flex items-center justify-center">
                  {option}
                </div>
              </span>
            </label>
          ))}
      </>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row item-center lg:gap-10 w-full lg:px-8 lg:py-12 lg:mt-8">
      <div className="hidden lg:block">
        <aside className="p-5 mt-20 rounded-xl shrink-0 overscroll-contain lg:w-[320px] transition-all duration-300 ease-in-out m-3 z-40 inset-y-0 left-0 border border-rsidenav shadow-md">
          <h3 className="hidden lg:block p-2 text-main-200 font-semibold text-lg">
            Navigasi Soal
          </h3>
          {/* <Timer /> */}
          <div className="p-2 grid grid-cols-5 gap-2">
            {questionList &&
              questionList.map((_, i) => (
                <NavLink
                  key={i}
                  className={`flex items-center justify-center p-2 border-solid border-2 border-main-10 rounded-lg text-main-200 text-2xl font-semibold h-full w-full ${
                    i === index
                      ? "bg-main-200 text-white"
                      : answeredQuestions.includes(i + 1)
                      ? "bg-main-10 text-main-200"
                      : ""
                  }`}
                  to="#"
                  onClick={() => setIndex(i)}
                >
                  {i + 1}
                </NavLink>
              ))}
          </div>
          <div className="border-b  my-5 border border-main-200 opacity-10"></div>
          <div className="hidden lg:block">
            <Button
              onClick={handleSubmitAnswer}
              label="Akhiri Ujian"
              style="danger"
              type="submit"
            />
          </div>
        </aside>
      </div>
      <div className="flex-col flex-wrap mt-20 grow p-5">
        <div className="flex flex-col gap-2">
          <div className="flex w-full text-xs items-center justify-center shadow-md p-3 font-semibold lg:text-xl text-main-200 bg-white rounded-lg ">
            {ujian && ujian.title}
          </div>
          <div className="w-full">
            <div className="p-2 lg:hidden flex flex-row overflow-auto gap-2">
              {questionList &&
                questionList.map((_, i) => (
                  <NavLink
                    key={i}
                    className={`flex items-center justify-center p-4 border-solid border-2 border-main-10 rounded-lg text-main-200 text-2xl font-semibold h-14 w-14 ${
                      i === index
                        ? "bg-main-200 text-white"
                        : answeredQuestions.includes(i + 1)
                        ? "bg-main-10 text-main-200"
                        : ""
                    }`}
                    to="#"
                    onClick={() => setIndex(i)}
                  >
                    {i + 1}
                  </NavLink>
                ))}
            </div>
          </div>
          {/* <div className='items-center justify-center bg-[#DED3F7] p-6 rounded-lg lg:hidden'>
            <div className='flex gap-8 justify-center items-center'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  opacity='0.4'
                  d='M20 10C20 15.524 15.523 20 10 20C4.477 20 0 15.524 0 10C0 4.478 4.477 0 10 0C15.523 0 20 4.478 20 10Z'
                  fill='#5B25D9'
                />
                <path
                  d='M13.5734 13.8143C13.4424 13.8143 13.3104 13.7803 13.1894 13.7093L9.26344 11.3673C9.03744 11.2313 8.89844 10.9863 8.89844 10.7223V5.67529C8.89844 5.26129 9.23444 4.92529 9.64844 4.92529C10.0624 4.92529 10.3984 5.26129 10.3984 5.67529V10.2963L13.9584 12.4193C14.3134 12.6323 14.4304 13.0923 14.2184 13.4483C14.0774 13.6833 13.8284 13.8143 13.5734 13.8143Z'
                  fill='#5B25D9'
                />
              </svg>
              <div className='flex justify-center'>
                <h1 className='font-semibold text-base lg:text-xl text-main-200'>
                  02:15:13
                </h1>
              </div>
            </div>
          </div> */}
        </div>

        <div className="mt-5 lg:mt-8 shadow-md rounded-lg pt-3 px-8 pb-8 lg:p-8">
          <div className="text-sm lg:text-base leading-8">
            {question && question.questionText ? question.questionText : ""}
          </div>
          <div className="border-b  my-5 border border-main-200 opacity-10"></div>
          <div className="text-xl font-">
            <div className="mb-6 flex items-center justify-center text-base lg:text-xl bg-main-200 text-white font-semibold max-w-[140px] rounded-3xl p-2">
              Question {index + 1}
            </div>
            {question && question.questionSentence
              ? question.questionSentence
              : "fetching"}
            <div className="mt-4">{renderOptions()}</div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {/* <div className='w-30'>
            <Button label='Tandai Soal' style='third' />
          </div> */}

          <div className="w-30 flex gap-3">
            {index != 0 && (
              <Button
                label="Sebelumnya"
                style="secondary"
                onClick={handlePrev}
              />
            )}

            {questionList && index == questionList.length - 1 ? (
              <Button
                label="Selesai"
                style="primary"
                onClick={handleSubmitAnswer}
              />
            ) : (
              <Button
                label="Selanjutnya"
                style="primary"
                onClick={handleNext}
              />
            )}
          </div>
        </div>
        <div className="lg:hidden mt-4">
          <Button
            onClick={handleSubmitAnswer}
            label="Akhiri Ujian"
            style="danger"
            type="submit"
          />
        </div>
        {/* <div className='mt-10'>
          <CheckSessionButton />
        </div> */}
      </div>
    </div>
  );
};

export default Examination;

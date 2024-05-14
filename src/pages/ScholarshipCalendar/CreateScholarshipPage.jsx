import React, { useState } from "react";
import Dropdown from "../../components/dropdown/JenjangDropdown";
import Button from "../../components/button/Button";

import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const CreateScholarshipPage = () => {
  const authHeader = useAuthHeader();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [university, setUniversity] = useState("");
  const [jenjang, setJenjang] = useState("");
  const [pendanaan, setPendanaan] = useState("");
  const [languageTest, setLanguageTest] = useState("");
  const [standardTest, setStandardTest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [benefitInput, setBenefitInput] = useState("");
  const [majors, setMajors] = useState([]);
  const [majorInput, setMajorInput] = useState("");
  const [minimumAge, setMinimumAge] = useState("");
  const [minimumGPA, setMinimumGPA] = useState("");

  const handleMajor = () => {
    if (majorInput.trim() !== "") {
      setMajors([...majors, majorInput.trim()]);
      setMajorInput("");
    }
  };

  const handleDeleteMajor = (index) => {
    setMajors(majors.filter((_, i) => i !== index));
  };

  const handleTitle = (e) => {
    const inputValue = e.target.value;
    setTitle(inputValue);
  };

  const handleUniversity = (e) => {
    const inputValue = e.target.value;
    setUniversity(inputValue);
  };

  const handleLanguageTest = (e) => {
    const inputValue = e.target.value;
    setLanguageTest(inputValue);
  };

  const handleStandardTest = (e) => {
    const inputValue = e.target.value;
    setStandardTest(inputValue);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const handleDescription = (e) => {
    const inputValue = e.target.value;
    setDescription(inputValue);
  };

  const handleCheckboxChange = (value) => {
    if (jenjang.includes(value)) {
      setJenjang(jenjang.filter((item) => item !== value));
    } else {
      setJenjang([...jenjang, value]);
    }
  };

  const handleBenefit = () => {
    if (benefitInput.trim() !== "") {
      setBenefits([...benefits, benefitInput.trim()]);
      setBenefitInput("");
    }
  };

  const handleDeleteBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleMinimumAge = (e) => {
    const inputValue = e.target.value;
    setMinimumAge(inputValue);
  };

  const handleMinimumGPA = (e) => {
    const inputValue = e.target.value;
    setMinimumGPA(inputValue);
  };

  const option_jenjang = [
    { value: "D3", label: "D3" },
    { value: "D4", label: "D4" },
    { value: "S1", label: "S1" },
    { value: "S2", label: "S2" },
    { value: "S3", label: "S3" },
  ];

  const option_fund = [
    { value: "FULLY_FUNDED", label: "Fully Funded" },
    { value: "PARTIALLY_FUNDED", label: "Partially Funded" },
    { value: "SELF_FUNDED", label: "Self Funded" },
  ];

  const handleSubmit = () => {
    // Check if any of the required fields are empty
    if (
      title.trim() === "" ||
      university.trim() === "" ||
      description.trim() === "" ||
      jenjang.length === 0 ||
      pendanaan.trim() === "" ||
      languageTest.trim() === "" ||
      standardTest.trim() === "" ||
      startDate.trim() === "" ||
      endDate.trim() === "" ||
      majors.length === 0 ||
      minimumAge.trim() === "" ||
      minimumGPA.trim() === ""
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append all other fields to the formData
    formData.append("title", title);
    formData.append("university", university);
    formData.append("description", description);
    formData.append("standardizedTest", standardTest);
    formData.append("scholarshipType", pendanaan);
    formData.append("degrees", jenjang);
    formData.append("minimumGPA", minimumGPA);
    formData.append("minimumAge", minimumAge);
    formData.append("languageTest", languageTest);
    formData.append("endedAt", endDate);
    formData.append("startedAt", startDate);
    formData.append("benefit", benefits);
    formData.append("major", majors);

    axios
      .post(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/scholarship/create`,
        formData,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        window.alert(
          "Scholarship has been Created. Redirecting to Scholarship Management Page."
        );
        setTimeout(() => {
          window.location.href = "/admin/scholarship-management";
        }, 1500);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-[46.625rem]">
      <div className="mb-5">
        <h3 className="text-3xl font-semibold text-center">
          Create Scholarship
        </h3>
      </div>
      <div className="lg:gap-10">
        <div className="space-y-4 mb-4">
          {/* Title Input Field */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
              Title
            </label>
            <input
              className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
              type="text"
              placeholder="Insert The Title Here."
              onChange={handleTitle}
            />
          </div>

          {/* University Input Field */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
              University
            </label>
            <input
              className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
              type="text"
              placeholder="Insert The University Here."
              onChange={handleUniversity}
            />
          </div>

          {/* Usia Minimal and IPK Minimal Input Fields */}
          <div className="flex gap-4">
            {/* Usia Minimal Input Field */}
            <div className="flex-1">
              <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
                Minimum Age
              </label>
              <input
                className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                type="text"
                placeholder="Insert only The Number of Minimum Age Here."
                onChange={handleMinimumAge}
              />
            </div>

            {/* IPK Minimal Input Field */}
            <div className="flex-1">
              <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
                Minimum GPA
              </label>
              <input
                className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                type="text"
                placeholder="Insert only The Number of Minimum GPA Here."
                onChange={handleMinimumGPA}
              />
            </div>
          </div>

          {/* Description TextArea */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
              Description
            </label>
            <textarea
              className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
              type="text"
              placeholder="Insert The Description Here."
              onChange={handleDescription}
            />
          </div>

          {/* Jenjang Pendidikan Checkbox and Fund Dropdown */}
          <div className="flex gap-4">
            {/* Jenjang Pendidikan Checkbox */}
            <div className="w-1/2">
              <div className="text-sm font-black">Educational Level</div>
              <div className="rounded-md  border:opacity-50 border border-[#5B25D9] border-opacity-50 focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300 p-2 mt-2">
                <div className="flex flex-wrap gap-2">
                  {option_jenjang.map((option) => (
                    <label
                      key={option.value}
                      className="inline-flex items-center"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-main-200"
                        value={option.value}
                        checked={jenjang.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                      />
                      <span className="ml-2 mr-3">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Fund Dropdown */}
            <div className="w-1/2">
              <Dropdown
                label="Fund"
                options={option_fund}
                value={pendanaan}
                onChange={(e) => setPendanaan(e)}
              />
            </div>
          </div>

          {/* Major Input */}
          <div className="flex gap-4">
            <div className="w-3/4">
              <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
                Majors
              </label>
              <input
                className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                type="text"
                placeholder="Insert The Benefit Here."
                value={majorInput}
                onChange={(e) => setMajorInput(e.target.value)}
              />
            </div>
            <div className="w-1/4 h-1/2 mt-7">
              <Button
                onClick={handleMajor}
                label="Add Major"
                style="primary"
                type="button"
                className="px-2 py-1"
              />
            </div>
          </div>

          {/* Major Items Show */}
          <div className="mt-2">
            {majors.map((major, index) => (
              <div
                key={index}
                className="flex items-center mt-2 mb-2 ml-2 mr-2 p-2 bg-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-black text-sm">- {major}</p>
                </div>
                <button
                  className="flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white ml-1 focus:outline-none mr-1"
                  onClick={() => handleDeleteMajor(index)}
                >
                  <span className="text-xs">x</span>
                </button>
              </div>
            ))}
          </div>

          {/* Test Bahasa Input Field */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
              Language Test
            </label>
            <input
              className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
              type="text"
              placeholder="Example: Score IELTS diatas 7.5"
              onChange={handleLanguageTest}
            />
          </div>

          {/* Test Terstandarisasi Input Field */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
              Standardized Test
            </label>
            <input
              className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
              type="text"
              placeholder="Example: Score SAT minimal 1050."
              onChange={handleStandardTest}
            />
          </div>

          {/* Start Date and End Date Input */}
          <div className="flex gap-4">
            {/* Start Date */}
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDate}
                className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
              />
            </div>

            {/* End Date */}
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={handleEndDate}
                className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
              />
            </div>
          </div>

          {/* Benefit Input */}
          <div className="flex gap-4">
            <div className="w-3/4">
              <label className="block mb-1 text-sm font-semibold text-[#1B0947]">
                Benefit
              </label>
              <input
                className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                type="text"
                placeholder="Insert The Benefit Here."
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
              />
            </div>
            <div className="w-1/4 h-1/2 mt-7">
              <Button
                onClick={handleBenefit}
                label="Add Benefit"
                style="primary"
                type="button"
                className="px-2 py-1"
              />
            </div>
          </div>

          {/* Benefit Items Show */}
          <div className="mt-2">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center mt-2 mb-2 ml-2 mr-2 p-2 bg-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-black text-sm">- {benefit}</p>
                </div>
                <button
                  className="flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white ml-1 focus:outline-none mr-1"
                  onClick={() => handleDeleteBenefit(index)}
                >
                  <span className="text-xs">x</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 lg:w-full">
        <Button
          onClick={handleSubmit}
          label="Save Scholarship"
          style="primary"
          type="button"
        />
      </div>
    </div>
  );
};

export default CreateScholarshipPage;

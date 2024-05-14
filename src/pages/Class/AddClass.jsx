import React from "react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Loader from "../../components/loader/Loader";
export default function AddKelas() {
  const authHeader = useAuthHeader();
  const [steps, setSteps] = useState(1);
  const [inputMateri, setInputMateri] = useState("");
  const [inputBenefit, setInputBenefit] = useState("");
  const targetRef = useRef(null);
  const [picURL, setPicURL] = useState();
  const [picURL2, setPicURL2] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    benefits: [],
    price: 0,
    syllabuses: [],
    file: null,
    file2: null,
  });

  useEffect(() => {
    if (targetRef.current) {
      // Scroll to the target element
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [steps]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPicURL(fileURL);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: file,
    }));
  };

  const handleFile2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPicURL2(fileURL);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      file2: file,
    }));
  };

  const handleChangeMateri = (e, key) => {
    if (e.key === "Enter") {
      const newArray = inputMateri.split(",");

      if (formData[key].length + newArray.length <= 6) {
        setFormData((prevState) => ({
          ...prevState,
          [key]: [...prevState[key], ...newArray],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [key]: [
            ...prevState[key],
            ...newArray.slice(0, 6 - prevState[key].length),
          ],
        }));
      }

      setInputMateri("");
    }
  };

  const handleChangeBenefit = (e, key) => {
    if (e.key === "Enter") {
      const newArray = inputBenefit.split(",");
      setFormData((prevState) => ({
        ...prevState,
        [key]: [...prevState[key], ...newArray],
      }));
      setInputBenefit("");
    }
  };

  const handleRemoveBenefit = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      benefits: prevState.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveMateri = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      syllabuses: prevState.syllabuses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.category &&
      formData.description &&
      formData.benefits.length > 0 &&
      formData.syllabuses.length > 0 &&
      formData.price > 0 &&
      formData.file &&
      formData.file2
    ) {
      const postData = new FormData();
      postData.append("name", formData.name);
      postData.append("category", formData.category);
      postData.append("description", formData.description);
      postData.append("price", formData.price);
      formData.benefits.forEach((benefit) =>
        postData.append("benefits", benefit)
      );
      formData.syllabuses.forEach((syllabus) =>
        postData.append("syllabuses", syllabus)
      );
      postData.append("file", formData.file);
      postData.append("file2", formData.file2);

      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/kelas/create`,
          postData,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          window.alert(
            "Class has been Created. Redirecting to Class Management Page."
          );
          setTimeout(() => {
            window.location.href = "/admin/class-management";
          }, 1000);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Ada bidang yang kosong, tampilkan pesan kesalahan atau lakukan tindakan sesuai kebutuhan
      alert("Mohon lengkapi semua bidang sebelum melanjutkan.");
    }
  };

  return (
    <>
      {loading && <Loader loading={true} />}
      <div className="bg-[#F8F9FB] h-full w-full mb-[1000px]">
        <div className=" flex justify-center items-center w-full  ">
          <div className="flex justify-center w-full ">
            <div className="flex-col justify-start ml-8 w-full">
              <h1
                className="text-start font-semibold text-[32px]"
                ref={targetRef}
              >
                Create New Class
              </h1>
              <div className="mt-8 w-1/2 h-[52px] flex justify-start">
                <div
                  onClick={() => {
                    setSteps((prevSteps) =>
                      prevSteps == 1 ? 1 : prevSteps - 1
                    );
                  }}
                  className={
                    "w-1/2  h-full flex justify-center items-center rounded-[8px] " +
                    (steps == 1 ? "bg-main-200" : "bg-white")
                  }
                >
                  <h1
                    className={
                      "font-semibold text-[20px] " +
                      (steps == 1 ? "text-white" : "text-main-200")
                    }
                  >
                    Detail Kelas
                  </h1>
                </div>

                <div
                  onClick={() => {
                    setSteps((prevSteps) =>
                      prevSteps == 2 ? 2 : prevSteps + 1
                    );
                  }}
                  className={
                    "w-1/2  h-full flex justify-center items-center rounded-[8px] " +
                    (steps == 2 ? "bg-main-200" : "bg-white")
                  }
                >
                  <h1
                    className={
                      "font-semibold text-[20px] " +
                      (steps == 2 ? "text-white" : "text-main-200")
                    }
                  >
                    Biaya Daftar
                  </h1>
                </div>
              </div>
              {steps === 1 && (
                <div className="w-full h-full">
                  <div className="mt-7 w-2/3">
                    <h1 className="font-semibold text-[20px]">Nama Kelas</h1>
                    <div>
                      <input
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            name: e.target.value,
                          }))
                        }
                        value={formData.name}
                        placeholder="Masukkan Nama Kelas disini"
                        type="text"
                        className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="mt-7 w-2/3">
                    <h1 className="font-semibold text-[20px]">
                      Kategori Kelas
                    </h1>
                    <select
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          category: e.target.value,
                        }));
                      }}
                      value={formData.category}
                      className="text-sm text-main-200 mt-1 p-2 w-full border-opacity-50 border border-[#5B25D9] rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                    >
                      <option
                        className="text-main-200 text-opacity-50"
                        value=""
                        disabled
                        selected
                        hidden
                      >
                        Pilih Kategori Kelas
                      </option>
                      <option
                        className="text-main-200"
                        value="Bimbingan Beasiswa"
                      >
                        Bimbingan Beasiswa
                      </option>
                      <option className="text-main-200" value="Persiapan Tes">
                        Persiapan Tes
                      </option>
                      <option className="text-main-200" value="Webinar">
                        Webinar
                      </option>
                    </select>
                  </div>

                  <div className="mt-7 mb-7 h-1/3 w-2/3">
                    <h1 className="font-semibold text-[20px]">
                      Deskripsi Kelas
                    </h1>
                    <div className="h-full mt-2">
                      <textarea
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            description: e.target.value,
                          }));
                        }}
                        value={formData.description}
                        placeholder="Insert Text Here"
                        className="placeholder-[#5B25D9] h-full placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border-opacity-50 border border-[#5B25D9] rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="mt-14 w-2/3">
                    <h1 className="font-semibold text-[20px]">Benefit Kelas</h1>
                    <div className="mt-2">
                      <input
                        value={inputBenefit}
                        onChange={(e) => setInputBenefit(e.target.value)}
                        onKeyDown={(e) => handleChangeBenefit(e, "benefits")}
                        placeholder="Masukkan Benefit Kelas disini"
                        type="text"
                        className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                      />
                    </div>
                    <div className="flex flex-wrap mt-5">
                      {" "}
                      {formData.benefits.map((e, i) => (
                        <div
                          key={i}
                          className="flex my-2 bg-main-200 mr-2 px-4 py-3 rounded-[8px]"
                        >
                          <h1 className="text-white font-semibold text-base">
                            {e}
                          </h1>
                          <button
                            onClick={() => handleRemoveBenefit(i)}
                            className="text-white ml-4 font-semibold text-base"
                          >
                            x
                          </button>
                        </div>
                      ))}{" "}
                    </div>
                  </div>

                  <div className="mt-5 w-2/3">
                    <h1 className="font-semibold text-[20px]">
                      Materi yang Diajarkan (Max. 6)
                    </h1>
                    <div className="mt-2">
                      <input
                        value={inputMateri}
                        onChange={(e) => setInputMateri(e.target.value)}
                        onKeyDown={(e) => handleChangeMateri(e, "syllabuses")}
                        placeholder="Masukkan Materi Kelas disini"
                        type="text"
                        className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                      />
                    </div>
                    <div className="flex flex-wrap mt-5">
                      {" "}
                      {formData.syllabuses.map((e, i) => (
                        <div
                          key={i}
                          className="flex my-2 bg-main-200 mr-2 px-4 py-3 rounded-[8px]"
                        >
                          <h1 className="text-white font-semibold text-base">
                            {e}
                          </h1>
                          <button
                            onClick={() => handleRemoveMateri(i)}
                            className="text-white ml-4 font-semibold text-base"
                          >
                            x
                          </button>
                        </div>
                      ))}{" "}
                    </div>
                    <div>
                      <h1 className="font-semibold text-[20px]">
                        Thumbnail Kelas
                      </h1>
                      <div className="mt-2 border  border-dashed border-main-200 h-1/3 flex justify-center">
                        {formData.file !== null ? (
                          <img
                            src={picURL}
                            className="object-cover h-full w-full"
                          />
                        ) : (
                          <div className="flex justify-center items-center flex-col w-2/5 mb-9">
                            <svg
                              className="mt-8"
                              width="72"
                              height="74"
                              viewBox="0 0 72 74"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g filter="url(#filter0_d_738_4528)">
                                <path
                                  opacity="0.4"
                                  d="M48.9984 66H22.9985C12.8307 66 6 58.8687 6 48.2528V23.7502C6 13.1343 12.8307 6 22.9985 6H49.0015C59.1693 6 66 13.1343 66 23.7502V48.2528C66 58.8687 59.1693 66 48.9984 66Z"
                                  fill="#5B25D9"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M33.7353 26.025C33.7353 30.135 30.3903 33.48 26.2803 33.48C22.1673 33.48 18.8253 30.135 18.8253 26.025C18.8253 21.915 22.1673 18.567 26.2803 18.567C30.3903 18.567 33.7353 21.915 33.7353 26.025ZM58.2015 42.2628C58.9005 42.9408 59.4015 43.7148 59.7315 44.5398C60.7305 47.0358 60.2115 50.0358 59.1435 52.5078C57.8775 55.4508 55.4535 57.6738 52.3995 58.6458C51.0435 59.0808 49.6215 59.2668 48.2025 59.2668H23.0595C20.5575 59.2668 18.3435 58.6848 16.5285 57.5928C15.3915 56.9088 15.1905 55.3338 16.0335 54.3078C17.4435 52.5978 18.8355 50.8818 20.2395 49.1508C22.9155 45.8388 24.7185 44.8788 26.7225 45.7218C27.5355 46.0698 28.3515 46.5948 29.1915 47.1468C31.4295 48.6288 34.5405 50.6628 38.6385 48.4548C41.4396 46.9231 43.0657 44.3021 44.481 42.0208L44.5095 41.9748C44.6047 41.8221 44.6992 41.6696 44.7933 41.5174C45.2745 40.7398 45.7485 39.9739 46.2855 39.2688C46.9515 38.3958 49.4235 35.6658 52.6185 37.6098C54.6555 38.8338 56.3685 40.4898 58.2015 42.2628Z"
                                  fill="#5B25D9"
                                />
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_738_4528"
                                  x="-4"
                                  y="0"
                                  width="80"
                                  height="80"
                                  filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dy="4" />
                                  <feGaussianBlur stdDeviation="2" />
                                  <feComposite in2="hardAlpha" operator="out" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_738_4528"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_738_4528"
                                    result="shape"
                                  />
                                </filter>
                              </defs>
                            </svg>
                            <h1 className="text-center">
                              Thumbnail akan tampil sebagai gambar preview kelas
                            </h1>
                            <button
                              type="submit"
                              className="mt-2 py-4 px-6 border border-main-200 text-xl font-semibold text-main-200 rounded-[8px]"
                            >
                              Unggah Gambar
                            </button>
                            <input
                              type="file"
                              className="absolute  w-2/5 h-1/3  opacity-0 bg-main-200 z-50 mt-2 py-4 px-6 border border-main-200 file:border-none file:text-xl file:font-semibold file:text-main-200 rounded-[8px]"
                              value={formData.file}
                              placeholder="Unggah Gambar"
                              onChange={handleFileChange}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-8">
                      <h1 className="font-semibold text-[20px]">Cover Kelas</h1>
                      <div className="mt-2 border  border-dashed border-main-200 h-1/3 flex justify-center">
                        {formData.file2 !== null ? (
                          <img
                            src={picURL2}
                            className="object-cover h-full w-full"
                          />
                        ) : (
                          <div className="flex justify-center items-center flex-col w-2/5 mb-9">
                            <svg
                              className="mt-8"
                              width="72"
                              height="74"
                              viewBox="0 0 72 74"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g filter="url(#filter0_d_738_4528)">
                                <path
                                  opacity="0.4"
                                  d="M48.9984 66H22.9985C12.8307 66 6 58.8687 6 48.2528V23.7502C6 13.1343 12.8307 6 22.9985 6H49.0015C59.1693 6 66 13.1343 66 23.7502V48.2528C66 58.8687 59.1693 66 48.9984 66Z"
                                  fill="#5B25D9"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M33.7353 26.025C33.7353 30.135 30.3903 33.48 26.2803 33.48C22.1673 33.48 18.8253 30.135 18.8253 26.025C18.8253 21.915 22.1673 18.567 26.2803 18.567C30.3903 18.567 33.7353 21.915 33.7353 26.025ZM58.2015 42.2628C58.9005 42.9408 59.4015 43.7148 59.7315 44.5398C60.7305 47.0358 60.2115 50.0358 59.1435 52.5078C57.8775 55.4508 55.4535 57.6738 52.3995 58.6458C51.0435 59.0808 49.6215 59.2668 48.2025 59.2668H23.0595C20.5575 59.2668 18.3435 58.6848 16.5285 57.5928C15.3915 56.9088 15.1905 55.3338 16.0335 54.3078C17.4435 52.5978 18.8355 50.8818 20.2395 49.1508C22.9155 45.8388 24.7185 44.8788 26.7225 45.7218C27.5355 46.0698 28.3515 46.5948 29.1915 47.1468C31.4295 48.6288 34.5405 50.6628 38.6385 48.4548C41.4396 46.9231 43.0657 44.3021 44.481 42.0208L44.5095 41.9748C44.6047 41.8221 44.6992 41.6696 44.7933 41.5174C45.2745 40.7398 45.7485 39.9739 46.2855 39.2688C46.9515 38.3958 49.4235 35.6658 52.6185 37.6098C54.6555 38.8338 56.3685 40.4898 58.2015 42.2628Z"
                                  fill="#5B25D9"
                                />
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_738_4528"
                                  x="-4"
                                  y="0"
                                  width="80"
                                  height="80"
                                  filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dy="4" />
                                  <feGaussianBlur stdDeviation="2" />
                                  <feComposite in2="hardAlpha" operator="out" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_738_4528"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_738_4528"
                                    result="shape"
                                  />
                                </filter>
                              </defs>
                            </svg>
                            <h1 className="text-center">
                              Cover akan tampil sebagai gambar untuk detail
                              informasi kelas
                            </h1>
                            <button
                              type="submit"
                              className="mt-2 py-4 px-6 border border-main-200 text-xl font-semibold text-main-200 rounded-[8px]"
                            >
                              Unggah Gambar
                            </button>
                            <input
                              type="file"
                              className="absolute  w-2/5 h-1/3  opacity-0 bg-main-200 z-50 mt-2 py-4 px-6 border border-main-200 file:border-none file:text-xl file:font-semibold file:text-main-200 rounded-[8px]"
                              value={formData.file2}
                              placeholder="Unggah Gambar"
                              onChange={handleFile2Change}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-7 w-2/3 ">
                    <button
                      onClick={() => {
                        setSteps((prevSteps) => prevSteps + 1);
                      }}
                      id="targetElement"
                      className="w-full rounded-[8px] py-2 text-white bg-main-200 font-semibold text-xl"
                    >
                      Berikutnya
                    </button>
                  </div>
                </div>
              )}
              {steps == 2 && (
                <div>
                  {" "}
                  <div className="mt-8 w-2/3">
                    <h1 className="font-semibold text-[20px]">Harga Kelas</h1>
                    <div className="flex items-center mt-2">
                      <div className=" mr-2 bg-white flex justify-center text-main-200   mt-1 p-2 w-1/12   border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300">
                        Rp
                      </div>
                      <input
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            price: Number(e.target.value),
                          }));
                        }}
                        placeholder="Masukkan Nominal"
                        type="text"
                        className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full  border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <div className="mt-7 w-2/3 flex ">
                    <div className="w-1/2 ">
                      <button
                        onClick={() => {
                          setSteps((prevSteps) => prevSteps - 1);
                        }}
                        className="w-full  rounded-[8px] py-2 text-main-200 bg-white border-main-200 border font-semibold text-xl"
                      >
                        Ke Halaman Sebelumnya
                      </button>
                    </div>
                    <div className="w-1/2 ml-8">
                      <button
                        onClick={handleSubmit}
                        className="w-full p-8 rounded-[8px] py-2 text-white bg-main-200 font-semibold text-xl"
                      >
                        Selesai
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

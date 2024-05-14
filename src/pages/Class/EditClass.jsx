import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useParams } from "react-router-dom";

const EditClass = () => {
  const authHeader = useAuthHeader();
  const { id } = useParams();
  const [teachers, setTeachers] = useState();
  const [steps, setSteps] = useState(1);
  const [inputMateri, setInputMateri] = useState("");
  const [inputBenefit, setInputBenefit] = useState("");
  const targetRef = useRef(null);
  const [listGuru, setListGuru] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    benefits: [],
    price: 0,
    syllabuses: [],
  });

  const fetchData = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}` + "/api/kelas/" + id,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      setFormData(responseData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchGuru = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}` + "/api/account/teachers",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      setListGuru(responseData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async () => {
    try {
      const isConfirmed = confirm(
        `Apakah Anda yakin ingin menghapus ${formData.name} ini?`
      );
      if (!isConfirmed) return;
      axios.delete(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}` + "/api/kelas/" + id,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      window.alert(
        "Class has been deleted. Redirecting to Class Management Page."
      );
      setTimeout(() => {
        window.location.href = "/admin/class-management";
      }, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addGuru = () => {
    const payload = {
      guruId: Number(teachers),
      kelasId: Number(id),
    };
    try {
      const response = axios.post(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/kelas/assign-teacher`,
        payload,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      console.log(response.data);
      window.alert(
        "Teacher has been added. Redirecting to Class Management Page."
      );
      setTimeout(() => {
        window.location.href = "/admin/class-management";
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
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

  useEffect(() => {
    fetchData();
    fetchGuru();
  }, []);

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
      formData.price > 0
    ) {
      axios
        .put(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/kelas/update`,
          formData,
          {
            headers: {
              Authorization: authHeader, // Gantilah token_disini dengan token yang benar
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          window.alert(
            "Class has been Updated. Redirecting to Class Management Page."
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
      <div className="bg-[#F8F9FB] h-full w-full mb-20">
        <div className=" flex justify-center items-center w-full  ">
          <div className="flex justify-center w-full ">
            <div className="flex-col justify-start ml-8 w-full">
              <h1
                className="text-start font-semibold text-[32px]"
                ref={targetRef}
              >
                Update Class
              </h1>
              <div className="mt-8 w-1/2 h-[52px] flex justify-start">
                <div
                  onClick={() => {
                    setSteps(1);
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
                    setSteps(2);
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

                <div
                  onClick={() => {
                    setSteps(3);
                  }}
                  className={
                    "w-1/2  h-full flex justify-center items-center rounded-[8px] " +
                    (steps === 3 ? "bg-main-200" : "bg-white")
                  }
                >
                  <h1
                    className={
                      "font-semibold text-[20px] " +
                      (steps === 3 ? "text-white" : "text-main-200")
                    }
                  >
                    Assign Guru
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
                      className="mt-2 text-sm text-main-200 mt-1 p-2 w-full border-opacity-50 border border-[#5B25D9] rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                      disabled
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
                        value={formData.price}
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
                  <div className="w-2/3 mt-4">
                    <button
                      onClick={deleteData}
                      className="w-full p-8 rounded-[8px] py-2 text-white bg-red-800 font-semibold text-xl"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              )}

              {steps == 3 && (
                <div>
                  {" "}
                  <div className="mt-8 w-2/3">
                    <h1 className="font-semibold text-[20px]">Tambah Guru</h1>
                    <div className="flex items-center mt-2">
                      <select
                        onChange={(e) => setTeachers(e.target.value)}
                        className="placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border:opacity-50 border border-[#5B25D9] border-opacity-50 rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300"
                      >
                        <option
                          className="text-main-200 text-opacity-50"
                          value=""
                          disabled
                          selected
                          hidden
                        >
                          Pilih Guru
                        </option>
                        {listGuru.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-2/3 mt-4">
                    <button
                      onClick={addGuru}
                      className="w-full p-8 rounded-[8px] py-2 text-white bg-main-200 font-semibold text-xl"
                    >
                      Pilih Guru
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditClass;

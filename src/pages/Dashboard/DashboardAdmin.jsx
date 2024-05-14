import React from "react";
import dashboard from "../../assets/image/Group 286.png";
import document from "../../assets/image/Frame 304.svg";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const DashboardAdmin = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/dashboard/admin`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching all articles:", error);
    }
  };

  const auth = useAuthUser();
  return (
    <div className="flex justify-center items-center w-full ">
      <div className="flex w-full">
        <div className="w-full  ">
          <div className="relative w-full  bg-gradient-to-r to-[#686EFB] from-main-200 rounded-lg flex">
            <div className="absolute w-full">
              <h1 className="font-semibold text-2xl text-white mx-8 mt-8 mb-2">
                Selamat datang kembali, {auth.name}!
              </h1>
              <p className="mx-8 mt-2 w-5/12 text-white text-base">
                Semangat untuk bekerja !!!
              </p>
            </div>
            <div className="w-full flex justify-end">
              <img src={dashboard} />
            </div>
          </div>
          <div className=" mt-12">
            <h1 className="font-semibold text-2xl my-8">Dashboard Saya</h1>
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="full border-main-200 border rounded-lg p-4 flex">
                <NavLink to={"/admin/user-management"} className="flex w-full ">
                  <div className="w-2/3">
                    <div className="flex gap-4 items-center mb-4">
                      <img src={document} className="size-12" />
                      <h2 className="flex justify-center items-center font-semibold text-xl text-main-100">
                        Manajemen Pengguna
                      </h2>
                    </div>

                    <h1 className="font-semibold text-base text-main-200">
                      Jumlah Pengguna
                    </h1>
                    <p className="text-sm mt-2 mb-4">{data.account} Pengguna</p>
                  </div>
                  <div className="mt-8 w-2/5 flex flex-col justify-center items-end">
                    <NavLink
                      to={"/admin/user-management"}
                      className=" bg-main-200 text-white py-3 px-2 rounded-xl text-center w-4/5 "
                    >
                      Periksa
                    </NavLink>
                    <NavLink
                      to="/admin/user-create"
                      className=" bg-[#EFE9FB] text-main-200 py-3 px-4 rounded-xl mt-4 text-center w-4/5 "
                    >
                      Tambah
                    </NavLink>
                  </div>
                </NavLink>
              </div>

              <div className="full border-main-200 border rounded-lg p-4 flex">
                <NavLink
                  to={"/admin/class-management"}
                  className="flex w-full "
                >
                  <div className="w-2/3">
                    <div className="flex gap-4 items-center mb-4">
                      <img src={document} className="size-12" />
                      <h2 className="flex justify-center items-center font-semibold text-xl text-main-100">
                        Manajemen Kelas
                      </h2>
                    </div>

                    <h1 className="font-semibold text-base text-main-200">
                      Jumlah Kelas
                    </h1>
                    <p className="text-sm mt-2 mb-4">{data.kelas} Kelas</p>
                  </div>
                  <div className="mt-8 w-2/5 flex flex-col justify-center items-end">
                    <NavLink
                      to={"/admin/class-management"}
                      className=" bg-main-200 text-white py-3 px-4 rounded-xl text-center w-4/5 "
                    >
                      Periksa
                    </NavLink>
                    <NavLink
                      to={"/admin/class-management/add"}
                      className=" bg-[#EFE9FB] text-main-200 py-3 px-4 rounded-xl mt-4 text-center w-4/5 "
                    >
                      Tambah
                    </NavLink>
                  </div>
                </NavLink>
              </div>

              <div className="full border-main-200 border rounded-lg p-4 flex">
                <NavLink to={"/admin/blog-management"} className="flex w-full ">
                  <div className="w-2/3">
                    <div className="flex gap-4 items-center mb-4">
                      <img src={document} className="size-12" />
                      <h2 className="flex justify-center items-center font-semibold text-xl text-main-100">
                        Manajemen Artikel
                      </h2>
                    </div>

                    <h1 className="font-semibold text-base text-main-200">
                      Jumlah Artikel
                    </h1>
                    <p className="text-sm mt-2 mb-4">{data.artikel} Artikel</p>
                  </div>
                  <div className="mt-8 w-2/5 flex flex-col justify-center items-end">
                    <NavLink
                      to={"/admin/blog-management"}
                      className=" bg-main-200 text-white py-3 px-4 rounded-xl text-center w-4/5 "
                    >
                      Periksa
                    </NavLink>
                    <NavLink
                      to={"/admin/create-blog"}
                      className=" bg-[#EFE9FB] text-main-200 py-3 px-4 rounded-xl mt-4 text-center w-4/5 "
                    >
                      Tambah
                    </NavLink>
                  </div>
                </NavLink>
              </div>

              <div className="full border-main-200 border rounded-lg p-4 flex">
                <NavLink
                  to={"/admin/scholarship-management"}
                  className="flex w-full "
                >
                  <div className="w-2/3">
                    <div className="flex gap-4 items-center mb-4">
                      <img src={document} className="size-12" />
                      <h2 className="flex justify-center items-center font-semibold text-xl text-main-100">
                        Manajemen Scholarship
                      </h2>
                    </div>

                    <h1 className="font-semibold text-base text-main-200">
                      Jumlah Artikel
                    </h1>
                    <p className="text-sm mt-2 mb-4">
                      {" "}
                      {data.scholarship} Scholarship
                    </p>
                  </div>
                  <div className="mt-8 w-2/5 flex flex-col justify-center items-end">
                    <NavLink
                      to={"/admin/scholarship-management"}
                      className=" bg-main-200 text-white py-3 px-4 rounded-xl text-center w-4/5 "
                    >
                      Periksa
                    </NavLink>
                    <NavLink
                      to={"/admin/create-scholarship"}
                      className=" bg-[#EFE9FB] text-main-200 py-3 px-4 rounded-xl mt-4 text-center w-4/5 "
                    >
                      Tambah
                    </NavLink>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

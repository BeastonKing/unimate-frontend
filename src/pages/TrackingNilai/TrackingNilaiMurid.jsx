import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import category from "../../assets/image/Category.svg";
import user from "../../assets/image/3 User.svg";
import star from "../../assets/image/Star.svg";
import ProgramPaid from "../../components/classDetail/ProgramPaid";
import ProgramUnpaid from "../../components/classDetail/ProgramUnpaid";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const StatusLulus = ({status}) => {
    return (
        <>
            <div className="flex">
                <div
                className="flex items-center gap-2 text-[#62C21C] bg-[#62C21C] bg-opacity-20 rounded-3xl px-[1rem] py-[0.5rem] font-medium"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="6" fill="#62C21C"/>
                    </svg>

                    <div>{status}</div>
                
                </div>
            </div>
        </>
    )
}

const StatusTidakLulus = () => {
    return (
        <>
            <div className="flex">
                <div
                className="flex items-center gap-2 text-[#FA0000] bg-[#F9C2C2] rounded-3xl px-[1rem] py-[0.5rem] font-medium"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="6" fill="#FA0000"/>
                    </svg>

                    <div>Tidak Lulus</div>
                
                </div>
            </div>
        </>
    )
}

const TrackingNilaiMurid = () => {
    const authHeader = useAuthHeader();
    const [listUser, setListUser] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    return(
        <>
        <div className="w-full">
            <div className="mb-5 mt-5">
                <h3 className="text-2xl font-semibold">Dashboard Nilai Ujian Kelas - Program Persiapan TOEFL</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl">
                <div className="text-2xl font-bold mb-4">Daftar Nilai Ujian 01</div>
                <table
                id="myTable"
                className="w-full rounded-2xl bg-white border border-blue-200 border-spacing-x-0 border-spacing-y-[0.5px] divide-y divide-blue-200 border-collapse text-xs"
                >
                <thead className="bg-[#5b25d9] bg-opacity-20">
                    <tr>
                    <th className="text-left p-4">No</th>
                    <th className="text-left p-4">Nama Siswa</th>
                    <th className="text-left p-4">Skor/Nilai Ujian</th>
                    <th className="text-left p-4">Waktu Penyelesaian</th>
                    <th className="text-left p-4">Status Kelulusan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="p-2">01</td>
                    <td className="p-2">Kiryu Kazuma</td>
                    <td className="p-2">90</td>
                    <td className="p-2">01 Jam 50 Menit</td>
                    <td className="p-2">
                        <StatusLulus status="Lulus" />
                    </td>
                    </tr>
                    <tr>
                    <td className="p-2">02</td>
                    <td className="p-2">Goro Majima</td>
                    <td className="p-2">45</td>
                    <td className="p-2">25 Menit</td>
                    <td className="p-2">
                        <StatusTidakLulus/>
                    </td>
                    </tr>
                    <tr>
                    <td className="p-2">03</td>
                    <td className="p-2">Goro Satoru</td>
                    <td className="p-2">75</td>
                    <td className="p-2">01 Jam 40 Menit</td>
                    <td className="p-2">
                        <StatusLulus status="Completed" />
                    </td>
                    </tr>
                    <tr>
                    <td className="p-2">04</td>
                    <td className="p-2">Robert Pattinsion</td>
                    <td className="p-2">80</td>
                    <td className="p-2">01 Jam 15 Menit</td>
                    <td className="p-2">
                        <StatusLulus status="Completed" />
                    </td>
                    </tr>
                    <tr>
                    <td className="p-2">05</td>
                    <td className="p-2">Ebo Nening</td>
                    <td className="p-2">95</td>
                    <td className="p-2">01 Jam 48 Menit</td>
                    <td className="p-2">
                        <StatusLulus status="Completed" />
                    </td>
                    </tr>
                    <tr>
                    <td className="p-2">06</td>
                    <td className="p-2">Sumanto</td>
                    <td className="p-2">100</td>
                    <td className="p-2">02 Jam 00 Menit</td>
                    <td className="p-2">
                        <StatusLulus status="Completed" />
                    </td>
                    </tr>
                </tbody>
                </table>
                <div className="flex justify-center">
                    <div className="w-full">
                    <div
                        id="w-full"
                        className=" border mt-[22px] rounded-xl flex justify-center items-center bg-white"
                    >
                        <div className="w-full grid grid-cols-3 divide-x-[1px]">
                        <div className="flex justify-center items-center my-8">
                            <div className="">
                            <span className="text-base flex justify-center items-center text-main-200 gap-2">
                                <div className="flex items-center justify-center h-[28px] w-[28px] bg-[#5b25d9] rounded-lg">
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6123 17.7372L16.1123 14.6122C16.0398 14.5197 15.9427 14.4496 15.8321 14.4098C15.7216 14.37 15.6021 14.3622 15.4873 14.3872L9.99977 15.6247L4.51227 14.3747C4.39748 14.3497 4.27795 14.3575 4.1674 14.3973C4.05686 14.4371 3.95977 14.5072 3.88727 14.5997L1.38727 17.7247C1.31473 17.8162 1.26925 17.9261 1.256 18.0421C1.24274 18.1581 1.26223 18.2755 1.31227 18.381C1.36112 18.4896 1.44003 18.5821 1.53969 18.6474C1.63935 18.7128 1.75561 18.7483 1.87477 18.7497H18.1248C18.2426 18.7494 18.3579 18.7157 18.4574 18.6527C18.5569 18.5897 18.6366 18.4998 18.6873 18.3935C18.7373 18.288 18.7568 18.1706 18.7435 18.0546C18.7303 17.9386 18.6848 17.8287 18.6123 17.7372Z" fill="white"/>
                                    <path d="M1.57452 4.9125L9.91827 7.2625L18.5308 4.84375C18.5986 4.78576 18.6532 4.71392 18.6909 4.63307C18.7286 4.55222 18.7486 4.46422 18.7495 4.375C18.7554 4.23634 18.7151 4.09965 18.6347 3.98649C18.5544 3.87333 18.4386 3.79012 18.3058 3.75L10.1808 1.25C10.062 1.21875 9.93708 1.21875 9.81827 1.25L1.69327 3.75C1.5779 3.78714 1.47582 3.85701 1.39945 3.95112C1.32309 4.04523 1.27573 4.15951 1.26314 4.28005C1.25056 4.40059 1.27329 4.52219 1.32858 4.63004C1.38386 4.73789 1.46931 4.82734 1.57452 4.8875V4.9125Z" fill="white"/>
                                    <path d="M10.0875 8.5125C9.97748 8.54588 9.86002 8.54588 9.75 8.5125L5.3125 7.2625V10.175C5.31415 11.2635 5.74731 12.307 6.51702 13.0767C7.28673 13.8464 8.33021 14.2796 9.41875 14.2813H10.5813C11.6698 14.2796 12.7133 13.8464 13.483 13.0767C14.2527 12.307 14.6858 11.2635 14.6875 10.175V7.21875L10.0875 8.5125Z" fill="white"/>
                                    </svg>
                                </div>
                                Peserta
                            </span>
                            <h1 className="font-semibold text-xl mt-3 text-center text-main-200">
                                25 Orang
                            </h1>
                            </div>
                        </div>

                        <div className="flex justify-center items-center ">
                            <div>
                            <span className="text-base flex justify-center items-center text-main-200 gap-2">
                                <div className="flex items-center justify-center h-[28px] w-[28px] bg-[#5b25d9] rounded-lg">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.81 2H16.191C19.28 2 21 3.78 21 6.83V17.16C21 20.26 19.28 22 16.191 22H7.81C4.77 22 3 20.26 3 17.16V6.83C3 3.78 4.77 2 7.81 2ZM8.08 6.66V6.65H11.069C11.5 6.65 11.85 7 11.85 7.429C11.85 7.87 11.5 8.22 11.069 8.22H8.08C7.649 8.22 7.3 7.87 7.3 7.44C7.3 7.01 7.649 6.66 8.08 6.66ZM8.08 12.74H15.92C16.35 12.74 16.7 12.39 16.7 11.96C16.7 11.53 16.35 11.179 15.92 11.179H8.08C7.649 11.179 7.3 11.53 7.3 11.96C7.3 12.39 7.649 12.74 8.08 12.74ZM8.08 17.31H15.92C16.319 17.27 16.62 16.929 16.62 16.53C16.62 16.12 16.319 15.78 15.92 15.74H8.08C7.78 15.71 7.49 15.85 7.33 16.11C7.17 16.36 7.17 16.69 7.33 16.95C7.49 17.2 7.78 17.35 8.08 17.31Z" fill="white"/>
                                    </svg>


                                </div>
                                Nilai Rata-Rata
                            </span>
                            <h1 className="font-semibold text-xl mt-3 text-center text-main-200">
                                75
                            </h1>
                            </div>
                        </div>

                        <div className="flex justify-center items-center ">
                            <div>
                            <span className="text-base flex justify-center items-center text-main-200 gap-2">
                                <div className="flex items-center justify-center h-[28px] w-[28px] bg-[#5b25d9] rounded-lg">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4109 2.76862L16.4119 3.51824C19.1665 3.73413 20.9862 5.61119 20.9891 8.48975L21 16.9155C21.0039 20.054 19.0322 21.985 15.8718 21.99L8.15188 22C5.01119 22.004 3.01482 20.027 3.01087 16.8795L3.00001 8.55272C2.99606 5.65517 4.75153 3.78311 7.50617 3.53024L7.50518 2.78061C7.5042 2.34083 7.83001 2.01 8.26444 2.01C8.69886 2.009 9.02468 2.33883 9.02567 2.77861L9.02666 3.47826L14.8914 3.47027L14.8904 2.77062C14.8894 2.33084 15.2152 2.001 15.6497 2C16.0742 1.999 16.4099 2.32884 16.4109 2.76862ZM4.52148 8.86157L19.4696 8.84158V8.49175C19.4272 6.34283 18.349 5.21539 16.4138 5.04748L16.4148 5.81709C16.4148 6.24688 16.0801 6.5877 15.6556 6.5877C15.2212 6.5887 14.8943 6.24887 14.8943 5.81909L14.8934 5.0095L9.02863 5.01749L9.02962 5.82609C9.02962 6.25687 8.70479 6.5967 8.27036 6.5967C7.83594 6.5977 7.50913 6.25887 7.50913 5.82809L7.50815 5.05847C5.58286 5.25137 4.51753 6.38281 4.52049 8.55072L4.52148 8.86157ZM15.2399 13.4043V13.4153C15.2498 13.8751 15.625 14.2239 16.0801 14.2139C16.5244 14.2029 16.8789 13.8221 16.869 13.3623C16.8483 12.9225 16.4918 12.5637 16.0485 12.5647C15.5944 12.5747 15.2389 12.9445 15.2399 13.4043ZM16.0554 17.892C15.6013 17.882 15.235 17.5032 15.234 17.0435C15.2241 16.5837 15.5884 16.2029 16.0426 16.1919H16.0525C16.5165 16.1919 16.8927 16.5707 16.8927 17.0405C16.8937 17.5102 16.5185 17.891 16.0554 17.892ZM11.1721 13.4203C11.1919 13.8801 11.568 14.2389 12.0222 14.2189C12.4665 14.1979 12.821 13.8181 12.8012 13.3583C12.7903 12.9085 12.425 12.5587 11.9807 12.5597C11.5266 12.5797 11.1711 12.9605 11.1721 13.4203ZM12.0262 17.8471C11.572 17.8671 11.1968 17.5082 11.1761 17.0485C11.1761 16.5887 11.5305 16.2089 11.9847 16.1879C12.429 16.1869 12.7953 16.5367 12.8052 16.9855C12.8259 17.4463 12.4705 17.8261 12.0262 17.8471ZM7.10433 13.4553C7.12408 13.915 7.50025 14.2749 7.95442 14.2539C8.39872 14.2339 8.75317 13.8531 8.73243 13.3933C8.72256 12.9435 8.35725 12.5937 7.91196 12.5947C7.45779 12.6147 7.10334 12.9955 7.10433 13.4553ZM7.95837 17.8521C7.5042 17.8731 7.12901 17.5132 7.10828 17.0535C7.10729 16.5937 7.46273 16.2129 7.9169 16.1929C8.3612 16.1919 8.7275 16.5417 8.73737 16.9915C8.7581 17.4513 8.40365 17.8321 7.95837 17.8521Z" fill="white"/>
                                    </svg>

                                </div>
                                Tanggal Ujian
                            </span>
                            <h1 className="font-semibold text-xl mt-3">
                                <span className="text-main-200 rounded-3xl px-4 py-2">
                                25 April 2024
                                </span>
                            </h1>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default TrackingNilaiMurid;
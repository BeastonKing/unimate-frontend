import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import CircularProgress from "../../components/TrackingNilai/CircularProgress";

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

const TrackingNilai = () => {
    const authHeader = useAuthHeader();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [students, setStudents] = useState([]);
    const [ujianStudents, setUjianStudents] = useState([]);
    const [gradedStudents, setGradedStudents] = useState([]);
    const [ujian, setUjian] = useState({});

    useEffect(() => {
        getUjian()
        getEnrolledStudents()
        getStudents()
        getGradedStudents()
    }, []);

    const getUjian = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/ujian/${id}`,
                {
                method: 'GET',
                headers: {
                    Authorization: authHeader,
                },
                }
            );
    
            const data = await response.json();
            setUjian(data);
    
            console.log(ujian);
    
            } catch (error) {
            console.error('Error fetching ujian:', error);
            }
    }

    const getEnrolledStudents = async () => {
        try {
        const response = await fetch(
            `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/kelas/enrolled-students/${ujian.kelas_id}`,
            {
            method: 'GET',
            headers: {
                Authorization: authHeader,
            },
            }
        );
        if (!response.ok) {
            throw new Error('Failed to fetch enrolled students');
        }

        const data = await response.json();
        setStudents(data);

        console.log(students);

        } catch (error) {
        console.error('Error fetching user:', error);
        }
    };

    const getGradedStudents = async () => {
        try {
        const response = await fetch(
            `${import.meta.env.VITE_UNIMATE_BE_SERVICES}api/ujian/ujian-siswa/list-by-ujian-graded/${id}`,
            {
            method: 'GET',
            headers: {
                Authorization: authHeader,
            },
            }
        );
        if (!response.ok) {
            throw new Error('Failed to fetch graded students');
        }

        const data = await response.json();
        setGradedStudents(data);

        console.log(gradedStudents);

        } catch (error) {
        console.error('Error fetching user:', error);
        }
    };

    const getStudents = async () => {
        try {
        const response = await fetch(
            `${import.meta.env.VITE_UNIMATE_BE_SERVICES}api/ujian/ujian-siswa/list-by-ujian/${id}`,
            {
            method: 'GET',
            headers: {
                Authorization: authHeader,
            },
            }
        );
        if (!response.ok) {
            throw new Error('Failed to fetch graded students');
        }

        const data = await response.json();
        setUjianStudents(data);

        console.log(ujianStudents);

        } catch (error) {
        console.error('Error fetching user:', error);
        }
    };

    let persentaseKeikutsertaan = 0;
    let persentaseKelulusan = 0;
    let jumlahSiswaLulus = 0;
    let avgGrade = 0;
    
    const passingGrade = ujian.passingGrade;
    
    if (students.length > 0 || gradedStudents.length > 0) {
        persentaseKeikutsertaan = (gradedStudents.length / students.length) * 100

        for (let i = 0; i < gradedStudents.length; i++) {
            avgGrade += gradedStudents[i].grade;
            if (gradedStudents[i].grade > passingGrade) {
                jumlahSiswaLulus += 1;
            }
        } 
        avgGrade /= gradedStudents.length;
        Math.round(avgGrade * 100)/100;

        persentaseKelulusan = (jumlahSiswaLulus / students.length) * 100
    }

    function formattedDate(timestamp) {
        const dateObject = new Date(timestamp);
        const day = String(dateObject.getDate()).padStart(2, '0');
        let month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const months = {
            '01': 'Januari',
            '02': 'Februari',
            '03': 'Maret',
            '04': 'April',
            '05': 'Mei',
            '06': 'Juni',
            '07': 'Juli',
            '08': 'Agustus',
            '09': 'September',
            '10': 'Oktober',
            '11': 'November',
            '12': 'Desember',
        }
        month = months[month]
        const year = dateObject.getFullYear();
        return `${day} ${month} ${year}`;
    }

    function handleKelulusan(score) {
        if (score == null) {
            return(<StatusLulus status="Dalam Pengerjaan" />)
        }

        if (score > avgGrade) {
            return(<StatusLulus status="Lulus" />)
        }

        return(<StatusTidakLulus />)
    }

    const RingkasanUjian = (

    ) => {
        return(
            <>
            <div className="mb-4">
                <div className="flex gap-4 mb-4">
                    <div className="bg-white rounded-lg w-[50%] text-[#5b25d9] font-medium p-4 border-[1px] border-[#5b25d9] border-opacity-20">
                        <div className="flex items-center justify-center h-[40px] w-[40px] bg-[#5b25d9] rounded-lg mb-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.6123 17.7372L16.1123 14.6122C16.0398 14.5197 15.9427 14.4496 15.8321 14.4098C15.7216 14.37 15.6021 14.3622 15.4873 14.3872L9.99977 15.6247L4.51227 14.3747C4.39748 14.3497 4.27795 14.3575 4.1674 14.3973C4.05686 14.4371 3.95977 14.5072 3.88727 14.5997L1.38727 17.7247C1.31473 17.8162 1.26925 17.9261 1.256 18.0421C1.24274 18.1581 1.26223 18.2755 1.31227 18.381C1.36112 18.4896 1.44003 18.5821 1.53969 18.6474C1.63935 18.7128 1.75561 18.7483 1.87477 18.7497H18.1248C18.2426 18.7494 18.3579 18.7157 18.4574 18.6527C18.5569 18.5897 18.6366 18.4998 18.6873 18.3935C18.7373 18.288 18.7568 18.1706 18.7435 18.0546C18.7303 17.9386 18.6848 17.8287 18.6123 17.7372Z" fill="white"/>
                            <path d="M1.57452 4.9125L9.91827 7.2625L18.5308 4.84375C18.5986 4.78576 18.6532 4.71392 18.6909 4.63307C18.7286 4.55222 18.7486 4.46422 18.7495 4.375C18.7554 4.23634 18.7151 4.09965 18.6347 3.98649C18.5544 3.87333 18.4386 3.79012 18.3058 3.75L10.1808 1.25C10.062 1.21875 9.93708 1.21875 9.81827 1.25L1.69327 3.75C1.5779 3.78714 1.47582 3.85701 1.39945 3.95112C1.32309 4.04523 1.27573 4.15951 1.26314 4.28005C1.25056 4.40059 1.27329 4.52219 1.32858 4.63004C1.38386 4.73789 1.46931 4.82734 1.57452 4.8875V4.9125Z" fill="white"/>
                            <path d="M10.0875 8.5125C9.97748 8.54588 9.86002 8.54588 9.75 8.5125L5.3125 7.2625V10.175C5.31415 11.2635 5.74731 12.307 6.51702 13.0767C7.28673 13.8464 8.33021 14.2796 9.41875 14.2813H10.5813C11.6698 14.2796 12.7133 13.8464 13.483 13.0767C14.2527 12.307 14.6858 11.2635 14.6875 10.175V7.21875L10.0875 8.5125Z" fill="white"/>
                            </svg>
                        </div>
                        <p>Jumlah Total Siswa</p>
                        <p className="text-2xl font-semibold">{students.length} Siswa</p>
                    </div>
                    <div className="bg-white rounded-lg w-[50%] text-[#5b25d9] font-medium p-4 border-[1px] border-[#5b25d9] border-opacity-20">
                        <div className="flex items-center justify-center h-[40px] w-[40px] bg-[#5b25d9] rounded-lg mb-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.6123 17.7372L16.1123 14.6122C16.0398 14.5197 15.9427 14.4496 15.8321 14.4098C15.7216 14.37 15.6021 14.3622 15.4873 14.3872L9.99977 15.6247L4.51227 14.3747C4.39748 14.3497 4.27795 14.3575 4.1674 14.3973C4.05686 14.4371 3.95977 14.5072 3.88727 14.5997L1.38727 17.7247C1.31473 17.8162 1.26925 17.9261 1.256 18.0421C1.24274 18.1581 1.26223 18.2755 1.31227 18.381C1.36112 18.4896 1.44003 18.5821 1.53969 18.6474C1.63935 18.7128 1.75561 18.7483 1.87477 18.7497H18.1248C18.2426 18.7494 18.3579 18.7157 18.4574 18.6527C18.5569 18.5897 18.6366 18.4998 18.6873 18.3935C18.7373 18.288 18.7568 18.1706 18.7435 18.0546C18.7303 17.9386 18.6848 17.8287 18.6123 17.7372Z" fill="white"/>
                            <path d="M1.57452 4.9125L9.91827 7.2625L18.5308 4.84375C18.5986 4.78576 18.6532 4.71392 18.6909 4.63307C18.7286 4.55222 18.7486 4.46422 18.7495 4.375C18.7554 4.23634 18.7151 4.09965 18.6347 3.98649C18.5544 3.87333 18.4386 3.79012 18.3058 3.75L10.1808 1.25C10.062 1.21875 9.93708 1.21875 9.81827 1.25L1.69327 3.75C1.5779 3.78714 1.47582 3.85701 1.39945 3.95112C1.32309 4.04523 1.27573 4.15951 1.26314 4.28005C1.25056 4.40059 1.27329 4.52219 1.32858 4.63004C1.38386 4.73789 1.46931 4.82734 1.57452 4.8875V4.9125Z" fill="white"/>
                            <path d="M10.0875 8.5125C9.97748 8.54588 9.86002 8.54588 9.75 8.5125L5.3125 7.2625V10.175C5.31415 11.2635 5.74731 12.307 6.51702 13.0767C7.28673 13.8464 8.33021 14.2796 9.41875 14.2813H10.5813C11.6698 14.2796 12.7133 13.8464 13.483 13.0767C14.2527 12.307 14.6858 11.2635 14.6875 10.175V7.21875L10.0875 8.5125Z" fill="white"/>
                            </svg>
                        </div>
                        <p>Siswa yang Menyelesaikan Ujian</p>
                        <p className="text-2xl font-semibold">{gradedStudents.length} Siswa</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex justify-between flex-col bg-[#5b25d9] rounded-lg text-white font-medium p-4 border-[1px] border-[#5b25d9] border-opacity-20 min-w-[250px]">
                        <div className="flex items-center justify-center h-[40px] w-[36px] bg-white rounded-lg mb-2">
                            <svg width="20" height="32" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.9586 12.6455L14.9986 10.7705L14.0236 12.6455C13.9299 12.826 13.8005 12.9856 13.6432 13.1145C13.4859 13.2435 13.304 13.3391 13.1086 13.3955L10.9336 14.0405L12.1336 14.9105C12.369 15.0753 12.5522 15.3043 12.6612 15.5703C12.7702 15.8362 12.8006 16.1278 12.7486 16.4105L12.4486 18.3605L14.3236 17.4155C14.533 17.31 14.7641 17.2551 14.9986 17.2551C15.233 17.2551 15.4642 17.31 15.6736 17.4155L17.5786 18.3605L17.2636 16.4105C17.2132 16.1264 17.2458 15.8337 17.3576 15.5677C17.4693 15.3016 17.6554 15.0734 17.8936 14.9105L19.1236 14.0705L16.9036 13.4255C16.7001 13.3693 16.5107 13.2708 16.3478 13.1364C16.185 13.002 16.0523 12.8347 15.9586 12.6455Z" fill="#5B25D9"/>
                            <path d="M25.5 0H4.5C3.30653 0 2.16193 0.474106 1.31802 1.31802C0.474106 2.16193 0 3.30653 0 4.5V37.5C0 38.6935 0.474106 39.8381 1.31802 40.682C2.16193 41.5259 3.30653 42 4.5 42H25.5C26.6935 42 27.8381 41.5259 28.682 40.682C29.5259 39.8381 30 38.6935 30 37.5V4.5C30 3.30653 29.5259 2.16193 28.682 1.31802C27.8381 0.474106 26.6935 0 25.5 0ZM18 34.5H12C11.6022 34.5 11.2206 34.342 10.9393 34.0607C10.658 33.7794 10.5 33.3978 10.5 33C10.5 32.6022 10.658 32.2206 10.9393 31.9393C11.2206 31.658 11.6022 31.5 12 31.5H18C18.3978 31.5 18.7794 31.658 19.0607 31.9393C19.342 32.2206 19.5 32.6022 19.5 33C19.5 33.3978 19.342 33.7794 19.0607 34.0607C18.7794 34.342 18.3978 34.5 18 34.5ZM21 30H9C8.60218 30 8.22064 29.842 7.93934 29.5607C7.65804 29.2794 7.5 28.8978 7.5 28.5C7.5 28.1022 7.65804 27.7206 7.93934 27.4393C8.22064 27.158 8.60218 27 9 27H21C21.3978 27 21.7794 27.158 22.0607 27.4393C22.342 27.7206 22.5 28.1022 22.5 28.5C22.5 28.8978 22.342 29.2794 22.0607 29.5607C21.7794 29.842 21.3978 30 21 30ZM23.4 14.7L20.4 16.815L21 20.7C21.0535 20.9812 21.0255 21.2719 20.9192 21.5377C20.8129 21.8035 20.6327 22.0333 20.4 22.2C20.1841 22.3527 19.9316 22.4457 19.6682 22.4694C19.4047 22.4931 19.1397 22.4467 18.9 22.335L15 20.37L11.19 22.305C10.9778 22.4217 10.7418 22.4884 10.5 22.5C10.1874 22.498 9.88322 22.3983 9.63 22.215C9.39728 22.0483 9.21712 21.8185 9.11081 21.5527C9.00449 21.2869 8.97645 20.9962 9.03 20.715L9.63 16.785L6.63 14.655C6.39728 14.4883 6.21712 14.2585 6.11081 13.9927C6.00449 13.7269 5.97645 13.4362 6.03 13.155C6.07829 12.8774 6.20381 12.619 6.39216 12.4094C6.58052 12.1998 6.8241 12.0475 7.095 11.97L11.595 10.635L13.65 6.825C13.7772 6.58312 13.9682 6.38061 14.2021 6.23933C14.4361 6.09806 14.7042 6.02339 14.9775 6.02339C15.2508 6.02339 15.5189 6.09806 15.7529 6.23933C15.9868 6.38061 16.1778 6.58312 16.305 6.825L18.315 10.695L22.95 12C23.2229 12.0787 23.4679 12.2332 23.6564 12.4456C23.845 12.6581 23.9693 12.9197 24.015 13.2C24.067 13.4827 24.0366 13.7743 23.9276 14.0402C23.8186 14.3062 23.6354 14.5352 23.4 14.7Z" fill="#5B25D9"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-5xl font-semibold mb-2">{avgGrade}</p>
                            <p>Nilai Rata-Rata Kelas</p>
                            <p>pada {ujian.title}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-full border rounded-lg bg-white">
                            <div className="grid grid-cols-2 divide-x divide-gray-300">
                                <div className="flex justify-center items-center py-8 px-4">
                                    <div>
                                        <p className="text-center text-[#5b25d9]">Persentase Keikutsertaan</p>
                                        <div className="flex justify-center mt-4">
                                            <CircularProgress percentage={persentaseKeikutsertaan} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center py-8 px-4">
                                    <div>
                                        <p className="text-center text-[#5b25d9]">Persentase Kelulusan</p>
                                        <div className="flex justify-center mt-4">
                                            <CircularProgress percentage={persentaseKelulusan} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }

    return(
        <>
        <div className="w-full">
            <div className="mb-5 mt-5">
                <h3 className="text-2xl font-semibold">Dashboard Nilai {ujian.title}</h3>
            </div>
            {/* {listUjian.map((data) => (
                
            ))} */}
            <RingkasanUjian />  
            <div className="bg-white p-6 rounded-2xl mb-4">
                <div className="text-2xl font-bold mb-4">Daftar Nilai {ujian.title}</div>
                <table
                    id="myTable"
                    className="w-full rounded-2xl bg-white border border-blue-200 border-spacing-x-0 border-spacing-y-[0.5px] divide-y divide-blue-200 border-collapse text-xs"
                >
                    <thead className="bg-[#5b25d9] bg-opacity-20">
                        <tr>
                            <th className="text-left p-4">No</th>
                            <th className="text-left p-4">Nama Siswa</th>
                            <th className="text-left p-4">Skor/Nilai Ujian</th>
                            <th className="text-left p-4">Status Kelulusan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ujianStudents.length > 0 ? (
                            ujianStudents.map((data, index) => (
                                <tr key={index}>
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{data.siswa.name}</td>
                                    <td className="p-2">{data.grade}</td>
                                    <td className="p-2">
                                        {handleKelulusan(data.grade)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className='text-center text-gray-500 p-4'>Tidak ada siswa yang mengerjakan ujian</td>
                            </tr>
                        )}
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
                                {gradedStudents.length} Orang
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
                                {avgGrade}
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
                                {formattedDate(ujian.startDate)}
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

export default TrackingNilai;
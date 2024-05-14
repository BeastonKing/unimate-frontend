import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate, useParams } from 'react-router-dom';
import examOverview from "../../assets/exam-overview.png";
import Docs from '../../assets/docs.svg'
import Pencil from '../../assets/Icons/Light/Pencil.svg'
import Calendar from '../../assets/Icons/Light/Calendar.svg'
import Clock from '../../assets/Icons/Light/Clock.svg'
import { convertDateToDDMMYYYYInIndonesian } from '../../utils/convertDuration';
import Button from '../../components/button/Button';

const ExaminationOverview = () => {
    const { id } = useParams();
    const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const [ujian, setUjian] = useState();
    const [isEnrolled, setIsEnrolled] = useState(false);

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
    
                // Check if ujian is ongoing but not finished yet
                // Redirect to taking ujian page (resume ujian)
                if (ujianSiswaResponse && !ujianSiswaResponse.data.grade) {
                    navigate(`/examination/${id}/do`)
                }

                // Check if ujian is finished
                // Redirect to ujian result page
                if (ujianSiswaResponse && ujianSiswaResponse.data.grade) {
                    navigate(`/examination/result/${ujianSiswaResponse.data.id}`)
                }
            } catch (error) {
                console.error(`Error fetching UjianSiswa: `, error.message);
            }
        }
        fetchUjianSiswa();
    }, [])

    useEffect(() => {
        const fetchUjian = async () => {
          try {

            const ujianResponse = await axios.get(
              `${
                import.meta.env.VITE_UNIMATE_BE_SERVICES
              }/api/ujian/${id}`,
              { headers: { Authorization: authHeader } }
            );

            const isEnrolledResponse = await axios.get(
                `${
                  import.meta.env.VITE_UNIMATE_BE_SERVICES
                }/api/kelas/is-enrolled?kelasId=${ujianResponse.data.kelas.id}`,
                { headers: { Authorization: authHeader } }
            );

            if (isEnrolledResponse.data) {
                setIsEnrolled(true);
            }
    
            setUjian(ujianResponse.data);
          } catch (error) {
            console.error(`Error fetching Ujian: `, error.message);
            navigate('/profile');
          }
        };
    
        fetchUjian();
      }, []);

      const handleMulaiUjian = async (event) => {
        event.preventDefault();

        if (ujian && auth && isEnrolled) {
            const studentToTakeExam = {
                ujianId: ujian.id,
                studentId: auth.id_user
            };

            try {
                const takeExamResponse = await axios.post(
                    `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/ujian/take-exam`,
                    studentToTakeExam,
                    { headers: { Authorization: authHeader } }
                );

                if (takeExamResponse.status === 200) {
                    navigate(`/examination/${ujian.id}/do`)
                }


            } catch (error) {
                console.error(`Error when trying to take exam: `, error.message);
            }
        }
      }

  return (
    <div className='flex flex-col md:flex-row gap-5 mt-28 px-8 sm:px-12 md:px-16 lg:px-32'>

        {/* Left side */}
        <div className="flex flex-col p-5 w-full md:w-3/5 gap-4">
            <img src={examOverview} className='min-w-32 w-96 self-center' alt="" />
            <h1 className='font-semibold text-main-200 text-3xl md:text-4xl leading-snug text-center md:text-left'>Ujianmu sudah bisa diakses, nih!</h1>
            <p className='text-[16px] md:text-[20px] text-center md:text-left'>Kamu bisa membaca informasi ujian terlebih dahulu dan bisa memulai ujiannya dengan klik “mulai ujian” ya!</p>
        </div>

        {/* Right Side */}
        <div className="bg-white rounded-xl p-7 shadow-md w-full min-w-60 h-fit md:w-2/5 flex flex-col gap-5">
            
            {/* Lists */}
            <div className='flex gap-4 items-center'>
                <img src={Docs} className="w-10" />
                <div>
                    <p className='text-main-200 text-xs md:text-sm p-0 m-0'>Nama Tes</p>
                    <p className='font-semibold text-main-200 text-sm md:text-lg p-0 m-0'>{ujian && ujian.title}</p>
                </div>
            </div>

            <div className='flex gap-4 items-center'>
                <img src={Calendar} className="w-10" />
                <div>
                    <p className='text-main-200 text-xs md:text-sm p-0 m-0'>Tanggal Pelaksanaan</p>
                    <p className='font-semibold text-main-200 text-sm md:text-lg p-0 m-0'>{ujian && convertDateToDDMMYYYYInIndonesian(ujian.startDate) }</p>
                </div>
            </div>

            <div className='flex gap-4 items-center'>
                <img src={Pencil} className="w-10" />
                <div>
                    <p className='text-main-200 text-xs md:text-sm p-0 m-0'>Percobaan</p>
                    <p className='font-semibold text-main-200 text-sm md:text-lg p-0 m-0'>1 Kali Percobaan (1x Attempt)</p>
                </div>
            </div>


            <hr class="h-px my-2 bg-main-200 border-dashed border-t-2 border-white dark:bg-main-200" />
            <p className='text-sm md:text-lg'>Kalau kamu sudah yakin dengan ujiannya, silakan klik tombol di bawah untuk memulai ujian.</p>
            <p className='text-sm md:text-lg text-main-200 font-semibold'>Selamat Mengerjakan dan Good Luck!</p>
            <div className="min-w-40 h-fit w-full"><Button label={"Mulai Ujian"} style='primary' onClick={handleMulaiUjian} ></Button></div>
        </div>

    </div>
  )
}

export default ExaminationOverview
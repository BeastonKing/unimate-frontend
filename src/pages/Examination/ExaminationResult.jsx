import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate, useParams } from 'react-router-dom';
import hiking from "../../assets/hiking-ujianfailed.png";
import trophy from "../../assets/trophy-ujianpassed.png";
import Button from '../../components/button/Button';
import document from "../../assets/image/Document.svg";
import Docs from '../../assets/docs.svg'

const ExaminationResult = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const auth = useAuthUser();
  const [ujianSiswa, setUjianSiswa] = useState();
  const [isPassed, setIsPassed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUjianSiswa = async () => {
      try {
        const ujianSiswaResponse = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/ujian/ujian-siswa/${id}`,
          { headers: { Authorization: authHeader } }
        );

        if (ujianSiswaResponse.data.siswa.id !== auth.id_user) {
            throw Error('You are not authorized to perform this action.');
        }

        if (!ujianSiswaResponse.data.grade) {
          throw Error('Ujian has not yet been completed.');
        }
        
        if (ujianSiswaResponse.data.grade > ujianSiswaResponse.data.ujian.passingGrade) {
            setIsPassed(true);
        }

        setUjianSiswa(ujianSiswaResponse.data);
      } catch (error) {
        console.error(`Error fetching UjianSiswa: `, error.message);
        navigate('/profile');
      }
    };

    fetchUjianSiswa();
  }, []);

  return (
    <div className='flex flex-col md:flex-row justify-center w-full mt-24 px-12 md:px-24 gap-7'>
        <div className="flex flex-col justify-center items-center w-full md:w-3/5 lg:w-8/12 gap-5 text-center md:text-left">
            {isPassed ? 
                (
                    <>
                        <img src={trophy} className='min-w-32 w-80' alt="" />
                        <h2 className=' font-semibold text-main-200 p-0 self-center md:self-start md:text-4xl text-3xl'>Selamat, ya! Kamu Lulus!</h2>
                        <p className=' self-center md:self-start text-lg'>Selamat ya! Kamu telah berhasil menyelesaikan <span className='text-main-200 font-semibold'>{ujianSiswa && ujianSiswa.ujian.title}</span> dengan total skor <span className='text-main-200 font-semibold'>{ujianSiswa && ujianSiswa.grade}</span> dari 100. Rincian skornya bisa kamu lihat di samping ya!</p>
                    </>
                ) : 
                (
                    <>
                        <img src={hiking} className='min-w-32 w-40 mt-7 md:mt-0' alt="" />
                        <h2 className=' font-semibold text-main-200 self-center md:self-start md:text-4xl text-3xl'>Yah, Belum Lulus, nih....</h2>
                        <p className='self-center md:self-start text-lg'>Tapi, tetap semangat ya! kamu bisa evaluasi lagi kekuranganmu dari rincian skor ujian di samping!</p>
                    </>
                )
            }
            
            
        </div>
        <div className="flex flex-col w-full md:w-2/5 lg:w-4/12 gap-5 justify-center items-center md:items-start mt-5 md:justify-end">
            <h3 className='text-main-200 text-lg'>Rincian Skor Ujian</h3>
            <h2 className=' font-semibold text-main-200 text-4xl'>{ujianSiswa && ujianSiswa.siswa.name}</h2>

            <div className="flex flex-wrap gap-5 justify-center md:justify-between w-full">

                {/* Cards */}
                <div className='bg-white shadow-md rounded-xl flex flex-col min-w-36 w-48 gap-4 p-4'>
                    <div className='flex gap-2 items-center'>
                        <img src={Docs} className="w-10" />
                        <span className='text-main-200'>Soal Benar</span>
                    </div>
                    <h2 className={` font-extrabold text-lg md:text-3xl text-main-200`}>{ujianSiswa && Math.round((ujianSiswa.grade / 100) * ujianSiswa.ujian.questionContents.length)}</h2>
                </div>
                <div className='bg-white shadow-md rounded-xl flex flex-col min-w-36 w-48 gap-4 p-4'>
                    <div className='flex gap-2 items-center'>
                        <img src={Docs} className="w-10" />
                        <span className='text-main-200'>Soal Salah</span>
                    </div>
                    <h2 className={` font-extrabold text-lg md:text-3xl text-main-200`}>{ujianSiswa && ujianSiswa.ujian.questionContents.length - Math.round((ujianSiswa.grade / 100) * ujianSiswa.ujian.questionContents.length)}</h2>
                </div>
                <div className='bg-white shadow-md rounded-xl flex flex-col min-w-36 w-48 gap-4 p-4'>
                    <div className='flex gap-2 items-center'>
                        <img src={Docs} className="w-10" />
                        <span className='text-main-200'>Total Skor</span>
                    </div>
                    <h2 className={` font-extrabold text-lg md:text-3xl ${isPassed ? 'text-green-500' : 'text-red-500'}`}>{ujianSiswa && ujianSiswa.grade}</h2>
                </div>
            </div>


            <div className="min-w-40 h-fit w-full"><Button label={"Kembali ke Halaman Manajemen Kelas"} style='primary' ></Button></div>
        </div>
    </div>
  )
};

export default ExaminationResult;

import React, { useState, useEffect } from 'react';
import ScholarshipTag from '../../components/scholarship/ScholarshipTag';
import uniImage from '../../assets/image/gambar-uni.avif';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faUserGraduate,
  faCircleCheck,
  faFile,
  faBuildingColumns,
} from '@fortawesome/free-solid-svg-icons';

const DetailScholarshipPage = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const [scholarship, setScholarship] = useState(null);
  const dokumen = [
    'Paspor',
    'Income Statement',
    'Formulir Aplikasi',
    'SKHUN',
    'Essay',
    'Ijazah',
    'Surat Rekomendasi',
    'Sertifikat Bahasa Inggris',
    'Transkrip Akademik',
  ];

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/scholarship/get-by-scholarship-id?scholarshipId=${id}`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        console.log('Scholarship Data', response.data);
        setScholarship(response.data);

        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching Scholarship Data:', error);
      }
    };
    fetchScholarship();
  }, [id, authHeader]);

  const mapScholarshipTypeToLabel = (type) => {
    switch (type) {
      case 'PARTIALLY_FUNDED':
        return 'Partially Funded';
      case 'FULLY_FUNDED':
        return 'Fully Funded';
      case 'SELF_FUNDED':
        return 'Self Funded';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className='sm:mt-36 my-12 mx-4 sm:mx-10 md:mx-20'>
      <div className='text-center text-4xl sm:text-6xl md:text-8xl rounded-lg shadow-md bg-gray-200 my-8 sm:my-16 min-w-full h-60 sm:h-80'>
        <img
          src={uniImage}
          alt='Uni Image'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10'>
        <div className='text-left'>
          <div className='p-4 text-3xl sm:text-5xl font-black'>
            {scholarship && scholarship.title}
          </div>
          <div className='flex flex-wrap'>
            <ScholarshipTag
              tag={
                scholarship &&
                mapScholarshipTypeToLabel(scholarship.scholarshipType)
              }
              size='page'
            />
            {scholarship &&
              scholarship.scholarshipDegrees.map((item, index) => (
                <ScholarshipTag key={index} tag={item} size='page' />
              ))}
          </div>
        </div>

        <div className='text-3xl sm:text-justify'>
          <div className='rounded-lg border border-gray-400 shadow-md bg-white mb-5 h-[120px] sm:h-[160px] flex items-center justify-center'>
            <div className='relative flex flex-col items-center p-4'>
              <h1 className='text-xl mb-2 font-black italic'>
                Open Registration
              </h1>
              <div className='flex items-center'>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className='text-main-100 mr-5 text-3xl sm:text-5xl'
                />
                <h1 className='text-2xl sm:text-4xl font-black'>
                  {scholarship && formatDate(scholarship.startedAt)}
                </h1>
              </div>
            </div>
          </div>

          <div className='rounded-lg border border-gray-400 shadow-md bg-white mb-5 h-[120px] sm:h-[160px] flex items-center justify-center'>
            <div className='relative flex flex-col items-center p-4'>
              <h1 className='text-xl mb-2 font-black italic'>
                Closing/Deadline
              </h1>
              <div className='flex items-center'>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className='text-main-100 mr-5 text-3xl sm:text-5xl'
                />
                <h1 className='text-2xl sm:text-4xl font-black'>
                  {scholarship && formatDate(scholarship.endedAt)}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='border-b border-dashed border-gray-500 w-full mt-8 mb-8'></div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='column1'>
          <div className='rounded-lg bg-white border border-gray-400 relative mb-5'>
            <h1 className='pt-2 pl-2 mx-5 font-black italic'>
              Deskripsi Beasiswa
            </h1>
            <p className='p-4 mx-5'>{scholarship && scholarship.description}</p>
          </div>

          <div className='rounded-lg bg-white border border-gray-400 relative mb-5'>
            <h1 className='pt-2 pl-2 mx-5 font-black italic'>
              Universitas Terdaftar
            </h1>
            <div className='relative flex items-center p-2'>
              <FontAwesomeIcon
                icon={faBuildingColumns}
                className='text-main-200 mx-5 text-xl'
              />
              <h1>{scholarship && scholarship.university}</h1>
            </div>
          </div>

          <div className='rounded-lg bg-white border border-gray-400 relative mb-5'>
            <h1 className='pt-2 pb-2 mx-5 font-black italic'>
              Jurusan Terdaftar
            </h1>
            <div className='pb-4'>
              {scholarship &&
                scholarship.major.map((item, index) => (
                  <div key={index} className='relative flex items-center p-2'>
                    <FontAwesomeIcon
                      icon={faUserGraduate}
                      className='text-main-200 mx-5 text-xl'
                    />
                    <h1>{item}</h1>
                  </div>
                ))}
            </div>
          </div>

          <div className='rounded-lg bg-white border border-gray-400 relative mb-5'>
            <h1 className='pt-2 pl-2 mx-5 font-black italic'>
              Benefit Beasiswa
            </h1>
            <div className='pb-4'>
              {scholarship &&
                scholarship.benefit.map((item, index) => (
                  <div key={index} className='relative flex items-center p-2'>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className='text-green-500 mx-5 text-xl'
                    />
                    <h1>{item}</h1>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className='column2 flex flex-col'>
          <div className='rounded-lg bg-white border border-gray-400 relative mb-5 flex-grow'>
            <h1 className='title pt-2 pl-2 mx-5 font-black italic'>
              Persyaratan Beasiswa
            </h1>

            <div className='mx-5'>
              <div className='mt-4 ml-5'>
                <ScholarshipTag key={1} tag='Umur' size='card' />
              </div>
              <p className='pt-3 pl-5'>
                {scholarship && scholarship.minimumAge} tahun keatas
              </p>
              <div className='border-b border-dashed border-gray-500 w-full mt-5 mb-5'></div>
            </div>

            <div className='mx-5'>
              <div className='mt-4 ml-5'>
                <ScholarshipTag key={1} tag='IPK Minimal' size='card' />
              </div>
              <p className='pt-3 pl-5'>
                Minimal IPK adalah {scholarship && scholarship.minimumGPA}
              </p>
              <div className='border-b border-dashed border-gray-500 w-full mt-5 mb-5'></div>
            </div>

            <div className='mx-5'>
              <div className='mt-4 ml-5'>
                <ScholarshipTag key={1} tag='Syarat Tes Bahasa' size='card' />
              </div>
              <p className='pt-3 pl-5'>
                Persyaratan tes bahasa adalah:
                <br />
                {scholarship && scholarship.languageTest}
              </p>
              <div className='border-b border-dashed border-gray-500 w-full mt-5 mb-5'></div>
            </div>

            <div className='mx-5'>
              <div className='mt-4 ml-5'>
                <ScholarshipTag
                  key={1}
                  tag='Syarat Tes Terstandarisasi'
                  size='card'
                />
              </div>
              <p className='pt-3 pl-5'>
                Persyaratan tes terstandarisasi adalah:
                <br />
                {scholarship && scholarship.standardizedTest}
              </p>
              <div className='border-b border-dashed border-gray-500 w-full mt-5 mb-5'></div>
            </div>

            <div className='mx-5'>
              <div className='mt-4 ml-5'>
                <ScholarshipTag key={1} tag='Dokumen' size='card' />
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <div className='pb-4'>
                  {dokumen.slice(0, 6).map((item, index) => (
                    <div key={index} className='relative flex items-center p-2'>
                      <FontAwesomeIcon
                        icon={faFile}
                        className='text-main-200 ml-3 mr-3 text-xl'
                      />
                      <h1>{item}</h1>
                    </div>
                  ))}
                </div>
                <div className='pb-4'>
                  {dokumen.slice(6, 9).map((item, index) => (
                    <div key={index} className='relative flex items-center p-2'>
                      <FontAwesomeIcon
                        icon={faFile}
                        className='text-main-200 ml-3 mr-3 text-xl'
                      />
                      <h1>{item}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailScholarshipPage;

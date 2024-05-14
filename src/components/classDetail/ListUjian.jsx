import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useParams } from 'react-router-dom';
import arrowdown from '../../assets/image/Arrow - Down 5.svg';
import arrowup from '../../assets/image/Arrow - Down.svg';
import Document from '../../assets/image/Document.svg';

const ListUjian = () => {
  const { id } = useParams();
  const [arrowStates, setArrowStates] = useState([]);
  const [ujianList, setUjianList] = useState([]);
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  useEffect(() => {
    const fetchUjian = async () => {
      try {
        const ujianResponse = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/ujian/get-all/by-kelas/${id}`,
          { headers: { Authorization: authHeader } }
        );
        // console.log(ujianResponse.data)

        setUjianList(ujianResponse.data);
        setArrowStates(new Array(ujianResponse.data.length).fill(false));
      } catch (error) {
        console.error(`Error fetching Ujian: `, error.message);
        navigate('/profile');
      }
    };

    fetchUjian();
  }, []);

  return (
    <div className='w-full'>
      {ujianList &&
        ujianList.map((ujian, i) => (
          <div className='border-b'>
            <div
              key={i}
              onClick={() => {
                const newArrowStates = [...arrowStates];
                newArrowStates[i] = !newArrowStates[i]; // Toggle the state for the clicked dropdown item
                setArrowStates(newArrowStates);
              }}
              className='h-[74px]  flex items-center '
            >
              <h1 className='w-full font-semibold text-[20px]'>
                {`Ujian Simulasi ${i + 1}`}
              </h1>
              <img src={arrowStates[i] ? arrowup : arrowdown} />
            </div>

            {arrowStates[i] && (
              <div>
                <div key={i} className='mb-[32px] mt-[24px]'>
                  <div className='flex items-center'>
                    <a href={`/examination/${ujian.id}`}>
                      <img src={Document} className='mr-[16px]' />
                    </a>
                    <a
                      href={`/examination/${ujian.id}`}
                      className='font-semibold text-first text-lg text-main-200'
                    >
                      {`Akses ${ujian.title}`}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ListUjian;

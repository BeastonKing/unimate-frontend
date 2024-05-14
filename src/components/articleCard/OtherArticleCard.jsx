import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const OtherArticleCard = ({ id, title, date, image }) => {
  return (
    <>
      <Link key={id} to={`/detail-blog/${id}`} className='col-span-7'>
        <div className='rounded-xl h-24 mb-2 bg-transparent flex flex-col justify-start'>
          <div className='grid grid-cols-7 gap-3'>
            <div className='col-span-3'>
              <div
                className={`h-24 mb-2 rounded-xl ${
                  image ? 'bg-white' : 'bg-gray-300'
                } flex flex-col justify-start`}
                style={{
                  backgroundImage: image
                    ? `url(data:image/jpeg;base64,${image})`
                    : 'none',
                }}
              ></div>
            </div>

            <div className='col-span-4'>
              <div className='rounded-xl h-24 mb-2 bg-transparent flex flex-col justify-start'>
                <div className='grid grid-rows-3 h-full'>
                  <div className='row-span-2'>
                    <p className='text-[13px] mr-2 mt-4 line-clamp-3'>
                      {title}
                    </p>
                  </div>
                  <div className='row-span-1 flex flex-row items-center'>
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className='mr-1 text-main-200'
                    />
                    <p className='text-[11px]'>{date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default OtherArticleCard;

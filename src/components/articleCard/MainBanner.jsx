import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faClock,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

function MainBanner({ id, title, author, date, readingTime, image }) {
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <Link
      to={`/detail-blog/${id}`}
      className='h-96 rounded-xl w-full flex flex-col justify-end'
      style={{
        backgroundImage: image ? `url(data:image/jpeg;base64,${image})` : 'none',
        backgroundColor: image ? 'transparent' : 'lightgray',
      }}
    >
      <div className='h-40 bg-white rounded-xl flex flex-col justify-center items-start m-4'>
        <div className='text-black ml-5 sm:ml-8 '>
          <p className='text-sm sm:text-m mb-4 text-indigo-600 italic'>Featured Article</p>
        </div>
        <p className='ml-5 sm:ml-8 mb-3 text-xl sm:text-3xl font-bold line-clamp-2'>{title}</p>
        <div className='ml-3 sm:ml-8 mr-8 text-xs sm:text-sm text-black flex items-center w-full'>
          <div className='row-span-1 flex flex-row items-center'>
            <FontAwesomeIcon
              icon={faCircleUser}
              className='mr-1 text-main-200'
            />
            <p className=''>By {author}</p>
          </div>
          <p className='mx-2 sm:mx-4 text-main-200'>|</p>
          <div className='row-span-1 flex flex-row items-center'>
            <FontAwesomeIcon icon={faCalendar} className='mr-1 text-main-200' />
            <p className=''>{formatDate(date)}</p>
          </div>
          <p className='mx-2 sm:mx-4 text-main-200'>|</p>
          <div className='row-span-1 flex flex-row items-center'>
            <FontAwesomeIcon icon={faClock} className='mr-1 text-main-200' />
            <p className=''>{readingTime} Min. Reading Time</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MainBanner;

import React from 'react';

const Tag = ({ tag, index }) => {
  return (
    <div
      key={index}
      className='inline-flex items-center bg-main-200 rounded-3xl mt-2 mb-2 mr-2'
    >
      <h1 className='mx-3 text-white text-sm'>{tag}</h1>
    </div>
  );
};

export default Tag;

import React from 'react';

const ScholarshipTag = ({ tag, index, size }) => {
  // Determine the text size based on the provided size parameter
  const textSize = size === 'card' ? 'text-m mx-3' : size === 'status' ? 'text-xl mx-4 my-1' : 'text-2xl mx-6';

  return (
    <div
      key={index}
      className='inline-flex items-center bg-main-200 rounded-3xl mt-2 mb-2 mr-1'
    >
      <h1 className={`text-white ${textSize}`}>{tag}</h1>
    </div>
  );
};

export default ScholarshipTag;

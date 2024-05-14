import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ScholarshipTag from '../scholarship/ScholarshipTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useNavigate } from 'react-router-dom';

export default function ManagementScholarshipCard({
  id,
  startDate,
  endDate,
  title,
  location,
  type,
  degrees,
  status,
}) {
  const [scholarship, setScholarship] = useState(null);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  let tagText = type;
  if (type === 'FULLY_FUNDED') {
    tagText = 'Fully Funded';
  } else if (type === 'PARTIALLY_FUNDED') {
    tagText = 'Partially Funded';
  } else if (type === 'SELF_FUNDED') {
    tagText = 'Self Funded';
  }

  const formatDate = (dateString) => {
    // Parse the date string
    const date = new Date(dateString);
    // Options for formatting the date
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    // Format the date
    return date.toLocaleDateString('en-GB', options);
  };

  // Format the start date
  const formattedStartDate = formatDate(startDate);
  // Format the end date
  const formattedEndDate = formatDate(endDate);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/scholarship/delete?id=${id}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      // Show success message
      window.alert(
        'Scholarship deleted successfully. Redirecting to Scholarship Management Page.'
      );
      window.location.reload();
    } catch (error) {
      console.error('Error deleting scholarship:', error);
    }
  };

  const fetchScholarshipData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/scholarship/get?id=${id}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      console.log('Article Data', response.data);
      setScholarship(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  const handleUpdate = async () => {
    fetchScholarshipData();
    const data = scholarship;
    console.log(data);
    navigate(`/admin/update-scholarship/${id}`);
  };

  return (
    <div className='border border-gray-300 rounded-lg p-5 shadow-md bg-white min-w-full mb-5'>
      <div className='flex flex-wrap '>
        <div className='grid grid-rows-5 min-w-full'>
          {/* Date & Status */}
          <div className='flex items-center'>
            {/* Date components */}
            <div className='flex items-center'>
              <FontAwesomeIcon
                icon={faCalendar}
                className='text-purple-500 text-xl mr-2'
              />
              <h3 className='mr-2'>{formattedStartDate}</h3>
              <h2 className='mr-2'>-</h2>
              <h3>{formattedEndDate}</h3>
            </div>
            {/* Status tag */}
            <div className='ml-auto'>
              <ScholarshipTag key={1} tag={status} size='status' />
            </div>
          </div>

          {/* Render scholarship tags */}
          <div>
            <div className='flex'>
              <ScholarshipTag key={1} tag={tagText} size='card' />
              {degrees.map((degree, index) => (
                <ScholarshipTag key={index} tag={degree} size='card' />
              ))}
            </div>
          </div>

          {/* Display scholarship title */}
          <div>
            <h2 className='text-2xl line-clamp-3'>{title}</h2>
          </div>

          {/* Display scholarship location */}
          <div className='flex items-center'>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className='text-gray-600 mr-2'
            />
            <h3>{location}</h3>
          </div>

          {/* Button Info Beasiswa */}
          <div className='flex'>
            <button
              className='bg-purple-500 text-white rounded-full py-2 px-4 mt-2 w-1/2 mr-2 hover:bg-purple-700'
              onClick={handleUpdate}
            >
              Update Scholarship
            </button>
            <button
              className='bg-red-500 text-white rounded-full py-2 px-4 mt-2 w-1/2 hover:bg-red-700'
              onClick={handleDelete}
            >
              Detele Scholarship
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ManagementScholarshipCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  degrees: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired,
};

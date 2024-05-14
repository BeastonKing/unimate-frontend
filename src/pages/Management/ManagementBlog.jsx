import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ManagementArticleCard from '../../components/articleCard/ManagementArticleCard';

const ManagementBlog = () => {
  const [filterOption, setFilterOption] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    getAllBlog();

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold as needed
    };
    handleResize(); // Check initial screen size
    window.addEventListener('resize', handleResize); // Listen for resize events
    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener
    };
  }, []);

  const getAllBlog = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/blog/get-all`
      );
      setFilteredArticles(response.data);
    } catch (error) {
      console.error('Error fetching all articles:', error);
    }
  };

  const handleSearch = async (e) => {
    const inputValue = e.target.value;
    if (e.key === 'Enter') {
      console.log('Searching for: ', inputValue);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/blog/search?keyword=${inputValue}`
        );
        setFilteredArticles(response.data);
      } catch (error) {
        console.error('Error searching articles:', error);
      }
    }
  };

  const handleCreateBlog = () => {
    console.log('Redirecting to Create Blog Page');
    navigate('/admin/create-blog');
  };

  return (
    <div>
      <div className=' flex flex-row items-center justify-between'>
        <h1
          className={`mt-20 mr-1 sm:mt-0 text-xl sm:text-3xl font-black ${
            isSmallScreen ? 'sm:w-1/2' : ''
          }`}
        >
          Article Management
        </h1>
        <div
          className={`mt-20 sm:mt-0 sm:ml-auto flex items-center ${
            isSmallScreen ? 'sm:w-1/2' : ''
          }`}
        >
          <div className='rounded-lg border border-main-100 mr-2 sm:mb-0 sm:mr-4'>
            <div className='relative'>
              <FontAwesomeIcon
                icon={faFilter}
                className='text-main-200 ml-2 sm:ml-3 mr-1 sm:mr-3 '
              />
              <select
                className={`py-1 bg-transparent text-main-200 ${
                  isSmallScreen ? 'text-xs' : ''
                }`}
                onChange={(e) => setFilterOption(e.target.value)}
                value={filterOption}
              >

                <option value=''>All</option>
                <option value='INFORMASI_BEASISWA'>Informasi Beasiswa</option>
                <option value='PEKERJAAN_LUAR_NEGERI'>
                  Pekerjaan Luar Negeri
                </option>
                <option value='TIPS_TRIK'>Tips & Trik</option>
              </select>
            </div>
          </div>

          <button
            className='bg-main-200 text-white px-4 py-2 rounded-xl text-sm'
            onClick={handleCreateBlog}
          >
            {isSmallScreen ? '+' : 'Create Blog'}
          </button>
        </div>
      </div>

      <div className='mt-5 relative border border-main-100 rounded-xl'>
        <input
          type='text'
          placeholder='Search for articles...'
          className='placeholder:text-main-100 outline-none bg-transparent pl-5 pr-10 py-2 w-full max-w-full'
          id='searchInput'
          onKeyDown={handleSearch}
        />
        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
          <FontAwesomeIcon icon={faSearch} className='text-main-100' />
        </div>
      </div>
      <div className='mt-12'>
        {filteredArticles.length === 0 ? (
          <p>No articles to display</p>
        ) : (
          filteredArticles.map((article) => (
            <ManagementArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              readingTime={article.readingTime}
              date={article.createdAt}
              tags={article.blogTag}
              image={article.image}
            />
          ))
        )}
      </div>
    </div>
  );};


export default ManagementBlog;

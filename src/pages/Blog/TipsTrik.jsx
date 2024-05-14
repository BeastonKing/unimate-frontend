import React, { useState, useEffect } from 'react';
import ArticleCard from '../../components/articleCard/ArticleCard';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const TipsTrik = () => {
  const authHeader = useAuthHeader();
  const [tipsTrikBlogs, setTipsTrikBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9; // Number of articles to display per page

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/blog/get-by-type?type=tips-trik`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setTipsTrikBlogs(response.data);
    } catch (error) {
      console.error('Error fetching tips & trik blogs:', error);
    }
  };

  // Function to handle pagination button click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the index of the first and last article to display on the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = tipsTrikBlogs.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='container my-24 px-4 max-w-screen-lg'>
        <div className='menu'>
          <h1 className='text-3xl font-semibold'>Tips & Trik</h1>
          <p className='secondary-subtitle text-lg font-normal mt-2'>
            Beragam artikel seputar tips & trik perkuliahan bisa kamu peroleh di
            sini
          </p>
          <div className={`card-container grid ${window.innerWidth < 640 ? 'grid-cols-1' : 'grid-cols-3'} gap-4 mt-4`}>
            {currentArticles.map((blog) => (
              <ArticleCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                image={blog.image}
                author={blog.writer}
                readingTime={blog.readingTime}
              />
            ))}
          </div>
          {/* Pagination buttons */}
          <div className='flex justify-center mt-4'>
            {Array.from({
              length: Math.ceil(tipsTrikBlogs.length / articlesPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 bg-blue-500 text-white rounded ${
                  currentPage === index + 1 ? 'bg-blue-700' : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsTrik;

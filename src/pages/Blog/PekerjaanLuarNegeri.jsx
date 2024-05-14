import React, { useState, useEffect } from 'react';
import ArticleCard from '../../components/articleCard/ArticleCard';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const PekerjaanLuarNegeri = () => {
  const [pekerjaanLuarNegeriBlogs, setPekerjaanLuarNegeriBlogs] = useState([]);
  const authHeader = useAuthHeader();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9; // Number of articles to display per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/blog/get-by-type?type=pekerjaan-luar-negeri`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        setPekerjaanLuarNegeriBlogs(response.data);
      } catch (error) {
        console.error('Error fetching pekerjaan luar negeri blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // Function to handle pagination button click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the index of the first and last article to display on the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = pekerjaanLuarNegeriBlogs.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='container my-24 px-4 max-w-screen-lg'>
        <div className='menu'>
          <h1 className='text-3xl font-semibold'>Pekerjaan Luar Negeri</h1>
          <p className='secondary-subtitle text-lg font-normal mt-2'>
            Beragam artikel seputar informasi pekerjaan di luar negeri bisa kamu
            peroleh di sini
          </p>
          {/* Render grid and pagination based on screen size */}
          {window.innerWidth <= 640 ? (
            <React.Fragment>
              <div className='card-container grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 md:gap-4'>
                {/* Render only the current articles */}
                {currentArticles.map((blog) => (
                  <ArticleCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    author={blog.writer}
                    image={blog.image}
                    readingTime={blog.readingTime}
                  />
                ))}
              </div>
              {/* Pagination buttons */}
              <div className='flex justify-center mt-4'>
                {[
                  ...Array(
                    Math.ceil(pekerjaanLuarNegeriBlogs.length / articlesPerPage)
                  ).keys(),
                ].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`mx-1 px-3 py-1 bg-blue-500 text-white rounded ${
                      currentPage === number + 1 ? 'bg-blue-700' : ''
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className='card-container grid grid-cols-3 gap-4 mt-4'>
                {/* Render only the current articles */}
                {currentArticles.map((blog) => (
                  <ArticleCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    author={blog.writer}
                    image={blog.image}
                    readingTime={blog.readingTime}
                  />
                ))}
              </div>
              {/* Pagination buttons */}
              <div className='flex justify-center mt-4'>
                {[
                  ...Array(
                    Math.ceil(pekerjaanLuarNegeriBlogs.length / articlesPerPage)
                  ).keys(),
                ].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`mx-1 px-3 py-1 bg-blue-500 text-white rounded ${
                      currentPage === number + 1 ? 'bg-blue-700' : ''
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default PekerjaanLuarNegeri;

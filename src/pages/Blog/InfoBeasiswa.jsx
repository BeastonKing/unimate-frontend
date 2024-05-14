import React, { useState, useEffect } from 'react';
import ArticleCard from '../../components/articleCard/ArticleCard';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const InformasiBeasiswa = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9; // Number of articles to display per page
  const [infoBeasiswaBlogs, setInfoBeasiswaBlogs] = useState([]);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchBlogs = async () => {
      await getBlogsByType('informasi-beasiswa', setInfoBeasiswaBlogs);
    };

    fetchBlogs();
  }, []);

  const getBlogsByType = async (type, setter) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_UNIMATE_BE_SERVICES
        }/api/blog/get-by-type?type=${type}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching ${type} blogs:`, error);
    }
  };

  // Calculate the index of the first and last article to display on the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = infoBeasiswaBlogs.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Function to handle pagination button click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='container my-24 px-4 max-w-screen-lg'>
        <div className='menu'>
          <h1 className='text-3xl font-semibold'>Informasi Beasiswa</h1>
          <p className='secondary-subtitle text-lg font-normal mt-2'>
            Beragam artikel seputar program beasiswa kuliah di luar negeri bisa
            kamu peroleh di sini
          </p>
          <div className='card-container grid gap-4 mt-4 md:grid-cols-3 md:gap-4'>
            {/* Render only the current articles */}
            {currentArticles.map((blog) => (
              <ArticleCard
                key={blog.id} // Assuming each blog object has a unique id
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
                Math.ceil(infoBeasiswaBlogs.length / articlesPerPage)
              ).keys(),
            ].map((number) => (
              <button
                key={number}
                onClick={() => paginate(number + 1)}
                className={`mx-1 px-3 py-1 bg-blue-500 text-white rounded ${
                  currentPage === number + 1 ? 'bg-blue-700' : ''
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformasiBeasiswa;

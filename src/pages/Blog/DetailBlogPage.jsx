import React, { useState, useEffect } from 'react';
import ArticleCard from '../../components/articleCard/ArticleCard';
import OtherArticleCard from '../../components/articleCard/OtherArticleCard';
import Tag from '../../components/articleCard/Tag';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faClock,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const DetailBlogPage = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const [blogUrl, setBlogUrl] = useState('');
  const [article, setArticle] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the breakpoint as needed
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check for screen size
    handleResize();

    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchArticleAndRelatedBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/blog/get?id=${id}`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        console.log('Article Data', response.data);
        setArticle(response.data);
        setBlogUrl(window.location.href);

        // Fetch other blogs based on blogType
        if (response.data.type === 'INFORMASI_BEASISWA') {
          fetchOtherBlogs('informasi-beasiswa');
        } else if (response.data.type === 'PEKERJAAN_LUAR_NEGERI') {
          fetchOtherBlogs('pekerjaan-luar-negeri');
        } else if (response.data.type === 'TIPS_TRIK') {
          fetchOtherBlogs('tips-trik');
        } else {
          setLoading(false);
        }

        // Fetch related blogs after setting the article state
        if (response.data.blogTag && response.data.blogTag.length > 0) {
          fetchRelatedBlogs(response.data.blogTag);
        } else {
          setLoading(false);
        }

        // Scroll to the top of the page
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    const fetchOtherBlogs = async (blogType) => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/blog/get-by-type?type=${blogType}`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        console.log('Other Blogs', response.data);
        setOtherBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching other blogs:', error);
      }
    };

    const fetchRelatedBlogs = async (tags) => {
      try {
        const tagsQuery = tags.join(',');
        const response = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/blog/get-by-tags?tags=${tagsQuery}`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        setRelatedBlogs(
          response.data.filter((blog) => blog.id !== currentBlogId)
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Related blogs:', error);
      }
    };

    fetchArticleAndRelatedBlogs();
  }, [id, authHeader]);

  const currentBlogId = parseInt(id);
  const filteredOtherBlogs = otherBlogs.filter(
    (blog) => blog.id !== currentBlogId
  );
  const filteredRelatedBlogs = relatedBlogs.filter(
    (blog) => blog.id !== currentBlogId
  );

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleShareInstagram = () => {
    const caption = 'Check this out guys';
    window.open(
      `https://www.instagram.com/share/?url=${encodeURIComponent(
        blogUrl
      )}&caption=${encodeURIComponent(caption)}`,
      '_blank'
    );
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        blogUrl
      )}`,
      '_blank'
    );
  };

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`,
      '_blank'
    );
  };

  return (
    <div className='relative'>
      <div className='absolute inset-0 bg-gray-300 mt-[64px] sm:mt-0 h-96 z-0'>
        {article && article.image && (
          <div
            className='h-full bg-cover bg-center'
            style={{
              backgroundImage: `url(data:image/jpeg;base64,${article.image})`,
            }}
          ></div>
        )}
      </div>
      <div className='flex justify-center items-center h-full'>
        <div className='container mt-80 px-4 max-w-screen-lg z-10'>
          <div className='grid grid-cols-5 gap-6'>
            <div className={`col-span-${isSmallScreen ? '5' : '3'}`}>
              <div className='rounded-xl bg-white flex flex-col justify-start'>
                <div className='mt-5 ml-5 mr-5'>
                  {/* Render blog tags dynamically */}
                  {article &&
                    article.blogTag &&
                    article.blogTag.map((tag, index) => (
                      <Tag key={index} tag={tag}></Tag>
                    ))}
                </div>
                <p className='text-2xl font-[1000] mr-5 ml-5 mt-3 mb-3'>
                  {article && article.title}
                </p>
                <div className='ml-6 text-sm text-black flex items-center'>
                  <div className='mr-2 row-span-1 flex flex-row items-center'>
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className='mr-1 text-main-200'
                    />
                    <p className='text-[12px]'>
                      By {article && article.writer}
                    </p>
                  </div>

                  <p className='mx-2 text-main-200'>|</p>

                  <div className='mx-2 row-span-1 flex flex-row items-center'>
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className='mr-1 text-main-200'
                    />
                    <p className='text-[12px]'>
                      {article && formatDate(article.createdAt)}
                    </p>
                  </div>

                  <p className='mx-2 text-main-200'>|</p>

                  <div className='ml-2 row-span-1 flex flex-row items-center'>
                    <FontAwesomeIcon
                      icon={faClock}
                      className='mr-1 text-main-200'
                    />
                    <p className='text-[12px]'>
                      {article && article.readingTime} Min. Reading Time
                    </p>
                  </div>
                </div>

                <div className='mt-4 ml-5 mr-5 mb-5'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: article && article.content,
                    }}
                  ></div>
                  <br />
                </div>

                <div className='row-span-1 flex flex-row items-center justify-between'>
                  <div className='ml-4 mb-4 text-[14px]'>
                    Share This Article
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faInstagram}
                      onClick={handleShareInstagram}
                      className='mr-3 text-main-200 text-[26px]'
                      style={{ cursor: 'pointer' }}
                    />
                    <FontAwesomeIcon
                      icon={faFacebook}
                      onClick={handleShareFacebook}
                      className='mr-3 text-main-200 text-[26px]'
                      style={{ cursor: 'pointer' }}
                    />
                    <FontAwesomeIcon
                      icon={faTwitter}
                      onClick={handleShareTwitter}
                      className='mr-5 text-main-200 text-[26px]'
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {!isSmallScreen && (
              <div className='col-span-2'>
                <div className='rounded-xl bg-white flex flex-col justify-end'>
                  <div className='  mr-3 ml-3 mt-3 mb-3 '>
                    <p className='text-xl font-semibold mb-3'>Other Articles</p>
                    <div className='grid grid-cols-7 gap-3'>
                      {loading ? (
                        <p>Loading...</p>
                      ) : filteredOtherBlogs.length === 0 ? (
                        <p className='col-span-7'>
                          Sorry, There is no other Articles
                        </p>
                      ) : (
                        filteredOtherBlogs
                          .slice(0, 6)
                          .map((blog) => (
                            <OtherArticleCard
                              key={blog.id}
                              id={blog.id}
                              title={blog.title}
                              image={blog.image}
                              date={formatDate(blog.createdAt)}
                            />
                          ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isSmallScreen && (
              <div className='col-span-5 mt-6'>
                <div className='rounded-xl bg-white flex flex-col justify-end'>
                  <div className='  mr-3 ml-3 mt-3 mb-3 '>
                    <p className='text-xl font-semibold mb-3'>Other Articles</p>
                    <div className='grid grid-cols-7 gap-3'>
                      {loading ? (
                        <p>Loading...</p>
                      ) : filteredOtherBlogs.length === 0 ? (
                        <p className='col-span-7'>
                          Sorry, There is no other Articles
                        </p>
                      ) : (
                        filteredOtherBlogs
                          .slice(0, 3)
                          .map((blog) => (
                            <OtherArticleCard
                              key={blog.id}
                              id={blog.id}
                              title={blog.title}
                              image={blog.image}
                              date={formatDate(blog.createdAt)}
                            />
                          ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isSmallScreen && (
            <div className='menu mt-20'>
              <h1 className='text-3xl font-semibold'>Related Articles</h1>
              <div className='card-container grid grid-cols-3 gap-4 mt-4'>
                {loading ? (
                  <p>Loading...</p>
                ) : filteredRelatedBlogs.length === 0 ? (
                  <p>Sorry, There is no related Article</p>
                ) : (
                  filteredRelatedBlogs
                    .slice(0, 6)
                    .map((blog) => (
                      <ArticleCard
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        author={blog.writer}
                        image={blog.image}
                        readingTime={blog.readingTime}
                      />
                    ))
                )}
              </div>
            </div>
          )}

          {isSmallScreen && (
            <div className='col-span-5 mt-6'>
              <div className='rounded-xl bg-white flex flex-col justify-end'>
                <div className='  mr-3 ml-3 mt-3 mb-3 '>
                  <p className='text-xl font-semibold mb-3'>Related Articles</p>
                  <div className='grid grid-cols-7 gap-3'>
                    {loading ? (
                      <p>Loading...</p>
                    ) : filteredRelatedBlogs.length === 0 ? (
                      <p className='col-span-7'>
                        Sorry, There is no other Articles
                      </p>
                    ) : (
                      filteredRelatedBlogs
                        .slice(0, 3)
                        .map((blog) => (
                          <OtherArticleCard
                            key={blog.id}
                            id={blog.id}
                            title={blog.title}
                            image={blog.image}
                            date={formatDate(blog.createdAt)}
                          />
                        ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailBlogPage;

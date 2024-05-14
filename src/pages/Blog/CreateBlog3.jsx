import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '../../components/button/Button';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useLocation } from 'react-router-dom';

const CreateBlog = () => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('gray-300');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [readingTime, setReadingTime] = useState(5);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [content, setEditorHtml] = useState('');

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const handleTitle = (e) => {
    const inputValue = e.target.value;
    setTitle(inputValue);
  };

  const handleTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
        setBackgroundColor('transparent');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Check if any of the required fields are empty
    if (
      title.trim() === '' ||
      content.trim() === '' ||
      type.trim() === '' ||
      tags.length === 0
    ) {
      alert('Please fill in all the required fields.');
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append all other fields to the formData
    formData.append('title', title);
    formData.append('content', content);
    formData.append('readingTime', readingTime);
    formData.append('type', type);
    formData.append('blogTag', tags);
    formData.append('writer', auth.name);

    // Append the image file if it exists
    if (imageUrl) {
      fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          formData.append('image', blob);

          // Make the POST request with axios
          axios
            .post(
              `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/blog/create`,
              formData,
              {
                headers: {
                  Authorization: authHeader,
                  'Content-Type': 'multipart/form-data',
                },
              }
            )
            .then((response) => {
              console.log(response.data);
              window.alert(
                'Article has been created. Redirecting to Blog Page.'
              );
              setTimeout(() => {
                window.location.href = '/blog';
              }, 1500);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching image:', error);
        });
    } else {
      // Make the POST request without the image
      axios
        .post(
          `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/blog/create`,
          formData,
          {
            headers: {
              Authorization: authHeader,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          window.alert('Article has been created. Redirecting to Blog Page.');
          setTimeout(() => {
            window.location.href = '/blog';
          }, 1500);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className='flex justify-center items-center h-full'>
      {location.pathname !== '/admin/create-blog' && <SideNav />}
      <div className='container max-w-screen-sm sm:max-w-screen-lg relative px-1 sm:px-8 mt-20 sm:mt-0'>
        {/* Background image container */}
        <div
          className={`bg-${backgroundColor} h-[300px] sm:h-[469px] sm:w-full relative`}
          style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
        >
          {/* Overlay for file input */}
          <div className='m-4 sm:m-10 absolute inset-x-0 bottom-0 flex justify-start'>
            <label
              htmlFor='file_input'
              className='custom-file-upload bg-main-200 hover:bg-main-300 text-white font-bold py-2 px-4 rounded-full cursor-pointer inline-flex items-center space-x-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-4 h-4'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm4 7a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                />
              </svg>
              <span>Insert Picture</span>
            </label>
            <input
              id='file_input'
              className='hidden'
              type='file'
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className='mt-10'>
          <input
            type='text'
            placeholder='Input Article Title Here...'
            className='placeholder-[#5B25D9] placeholder:text-xl text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border-opacity-50 border-[#5B25D9] border rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300'
            id='title'
            onChange={handleTitle}
          />
          <div
            className='editor mt-5'
            style={{
              whiteSpace: 'pre-wrap',
              overflowX: 'hidden',
              width: '100%',
            }}
          >
            <ReactQuill
              theme='snow'
              value={content}
              onChange={handleEditorChange}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline'],
                  [{ align: [] }],
                  [{ list: 'bullet' }, { list: 'check' }, { list: 'ordered' }],
                  ['image', 'link'],
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ],
              }}
            />
          </div>

          <div className='mt-12'>
            <h1 className='text-2xl font-black'>Article Tag</h1>
            <div className='flex'>
              <input
                type='text'
                placeholder='Input Article Tag Here...'
                className='placeholder-[#5B25D9] placeholder:text-sm text-main-200 placeholder-opacity-50 mt-1 p-2 w-full border-opacity-50 border-[#5B25D9] border rounded-md focus:border-[#5B25D9] focus:outline-none focus:shadow-lg transition-colors duration-300 mr-2'
                id='searchInput'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <div className='w-1/2'>
                <Button
                  onClick={handleTag}
                  label='Add Tag'
                  style='primary'
                  type='button'
                  className='px-2 py-1'
                />
              </div>
            </div>
            <div className='mt-2'>
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className='inline-flex items-center bg-main-200 rounded-3xl mt-2 mb-2 ml-2 mr-2'
                >
                  <h1 className='mx-3 text-white text-sm'>{tag}</h1>
                  <button
                    className='flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white ml-1 focus:outline-none mr-1'
                    onClick={() => handleDeleteTag(index)}
                  >
                    <span className='text-xs'>x</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-12 bg-gray-200 flex items-center justify-between p-4'>
            <h1 className='text-xl font-black'>Reading Time</h1>
            <div className='relative'>
              <select
                className='appearance-none bg-white border border-gray-400 w-60 text-main-200 text-center py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500'
                id='readingTime'
                onChange={(e) => setReadingTime(parseInt(e.target.value))}
                value={readingTime}
              >
                {[...Array(15)].map((_, i) => (
                  <option key={i} value={i + 1}>{`${i + 1} Min`}</option>
                ))}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 12a2 2 0 100-4 2 2 0 000 4z'
                    clipRule='evenodd'
                  />
                  <path
                    fillRule='evenodd'
                    d='M4 10a6 6 0 1112 0 6 6 0 01-12 0zm0 2a8 8 0 1116 0 8 8 0 01-16 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className='mt-6 bg-gray-200 flex items-center justify-between p-4'>
            <h1 className='text-xl font-black'>Type</h1>
            <div className='relative'>
              <select
                className='appearance-none bg-white border border-gray-400 w-60 text-main-200 text-center py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500'
                id='type'
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                {!type && (
                  <option disabled hidden value=''>
                    Select Type
                  </option>
                )}
                <option value='INFORMASI_BEASISWA'>Informasi Beasiswa</option>
                <option value='PEKERJAAN_LUAR_NEGERI'>
                  Pekerjaan Luar Negeri
                </option>
                <option value='TIPS_TRIK'>Tips & Trick</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 12a2 2 0 100-4 2 2 0 000 4z'
                    clipRule='evenodd'
                  />
                  <path
                    fillRule='evenodd'
                    d='M4 10a6 6 0 1112 0 6 6 0 01-12 0zm0 2a8 8 0 1116 0 8 8 0 01-16 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className='mt-5'>
            <Button
              onClick={handleSubmit}
              label='Publicate Article'
              style='primary'
              type='button'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;

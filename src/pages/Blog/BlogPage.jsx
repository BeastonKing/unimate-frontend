import React from "react";
import { useRef, useState, useEffect } from "react";
import MenuButton from "../../components/button/MenuButton";
import ArticleCard from "../../components/articleCard/ArticleCard";
import MainBanner from "../../components/articleCard/MainBanner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const BlogPage = () => {
  const infoBeasiswaRef = useRef(null);
  const pekerjaanLuarNegeriRef = useRef(null);
  const tipsTrikRef = useRef(null);
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const [infoBeasiswaBlogs, setInfoBeasiswaBlogs] = useState([]);
  const [pekerjaanLuarNegeriBlogs, setPekerjaanLuarNegeriBlogs] = useState([]);
  const [tipsTrikBlogs, setTipsTrikBlogs] = useState([]);
  const [bannerBlogs, setBannerBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex(
      currentIndex === 0 ? bannerBlogs.length - 1 : currentIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % bannerBlogs.length);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      await getBlogsByType("informasi-beasiswa", setInfoBeasiswaBlogs);
      await getBlogsByType(
        "pekerjaan-luar-negeri",
        setPekerjaanLuarNegeriBlogs
      );
      
      await getBlogsByType("tips-trik", setTipsTrikBlogs);
      fetch(`${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/blog/get-top-5`)
      await getBlogsByType("tips-trik", setTipsTrikBlogs);
      fetch(`${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/blog/get-top-5`)
        .then((response) => response.json())
        .then((data) => setBannerBlogs(data));
    };

    fetchBlogs();

    // Check screen size on mount and resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold as needed
    };
    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize); // Listen for resize events
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
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

  const handleMenuButtonClick = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = async (e) => {
    const inputValue = e.target.value;
    if (e.key === "Enter") {
      console.log("Searching for: ", inputValue);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_UNIMATE_BE_SERVICES
          }/api/blog/search?keyword=${inputValue}`
        );
        setFilteredArticles(response.data);
      } catch (error) {
        console.error("Error searching articles:", error);
      }
    }
  };

  const handleViewInfoBeasiswa = () => {
    navigate("/info-beasiswa");
  };

  const handleViewPekerjaanLuarNegeri = () => {
    navigate("/pekerjaan-luar-negeri");
  };

  const handleViewTipsTrik = () => {
    navigate("/tips-trik");
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="container mt-32 px-4 mx-0 sm:mx-20 ">
        <h1 className="text-5xl font-semibold">Unimate Blog</h1>
        <p className="text-lg font-normal mt-4">
          Beragam artikel & info menarik terkait
          <br />
          Perkuliahan luar negeri bisa kamu baca disini!
        </p>

        <div className="flex justify-between items-center mt-4">
          <div className="search-container bg-violet-200 rounded-3xl p-2 w-full sm:w-1/2 flex justify-between">
            <input
              type="text"
              placeholder="Cari artikel disini..."
              className="search-bar outline-none bg-transparent placeholder:text-main-300 w-full pr-3"
              id="searchInput"
              onKeyDown={handleSearch}
            />
            <div className="mr-2">
              <FontAwesomeIcon icon={faSearch} className="text-main-300" />
            </div>
          </div>
          <div className="options-container space-x-3 hidden sm:flex">
            <MenuButton
              onClick={() => handleMenuButtonClick(infoBeasiswaRef)}
              label="Info Beasiswa"
              type="button"
              style="primary"
            />
            <MenuButton
              onClick={() => handleMenuButtonClick(pekerjaanLuarNegeriRef)}
              label="Pekerjaan Luar Negeri"
              type="button"
              style="primary"
            />
            <MenuButton
              onClick={() => handleMenuButtonClick(tipsTrikRef)}
              label="Tips & Trik"
              type="button"
              style="primary"
            />
          </div>
        </div>

        <div>
          {filteredArticles && filteredArticles.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 mt-12">
                Searched Articles
              </h2>
              <div className="mt- card-container grid grid-cols-3 gap-4 mt-4">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    image={article.image}
                    title={article.title}
                    author={article.writer}
                    readingTime={article.readingTime}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-12 flex justify-center relative">
          {bannerBlogs.length === 0 ? (
            <div className="rounded-lg bg-gray-300 text-center px-16">
              <p>There is no Article to show</p>
            </div>
          ) : (
            bannerBlogs.map(
              (blog, index) => (
                console.log("banner: ", bannerBlogs),
                (
                  <div
                    key={index}
                    style={{
                      display: index === currentIndex ? "block" : "none",
                    }}
                    className="w-full relative"
                  >
                    <MainBanner
                      id={blog.id}
                      image={blog.image}
                      title={blog.title}
                      author={blog.writer}
                      date={blog.createdAt}
                      readingTime={blog.readingTime}
                    />
                  </div>
                )
              )
            )
          )}
        </div>

        <div className="flex justify-between mt-2">
          <div>
            {bannerBlogs.length > 0 &&
              bannerBlogs.map((blog, index) => (
                <span
                  key={index}
                  className={`text-3xl ${
                    index === currentIndex ? "text-main-200" : "text-gray-300"
                  }`}
                >
                  &#8213;
                </span>
              ))}
          </div>
          <div>
            {bannerBlogs.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="text-4xl mr-2 text-main-200"
                >
                  &larr;
                </button>
                <button
                  onClick={handleNext}
                  className="text-4xl ml-2 text-main-200"
                >
                  &rarr;
                </button>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto mt-4 mb-8">
          <div ref={infoBeasiswaRef} className="menu mt-20">
            <div className="flex justify-between items-center">
              <h1 className="text-xl sm:text-3xl font-semibold">
                Informasi Beasiswa
              </h1>
              <MenuButton
                onClick={() => handleViewInfoBeasiswa()}
                label="Lihat Semua Artikel"
                type="button"
                style="primary"
              />
            </div>

            <p className="secondary-subtitle text-sm sm:text-lg font-normal mt-2">
              Beragam artikel seputar program beasiswa kuliah di luar negeri
              bisa kamu peroleh di sini
            </p>
            <div className="card-container grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {infoBeasiswaBlogs.length === 0 ? (
                <div className="rounded-lg bg-gray-300 text-center">
                  <p>There is no Article to show</p>
                </div>
              ) : (
                infoBeasiswaBlogs
                  .slice(-(isSmallScreen ? 3 : 6))
                  .map((blog) => (
                    <ArticleCard
                      key={blog.id} // Assuming each blog object has a unique id
                      id={blog.id}
                      image={blog.image}
                      title={blog.title}
                      author={blog.writer}
                      readingTime={blog.readingTime}
                    />
                  ))
              )}
            </div>
          </div>

          <div ref={pekerjaanLuarNegeriRef} className="menu mt-20">
            <div className="flex justify-between items-center">
              <h1 className="text-xl sm:text-3xl font-semibold">
                Pekerjaan Luar Negeri
              </h1>
              <MenuButton
                onClick={() => handleViewPekerjaanLuarNegeri()}
                label="Lihat Semua Artikel"
                type="button"
                style="primary"
              />
            </div>

            <p className="secondary-subtitle text-sm sm:text-lg font-normal mt-2">
              Beragam artikel seputar informasi pekerjaan di luar negeri bisa
              kamu peroleh di sini
            </p>
            <div className="card-container grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {pekerjaanLuarNegeriBlogs.length === 0 ? (
                <div className="rounded-lg bg-gray-300 text-center">
                  <p>There is no Article to show</p>
                </div>
              ) : (
                pekerjaanLuarNegeriBlogs.slice(-(isSmallScreen ? 3 : 6)).map(
                  (blog) => (
                    console.log(
                      "pekerjaan luar negeri: ",
                      pekerjaanLuarNegeriBlogs
                    ),
                    (
                      <ArticleCard
                        key={blog.id} // Assuming each blog object has a unique id
                        id={blog.id}
                        image={blog.image}
                        title={blog.title}
                        author={blog.writer}
                        readingTime={blog.readingTime}
                      />
                    )
                  )
                )
              )}
            </div>
          </div>
          <div ref={tipsTrikRef} className="menu mt-20">
            <div className="flex justify-between items-center">
              <h1 className="text-xl sm:text-3xl font-semibold">Tips & Trik</h1>
              <MenuButton
                onClick={() => handleViewTipsTrik()}
                label="Lihat Semua Artikel"
                type="button"
                style="primary"
              />
            </div>

            <p className="secondary-subtitle text-sm sm:text-lg font-normal mt-2">
              Beragam artikel seputar tips & trik perkuliahan bisa kamu peroleh
              di sini
            </p>
            <div className="card-container grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {tipsTrikBlogs.length === 0 ? (
                <div className="rounded-lg bg-gray-300 text-center">
                  <p>There is no Article to show</p>
                </div>
              ) : (
                tipsTrikBlogs.slice(-(isSmallScreen ? 3 : 6)).map((blog) => (
                  <ArticleCard
                    key={blog.id} // Assuming each blog object has a unique id
                    id={blog.id}
                    image={blog.image}
                    title={blog.title}
                    author={blog.writer}
                    readingTime={blog.readingTime}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import Tag from "./Tag"; // Assuming Tag component is in the same directory
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

const ManagementArticleCard = ({
  id,
  title,
  date,
  readingTime,
  tags,
  image,
}) => {
  const authHeader = useAuthHeader();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/blog/delete?id=${id}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      // Show success message
      window.alert(
        "Article deleted successfully. Redirecting to Blog Management Page."
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const fetchArticleData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_UNIMATE_BE_SERVICES}/api/blog/get?id=${id}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      console.log("Article Data", response.data);
      setArticle(response.data);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  const handleUpdate = async () => {
    fetchArticleData();
    navigate(`/admin/update-blog/${id}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-5 bg-transparent">
        <div className="md:col-span-3">
          <div className="rounded-xl mb-2 flex flex-col justify-start">
            <div className="grid grid-rows-auto gap-y-2 h-full overflow-auto">
              <div>
                {/* First image */}
                {image && ( // Only render if image is present
                  <div className="md:hidden">
                    <div
                      className="rounded-xl h-40 mb-2 bg-cover bg-center"
                      style={{
                        backgroundImage: image
                          ? `url(data:image/jpeg;base64,${image})`
                          : "none",
                      }}
                    >
                      {/* No placeholder text */}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap">
                  {tags.map((tag, index) => (
                    <Tag key={index} tag={tag} />
                  ))}
                </div>
                <p className="text-[24px] mr-2 line-clamp-3 font-semibold">
                  {title}
                </p>
              </div>
              <div className="items-end flex flex-row">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-[24px] text-main-100"
                />
                <p className="text-[16px] ml-3">{formatDate(date)}</p>
                <FontAwesomeIcon
                  icon={faClock}
                  className="ml-10 text-[24px] text-main-100"
                />
                <p className="text-[16px] ml-3">
                  {readingTime} Min. Reading Time
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Second image */}
        {image && ( // Only render if image is present
          <div className="hidden md:block md:col-span-2">
            <div className="w-full grid grid-cols-2">
              <div className="col-span-2 pr-5">
                <div
                  className="rounded-xl h-40 sm:ml-10 mb-2 bg-cover bg-center"
                  style={{
                    backgroundImage: image
                      ? `url(data:image/jpeg;base64,${image})`
                      : "none",
                  }}
                >
                  {/* No placeholder text */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="justify-start flex mb-5">
        <button
          className="bg-violet-200 font-bold text-main-200 px-4 py-2 rounded-xl ml-4 w-1/2"
          onClick={handleUpdate}
        >
          Edit Article
        </button>
        <button
          className="bg-transparent font-bold text-red-600 border border-red-600 px-4 py-2 rounded-xl ml-4 w-1/2"
          onClick={handleDelete}
        >
          Delete Article
        </button>
      </div>
      <div className="w-full h-1 bg-violet-200"></div>
    </div>
  );
};

ManagementArticleCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string,
};

export default ManagementArticleCard;

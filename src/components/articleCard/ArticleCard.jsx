import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const ArticleCard = ({ id, title, author, readingTime, image }) => {
  return (
    <Link
      to={`/detail-blog/${id}`}
      className={`h-80 rounded-xl ${
        image ? "bg-white" : "bg-gray-300"
      } flex flex-col justify-end`}
      style={{
        backgroundImage: image
          ? `url(data:image/jpeg;base64,${image})`
          : "none",
      }}
    >
      <div className="h-32 bg-white rounded-xl flex flex-col justify-center items-start mt-2 mx-2 mb-2">
        <div className="text-black ml-4"></div>
        <p className="ml-4 mb-1 text-lg font-bold line-clamp-3 max-w-[80%]">
          {title}
        </p>
        <div className="ml-4 text-xs text-black flex items-center">
          <div className="row-span-1 flex flex-row items-center">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="mr-1 text-main-200"
            />
            <p className={author.length > 10 ? "text-[10px]" : ""}>
              By {author}
            </p>
          </div>
          <p className="mx-2 text-main-200">|</p>
          <div className="row-span-1 flex flex-row items-center">
            <FontAwesomeIcon icon={faClock} className="mr-1 text-main-200" />
            <p className={author.length > 10 ? "text-[10px]" : ""}>
              {readingTime} Min. Reading Time
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

ArticleCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
  image: PropTypes.string,
};

export default ArticleCard;

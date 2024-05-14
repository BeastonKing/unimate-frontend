import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ScholarshipTag from "./ScholarshipTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendar } from "@fortawesome/free-solid-svg-icons";


export default function ScholarshipCard({
  id,
  title,
  startDate,
  endDate,
  location,
  type,
  degrees,
  status,
}) {
  const formatDate = (dateString) => {
    // Parse the date string
    const date = new Date(dateString);
    // Options for formatting the date
    const options = { day: "2-digit", month: "long", year: "numeric" };
    // Format the date
    return date.toLocaleDateString("en-GB", options);
  };

  // Format the start date
  const formattedStartDate = formatDate(startDate);
  // Format the end date
  const formattedEndDate = formatDate(endDate);

  let tagText = type;
  if (type === "FULLY_FUNDED") {
    tagText = "Fully Funded";
  } else if (type === "PARTIALLY_FUNDED") {
    tagText = "Partially Funded";
  } else if (type === "SELF_FUNDED") {
    tagText = "Self Funded";
  }

  return (
    <div className="border border-gray-300 rounded-lg p-5 shadow-md bg-white min-w-full">
      <div className="flex flex-wrap">
        <div className="grid grid-rows-5 w-full">
          {/* Date & Status */}
          <div className="flex items-center">
            {/* Date components */}
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-purple-500 text-xl mr-2"
              />
              <h3 className="mr-2">{formattedStartDate}</h3>
              <h2 className="mr-2">-</h2>
              <h3>{formattedEndDate}</h3>
            </div>
            {/* Status tag */}
            <div className="ml-auto">
              <ScholarshipTag key={1} tag={status} size="status" />
            </div>
          </div>

          {/* Render scholarship tags */}
          <div className="w-full flex">
            <ScholarshipTag key={1} tag={tagText} size="card" />
            {degrees.map((degree, index) => (
              <ScholarshipTag key={index} tag={degree} size="card" />
            ))}
          </div>

          {/* Display scholarship title */}
          <div className="w-full">
            <h2 className="line-clamp-3 text-xl">{title}</h2>
          </div>

          {/* Display scholarship location */}
          <div className="flex items-center w-full">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-gray-600 mr-2"
            />
            <h3>{location}</h3>
          </div>

          {/* Button Info Beasiswa */}
          <div className="w-full">
            <Link to={`/detail-scholarship/${id}`}>
              <button className="bg-purple-500 text-white rounded-full py-2 px-4 mt-2 w-full hover:bg-purple-700">
                Lihat Info Beasiswa
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

ScholarshipCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  degrees: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired,
};

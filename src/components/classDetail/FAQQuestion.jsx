import React from "react";
import { useState } from "react";
import arrowdown from "../../assets/image/Arrow - Down 5.svg";
import arrowup from "../../assets/image/Arrow - Down.svg";
import PropTypes from "prop-types";

const FAQQuestion = ({ question, index }) => {
  const [arrow, setArrow] = useState(false);
  return (
    <div className="border-b w-full">
      <div
        key={index}
        onClick={() => setArrow(!arrow)}
        className={`flex items-center pt-2 ${arrow ? "pb-2" : "pb-4"}`}
      >
        <h1 className="w-full font-semibold text-medium">
          {question.question}
        </h1>
        <img src={arrow ? arrowup : arrowdown} />
        <div></div>
      </div>
      {arrow && <div className="mb-4 text-sm w-full">{question.answer}</div>}
    </div>
  );
};

FAQQuestion.propTypes = {
  index: PropTypes.number.isRequired,
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }),
};
export default FAQQuestion;

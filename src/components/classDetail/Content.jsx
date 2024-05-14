import React from "react";
import PropTypes from "prop-types";
import meet from "../../assets/image/Video.svg";
import document from "../../assets/image/Document.svg";

export default function Content({ expand }) {
  return (
    <div>
      {expand.map((x, i) => (
        <div key={i} className="mb-[32px] mt-[24px]">
          <div className="flex  items-center">
            <input
              className="mr-[32px]  before:content[''] peer  h-5 w-5 cursor-pointer appearance-none rounded-md border border-first transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-first before:opacity-0 before:transition-opacity checked:border-first checked:bg-first checked:before:bg-first hover:before:opacity-10"
              type="checkbox"
            />
            <div className="flex items-center">
              <a href={x.link}>
                <img
                  href={x.link}
                  src={x.tipe == 1 ? meet : document}
                  className="mr-[16px]"
                />
              </a>
              <a href={x.link} className="font-semibold text-first text-[20px]">
                {x.nama}
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-[80px]  h-5 w-5"> </div>
            <h1 className="text-[20px]">{x.desc}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}

Content.propTypes = {
  expand: PropTypes.arrayOf(
    PropTypes.shape({
      tipe: PropTypes.oneOf([1, 2]).isRequired,
      link: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      desc: PropTypes.string,
    })
  ).isRequired,
};

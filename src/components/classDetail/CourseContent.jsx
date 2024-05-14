import React from "react";
import arrowdown from "../../assets/image/Arrow - Down 5.svg";
import arrowup from "../../assets/image/Arrow - Down.svg";
import { useState } from "react";

import PropTypes from "prop-types";
import Content from "./Content";

const materi = {
  nama: "Mengenal Lorem Ipsum 1",
  file: [
    {
      tipe: 1,
      nama: "Pertemuan 1: Lorem Ipsum Meeting",
      link: "https://www.youtube.com",
      desc: "06 Maret 2024, 08.00 - 09.30",
    },
    {
      tipe: 2,
      nama: "Soft File Materi Pertemuan 1",
      link: "https://drive.google.com/drive/folders/1iaPAX6sh6moLLyvIzy8Oo7Mst5hcKBFn",
    },
  ],
};

const materi2 = {
  nama: "Mengenal Lorem Ipsum 2",
  file: [
    {
      tipe: 1,
      nama: "Pertemuan 1: Lorem Ipsum Meeting",
      link: "www.youtube.com",
    },
    {
      tipe: 2,
      nama: "Soft File Materi Pertemuan 1",
      link: "https://drive.google.com/drive/folders/1iaPAX6sh6moLLyvIzy8Oo7Mst5hcKBFn",
    },
  ],
};

const materi3 = {
  nama: "Mengenal Lorem Ipsum",
  file: [
    {
      tipe: 1,
      nama: "Pertemuan 1: Lorem Ipsum Meeting",
      link: "www.youtube.com",
      desc: "Besok",
    },
  ],
};

const materi4 = {
  nama: "Mengenal Lorem Ipsum",
  file: [
    {
      tipe: 2,
      nama: "Soft File Materi Pertemuan 1",
      link: "https://drive.google.com/drive/folders/1iaPAX6sh6moLLyvIzy8Oo7Mst5hcKBFn",
    },
  ],
};
const konten = [materi, materi2, materi3, materi4];

export default function CourseContent() {
  return (
    <div className="w-full mt-[64px]">
      {konten.map((x, i) => (
        <ListCourse course={x} key={i} i={i} />
      ))}
    </div>
  );
}

function ListCourse({ course, i }) {
  const [arrow, setArrow] = useState(false);
  return (
    <div className="border-b">
      <div
        key={i}
        onClick={() => setArrow(!arrow)}
        className="h-[74px]  flex items-center "
      >
        <h1 className="w-full font-semibold text-[20px]">
          {"Course " + (i + 1) + " : " + course.nama}
        </h1>
        <img src={arrow ? arrowup : arrowdown} />
        <div></div>
      </div>
      {arrow && (
        <div>
          <Content expand={course.file} />
        </div>
      )}
    </div>
  );
}

ListCourse.propTypes = {
  course: PropTypes.shape({
    nama: PropTypes.string.isRequired,
    file: PropTypes.arrayOf(
      PropTypes.shape({
        tipe: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
        nama: PropTypes.string.isRequired,
        desc: PropTypes.string,
      })
    ).isRequired,
  }),
  i: PropTypes.number.isRequired,
};

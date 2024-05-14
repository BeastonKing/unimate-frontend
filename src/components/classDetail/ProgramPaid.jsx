import React from "react";
import Overview from "./Overview";
import { useState } from "react";
import Announcements from "./Announcements";
import CourseContent from "./CourseContent";
import ListUjian from "./ListUjian";

export default function ProgramPaid({ category }) {
  const [button, setButton] = useState(1);

  return (
    <div>
      <div className="bg-white w-2/3 h-[52px] flex justify-center rounded-[8px]">
        <div
          onClick={() => setButton(1)}
          className={
            "w-1/3 h-[52px]  flex justify-center items-center rounded-[8px] " +
            (button === 1 ? "bg-main-200" : "bg-white")
          }
        >
          <h1
            className={
              "font-bold text-xl " +
              (button == 1 ? "text-white" : "text-main-200")
            }
          >
            Overview
          </h1>
        </div>
        <div
          onClick={() => setButton(2)}
          className={
            "w-1/3  h-[52px] flex justify-center items-center rounded-[8px] " +
            (button === 2 ? "bg-main-200" : "bg-white")
          }
        >
          <h1
            className={
              "font-bold text-xl " +
              (button == 2 ? "text-white" : "text-main-200")
            }
          >
            Announcement
          </h1>
        </div>
        <div
          onClick={() => setButton(3)}
          className={
            "w-1/3 h-[52px]  flex justify-center items-center rounded-[8px] " +
            (button === 3 ? "bg-main-200" : "bg-white")
          }
        >
          <h1
            className={
              "font-bold text-xl " +
              (button === 3 ? "text-white" : "text-main-200")
            }
          >
            {category === "Persiapan Tes" ? "List Ujian" : "Course Content"}
          </h1>
        </div>
      </div>
      {button == 1 && <Overview />}
      {button == 2 && <Announcements />}
      {button == 3 &&
        (category === "Persiapan Tes" ? <ListUjian /> : <CourseContent />)}
    </div>
  );
}

import React from "react";
const CircularProgress = ({ percentage, label }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;
  const offset = circumference - progress;

  return (
    <svg className="progress-ring" width="120" height="120">
      <circle
        className="progress-ring__circle"
        stroke="#DED3F7"
        strokeWidth="8"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
      />
      <circle
        className="progress-ring__circle progress-ring__circle--progress"
        stroke="#5B25D9"
        strokeWidth="8"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 60 60)`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="24"
        fill="#333"
      >
        {percentage}%
      </text>
      <text>{label}</text>
    </svg>
  );
};

export default CircularProgress;

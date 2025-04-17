// Loader.js

import React from "react";
import "./Loader.css";

const LoaderSpinner = () => {
  return (
    <div className="outer_div111">
      <svg className="pl" width="100" height="100" viewBox="0 0 240 240">
        <circle
          className="pl__ring pl__ring--a"
          cx="120"
          cy="120"
          r="105"
          fill="none"
          stroke="#000"
          stroke-width="20"
          stroke-dasharray="0 660"
          stroke-dashoffset="-330"
          stroke-linecap="round"
        ></circle>
        <circle
          className="pl__ring pl__ring--b"
          cx="120"
          cy="120"
          r="35"
          fill="none"
          stroke="#000"
          stroke-width="20"
          stroke-dasharray="0 220"
          stroke-dashoffset="-110"
          stroke-linecap="round"
        ></circle>
        <circle
          className="pl__ring pl__ring--c"
          cx="85"
          cy="120"
          r="70"
          fill="none"
          stroke="#000"
          stroke-width="20"
          stroke-dasharray="0 440"
          stroke-linecap="round"
        ></circle>
        <circle
          className="pl__ring pl__ring--d"
          cx="155"
          cy="120"
          r="70"
          fill="none"
          stroke="#000"
          stroke-width="20"
          stroke-dasharray="0 440"
          stroke-linecap="round"
        ></circle>
      </svg>
    </div>
  );
};

export default LoaderSpinner;

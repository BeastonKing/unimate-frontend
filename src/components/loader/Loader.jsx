import React from "react";

import FadeLoader from "react-spinners/FadeLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

// eslint-disable-next-line react/prop-types
const Loader = ({ loading }) => {
  return (
    <div className="loader-container" style={{ position: "relative" }}>
      {/* Background Overlay */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
            backdropFilter: "blur(5px)", // Adjust the blur intensity as needed
          }}
        ></div>
      )}

      {/* Loader */}
      <div
        className="sweet-loading"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader
          cssOverride={override}
          size={30}
          color={"#123abc"}
          loading={loading}
          speedMultiplier={1.5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loader;

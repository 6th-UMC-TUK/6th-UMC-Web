import React from "react";

export default function Description({ title, overview }) {
  return (
    <>
      <div className="movie-overview-box">
        <h3 className="description-title">{title}</h3>
        <div className="movie-overview">
          <h3>{overview}</h3>
        </div>
      </div>
    </>
  );
}

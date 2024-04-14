import React from "react";
import { useState } from "react";
import Description from "./Description";

export default function MovieCard({ movie }) {
  const [isHover, setisHover] = useState(false);

  return (
    <div
      className="movie-card"
      onMouseOver={() => setisHover(true)}
      onMouseOut={() => setisHover(false)}
    >
      <div className={`movie-list ${isHover ? "hovered" : ""}`}>
        <img src={movie.poster_path} alt={movie.title} />
        <div className="movie-bottom">
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <h3 className="movie-average">{movie.vote_average}</h3>
          </div>
        </div>
      </div>
      {isHover && <Description title={movie.title} overview={movie.overview} />}
    </div>
  );
}

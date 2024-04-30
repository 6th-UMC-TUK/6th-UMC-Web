import propTypes from "prop-types";
import { useState } from "react";
import MovieDetail from "./MovieDetail";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

const Movie = ({ movie }) => {
  const [isHover, setisHover] = useState(false);

  return (
    <div
      className={`movie-container ${isHover ? "hovered" : ""}`}
      onMouseOver={() => setisHover(true)}
      onMouseOut={() => setisHover(false)}
    >
      <img src={IMG_BASE_URL + movie.poster_path} alt="영화포스터" />
      <div className="movie-info">
        <h4>{movie.title}</h4>
        <span>{movie.vote_average}</span>
      </div>
      {isHover && <MovieDetail title={movie.title} overview={movie.overview} />}
    </div>
  );
};

Movie.propTypes = {
  movie: propTypes.object,
};

export default Movie;

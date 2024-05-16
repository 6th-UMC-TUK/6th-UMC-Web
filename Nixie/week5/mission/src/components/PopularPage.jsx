import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";

const apiKey = "c0a4b7aef77457356f4a9a10d17eb3ff";

function PopularPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`;

    axios
      .get(url)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Fetching popular movies failed: ", error);
      });
  }, []);

  return (
    <div>
      {<MovieList movies={movies} />}
    </div>
  );
}

export default PopularPage;

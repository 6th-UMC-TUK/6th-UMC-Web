import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import Loading from "./Loading";
import API_KEY from "../../config/secrets";

export default function PopularPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`;

    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          setMovies(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetching nowplaying movies failed: ", error);
        });
    }, 700);
  }, []);

  return <div>{loading ? <Loading /> : <MovieList movies={movies} />}</div>;
}

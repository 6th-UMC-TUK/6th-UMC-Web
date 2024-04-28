import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";

export default function NowPlayingPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiKey = "d4e387dc7220639de4c49f1eff1f9123";
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR`;

    axios
      .get(url)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Fetching nowplaying movies failed: ", error);
      });
  }, []);

  return <MovieList movies={movies} />; // API에서 받아온 데이터 props로 전달
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import Loading from "./Loading";

export default function NowPlayingPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = "d4e387dc7220639de4c49f1eff1f9123";
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR`;

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
    }, 700); // 700ms 후에 axios 요청 실행
  }, []);

  return <div>{loading ? <Loading /> : <MovieList movies={movies} />}</div>; // API에서 받아온 데이터 props로 전달
}

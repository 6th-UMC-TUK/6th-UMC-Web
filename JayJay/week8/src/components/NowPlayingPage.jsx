import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import Loading from "./Loading";
import API_KEY from "../../config/secrets";

export default function NowPlayingPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const fetchMovies = useCallback(() => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${page}`;

    setLoading(true);
    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetching nowplaying movies failed: ", error);
          setLoading(false);
        });
    }, 600); // 1초 동안 로딩 스피너를 표시
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div>
      <MovieList
        movies={movies}
        loading={loading}
        lastMovieElementRef={lastMovieElementRef}
      />
    </div>
  );
}

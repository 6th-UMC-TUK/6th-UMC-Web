import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import LoadingSpinner from "./LoadingSpinner";
import styled from "styled-components";

const apiKey = "c0a4b7aef77457356f4a9a10d17eb3ff";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #04155a;
`;

function NowPlayingPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
      const response = await axios.get(url);
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setCurrentPage(page);
    } catch (error) {
      console.error("Fetching now playing movies failed: ", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    }
  }, []);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isLoading) {
        fetchMovies(currentPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, fetchMovies]);

  return (
    <div>
      <MovieList movies={movies} />
      {isLoading && (
        <SpinnerContainer>
          <LoadingSpinner />
        </SpinnerContainer>
      )}
    </div>
  );
}

export default NowPlayingPage;

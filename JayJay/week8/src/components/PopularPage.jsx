import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import Loading from "./Loading";
import API_KEY from "../../config/secrets";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const ArrowButton = styled.button`
  padding: 10px 20px;
  margin: 0 40px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function PopularPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMovies = (page) => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`;

    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetching popular movies failed: ", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MovieList movies={movies} />
          <Pagination>
            <ArrowButton onClick={handlePreviousPage} disabled={page === 1}>
              <FaArrowLeft />
            </ArrowButton>
            <span style={{ color: "#fff" }}>{page}</span>
            <ArrowButton onClick={handleNextPage}>
              <FaArrowRight />
            </ArrowButton>
          </Pagination>
        </>
      )}
    </div>
  );
}

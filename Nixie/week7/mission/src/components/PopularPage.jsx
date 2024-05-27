import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import styled from "styled-components";

const apiKey = "c0a4b7aef77457356f4a9a10d17eb3ff";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #04155a;
  padding: 10px;
`;

const PaginationButton = styled.button`
  background-color: #545196;
  color: ${props => (props.disabled ? "gray" : "white")};
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1rem;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  border-radius: 4px;
  background-color: #04155a;
  &:hover {
    background-color: ${props => (props.disabled ? "#545196" : "#6a6acf")};
  }
`;

const PageInfo = styled.span`
  color: white;
  font-size: 1rem;
  margin: 0 10px;
`;

function PopularPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${currentPage}`;

    axios
      .get(url)
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error("Fetching popular movies failed: ", error);
      });
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <MovieList movies={movies} />
      <PaginationContainer>
        <PaginationButton
          type="submit"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          이전 페이지
        </PaginationButton>
        <PageInfo>
          {currentPage}
        </PageInfo>
        <PaginationButton
          type="submit"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          다음 페이지
        </PaginationButton>
      </PaginationContainer>
    </div>
  );
}

export default PopularPage;

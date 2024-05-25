import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MovieDetailPage from "./MovieDetailPage";

const MovieGrid = styled.div`
  width: 70%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(
    4,
    minmax(200px, 1fr)
  ); // 각 컬럼의 최소 너비를 200px로 설정
  gap: 1rem;
  padding: 20px 60px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #202142;
  color: white;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MovieInformation = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 80px;
  max-height: 80px;
  border: 1px solid gray;
  box-sizing: border-box;
  padding: 10px;
  background-color: #545196;
`;

const MovieRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StarIcon = styled.div`
  color: gold;
  margin-right: 5px;
`;

export default function MovieList({ movies }) {
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };
  return (
    <MovieGrid>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id} // `key`를 여기에 직접 적용
          onClick={() => handleMovieClick(movie)}
        >
          <MovieImage
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieInformation>
            <h4>{movie.title}</h4>
            <MovieRating>
              <StarIcon>★</StarIcon>
              <h4>{movie.vote_average}</h4>
            </MovieRating>
          </MovieInformation>
        </MovieCard>
      ))}
    </MovieGrid>
  );
}

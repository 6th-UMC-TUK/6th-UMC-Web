import React from "react";
import styled from "styled-components";

const MovieGrid = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(6, minmax(200px, 1fr));
  gap: 1rem;
  padding: 20px 60px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #04155a;
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
  width: 210px; /* 가로 크기를 300px로 고정 */
  height: 70px; /* 세로 크기를 100px로 고정 */
  border: 1px solid gray;
  box-sizing: border-box;
  padding: 10px;
  background-color: #545196;
`;

export default function Movielist({ movies }) {
  return (
    <MovieGrid>
      {movies.map((movie) => (
        <MovieCard key={movie.id}>
          <MovieImage
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieInformation>
            <h4>{movie.title}</h4>
            {/* 소수점 첫 번째 자리까지 반올림하여 표시 */}
            <h4>{parseFloat(movie.vote_average).toFixed(1)}</h4>
          </MovieInformation>
        </MovieCard>
      ))}
    </MovieGrid>
  );
}

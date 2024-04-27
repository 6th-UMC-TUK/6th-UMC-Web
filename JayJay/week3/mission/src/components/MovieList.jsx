import React from "react";
import styled from "styled-components";

const MovieGrid = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(
    6,
    minmax(200px, 1fr)
  ); // 각 컬럼의 최소 너비를 200px로 설정
  gap: 1rem;
  padding: 0 60px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #04155a;
  color: white;
`;

// MovieList 컴포넌트 안의 이미지 스타일링
const MovieImage = styled.img`
  width: 100%;
  height: auto;
`;

const MovieCard = styled.div``;

export default function Movielist({ movies }) {
  return (
    <MovieGrid>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <MovieImage
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      ))}
    </MovieGrid>
  );
}

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Rolling from "../assets/Rolling.gif";

const MovieGrid = styled.div`
  min-width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); /* 자동 맞춤 */ // 각 컬럼의 최소 너비를 200px로 설정
  gap: 1rem;
  padding: 20px 60px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #202142;
  color: white;
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const MovieImage = styled.img`
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

const MovieTitle = styled.h4`
  margin: 0;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
`;

const LoadingBox = styled.div`
  width: 50px;
  height: 50px;
`;

const LoadingImage = styled.img`
  width: 100%;
  height: 100%;
  background: transparent;
`;

export default function MovieList({ movies, loading, lastMovieElementRef }) {
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  return (
    <div>
      <MovieGrid>
        {movies.map((movie, index) => {
          const movieKey = `${movie.id}-${index}`;
          if (movies.length === index + 1) {
            return (
              <MovieCard
                ref={lastMovieElementRef}
                key={movieKey}
                onClick={() => handleMovieClick(movie)}
              >
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <MovieInformation>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieRating>
                    <StarIcon>★</StarIcon>
                    <h4>{movie.vote_average}</h4>
                  </MovieRating>
                </MovieInformation>
              </MovieCard>
            );
          } else {
            return (
              <MovieCard key={movieKey} onClick={() => handleMovieClick(movie)}>
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <MovieInformation>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieRating>
                    <StarIcon>★</StarIcon>
                    <h4>{movie.vote_average}</h4>
                  </MovieRating>
                </MovieInformation>
              </MovieCard>
            );
          }
        })}
      </MovieGrid>
      {loading && (
        <LoadingContainer>
          <LoadingBox>
            <LoadingImage src={Rolling} />
          </LoadingBox>
        </LoadingContainer>
      )}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom"; 
import styled from "styled-components";
import starImage from "../assets/star.png";

const MovieGrid = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: 1rem;
  padding: 20px 60px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #04155a;
  color: white;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    padding: 20px 40px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    padding: 20px 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
    padding: 10px;
  }
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  border: 1px solid gray;
  box-sizing: border-box;
  padding: 10px;
  background-color: #545196;

  @media (max-width: 600px) {
    flex-direction: column;
    height: auto;
    padding: 5px;
  }
`;

const Star = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 2px;
`;

const MovieTitle = styled.h4`
  font-size: 0.9rem;
  margin: 0;
`;

const MovieRating = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  @media (max-width: 600px) {
    margin-right: 0;
    margin-top: 5px;
  }
`;

export default function MovieList({ movies }) {
  return (
    <MovieGrid>
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <MovieCard>
            <MovieImage
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}/>
            <MovieInformation>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieRating>
                <Star src={starImage} alt="star" />
                <MovieTitle>{parseFloat(movie.vote_average).toFixed(1)}</MovieTitle>
              </MovieRating>
            </MovieInformation>
          </MovieCard>
        </Link>
      ))}
    </MovieGrid>
  );
}

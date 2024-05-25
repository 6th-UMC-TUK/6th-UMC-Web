import React from "react";
import { Link } from "react-router-dom"; 
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
  width: 210px;
  height: 70px;
  border: 1px solid gray;
  box-sizing: border-box;
  padding: 10px;
  background-color: #545196;
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
              <h4>{movie.title}</h4>
              <h4>{parseFloat(movie.vote_average).toFixed(1)}</h4>
            </MovieInformation>
          </MovieCard>
        </Link>
      ))}
    </MovieGrid>
  );
}

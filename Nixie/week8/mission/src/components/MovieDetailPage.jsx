import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import starImage from "../assets/star.png";
import MoviePeopleList from "./PeopleList";

const apiKey = "c0a4b7aef77457356f4a9a10d17eb3ff";

const MovieDetailWrapper = styled.div`
  color: white;
  background-color: #0b0b31;
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  min-width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MovieInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MoviePoster = styled.img`
  width: 300px;
  margin-right: 30px;
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    width: 80%;
  }
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const StarRating = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Star = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 2px;
`;

const OverviewText = styled.p`
  min-height: 100px;
`;

const MoviePeopleBox = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  color: white;
  background-color: #1a1a52;
  box-sizing: border-box;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PeopleTitle = styled.span`
  font-size: large;
  padding: 10px;

  @media (max-width: 768px) {
    font-size: medium;
    padding: 5px;
  }
`;

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;

    axios
      .get(url)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  if (!movie) {
    return <p>No movie data found.</p>;
  }

  const stars = Math.floor(movie.vote_average);

  return (
    <MovieDetailWrapper>
      <MovieInfoContainer>
        <MoviePoster
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <MovieDetails>
          <h2>{movie.title}</h2>
          <StarRating>
            {Array(stars).fill(0).map((_, index) => (
              <Star key={index} src={starImage} alt="star" />
            ))}
          </StarRating>
          <p>개봉일: {movie.release_date}</p>
          <h3>줄거리</h3>
          <OverviewText>{movie.overview ? movie.overview : '줄거리가 없습니다.'}</OverviewText>
        </MovieDetails>
      </MovieInfoContainer>
      <MoviePeopleBox>
        <PeopleTitle>출연진 및 제작진</PeopleTitle>
        <MoviePeopleList movieId={movie.id} />
      </MoviePeopleBox>
    </MovieDetailWrapper>
  );
}

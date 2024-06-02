import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import starImage from "../assets/star.png";
import MoviePeopleList from "./MoviePeopleList";

const MovieDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-image: url(${(props) => props.backdrop});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
`;

const MovieDetailInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 700px;
  color: white;
  margin-top: 30px;
  z-index: 2;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    max-height: none;
    margin-top: 30px;
  }
`;

const MovieDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 600px;
  min-width: 600px;
  margin-left: 90px;
  height: 100%;
  gap: 20px;

  @media (max-width: 768px) {
    align-items: center;
    width: 100%;
  }
`;

const MovieTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const ReleaseDate = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

const MovieDetailImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  z-index: 2;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const MovieAverageBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MovieOverview = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  max-width: 768px;
  @media (max-width: 768px) {
    text-align: center;
    padding: 0 10px;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

const MoviePeopleBox = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 40px;
  border-radius: 10px;
  color: white;
  margin-top: 70px;
  box-sizing: border-box;
  z-index: 2;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    padding: 20px;
    width: 100%;
  }
`;

const AllPeopleTitle = styled.span`
  font-size: large;
  padding: 10px;
`;

const MoviePeopleListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export default function MovieDetailPage() {
  const location = useLocation();
  const { movie } = location.state || {};

  if (!movie) {
    return <Loading />;
  }

  const movieAverage = Math.floor(movie.vote_average);
  const starCount =
    `<img src="${starImage}" alt="star" style="width: 20px; height: 20px;">`.repeat(
      movieAverage
    );

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <>
      <MovieDetailBox backdrop={backdropUrl}>
        <MovieDetailInfoBox>
          <MovieDetailImage
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieDetailInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieAverageBox>
              평점: <span dangerouslySetInnerHTML={{ __html: starCount }} />
            </MovieAverageBox>
            <ReleaseDate>{movie.release_date}</ReleaseDate>
            {movie.overview ? (
              <MovieOverview>{movie.overview}</MovieOverview>
            ) : (
              <MovieOverview>
                TDMB에서 제공하는 상세정보가 없습니다.
              </MovieOverview>
            )}
          </MovieDetailInfo>
        </MovieDetailInfoBox>
        <MoviePeopleBox>
          <AllPeopleTitle>출연진 및 제작진</AllPeopleTitle>
          <MoviePeopleListWrapper>
            <MoviePeopleList movieId={movie.id} />
          </MoviePeopleListWrapper>
        </MoviePeopleBox>
      </MovieDetailBox>
    </>
  );
}

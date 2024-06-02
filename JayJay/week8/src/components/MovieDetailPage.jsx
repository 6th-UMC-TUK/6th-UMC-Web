import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import starImage from "../assets/star.png";
import MoviePeopleList from "./MoviePeopleList";

const MovieDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background-image: url(${(props) => props.backdrop});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;//필수
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
  margin-top: 70px;
  z-index: 2;
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
  gap: 20px; // 요소들 간의 간격 조정
`;

const MovieDetailImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  z-index: 2;
`;

const MovieAverageBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
`;

const MoviePeopleBox = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 40px;
  border-radius: 10px;
  color: white;
  margin-top: 140px;
  box-sizing: border-box;
  z-index: 2;
`;

const AllPeopleTitle = styled.span`
  font-size: large;
  padding: 10px;
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
            <div>{movie.title}</div>
            <MovieAverageBox>
              평점: <span dangerouslySetInnerHTML={{ __html: starCount }} />
            </MovieAverageBox>
            <h1>{movie.release_date}</h1>
            {movie.overview ? (
              <p>{movie.overview}</p>
            ) : (
              <p>TDMB에서 제공하는 상세정보가 없습니다.</p>
            )}
          </MovieDetailInfo>
        </MovieDetailInfoBox>
        <MoviePeopleBox>
          <AllPeopleTitle>출연진 및 제작진</AllPeopleTitle>
          <MoviePeopleList movieId={movie.id} />
        </MoviePeopleBox>
      </MovieDetailBox>
    </>
  );
}

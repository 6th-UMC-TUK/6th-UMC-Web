import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";

const MovieDetailBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh; // 뷰포트의 높이를 기준으로 100%
  background-image: url(${(props) => props.backdrop});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const MovieDetailInfoBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  max-height: 100%;
  color: white;
`;

const MovieDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 400px;
  min-width: 400px;
`;

const MovieDetailImage = styled.img`
  max-width: 100%; // 컨테이너 너비를 초과하지 않도록
  max-height: 100%; // 컨테이너 높이를 초과하지 않도록
`;

export default function MovieDetailPage() {
  const location = useLocation();
  const { movie } = location.state || {}; // location.state에서 movie 데이터를 추출

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  if (!movie) {
    return <Loading />;
  }

  return (
    <MovieDetailBox backdrop={backdropUrl}>
      <MovieDetailInfoBox>
        <MovieDetailImage
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <MovieDetailInfo>
          <div>{movie.title}</div>
          <div>{movie.vote_average}</div>
          <h1>{movie.release_date}</h1>
          {movie.overview ? (
            <p>{movie.overview}</p>
          ) : (
            <p>TDMB에서 제공하는 상세정보가 없습니다.</p>
          )}
          <p>{movie.overview}</p>
        </MovieDetailInfo>
      </MovieDetailInfoBox>
    </MovieDetailBox>
  );
}

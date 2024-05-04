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
`;

const MovieDetailInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  max-height: 100%;
  color: white;
`;

const MovieDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 300px;
`;

const MovieDetailImage = styled.img`
  max-width: 100%; // 컨테이너 너비를 초과하지 않도록
  max-height: 100%; // 컨테이너 높이를 초과하지 않도록
`;

export default function MovieDetailPage() {
  const location = useLocation();
  const { movie } = location.state || {}; // location.state에서 movie 데이터를 추출

  if (!movie) {
    return <Loading />;
  }

  return (
    <MovieDetailBox>
      <MovieDetailInfoBox>
        <MovieDetailImage
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <MovieDetailInfo>
          <h1>{movie.title}</h1>
          <p>{movie.release_date}</p>
          <p>{movie.overview}</p>
        </MovieDetailInfo>
      </MovieDetailInfoBox>
    </MovieDetailBox>
  );
}

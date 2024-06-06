import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import API_KEY from "../../config/secrets";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: larger;
  height: auto;
`;

const SearchTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  font-weight: bold;
  color: white;
  height: 200px;
`;

const SearchInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    padding: 10px;
    box-sizing: border-box;
  }
`;

const SearchInput = styled.input`
  width: 500px;
  padding: 10px;
  height: 50px;
  border: 1px solid gray;
  border-radius: 20px;
  box-sizing: border-box;
  font-size: medium;
`;

const SearchIconBox = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 20px;
  border-radius: 50%;
  padding: 5px;
  box-sizing: border-box;
  background-color: yellow;
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const StyledFaSearch = styled(FaSearch)`
  width: 100%;
  height: 100%;
  color: black;
`;

const SearchMovieResultsBox = styled.div`
  position: relative;
  width: ${(props) =>
    props.movies && props.movies.length > 0 ? "1100px" : "0"};
  height: ${(props) =>
    props.movies && props.movies.length > 0 ? "900px" : "0"};
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: ${(props) =>
    props.movies && props.movies.length > 0 ? "scroll" : "hidden"};
  background-color: ${(props) =>
    props.movies && props.movies.length > 0 ? "black" : "transparent"};
  transition: all 0.5s ease-in;

  // 스크롤바 스타일링
  &::-webkit-scrollbar {
    width: ${(props) =>
      props.movies && props.movies.length > 0
        ? "8px"
        : "0"}; // 스크롤바의 너비 설정
    height: ${(props) =>
      props.movies && props.movies.length > 0 ? "8px" : "0"};
  }
  &::-webkit-scrollbar-track {
    background: transparent; // 스크롤바 트랙의 배경색 설정
  }
  &::-webkit-scrollbar-thumb {
    background-color: yellow; // 스크롤바 핸들의 색상을 노란색으로 설정
    border-radius: 4px; // 스크롤바 핸들의 모서리를 둥글게 처리
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #b5b500; // 스크롤바 핸들에 마우스 호버 시 색상 변경
  }
`;

const SearchMovieResults = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4열 그리드
  gap: 20px; // 각 항목 간격
  width: 100%;
  height: 50%;
  padding: 5px;
  box-sizing: border-box;
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const MovieInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MovieInfoTitle = styled.h3`
  font-size: medium;
`;

const MovieInfoAverage = styled.p`
  width: auto;
  height: auto;
`;

const SearchLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: larger;
`;

export default function MovieSearch() {
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const movieSearchClick = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  const fetchMovies = useCallback(async (searchQuery) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      searchQuery
    )}&include_adult=false&language=en-US&page=1`;

    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Searching movies failed: ", error);
      setError("영화를 검색하는 중에 문제가 발생했습니다.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputValue) {
        setLoading(true);
        fetchMovies(inputValue);
      } else {
        setMovies([]);
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(debounce);
  }, [inputValue, fetchMovies]);

  const handleInput = (e) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <SearchBox>
      <SearchTitle>Find your Movies!</SearchTitle>
      <SearchInputBox>
        <SearchInput onChange={handleInput} value={inputValue} />
        <SearchIconBox>
          <StyledFaSearch />
        </SearchIconBox>
      </SearchInputBox>
      <SearchMovieResultsBox movies={movies}>
        {loading && movies.length > 0 ? (
          <SearchLoading>로딩 중입니다..</SearchLoading> // 로딩 중일 때 로딩 메시지 표시
        ) : (
          <SearchMovieResults>
            {movies.map((movie) => (
              <MovieCard key={movie.id} onClick={() => movieSearchClick(movie)}>
                <MoviePoster
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <MovieInfo>
                  <MovieInfoTitle>{movie.title}</MovieInfoTitle>
                  <MovieInfoAverage>⭐ {movie.vote_average}</MovieInfoAverage>
                </MovieInfo>
              </MovieCard>
            ))}
          </SearchMovieResults>
        )}
      </SearchMovieResultsBox>
    </SearchBox>
  );
}

import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import API_KEY from "../../config/secrets";

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
`;

const StyledFaSearch = styled(FaSearch)`
  width: 100%;
  height: 100%;
  color: black;
`;

const SearchMovieResultsBox = styled.div`
  width: ${(props) =>
    props.movies && props.movies.length > 0 ? "1200px" : "0"};
  height: ${(props) =>
    props.movies && props.movies.length > 0 ? "800px" : "0"};
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: ${(props) =>
    props.movies && props.movies.length > 0 ? "scroll" : "hidden"};
  background-color: ${(props) =>
    props.movies && props.movies.length ? "black" : "transparent"};
  transition: all 0.5s ease-in; // 너비, 높이, 배경색의 변화에 대한 트랜지션 적용..

  // 스크롤바 스타일링.. 이번에 chatgpt를 통해 첨 알게된 속성
  &::-webkit-scrollbar {
    width: 8px; // 스크롤바의 너비 설정
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
  height: 100%;
  margin: 20px 0;
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

export default function MovieSearch() {
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!inputValue) {
      setMovies([]);
      return;
    }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      inputValue
    )}&include_adult=false&language=en-US&page=1`;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Searching movies failed: ", error);
      }
    };

    fetchMovies();
  }, [inputValue]); // inputValue 변경 시에만 호출

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
        <SearchMovieResults>
          {movies.map((movie) => (
            <MovieCard key={movie.id}>
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
      </SearchMovieResultsBox>
    </SearchBox>
  );
}

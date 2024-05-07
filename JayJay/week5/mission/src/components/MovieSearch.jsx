import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

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
  transition: all 0.5s ease-in; // 너비, 높이, 배경색의 변화에 대한 트랜지션 적용
`;

const SearchMovieResults = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4열 그리드
  gap: 20px; // 각 항목 간격
  width: 100%;
  margin: 20px 0;
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MoviePoster = styled.img`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const MovieInfo = styled.div`
  padding: 10px;
  text-align: center;
`;

export default function MovieSearch() {
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!inputValue) {
      setMovies([]);
      return;
    }
    const apiKey = "d4e387dc7220639de4c49f1eff1f9123";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
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
                <h3>{movie.title}</h3>
                <p>⭐ {movie.vote_average}</p>
              </MovieInfo>
            </MovieCard>
          ))}
        </SearchMovieResults>
      </SearchMovieResultsBox>
    </SearchBox>
  );
}

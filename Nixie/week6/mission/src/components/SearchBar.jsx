import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 import 합니다.

const apiKey = "c0a4b7aef77457356f4a9a10d17eb3ff";

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  font-size: larger;
  height: auto;
`;

const SearchContainer = styled.div`
  background-color: #000062;
  color: #fff;
  padding: 100px 0;
  text-align: center;
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 70vh;
  width: 100%;
  box-sizing: border-box;
`;

const SearchTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 20px 0;
`;

const SearchInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%; 
  margin: 0 auto;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px 20px;
  height: 30px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  color: black;
  background-color: white;
`;

const SearchIconBox = styled.button`
  width: 50px;  
  height: 50px;
  border-radius: 50%;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  margin-left: 10px;
`;

const StyledFaSearch = styled(FaSearch)`
  color: black;
  font-size: 24px;
`;

const SearchMovieResultsBox = styled.div`
  position: fixed;
  top: 80%; 
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 800px;
  max-height: 40%;
  overflow-y: auto;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
  display: ${(props) => props.movies.length > 0 ? 'block' : 'none'};
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
  cursor: pointer; 
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

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  grid-gap: 20px; 
  width: 100%;
`;

const MovieTitle = styled.h3`
  font-size: medium;
`;

const MovieRating = styled.p`
  width: auto;
  height: auto;
`;

function MovieSearch() {
  const [inputValue, setInputValue] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();  

  const fetchMovies = async () => {
    if (!inputValue.trim()) return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(inputValue)}&include_adult=false&language=en-US&page=1`;
    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Searching movies failed: ', error);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === "") {
      setMovies([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchMovies();
    }
  };

  const handleSearchClick = () => {
    fetchMovies();
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);  
  };

  return (
    <SearchBox>
      <SearchContainer>
        <SearchTitle>Find your Movies!</SearchTitle>
        <SearchInputBox>
          <SearchInput onChange={handleInput} value={inputValue} onKeyPress={handleKeyPress} placeholder="Search movies..." />
          <SearchIconBox onClick={handleSearchClick}>
            <StyledFaSearch />
          </SearchIconBox>
        </SearchInputBox>
      </SearchContainer>
      <SearchMovieResultsBox movies={movies}>
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieRating>⭐ {parseFloat(movie.vote_average).toFixed(1)}</MovieRating>
            </MovieInfo>
          </MovieCard>
        ))}
        </MovieGrid>
      </SearchMovieResultsBox>
    </SearchBox>
  );
}

export default MovieSearch;

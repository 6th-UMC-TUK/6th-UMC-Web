import React from 'react';
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
  background-color: #000062;
  color: #fff;
  padding: 230px 0;
  text-align: center;
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const SearchBarText = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
`;

const InputBox = styled.input`
  width: 20%;
  padding: 10px 80px;
  border-radius: 20px;
  border: none;
  outline: none;
`;

function SearchBar() {
  return (
    <SearchBarWrapper>
      <SearchBarText>Find your Movie!</SearchBarText>
      <InputBox type="text" />
    </SearchBarWrapper>
  );
}

export default SearchBar;

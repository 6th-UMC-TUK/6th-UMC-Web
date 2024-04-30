import React from "react";
import styled from "styled-components";

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
  width: 100%;
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

export default function MovieSearch() {
  return (
    <SearchBox>
      <SearchTitle>Find your Movies!</SearchTitle>
      <SearchInputBox>
        <SearchInput />
      </SearchInputBox>
    </SearchBox>
  );
}

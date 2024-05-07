import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

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

export default function MovieSearch() {
  return (
    <SearchBox>
      <SearchTitle>Find your Movies!</SearchTitle>
      <SearchInputBox>
        <SearchInput />
        <SearchIconBox>
          <StyledFaSearch />
        </SearchIconBox>
      </SearchInputBox>
    </SearchBox>
  );
}

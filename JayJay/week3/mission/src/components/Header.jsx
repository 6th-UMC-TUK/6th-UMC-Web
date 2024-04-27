import React from "react";
import styled from "styled-components";

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  max-height: 70px;
  border-bottom: 1px solid black;
  background-color: #1a237e;
  color: white;
`;

const MainLogo = styled.div`
  display: flex;
  align-items: center;
  font-size: medium;
  font-weight: bold;
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
`;

const MovieCategory = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const CategoryList = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  height: 100%;
`;

export default function Header() {
  return (
    <HeaderBox>
      <MainLogo>UMC MOVIE</MainLogo>
      <MovieCategory>
        <CategoryList>회원가입</CategoryList>
        <CategoryList>Popular</CategoryList>
        <CategoryList>Now Playing</CategoryList>
        <CategoryList>Top Rated</CategoryList>
        <CategoryList>Upcoming</CategoryList>
      </MovieCategory>
    </HeaderBox>
  );
}

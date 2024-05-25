import React from "react";
import MovieSearch from "./MovieSearch";
import Banner from "./Banner";
import styled from "styled-components";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  overflow-y: auto;
`;

export default function MainPage() {
  return (
    <MainContent>
      <Banner />
      <MovieSearch />
    </MainContent>
  );
}

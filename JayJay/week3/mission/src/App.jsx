import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import MovieSearch from "./components/MovieSearch";
import styled from "styled-components";
import MainPage from "./components/MainPage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <>
      <Container>
        <Header />
        <MainPage />
      </Container>
    </>
  );
}

export default App;

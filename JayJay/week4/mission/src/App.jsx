import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // react-router-dom에서 BrowserRouter, Routes, Route를 임포트합니다.
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HeaderWithRouting from "./components/HeaderWithRouting";
import styled from "styled-components";
import MainPage from "./components/MainPage";
import PopularPage from "./components/PopularPage";
import NowPlayingPage from "./components/NowPlayingPage";
import TopRatedPage from "./components/TopRatedPage";
import Upcoming from "./components/Upcoming";
import MovieDetailPage from "./components/MovieDetailPage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

//d4e387dc7220639de4c49f1eff1f9123 : 발급받은 API 키
//https://developer.themoviedb.org/reference/intro/getting-started: api 문서 링크

function App() {
  return (
    <BrowserRouter>
      <Container>
        <HeaderWithRouting />
        <Routes>
          {/* Routes를 사용하여 각 경로에 해당하는 컴포넌트를 렌더링합니다. */}
          <Route path="/" element={<MainPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/now-playing" element={<NowPlayingPage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/movie/:title" element={<MovieDetailPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

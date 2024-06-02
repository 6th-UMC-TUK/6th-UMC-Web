import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import PopularPage from "./components/PopularPage";
import NowPlayingPage from "./components/NowPlayingPage";
import TopRatedPage from "./components/TopRatedPage";
import UpComingPage from "./components/UpComingPage";
import MovieDetailPage from "./components/MovieDetailPage";
import NotFoundPage from "./components/NotFoundPage";
import SignUpPage from "./components/SignUpPage";
import LogInPage from "./components/LogInPage";
import LoadingProvider from "./components/LoadingProvider";
import AuthProvider from "./components/AuthProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <Router>
          <Container>
            <Navbar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/popular" element={<PopularPage />} />
              <Route path="/now-playing" element={<NowPlayingPage />} />
              <Route path="/top-rated" element={<TopRatedPage />} />
              <Route path="/upcoming" element={<UpComingPage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  min-height: 70px;
  border-bottom: 1px solid black;
  background-color: #101021;
  color: white;
`;

const MainLogo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: medium;
  font-weight: bold;
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  color: white;

  &:hover {
    text-decoration: none;
    color: white;
    font-size: larger;
    transition: font-size 0.2s ease;
  }
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
  height: 100%;
  margin-right: 10px;
`;

const StyledLink = styled(Link)`
  margin-right: 20px;
  color: ${(prop) => (prop.param === "/signup" ? "yellow" : "white")};
  font-weight: ${(prop) => (prop.param === "/signup" ? "bold" : "")};
  text-decoration: none;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    text-decoration: none;
    color: white;
    font-size: larger;
    font-weight: bold;
    transition: font-size 0.2s ease;
  }
`;

export default function Header({ user, loading, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  return (
    <HeaderBox>
      <MainLogo to="/">UMC MOVIE</MainLogo>
      <MovieCategory>
        <CategoryList>
          {user ? (
            <>
              <StyledLink onClick={handleLogout}>로그아웃</StyledLink>
              <StyledLink to="/popular">Popular</StyledLink>
              <StyledLink to="/now-playing">Now Playing</StyledLink>
              <StyledLink to="/top-rated">Top Rated</StyledLink>
              <StyledLink to="/upcoming">Upcoming</StyledLink>
            </>
          ) : (
            <>
              <StyledLink to="/login">로그인</StyledLink>
              <StyledLink to="/signup" param={location.pathname}>
                회원가입
              </StyledLink>
              <StyledLink to="/popular">Popular</StyledLink>
              <StyledLink to="/now-playing">Now Playing</StyledLink>
              <StyledLink to="/top-rated">Top Rated</StyledLink>
              <StyledLink to="/upcoming">Upcoming</StyledLink>
            </>
          )}
        </CategoryList>
      </MovieCategory>
    </HeaderBox>
  );
}

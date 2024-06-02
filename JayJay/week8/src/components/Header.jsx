import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

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
  z-index: 11; /* 헤더가 사이드바 위에 위치하도록 z-index 설정 */
  position: relative;
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

  @media (max-width: 768px) {
    display: none;
  }
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

const MenuIcon = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? "0" : "-100%")};
  width: 250px;
  height: 100%;
  background-color: #101021;
  transition: right 0.3s ease;
  z-index: 10; /* 사이드바가 헤더 아래에 위치하도록 z-index 설정 */
  padding: 70px 20px 20px;

  ${StyledLink} {
    margin-right: 0;
    padding: 10px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const CloseIcon = styled(FaTimes)`
  align-self: flex-end;
  cursor: pointer;
`;

export default function Header({ user, loading, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLinkClick = () => {
    setSidebarOpen(false);
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
      <MenuIcon onClick={toggleSidebar}>
        <FaBars />
      </MenuIcon>
      <Sidebar open={sidebarOpen}>
        <CloseIcon onClick={toggleSidebar} />
        {user ? (
          <>
            <StyledLink onClick={handleLogout}>로그아웃</StyledLink>
            <StyledLink to="/popular" onClick={handleLinkClick}>
              Popular
            </StyledLink>
            <StyledLink to="/now-playing" onClick={handleLinkClick}>
              Now Playing
            </StyledLink>
            <StyledLink to="/top-rated" onClick={handleLinkClick}>
              Top Rated
            </StyledLink>
            <StyledLink to="/upcoming" onClick={handleLinkClick}>
              Upcoming
            </StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/login" onClick={handleLinkClick}>
              로그인
            </StyledLink>
            <StyledLink
              to="/signup"
              param={location.pathname}
              onClick={handleLinkClick}
            >
              회원가입
            </StyledLink>
            <StyledLink to="/popular" onClick={handleLinkClick}>
              Popular
            </StyledLink>
            <StyledLink to="/now-playing" onClick={handleLinkClick}>
              Now Playing
            </StyledLink>
            <StyledLink to="/top-rated" onClick={handleLinkClick}>
              Top Rated
            </StyledLink>
            <StyledLink to="/upcoming" onClick={handleLinkClick}>
              Upcoming
            </StyledLink>
          </>
        )}
      </Sidebar>
    </HeaderBox>
  );
}

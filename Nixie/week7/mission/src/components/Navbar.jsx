import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from './AuthProvider';

const NavbarWrapper = styled.div`
  background-color: #000062;
  padding: 10px;
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;

const NavMenuItem = styled(Link)`
  color: #fff;
  margin-right: 30px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    transform: scale(1.05);
    text-decoration: none;
  }
`;

const Navbar = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ isAuthenticated: false, token: null, user: null });
    navigate("/login");
  };

  return (
    <NavbarWrapper>
      <Link to="/"><Logo>UMC Movie</Logo></Link>
      <NavMenu>
        {auth.isAuthenticated ? (
          <>
            <NavMenuItem as="div">{auth.user?.id}</NavMenuItem>
            <NavMenuItem as="div" onClick={handleLogout}>로그아웃</NavMenuItem>
          </>
        ) : (
          <>
            <NavMenuItem to="/signup" param={location.pathname}>회원가입</NavMenuItem>
            <NavMenuItem to="/login">로그인</NavMenuItem>
          </>
        )}
        <NavMenuItem to="/popular">Popular</NavMenuItem>
        <NavMenuItem to="/now-playing">Now Playing</NavMenuItem>
        <NavMenuItem to="/top-rated">Top Rated</NavMenuItem>
        <NavMenuItem to="/upcoming">Upcoming</NavMenuItem>
      </NavMenu>
    </NavbarWrapper>
  );
};

export default Navbar;

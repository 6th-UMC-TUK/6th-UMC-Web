import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavMenuItem = styled.span`
  color: #fff;
  margin-right: 30px;
  transition: transform 0.2s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

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
  transition: transform 0.2s ease;
  cursor: pointer;
  color: #fff;
  &:hover {
    transform: scale(1.05);
  }
`;

const NavMenu = styled.div`
  display: flex;
`;

const Navbar = () => {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // const toggleLogin = () => {
  //   setIsLoggedIn(!isLoggedIn);
  // };

  // const loginText = isLoggedIn ? '로그아웃' : '로그인';

  // const handleClick = () => {
  //   toggleLogin();
  // };

  return (
    <NavbarWrapper>
      <Link to="/">
        <Logo>UMC movie</Logo>
      </Link>
      <NavMenu>
        <NavMenuItem>
          <Link to="/signup"><Logo>회원가입</Logo></Link>
        </NavMenuItem>
        <NavMenuItem><Link to="/popular"><Logo>Popular</Logo></Link></NavMenuItem>
        <NavMenuItem><Link to="/now-playing"><Logo>Now Playing</Logo></Link></NavMenuItem>
        <NavMenuItem><Link to="/top-rated"><Logo>Top Rated</Logo></Link></NavMenuItem>
        <NavMenuItem><Link to="/upcoming"><Logo>Upcoming</Logo></Link></NavMenuItem>
      </NavMenu>
    </NavbarWrapper>
  );
};

export default Navbar;

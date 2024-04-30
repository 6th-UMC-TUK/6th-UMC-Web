import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarWrapper = styled.div`
  background-color: #000062;
  color: #fff;
  padding: 10px;
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000; /* 다른 요소 위에 나타나도록 z-index를 설정합니다. */
`;

const Logo = styled.div`
  font-size: 20px;
  transition: transform 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NavMenu = styled.div`
  display: flex;
  color: #fff;
`;

const NavMenuItem = styled.span`
  margin-right: 30px;
  transition: transform 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }
`;

function Navbar() {
  return (
    <NavbarWrapper>
      <Link to="/">
        <Logo>UMC movie</Logo>
      </Link>
      <NavMenu>
        <NavMenuItem>회원가입</NavMenuItem>
        <NavMenuItem><Link to="/popular">Popular</Link></NavMenuItem>
        <NavMenuItem><Link to="/now-playing">Now Playing</Link></NavMenuItem>
        <NavMenuItem><Link to="/top-rated">Top Rated</Link></NavMenuItem>
        <NavMenuItem><Link to="/upcoming">Upcoming</Link></NavMenuItem>
      </NavMenu>
    </NavbarWrapper>
  );
}

export default Navbar;

import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from './AuthProvider';
import { FaBars, FaTimes } from 'react-icons/fa';

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

  @media (max-width: 800px) {
    display: none;
  }
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

const MenuIcon = styled.div`
  display: none;
  color: #fff;
  cursor: pointer;

  @media (max-width: 800px) {
    display: block;
    margin-right: 25px; 
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: #000062;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  z-index: 1000;
`;

const SidebarMenuItem = styled(Link)`
  color: #fff;
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    transform: scale(1.05);
    text-decoration: none;
  }
`;

const CloseIcon = styled.div`
  align-self: flex-end;
  margin-bottom: 20px;
  color: #fff;
  cursor: pointer;
`;

const Navbar = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ isAuthenticated: false, token: null, user: null });
    navigate("/login");
    setIsSidebarOpen(false);
  };

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
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
        <MenuIcon onClick={handleMenuClick}>
          <FaBars size={24} />
        </MenuIcon>
      </NavbarWrapper>
      <Sidebar isOpen={isSidebarOpen}>
        <CloseIcon onClick={handleMenuClick}>
          <FaTimes size={24} />
        </CloseIcon>
        {auth.isAuthenticated ? (
          <>
            <SidebarMenuItem as="div">{auth.user?.id}</SidebarMenuItem>
            <SidebarMenuItem as="div" onClick={handleLogout}>로그아웃</SidebarMenuItem>
          </>
        ) : (
          <>
            <SidebarMenuItem to="/signup" onClick={handleSidebarClick}>회원가입</SidebarMenuItem>
            <SidebarMenuItem to="/login" onClick={handleSidebarClick}>로그인</SidebarMenuItem>
          </>
        )}
        <SidebarMenuItem to="/popular" onClick={handleSidebarClick}>Popular</SidebarMenuItem>
        <SidebarMenuItem to="/now-playing" onClick={handleSidebarClick}>Now Playing</SidebarMenuItem>
        <SidebarMenuItem to="/top-rated" onClick={handleSidebarClick}>Top Rated</SidebarMenuItem>
        <SidebarMenuItem to="/upcoming" onClick={handleSidebarClick}>Upcoming</SidebarMenuItem>
      </Sidebar>
    </>
  );
};

export default Navbar;

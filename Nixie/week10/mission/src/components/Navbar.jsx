import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CartIcon } from '../constants/icons';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #5a4fcf;
  color: white;
  font-size: 24px;
  width: 100%;
  box-sizing: border-box;
`;

const NavTitle = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CartCount = styled.div`
  margin-left: 10px;
  font-size: 18px;
  position: relative;
  top: -10px;
  background-color: white;
  color: #5a4fcf;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navbar = () => {
  const { totalAmount } = useSelector((state) => state.cart);

  return (
    <Nav>
      <NavTitle>Real Data UMC PlayList</NavTitle>
      <CartContainer>
        <CartIcon />
        <CartCount>{totalAmount}</CartCount>
      </CartContainer>
    </Nav>
  );
};

export default Navbar;

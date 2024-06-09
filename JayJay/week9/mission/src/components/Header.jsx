import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, calculateTotals } from "../redux/cartSlice";
import { openModal } from "../redux/modalSlice";
import styled from "styled-components";
import { CartIcon } from "../constants/icons.jsx";

const HeaderWrapper = styled.header`
  background-color: #4a90e2;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CartInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ClearButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

const Header = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  return (
    <HeaderWrapper>
      <HeaderTitle>UMC PlayList</HeaderTitle>
      <CartInfo>
        <IconWrapper>
          <CartIcon />
        </IconWrapper>
        <span>Total Amount: {totalAmount}원</span>
        <span>Total Quantity: {totalQuantity}개</span>
        <ClearButton onClick={() => dispatch(openModal())}>
          장바구니 초기화
        </ClearButton>
      </CartInfo>
    </HeaderWrapper>
  );
};

export default Header;

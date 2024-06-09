import React from "react";
import { useDispatch } from "react-redux";
import {
  increase,
  decrease,
  removeItem,
  calculateTotals,
} from "../redux/cartSlice";
import styled from "styled-components";
import { ChevronUp, ChevronDown } from "../constants/icons.jsx";

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  margin-top: 1rem;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
`;

const ItemPrice = styled.p`
  margin: 0.5rem 0;
  font-size: 0.875rem;
`;

const ItemAmount = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0px;
`;

const CartItem = ({ id, title, price, amount, img }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increase(id));
    dispatch(calculateTotals());
  };

  const handleDecrease = () => {
    dispatch(decrease(id));
    dispatch(calculateTotals());
  };

  const handleRemove = () => {
    dispatch(removeItem(id));
    dispatch(calculateTotals());
  };

  return (
    <CartItemWrapper>
      <ItemImage src={img} alt={title} />
      <ItemDetails>
        <ItemTitle>{title}</ItemTitle>
        <ItemPrice>\{price}</ItemPrice>
      </ItemDetails>
      <ItemActions>
        <ActionButton onClick={handleIncrease}>
          <ChevronUp />
        </ActionButton>
        <ItemAmount>{amount}</ItemAmount>
        <ActionButton onClick={handleDecrease}>
          <ChevronDown />
        </ActionButton>
      </ItemActions>
    </CartItemWrapper>
  );
};

export default CartItem;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CartItem from './CartItem';
import { openModal } from '../redux/modalSlice';
import { calculateTotals } from '../redux/cartSlice';
import Modal from './Modal';

const CartContainer = styled.div`
  padding: 20px;
  width: 80%;
  margin: 20px auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const CartTitle = styled.h2`
  font-size: 24px;
  color: #333;
`;

const ClearButton = styled.button`
  padding: 10px;
  border: none;
  background: #d9534f;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;

const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

const TotalTitle = styled.h3`
  font-size: 20px;
`;

const TotalPrice = styled.h3`
  font-size: 20px;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <CartContainer>
      <Modal />
      <CartHeader>
        <CartTitle>당신이 선택한 음반</CartTitle>
        <ClearButton onClick={() => dispatch(openModal())}>장바구니 초기화</ClearButton>
      </CartHeader>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <CartFooter>
        <TotalTitle>총 금액</TotalTitle>
        <TotalPrice>₩{totalPrice}</TotalPrice>
      </CartFooter>
    </CartContainer>
  );
};

export default Cart;

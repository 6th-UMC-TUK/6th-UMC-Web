import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CartItem from './CartItem';
import { openModal } from '../redux/modalSlice';
import { fetchCartItems, calculateTotals } from '../redux/cartSlice';
import Modal from './Modal';
import Loading from './Loading';

const CartContainer = styled.div`
  padding: 20px;
  margin: 20px auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  width: 97vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
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

const CartItems = styled.div`
  flex-grow: 1;
  overflow-y: auto;
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

const Error = styled.div`
  text-align: center;
  font-size: 24px;
  padding: 50px;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'failed') {
    return <Error>에러가 발생했습니다: {error}</Error>;
  }

  return (
    <CartContainer>
      <Modal />
      <CartHeader>
        <CartTitle>당신이 선택한 음반</CartTitle>
        <ClearButton onClick={() => dispatch(openModal())}>장바구니 초기화</ClearButton>
      </CartHeader>
      <CartItems>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </CartItems>
      <CartFooter>
        <TotalTitle>총 금액</TotalTitle>
        <TotalPrice>₩{totalPrice}</TotalPrice>
      </CartFooter>
    </CartContainer>
  );
};

export default Cart;

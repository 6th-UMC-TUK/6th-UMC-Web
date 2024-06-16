import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { increase, decrease } from '../redux/cartSlice';
import { ChevronUp, ChevronDown } from '../constants/icons';

const Item = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  flex-grow: 1;
`;

const ItemTitle = styled.h4`
  margin: 0;
  font-size: 18px;
`;

const ItemSinger = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666;
`;

const ItemPrice = styled.p`
  margin: 5px 0;
  font-size: 16px;
  font-weight: bold;
`;

const ItemAmount = styled.div`
  margin: 0 20px;
  font-size: 18px;
  font-weight: bold;
  color: #5a4fcf;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #5a4fcf;

  &:disabled {
    color: #ccc;
  }
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Item>
      <ItemImage src={item.img} alt={item.title} />
      <ItemInfo>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemSinger>{item.singer}</ItemSinger>
        <ItemPrice>₩{item.price}</ItemPrice>
      </ItemInfo>
      <ItemAmount>{item.amount}</ItemAmount>
      <Buttons>
      <IconButton onClick={() => dispatch(increase(item.id))}>+</IconButton>
        <IconButton onClick={() => dispatch(decrease(item.id))}>-</IconButton>
      </Buttons>
    </Item>
  );
};

export default CartItem;

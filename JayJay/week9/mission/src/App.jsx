import React from "react";
import "./App.css";
import Header from "./components/Header";
import CartItem from "./components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals } from "./redux/cartSlice";
import styled from "styled-components";
import { useEffect } from "react";

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const CartItemsWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

function App() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  return (
    <AppWrapper>
      <Header />
      <main>
        {items.length === 0 ? (
          <p>장바구니가 비어있습니다.</p>
        ) : (
          <CartItemsWrapper>
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                amount={item.amount}
                img={item.img}
              />
            ))}
          </CartItemsWrapper>
        )}
      </main>
    </AppWrapper>
  );
}

export default App;

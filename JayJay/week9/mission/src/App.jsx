import React from "react";
import Header from "./components/Header";
import CartItem from "./components/CartItem";
import Modal from "./components/Modal"; // 모달 컴포넌트를 가져옵니다.
import { useSelector } from "react-redux";
import styled from "styled-components";

const AppWrapper = styled.div`
  text-align: center;
`;

const CartItemsWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

function App() {
  const items = useSelector((state) => state.cart.items);

  return (
    <AppWrapper>
      <Header />
      <main>
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
      </main>
      <Modal />
    </AppWrapper>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import CartItem from "./components/CartItem";
import Modal from "./components/Modal"; // 모달 컴포넌트를 가져옵니다.
import LoadingSpinner from "./components/LoadingSpinner"; // 로딩 스피너 컴포넌트를 가져옵니다.
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "./redux/cartSlice"; // 데이터 가져오기 Thunk
import styled from "styled-components";

const AppWrapper = styled.div`
  text-align: center;
`;

const CartItemsWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);

  const [localLoading, setLocalLoading] = useState(true); // 로컬 로딩 상태 추가

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCartItems());
    }
  }, [status, dispatch]);

  useEffect(() => {
    //setTimeout을 상태관리 관련 로직에다말고 클라이언트단에서 구현
    if (status === "loading") {
      setLocalLoading(true);
    } else if (status === "succeeded" || status === "failed") {
      const timer = setTimeout(() => {
        setLocalLoading(false);
      }, 1000); // 최소 1초 동안 로딩 상태 유지 -> 눈에 보이도록 로딩 되는게
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <AppWrapper>
      <Header />
      <main>
        {localLoading ? (
          <LoadingSpinner />
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
      <Modal />
    </AppWrapper>
  );
}

export default App;

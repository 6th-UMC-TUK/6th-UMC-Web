import React from 'react';
import { Provider } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import { store } from './redux/store';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #e9ecef;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <AppContainer>
        <Navbar />
        <Cart />
      </AppContainer>
    </Provider>
  );
}

export default App;

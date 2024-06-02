import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 5px;
  margin: 10px 0;
  border-radius: 20px;
  border: none;
  width: 95%;
  height: 45px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
  color: red;
  margin-top: 5px;
`;

const LoginInputField = ({ type, placeholder, value, onChange, error }) => {
  return (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default LoginInputField;

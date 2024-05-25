import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 5px;
  margin: 10px 0;
  border-radius: 20px;
  border: none;
  width: 500px;
  height: 40px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const SignUpInputField = ({ type, placeholder, value, onChange, error }) => {
  return (
    <div>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default SignUpInputField;

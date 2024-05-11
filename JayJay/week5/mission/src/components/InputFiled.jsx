import React from "react";
import styled from "styled-components";

const SignUpInfoInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  margin-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  color: red;
`;

export default function InputField({ label, value, onChange, isValid }) {
  return (
    <>
      <SignUpInfoInput
        placeholder={`${label}을(를) 입력해주세요.`}
        value={value}
        onChange={onChange}
      />
      {!isValid && (
        <ErrorMessage>
          {label === "비밀번호확인"
            ? "비밀번호를 다시 확인해주세요!"
            : `${label}을 입력해주세요`}
        </ErrorMessage>
      )}
    </>
  );
}

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

const getErrorMessage = (label, value) => {
  if (label === "비밀번호") {
    if (value.length < 4) return "비밀번호는 최소 4자리 이상이어야 합니다";
    if (value.length > 12) return "비밀번호는 최대 12자리까지 가능합니다";
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value))
      return "영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다";
  } else if (label === "이메일") {
    return "이메일 형식에 맞게 다시 입력해주세요";
  } else if (label === "나이") {
    if (isNaN(parseInt(value, 10))) return "나이는 숫자로 입력해주세요";
    if (parseInt(value, 10) < 19)
      return "우리 영화 사이트는 19살 이상만 가입 가능합니다";
    if (!Number.isInteger(parseFloat(value)))
      return "나이는 소수가 될 수 없습니다";
    if (parseInt(value, 10) <= 0) return "나이는 음수가 될 수 없습니다";
  } else {
    return `${label}을(를) 입력해주세요`;
  }
};

export default function InputField({ label, value, onChange, isValid }) {
  return (
    <>
      <SignUpInfoInput
        placeholder={`${label}을(를) 입력해주세요.`}
        value={value}
        onChange={onChange}
      />
      {!isValid && <ErrorMessage>{getErrorMessage(label, value)}</ErrorMessage>}
    </>
  );
}

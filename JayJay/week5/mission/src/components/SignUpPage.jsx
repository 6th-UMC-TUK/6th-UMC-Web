import { useState } from "react";
import styled from "styled-components";
import InputField from "./InputFiled";

const SignUpPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #202142;
`;

const SignUpContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 450px;
  margin-top: 30px;
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 30px;
  border-radius: 10px;
`;

const SignUpFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: auto;
  margin-top: 20px;
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

export default function SignUpPage() {
  const [form, setForm] = useState({
    이름: "",
    이메일: "",
    나이: "",
    비밀번호: "",
    비밀번호확인: undefined,
  });

  const [validationState, setValidationState] = useState({
    이름: true,
    이메일: true,
    나이: true,
    비밀번호: true,
    비밀번호확인: true,
  });

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
    setValidationState((prev) => ({ ...prev, [fieldName]: !!value }));
  };

  const submitBtnClick = () => {
    const newValidationState = {};
    Object.keys(form).forEach((key) => {
      newValidationState[key] = !!form[key]; // form의 값이 존재하는지 체크
    });
    setValidationState(newValidationState);
  };

  return (
    <SignUpPageWrapper>
      <span>회원가입 페이지</span>
      <SignUpContentBox>
        {Object.keys(form).map((key) => (
          <InputField
            key={key}
            label={key}
            value={form[key]}
            onChange={(e) => handleInputChange(e, key)}
            isValid={validationState[key]}
          />
        ))}
        <SignUpButton onClick={submitBtnClick}>제출하기</SignUpButton>
        <SignUpFooter>
          <span>이미 아이디가 있으신가요?</span>
          <span>메인 페이지로 돌아가기</span>
        </SignUpFooter>
      </SignUpContentBox>
    </SignUpPageWrapper>
  );
}

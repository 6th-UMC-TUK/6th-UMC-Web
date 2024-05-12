import { useState } from "react";
import styled from "styled-components";
import InputField from "./InputFiled";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [form, setForm] = useState({
    이름: "",
    이메일: "",
    나이: "",
    비밀번호: "",
    비밀번호확인: "",
  });

  const [validationState, setValidationState] = useState({
    이름: false,
    이메일: false,
    나이: false,
    비밀번호: false,
    비밀번호확인: false,
  });

  //수정 여부 판단하는 상태 관리 !!
  const [touched, setTouched] = useState({
    이름: false,
    이메일: false,
    나이: false,
    비밀번호: false,
    비밀번호확인: false,
  });

  const validateField = (fieldName, value) => {
    let isValid = false;
    //유효성 검사 로직을 여기서 작성하고 InputField에 넘겨서
    //에러메시지를 띄우는 로직.. 어렵다
    if (fieldName === "비밀번호" || fieldName === "비밀번호확인") {
      const minLength = 4;
      const maxLength = 12;
      const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/; // 영문, 숫자, 특수문자 조합

      isValid =
        value.length >= minLength &&
        value.length <= maxLength &&
        regex.test(value);
      if (fieldName === "비밀번호확인") {
        isValid = isValid && value === form.비밀번호;
      }
    } else if (fieldName === "이메일") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 검증 정규 표현식
      isValid = emailRegex.test(value);
    } else if (fieldName === "나이") {
      const age = parseInt(value, 10);
      isValid = !isNaN(age) && age >= 19 && Number.isInteger(age) && age > 0;
    } else if (fieldName === "이름") {
      isValid = value.trim() !== "";
    }
    return isValid; // 추가: 유효성 검사 결과 반환
  };

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));

    let isValid = validateField(fieldName, value); // 유효성 검사 로직을 함수로 빼기
    setValidationState((prev) => ({ ...prev, [fieldName]: isValid }));
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  //이번 주차에 다시 심화 학습하게된 Object.values, Object.keys

  const submitBtnClick = () => {
    if (
      Object.values(validationState).every(Boolean) &&
      Object.values(touched).every(Boolean)
    ) {
      console.log(form);
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } else {
      alert("모든 필드를 올바르게 채워주세요.");
    }
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
            isTouched={touched[key]}
            form={form}
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

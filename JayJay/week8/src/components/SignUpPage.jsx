import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignUpInputField from "./SignUpInputField";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 510px;
`;

const Button = styled.button`
  padding: 8px 20px;
  margin: 20px 0;
  border-radius: 20px;
  border: none;
  background-color: #fff;
  cursor: pointer;
  width: 95%;
  max-width: 510px;
  box-sizing: border-box;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const inputFields = [
    { type: "text", placeholder: "이름을 입력해주세요", name: "name" },
    { type: "text", placeholder: "아이디를 입력해주세요", name: "id" },
    { type: "email", placeholder: "이메일을 입력해주세요", name: "email" },
    { type: "text", placeholder: "나이를 입력해주세요", name: "age" },
    {
      type: "password",
      placeholder: "비밀번호를 입력해주세요",
      name: "password",
    },
    { type: "password", placeholder: "비밀번호 확인", name: "confirmPassword" },
  ];

  const validateField = (field, value) => {
    let errMsg = "";
    switch (field) {
      case "name":
        errMsg = !value ? "이름을 입력해주세요." : "";
        break;
      case "email":
        if (!value) errMsg = "이메일을 입력해주세요.";
        else if (!/\S+@\S+\.\S+/.test(value))
          errMsg = "유효한 이메일을 입력해주세요.";
        break;
      case "age":
        if (!value) errMsg = "나이를 입력해주세요.";
        else if (isNaN(value)) errMsg = "숫자를 입력해주세요.";
        else if (value < 0) errMsg = "나이는 음수가 될 수 없습니다.";
        else if (!Number.isInteger(Number(value)))
          errMsg = "나이는 소수가 될 수 없습니다.";
        else if (value < 19) errMsg = "19살 이상만 가입이 가능합니다.";
        break;
      case "password":
        if (!value) errMsg = "비밀번호를 입력해주세요.";
        else if (value.length < 4)
          errMsg = "비밀번호는 최소 4자리 이상이어야 합니다.";
        else if (value.length > 12)
          errMsg = "비밀번호는 최대 12자리까지 가능합니다.";
        else if (
          !/[A-Za-z]/.test(value) ||
          !/[0-9]/.test(value) ||
          !/[!@#$%^&*]/.test(value)
        )
          errMsg = "영어, 숫자, 특수문자를 모두 포함해야 합니다.";
        break;
      case "confirmPassword":
        errMsg = !value
          ? "비밀번호 확인을 입력해주세요."
          : value !== formData.password
          ? "비밀번호가 일치하지 않습니다."
          : "";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: errMsg }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.values(errors).every((error) => error === "") &&
      Object.values(formData).every((value) => value !== "")
    ) {
      try {
        const response = await axios.post("http://localhost:8080/auth/signup", {
          name: formData.name,
          email: formData.email,
          age: formData.age,
          username: formData.id,
          password: formData.password,
          passwordCheck: formData.confirmPassword,
        });
        console.log("Form data is valid and was submitted:", response.data);
        alert("회원가입이 성공적으로 완료되었습니다.");
        navigate("/login");
      } catch (error) {
        console.error("Error during signup:", error);
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    } else {
      alert("유효성 검사를 모두 통과해야 합니다.");
    }
  };

  return (
    <Container>
      <h2 style={{ color: "#fff" }}>회원가입 페이지</h2>
      <Form onSubmit={handleSubmit}>
        {inputFields.map((field) => (
          <SignUpInputField
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            error={errors[field.name]}
          />
        ))}
        <Button
          type="submit"
          disabled={!Object.values(errors).every((error) => error === "")}
        >
          제출하기
        </Button>
      </Form>
      <Link to="/login" style={{ color: "#fff", marginTop: "10px" }}>
        이미 아이디가 있으신가요? 로그인 페이지로 이동하기
      </Link>
    </Container>
  );
};

export default SignUpPage;

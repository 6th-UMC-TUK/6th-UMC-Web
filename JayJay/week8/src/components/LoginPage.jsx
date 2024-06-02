import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginInputField from "./LoginInputField";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
  padding: 10px 20px;
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

const StyledLink = styled(Link)`
  color: #fff;
  margin-top: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const inputFields = [
    { type: "text", placeholder: "아이디를 입력해주세요", name: "id" },
    {
      type: "password",
      placeholder: "비밀번호를 입력해주세요",
      name: "password",
    },
  ];

  const validateField = (field, value) => {
    let errMsg = "";
    switch (field) {
      case "id":
        errMsg = !value ? "아이디를 입력해주세요." : "";
        break;
      case "password":
        errMsg = !value ? "비밀번호를 입력해주세요." : "";
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
        const response = await axios.post("http://localhost:8080/auth/login", {
          username: formData.id,
          password: formData.password,
        });
        console.log(response);
        console.log(response.data);
        const { token } = response.data;
        localStorage.setItem("token", token);
        console.log("login was submitted:", response.data);
        navigate("/");
      } catch (error) {
        console.error("Error during login:", error);
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
      console.log("Form data is valid and was submitted:", formData);
    } else {
      alert("유효성 검사를 모두 통과해야 합니다.");
    }
  };

  return (
    <Container>
      <h2 style={{ color: "#fff" }}>로그인 페이지</h2>
      <Form onSubmit={handleSubmit}>
        {inputFields.map((field) => (
          <LoginInputField
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
          로그인
        </Button>
      </Form>
      <StyledLink to="/signup">
        회원가입이 필요하신가요? 회원가입 페이지로 이동하기
      </StyledLink>
    </Container>
  );
};

export default LoginPage;

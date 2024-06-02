import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './AuthProvider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0b0b45;
  width: 460%;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border-radius: 20px;
  border: none;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 20px 0;
  border-radius: 20px;
  border: none;
  background-color: #fff;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const LogInPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const validateField = (field, value) => {
    let errMsg = '';
    switch (field) {
      case 'password':
        if (!value) errMsg = '비밀번호를 입력해주세요.';
        else if (value.length < 4) errMsg = '비밀번호는 최소 4자리 이상이어야 합니다.';
        else if (value.length > 12) errMsg = '비밀번호는 최대 12자리까지 가능합니다.';
        else if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value) || !/[!@#$%^&*]/.test(value))
          errMsg = '영어, 숫자, 특수문자를 모두 포함해야 합니다.';
        break;
      case 'id':
        errMsg = !value ? '아이디를 입력해주세요.' : '';
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [field]: errMsg }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation for all fields before submission
    Object.keys(formData).forEach(field => {
      validateField(field, formData[field]);
    });

    // Check if there are any errors
    if (Object.values(errors).some(errMsg => errMsg)) {
      return; // Exit if there are errors
    }

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.id,
          password: formData.password
        })
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ username: data.username }));
        setAuth({ isAuthenticated: true, token: data.token, user: { username: data.username } });
        navigate('/');
      } else {
        setErrors(prev => ({ ...prev, form: '아이디 또는 비밀번호가 잘못되었습니다.' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, form: '서버와의 통신 중 오류가 발생했습니다.' }));
    }
  };

  return (
    <Container>
      <h2 style={{ color: '#fff' }}>로그인 페이지</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={formData.id}
          onChange={(e) => handleInputChange('id', e.target.value)}
        />
        {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}
        <Button type="submit">로그인</Button>
      </Form>
    </Container>
  );
};

export default LogInPage;

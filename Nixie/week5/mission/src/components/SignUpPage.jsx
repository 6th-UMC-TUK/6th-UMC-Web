import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0b0b45;
  width:442%;
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

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let errMsg = '';
    switch (field) {
      case 'name':
        errMsg = !value ? '이름을 입력해주세요.' : '';
        break;
      case 'email':
        if (!value) errMsg = '이메일을 입력해주세요.';
        else if (!/\S+@\S+\.\S+/.test(value)) errMsg = '유효한 이메일을 입력해주세요.';
        break;
      case 'age':
        if (!value) errMsg = '나이를 입력해주세요.';
        else if (isNaN(value)) errMsg = '숫자를 입력해주세요.';
        else if (value < 0) errMsg = '나이는 음수가 될 수 없습니다.';
        else if (!Number.isInteger(Number(value))) errMsg = '나이는 소수가 될 수 없습니다.';
        else if (value < 19) errMsg = '19살 이상만 가입이 가능합니다.';
        break;
      case 'password':
        if (!value) errMsg = '비밀번호를 입력해주세요.';
        else if (value.length < 4) errMsg = '비밀번호는 최소 4자리 이상이어야 합니다.';
        else if (value.length > 12) errMsg = '비밀번호는 최대 12자리까지 가능합니다.';
        else if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value) || !/[!@#$%^&*]/.test(value))
          errMsg = '영어, 숫자, 특수문자를 모두 포함해야 합니다.';
        break;
      case 'confirmPassword':
        errMsg = !value ? '비밀번호 확인을 입력해주세요.' : value !== formData.password ? '비밀번호가 일치하지 않습니다.' : '';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every(error => error === '') && Object.values(formData).every(value => value !== '')) {
      console.log('Form data is valid and was submitted:', formData);
      alert('회원가입이 성공적으로 완료되었습니다.');
    } else {
      alert('유효성 검사를 모두 통과해야 합니다.');
    }
  };

  return (
    <Container>
      <h2 style={{ color: '#fff' }}>회원가입 페이지</h2>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="이름을 입력해주세요" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        <Input type="email" placeholder="이메일을 입력해주세요" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <Input type="text" placeholder="나이를 입력해주세요" value={formData.age} onChange={(e) => handleInputChange('age', e.target.value)} />
        {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
        <Input type="password" placeholder="비밀번호를 입력해주세요" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <Input type="password" placeholder="비밀번호 확인" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} />
        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        <Button type="submit" disabled={!Object.values(errors).every(error => error === '')}>제출하기</Button>
      </Form>
      <Link to="/login" style={{ color: '#fff', marginTop: '10px' }}>
        이미 아이디가 있으신가요? 로그인 페이지로 이동하기
      </Link>
    </Container>
  );
};

export default SignUpPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #0b0b31; /* 배경 색상 설정 */
  color: white; /* 텍스트 색상 설정 */
  text-align: center;
  font-size: 24px; /* 폰트 크기 설정 */
`;

const NotFoundSpan = styled.span`
  margin-top: 15px;
`;

const ReturnMain = styled.div`
  margin-top: 15px;
  cursor: pointer;
  color: #61dafb; /* 버튼 텍스트 색상 설정 */
  text-decoration: underline; /* 텍스트 밑줄 설정 */
  &:hover {
    text-decoration: none; /* 마우스를 올렸을 때 밑줄 제거 */
  }
`;

export default function NotFound() {
  const navigate = useNavigate();

  const mainPageClick = () => {
    navigate('/');
  };

  return (
    <NotFoundWrapper>
      <h1>Oops!!</h1>
      <div>예상치 못한 오류가 발생했습니다.</div>
      <NotFoundSpan>Not Found</NotFoundSpan>
      <ReturnMain onClick={mainPageClick}>메인페이지로 돌아가기</ReturnMain>
    </NotFoundWrapper>
  );
}

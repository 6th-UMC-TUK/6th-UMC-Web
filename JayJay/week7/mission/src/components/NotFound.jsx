import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px; // 필요에 따라 너비 조정
  height: 200px;
  text-align: center; // 텍스트가 중앙에 위치하도록
  font-size: 24px; // 필요에 따라 폰트 크기 조정
`;

const NotFoundContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NotFoundSpan = styled.span`
  margin-top: 15px;
`;

const ReturnMain = styled.div`
  width: 100%;
  margin-top: 15px;
  cursor: pointer;
`;

export default function NotFound() {
  const navigate = useNavigate();

  const mainPageClick = () => {
    navigate("/");
  };
  return (
    <NotFoundBox>
      <NotFoundContent>
        <h1>Oops!!</h1>
        <div>예상치 못한 오류가 발생했습니다.</div>
        <NotFoundSpan>Not Found</NotFoundSpan>
        <ReturnMain onClick={mainPageClick}>메인페이지로 돌아가기.</ReturnMain>
      </NotFoundContent>
    </NotFoundBox>
  );
}

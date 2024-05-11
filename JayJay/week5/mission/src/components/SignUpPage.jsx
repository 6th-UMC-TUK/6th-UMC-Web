import styled from "styled-components";

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
  justify-content: space-center;
  align-items: center;
  height: 100%;
  width: 450px;
  margin-top: 30px;
`;

const SignUpInfoInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  box-sizing: border-box;
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

export default function SignUpPage() {
  return (
    <SignUpPageWrapper>
      <span>회원가입 페이지</span>
      <SignUpContentBox>
        <SignUpInfoInput placeholder="이름을 입력해주세요."></SignUpInfoInput>
        <SignUpInfoInput placeholder="이메일을 입력해주세요."></SignUpInfoInput>
        <SignUpInfoInput placeholder="나이를 입력해주세요."></SignUpInfoInput>
        <SignUpInfoInput placeholder="비밀번호를 입력해주세요."></SignUpInfoInput>
        <SignUpInfoInput placeholder="비밀번호 확인"></SignUpInfoInput>
        <SignUpButton>제출하기</SignUpButton>
        <SignUpFooter>
          <span>이미 아이디가 있으신가요?</span>
          <span>메인 페이지로 돌아가기</span>
        </SignUpFooter>
      </SignUpContentBox>
    </SignUpPageWrapper>
  );
}

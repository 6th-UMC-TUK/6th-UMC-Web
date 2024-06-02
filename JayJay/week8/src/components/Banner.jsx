import React from "react";
import styled from "styled-components";

const BannerBox = styled.div`
  width: 100%;
  background-color: black;
  font-size: larger;
`;

const BannerTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  width: 100%;
  height: 300px;
`;

export default function Banner({ user, loading }) {
  return (
    <BannerBox>
      <BannerTitle>
        {loading
          ? "로딩 중..."
          : user
          ? `${user.name}님 환영합니다!`
          : "환영합니다"}
      </BannerTitle>
    </BannerBox>
  );
}

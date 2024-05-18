import React from "react";
import styled from "styled-components";
import Rolling from "../assets/Rolling.gif";

const LoadingContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10%;
  height: 10%;
  z-index: 999;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
`;

const LoadingImage = styled.img`
  width: 100%;
  height: 100%;
  background: transparent;
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <LoadingImage src={Rolling} alt="로딩 중" />
    </LoadingContainer>
  );
}

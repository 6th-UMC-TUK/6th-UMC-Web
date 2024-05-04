import React from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  background-color: #020019;
  color: #fff;
  padding: 100px 0;
  text-align: center;
  width: 100%;
  position: fixed;
  top: 46px;
`;

const BannerText = styled.h1`
  font-size: 24px;
`;

function Banner() {
  return (
    <BannerWrapper>
      <BannerText>환영합니다</BannerText>
    </BannerWrapper>
  );
}

export default Banner;

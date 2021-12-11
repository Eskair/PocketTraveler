import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <LinkDiv>
        <TopListP>©2021 The World Factbook </TopListP>
      </LinkDiv>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 25px;
  background-color: var(--light-gray);
  bottom: 0;
`;

const LinkDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
  margin-right: 50px;
  width: 100%;
`;
const TopListP = styled.p`
  font-family: var(--font-body);
  font-size: 10px;
  margin: 0;
`;
export default Footer;

import React, { useContext } from "react";
import styled from "styled-components";
import MenuGlobe from "./MenuGlobe";

const Home = () => {
  return (
    <Wrapper>
      <MenuGlobe />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const HomeDiv = styled.div`
  display: flex;
`;

export default Home;

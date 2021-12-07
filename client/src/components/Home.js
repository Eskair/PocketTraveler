import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuGlobe from "./MenuGlobe";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import CategoriesWF from "./CategoriesWF";

const Home = () => {
  const [content, setContent] = useState("");
  const [wfCateg, setWfcateg] = useState("");
  // console.log(content);
  useEffect(() => {});
  return (
    <Wrapper>
      <HomeDiv>
        <CategoriesWF setWfcateg={setWfcateg} />
        <HomeHead>Word FactBook</HomeHead>
      </HomeDiv>
      <MenuGlobe setTooltipContent={setContent} />
      <ReactTooltipStyled
        key={uuidv4()}
        id="countryTip"
        place="top"
        effect="solid"
      >
        <p>{content}</p>
      </ReactTooltipStyled>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;

  height: 100%;
`;

const HomeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const HomeHead = styled.h1`
  font-family: var(--font-heading);
  color: #486070;
  font-size: 25px;
`;

const ReactTooltipStyled = styled(ReactTooltip)`
  &.type-dark.place-top {
    padding-top: 0px;
    padding-bottom: 0px;
    height: 30px;
    line-height: 4px;
    opacity: 0.75;

    &:after {
      /* border-top-color: blue; */
    }
  }
`;

export default Home;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuGlobe from "./MenuGlobe";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // console.log(content);
  });
  return (
    <Wrapper>
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
  display: flex;
`;

const HomeDiv = styled.div`
  display: flex;
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

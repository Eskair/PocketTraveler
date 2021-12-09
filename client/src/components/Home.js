import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MenuGlobe from "./MenuGlobe";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import CategoriesWF from "./CategoriesWF";

const Home = () => {
  const [content, setContent] = useState(""); // -> state sets ToolTips content
  const [wfCateg, setWfcateg] = useState(""); // -> state sets current category, which sets in CategoriesWF
  const [wfCategName, setWfcategName] = useState(""); // -> state sets current category name, which sets in CategoriesWF
  const [wfCategUnits, setWfCategUnits] = useState(""); // -> state sets current category units, which sets in CategoriesWF

  return (
    <Wrapper>
      <HomeDiv>
        <CategoriesWF setWfcateg={setWfcateg} setWfcategName={setWfcategName} />
        <HomeHead>{wfCateg ? wfCategName : "The World Factbook"}</HomeHead>
      </HomeDiv>
      <MenuGlobe
        setTooltipContent={setContent}
        wfCateg={wfCateg}
        setWfCategUnits={setWfCategUnits}
        wfCategUnits={wfCategUnits}
        wfCategName={wfCategName}
      />
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
`;

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;
const HomeHead = styled.h1`
  font-family: var(--font-heading);
  color: #e1eaf0;
  font-size: 40px;
  font-weight: 700;
  margin: 0;
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

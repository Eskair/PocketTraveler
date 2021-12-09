import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CountryTopList = (props) => {
  const { choroplethData, wfCateg, wfCategUnits, wfCategName, toggleModal } =
    props;

  const choroplethDataNoNull = choroplethData.filter((Item) => {
    return Item.val !== "null";
  });

  // const choroplethDataFixed = choroplethDataNoNull.forEach((element) => {
  //   if (wfCateg === "gdp") {
  //     return parseInt(parseInt(element.val) / 1000000) + "M";
  //   } else {
  //     return parseInt(element.val);
  //   }

  // });

  let choroplethDatabyValue = choroplethDataNoNull.slice(0);
  choroplethDatabyValue.sort((a, b) => {
    return b.val - a.val;
  });

  //   console.log(choroplethDatabyValue);

  return (
    <Wrapper>
      <HeadDiv>
        <TopListButton onClick={toggleModal}>Close</TopListButton>
        <HomeHead>{wfCategName}:</HomeHead>
        <TopListP>{wfCategUnits}</TopListP>
      </HeadDiv>
      <CountListDiv>
        {choroplethDatabyValue.map((Item, Index) => {
          return (
            <CountListWrapper key={uuidv4()}>
              <StCountryLink to={`/Country/${Item.id}`} key={uuidv4()}>
                <CountListInfo>
                  <span>
                    {Item.name ===
                    "United Kingdom of Great Britain and Northern Ireland"
                      ? "United Kingdom"
                      : Item.name === "Korea (Democratic People's Republic of)"
                      ? "North Korea"
                      : Item.name}
                  </span>

                  <StSpanOne>
                    {wfCateg === "gdp"
                      ? parseInt(parseInt(Item.val) / 1000000) + " M"
                      : Math.round(parseInt(Item.val) * 100) / 100}
                  </StSpanOne>
                </CountListInfo>
              </StCountryLink>
            </CountListWrapper>
          );
        })}
      </CountListDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  background-color: var(--light-gray);
  top: 0px;
  min-width: 1200px;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const CountListDiv = styled.div`
  padding: 20px 25px 25px 25px;
  column-count: 5;
  width: 80%;
`;

const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  border-bottom: 1px dotted var(--dark-blue);

  margin-left: 25px;
  margin-right: 25px;
  padding-bottom: 5px;
  align-items: flex-end;
`;

const CountListWrapper = styled.div`
  &:nth-child(even) {
    background-color: #a7dbfd;
  }
  &:nth-child(odd) {
    border-top: 1px solid var(--dark-blue);
    border-bottom: 1px solid var(--dark-blue);
  }
`;

const CountListInfo = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 2px 5px 2px 5px;
  &:hover {
    background-color: #f2db83;
  }
`;

const StCountryLink = styled(NavLink)`
  color: var(--dark-blue);
  font-size: 10px;
  font-family: var(--font-body);
  text-decoration: none;
`;
const StSpanOne = styled.span`
  color: var(--dark-blue);
  font-size: 10px;
  font-family: var(--font-body);
  text-decoration: none;
`;

const HomeHead = styled.h1`
  font-family: var(--font-heading);
  color: var(--dark-blue);
  font-size: 30px;
  font-weight: 700;
  margin: 0;
`;

const TopListP = styled.p`
  font-family: var(--font-heading);
  font-size: 15px;
  margin: 0;
`;

const TopListButton = styled.button`
  font-family: var(--font-body);
  font-size: 12px;
`;
export default CountryTopList;

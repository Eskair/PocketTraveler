import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useParams, NavLink } from "react-router-dom";

const CountryInfo = () => {
  const { clickedCountry } = useParams();

  console.log(clickedCountry);

  return <Wrapper>CountryInfo</Wrapper>;
};
const Wrapper = styled.div`
  display: flex;
  height: 75px;
  background-color: #e1eaf0;
`;

export default CountryInfo;

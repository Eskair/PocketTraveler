import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  //   useEffect(() => {
  //     setcurrReservation(reservationId);
  //   }, [reloadTrigger]);

  return <Wrapper>Header</Wrapper>;
};
const Wrapper = styled.header`
  display: flex;
  height: 75px;
  background-color: #e1eaf0;
`;

export default Header;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo_PT from "../assets/logo_PT.svg";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  //   useEffect(() => {
  //     setcurrReservation(reservationId);
  //   }, [reloadTrigger]);

  return (
    <Wrapper>
      <LinkDiv>
        <HomeDivLink to="/">
          <LogoImg alt="logo Img" src={logo_PT} />
        </HomeDivLink>
        <UserDiv>
          <HomeDivLink to="/SignIn">
            <ProfileIcon />
          </HomeDivLink>
        </UserDiv>
      </LinkDiv>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  height: 70px;
  background-color: var(--light-gray);
`;

const LinkDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 50px;
  margin-right: 50px;
  width: 100%;
`;

const UserDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const LogoImg = styled.img`
  width: 250px;
`;

const HomeDivLink = styled(NavLink)`
  text-decoration: none;
`;

const ProfileIcon = styled(FaUserCircle)`
  transform: scale(2, 2);

  color: var(--dark-blue);
  &:hover {
  }
`;

export default Header;

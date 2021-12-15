import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import logo_PT from "../assets/logo_PT.svg";
import { FaUserCircle } from "react-icons/fa";
import { UsersContext } from "./UsersContext";

const Header = () => {
  const { user, setUser } = useContext(UsersContext);

  let history = useHistory();

  useEffect(() => {
    console.log("hello");
  }, [user]);

  const handleClick = (e) => {
    sessionStorage.removeItem("username");
    setUser(null);
    history.push("/");
  };

  return (
    <Wrapper>
      <LinkDiv>
        <HomeDivLink to="/">
          <LogoImg alt="logo Img" src={logo_PT} />
        </HomeDivLink>
        <UserDiv>
          <HomeDivLink to="/">Home</HomeDivLink>
          {user ? (
            <LogOutButton
              onClick={(e) => {
                handleClick();
              }}
            >
              Sign Out
            </LogOutButton>
          ) : (
            <LogOutButton
              onClick={(e) => {
                history.push("/User/SignInPage");
              }}
            >
              Sign In
            </LogOutButton>
          )}

          <StDiv>{user ? <ProfileIcon /> : <ProfileIconInactive />}</StDiv>
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
  margin-left: 35px;
  margin-right: 50px;
  width: 100%;
`;

const UserDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
`;

const StDiv = styled.div`
  display: flex;
  width: 33px;
  margin-left: 25px;
`;

const LogoImg = styled.img`
  width: 250px;
`;

const HomeDivLink = styled(NavLink)`
  text-decoration: none;
  margin-right: 25px;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--dark-blue);
  &:hover {
    color: var(--bright-orange);
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  transform: scale(2, 2);

  color: var(--dark-blue);
`;

const ProfileIconInactive = styled(FaUserCircle)`
  transform: scale(2, 2);

  opacity: 0.2;
  color: var(--dark-blue);
`;

const LogOutButton = styled.button`
  background: none;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--dark-blue);
  border: none;

  cursor: pointer;

  &:hover {
    color: var(--bright-orange);
  }
`;

export default Header;

import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "./UsersContext";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";

const SignInPage = () => {
  const { user } = useContext(UsersContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  let history = useHistory();

  const HandleSubmit = (ev) => {
    ev.preventDefault();

    fetch("/api/worldbook-year/", {
      method: "PUT",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status !== 200) {
          setError({ status: data.status, message: data.message });
          // console.log(error);
        } else {
          // setUser({
          //   userSigned: data.userSigned.first_name,
          //   isLoggedIn: data.userSigned.isLoggedIn,
          // });
          sessionStorage.setItem("username", `${data.userSigned.first_name}`);
          history.push("/");
        }
      });
  };

  const HandleChange = (event) => {
    setEmail(event.target.value);
  };

  const HandleChangeTwo = (event) => {
    setPassword(event.target.value);
  };

  if (!user) {
    return (
      <Wrapper>
        <FormWrapper>
          <FormSignIn onSubmit={HandleSubmit}>
            <InputSt
              name="email"
              value={email}
              onChange={HandleChange}
              type="email"
              placeholder="Your Email"
              required
            />
            <InputSt
              name="password"
              value={password}
              onChange={HandleChangeTwo}
              type="password"
              placeholder="Your Password"
              required
            />

            <SubmitButt type="submit">Sign In</SubmitButt>
          </FormSignIn>
          <ErrorDiv>
            <p>{error.message ? error.message : ""}</p>
          </ErrorDiv>
        </FormWrapper>
      </Wrapper>
    );
  } else {
    return <Redirect exact to="/" />;
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;

  height: 100%;
`;

const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #214f74;
  width: 270px;

  border-radius: 25px;
`;

const FormSignIn = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputSt = styled.input`
  width: 100%;
  border-width: 0px;
  padding: 10px;
  border: 0px solid white;
  border-radius: 10px;
  background-color: white;
  font-family: Roboto Condensed;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 5px;
  margin-top: 15px;

  -webkit-transition: background-color 1s;
  -moz-transition: background-color 1s;
  -ms-transition: background-color 1s;
  -o-transition: background-color 1s;
  transition: background-color 1s;
  &:focus {
    background-color: #ffeac7;
    outline: 0px solid white;
  }
`;

const SubmitButt = styled.button`
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  text-decoration: none;
  padding: 8px 20px;
  background-color: var(--light-blue);
  cursor: pointer;
  border: none;
  font-family: Roboto Condensed;
  font-weight: 400;
  font-size: 15px;
  color: white;
  &:hover {
    background-color: #1892ba;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

const ErrorDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 200px;
  width: 100%;

  font-family: Roboto Condensed;
  font-weight: 400;
  font-size: 15px;
  color: #3a5671;
`;

export default SignInPage;

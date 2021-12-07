import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./components/Home";
import Header from "./components/Header";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyles />
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Profile/:id"></Route>
          <Route exact path="/Notification"></Route>
          <Route exact path="/Bookmarks"></Route>
          <Route exact path="/:id"></Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  margin: auto;
  width: 75%;
  min-width: 1000px;

  background-color: rgba(18, 43, 63, 1);
  height: 100vh;
`;

export default App;

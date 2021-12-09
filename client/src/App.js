import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./components/Home";
import Header from "./components/Header";
// import ProtectedRoute from "./components/auth0/ProtectedRoute";

import CountryInfo from "./components/CountryInfo";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyles />

      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Country/:clickedCountry">
            <CountryInfo />
          </Route>
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

  background-color: var(--dark-blue);
  height: 100vh;
`;

export default App;

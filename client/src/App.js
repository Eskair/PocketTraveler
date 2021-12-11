import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
          <Route exact path="/:clickedCountry">
            <CountryInfo />
          </Route>
          <Route exact path="/Notification"></Route>
          <Route exact path="/Bookmarks"></Route>
          <Route exact path="/:id"></Route>
        </Switch>
        <Footer />
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
  /* height: 100vh; */
  height: 100%;
`;

export default App;

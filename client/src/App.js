import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UsersContextProvider } from "./components/UsersContext";
import CountryInfo from "./components/CountryInfo";
import SignInPage from "./components/SignInPage";
import ReviewsPage from "./components/ReviewsPage";

const App = () => {
  const [reloadTrigger, setReloadTrigger] = useState(false);

  return (
    <Wrapper>
      <GlobalStyles />

      <Router>
        <UsersContextProvider>
          <Header
            setReloadTrigger={setReloadTrigger}
            reloadTrigger={reloadTrigger}
          />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/:clickedCountry">
              <CountryInfo />
            </Route>
            <Route exact path="/User/SignInPage">
              <SignInPage />
            </Route>
            <Route exact path="/User/ReviewsPage/:clickedCountry">
              <ReviewsPage />
            </Route>
          </Switch>
          <Footer />
        </UsersContextProvider>
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

  height: 100%;
`;

export default App;

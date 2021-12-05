import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "./components/Home";

const App = () => {
  return (
    <Wrapper>
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
  flex-direction: row;
  justify-content: center;
`;

export default App;

import React, { Component } from "react";
import { render } from "react-dom";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link, 
  Redirect } from "react-router-dom";

import Cookies from "universal-cookie";

import HomePage from "./HomePage";

const cookies = new Cookies();

function App(props) {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Router>
    );
}

export default App;
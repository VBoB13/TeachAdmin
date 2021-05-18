import React, { Component } from "react";
import { render } from "react-dom";
import { Switch, Route } from "react-router-dom";

import Cookies from "universal-cookie";

import Navbar from "./Navbar";
import Accounts from "./accounts/Accounts";
import Authenticate from "./accounts/Authenticate";
import RegisterForm from "./accounts/forms/RegisterForm";
import LoginForm from "./accounts/forms/LoginForm";
import LoginMessage from "./accounts/messages/LoginMessage";

const cookies = new Cookies();

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    // Registering (Component) class methods
  }

  render() {
    return (
      <div className="container-fluid">
        <Switch>
          <Route path="/">
            <LoginMessage message="Welcome, awesome teacher!" />
            <h1 className="display-1">MEGA HI!</h1>
          </Route>
        </Switch>
      </div>
    );
  }
}

import React, { Component } from "react";
import { render } from "react-dom";
import { Switch, Route, Link, NavLink } from "react-router-dom";

import Cookies from "universal-cookie";

import LoginMessage from "./accounts/messages/LoginMessage";


const cookies = new Cookies();

function AccountPageButton(){
  return(
    <NavLink to="/account/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-person-circle"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        />
      </svg>
    </NavLink>
  );
}

function GradesPageButton(){
  return (
    <NavLink to="/grades/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-graph-up"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </NavLink>
  );
}

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
            <div className="row">
              <div className="col-6">
                <AccountPageButton />
              </div>
              <div className="col-6">
                <GradesPageButton />
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

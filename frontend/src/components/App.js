import React, { Component } from "react";
import { render } from "react-dom";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link, 
  Redirect,
  useParams,
  useRouteMatch } from "react-router-dom";

import Cookies from "universal-cookie";

import { 
  getSessionData,
  login as authLogin,
  logout as authLogout } from "../helpers/auth";

import Navbar from "./navbar/Navbar";
import HomePage from "./homepage/HomePage";
import Authenticate from "./accounts/Authenticate";
import Accounts from "./accounts/Accounts";
import GuestHome from "./homepage/GuestHome";

const cookies = new Cookies();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getSession = this.getSession.bind(this);
    this.isResponseOK = this.isResponseOK.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      isAuthenticated: false,
      user: "",
      user_link: "",
      error: "",
    };
  }

  getSession() {
    this.setState(getSessionData());
  }

  componentDidMount() {
    this.getSession();
  }

  isResponseOK(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else if (response.status >= 400 && response.status <= 499) {
      return response.json();
    } else {
      console.log(response);
      throw new Error("Response ERROR!");
    }
  }

  login(event) {
    // Preventing default event actions
    event.preventDefault();
    // Setting the state to whatever response is given from authLogin
    this.setState(authLogin());
  }

  logout(event) {
    // Preventing default event actions
    event.preventDefault();
    // Setting the state to whatever response is given from authLogout
    this.setState(authLogout());
  }

  render() {
    if(this.state.isAuthenticated){
      return (
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center py-2">
            <Navbar
              isAuthenticated={this.state.isAuthenticated}
              user={this.state.user}
              user_link={this.state.user_link}
              logout={this.logout}
            />
          </div>
          <div className="row py-2">
            <Switch>
              <Route path="/teachers">
                <Accounts />
              </Route>
              <Route path="/">
                <HomePage
                  user={this.state.user}
                  user_link={this.state.user_link}
                />
              </Route>
            </Switch>
          </div>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center py-2">
          <Navbar
            isAuthenticated={this.state.isAuthenticated}
            login={this.login}
          />
        </div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <GuestHome />
          </Route>
        </Switch>
        {/* <Authenticate
            isResponseOK={this.isResponseOK}
            login={this.login}
            error={this.state.error}
          /> */}
      </div>
    );
    
  }
}
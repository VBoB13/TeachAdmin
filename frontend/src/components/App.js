import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import Cookies from "universal-cookie";

import Authenticator from "../helpers/auth";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import HomePage from "./homepage/HomePage";
import Register from "./accounts/Register";
import Accounts from "./accounts/Accounts";
import GuestHome from "./homepage/GuestHome";
import About from "./homepage/About";
import Login from "./accounts/Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getSession = this.getSession.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      isAuthenticated: false,
      user: "",
      user_link: "",
      error: "",
    };
  }

  componentDidMount() {
    this.getSession();
  }

  async getSession() {
    let authObj = new Authenticator("/accounts/session/");
    const sessionData = await authObj.get_session();
    this.setState(sessionData);
  }

  async login() {
    let authObj = new Authenticator("/accounts/login/", "POST");
    const loginObj = await authObj.login();
    this.setState(loginObj);
  }

  async logout() {
    let authObj = new Authenticator("/accounts/logout/");
    const logoutObj = await authObj.logout();
    this.setState(logoutObj);
  }

  render() {
    if (this.state.isAuthenticated) {
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
          <hr />
          <Switch>
            <Redirect from="/login" to="/" />
            <Route path="/account/">
              <Accounts />
            </Route>
            <Route path="/">
              <HomePage user={this.state.user} />
            </Route>
          </Switch>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center py-2">
          <Navbar isAuthenticated={this.state.isAuthenticated} />
        </div>
        <hr />
        <Switch>
          <Route path="/about/">
            <About />
          </Route>
          <Route path="/login/">
            <Login login={this.login} />
          </Route>
          <Route path="/register/">
            <Register />
          </Route>
          <Route path="/">
            <GuestHome />
          </Route>
          <Redirect to="/" />
        </Switch>
        <hr />
        <Footer />
      </div>
    );
  }
}

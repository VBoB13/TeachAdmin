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

import {
  getSessionData,
  login as authLogin,
  logout as authLogout,
} from "../helpers/auth";

import Navbar from "./navbar/Navbar";
import HomePage from "./homepage/HomePage";
import Authenticate from "./accounts/Authenticate";
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

  async getSession() {
    const sessionData = await getSessionData();
    this.setState(sessionData);
  }

  login(loginObj) {
    console.log({ loginObj });
    this.setState(loginObj);
  }

  async logout() {
    const logoutObj = await authLogout();
    console.log({ logoutObj });
    this.setState(logoutObj);
  }

  componentDidMount() {
    this.getSession();
  }

  componentDidUpdate(prevProps, prevState) {
    /*if ((this.state.isAuthenticated !== prevState.isAuthenticated) & this.state.isAuthenticated === true){
      this.setState({redirect: "/"});
    }*/
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
          <Switch>
            <Redirect from="/login" to="/" />
            <Route path="/teachers/">
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
      );
    }
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center py-2">
          <Navbar isAuthenticated={this.state.isAuthenticated} />
        </div>
        <Switch>
          <Route path="/about/">
            <About />
          </Route>
          <Route path="/login/">
            <Login login={this.login} />
          </Route>
          <Route path="/register/">
            <Authenticate />
          </Route>
          <Route path="/">
            <GuestHome />
          </Route>
        </Switch>
      </div>
    );
  }
}

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

import Navbar from "./navbar/Navbar";
import HomePage from "./HomePage";
import Authenticate from "./accounts/Authenticate";
import Accounts from "./accounts/Accounts";

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
    fetch("/accounts/session/", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAuthenticated) {
          this.setState({
            isAuthenticated: true,
            user: data.user,
            user_link: data.user_link
          });
        } else {
          this.setState({
            isAuthenticated: false,
            user: "",
            user_link: ""
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: "Server session call failed."
        });
        console.log(err);
        console.error(err);
      });
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
      throw new Error("Response ERROR!");
    }
  }

  login(event) {
    // Preventing default event actions
    event.preventDefault();
    // Reading the values from input fields
    let form_username = document.getElementById("username").value;
    let form_password = document.getElementById("password").value;

    // Sending request to server to login
    fetch("/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username: form_username,
        password: form_password,
      }),
    })
      .then(this.isResponseOK)
      .then((data) => {
        console.log(data);
        this.setState({
          isAuthenticated: true,
          error: "",
          user: data.user,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: "Wrong username or password!",
        });
      });
  }

  logout(event) {
    event.preventDefault();
    fetch("/accounts/logout/", {
      credentials: "same-origin",
    })
      .then(this.isResponseOK)
      .then((data) => {
        console.log(data);
        this.setState({
          isAuthenticated: false,
          user: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if(this.state.isAuthenticated){
      return (
        <div className="container-fluid">
          <Navbar
            isAuthenticated={this.state.isAuthenticated}
            user={this.state.user}
            user_link={this.state.user_link}
            logout={this.logout}
          />
          <Switch>
            <Route path="/teachers">
              <Accounts />
            </Route>
            <Route path="/">
              <HomePage 
                user={this.state.user}
                user_link={this.state.user_link} />
            </Route>
          </Switch>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <Navbar
          isAuthenticated={this.state.isAuthenticated}
          login={this.login}
        />
        <Authenticate
          isResponseOK={this.isResponseOK}
          login={this.login}
          error={this.state.error}
        />
      </div>
    );
    
  }
}
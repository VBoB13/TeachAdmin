import React, { Component } from "react";
import { render } from "react-dom";

import Cookies from "universal-cookie";

import Navbar from "./Navbar";
import LoginForm from "./accounts/forms/LoginForm";

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    // Registering (Component) class methods
    this.getSession = this.getSession.bind(this);
    this.whoami = this.whoami.bind(this);
    this.isResponseOK = this.isResponseOK.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      isAuthenticated: false,
      user: "",
      page: "",
      error: "",
    };
  }

  componentDidMount() {
    this.getSession();
  }

  getSession() {
    fetch("/accounts/session/", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthenticated) {
          this.setState({
            isAuthenticated: true,
            user: data.user
          });
        } else {
          this.setState({ 
            isAuthenticated: false,
            user: "" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  whoami(event) {
    event.preventDefault();
    fetch("/accounts/me/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You're logged in as: " + data.user);
        this.setState({page: "accounts"});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isResponseOK(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  login(event) {
    event.preventDefault();
    let form_username = document.getElementById("username").value;
    let form_password = document.getElementById("password").value;
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

  logout() {
    fetch("/accounts/logout/", {
      credentials: "same-origin",
    })
      .then(this.isResponseOK)
      .then((data) => {
        console.log(data);
        this.setState({ 
          isAuthenticated: false,
          user: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div className="container-fluid">
          <Navbar 
            isAuthenticated={this.state.isAuthenticated} />
          <h1 className="display-4">Login</h1>
          <form onSubmit={this.login}>
            <LoginForm />
            <div className="errors">
              <small className="text-danger">{this.state.error}</small>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <Navbar 
          isAuthenticated={this.state.isAuthenticated}
          user={this.state.user}
          account={this.whoami}
          logout={this.logout} />
        <div className="messages">
          <p className="success">You're logged in!</p>
        </div>
      </div>
    );
  }
}

export default App;
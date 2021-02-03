import React, { Component } from "react";
import { render } from "react-dom";

import Cookies from "universal-cookie";

import Navbar from "./Navbar";

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    // Registering (Component) class methods
    this.getSession = this.getSession.bind(this);
    this.whoami = this.whoami.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.isResponseOK = this.isResponseOK.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      username: "",
      password: "",
      error: "",
      isAuthenticated: false,
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
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ isAuthenticated: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  whoami() {
    fetch("/accounts/me/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You're logged in as: " + data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleUserNameChange(event) {
    this.setState({ username: event.target.value });
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
    fetch("/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then(this.isResponseOK)
      .then((data) => {
        console.log(data);
        this.setState({
          isAuthenticated: true,
          username: "",
          password: "",
          error: "",
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
        this.setState({ isAuthenticated: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div className="container-fluid">
          <Navbar isAuthenticated={this.state.isAuthenticated} />
          <h1 className="display-4">Login</h1>
          <form onSubmit={this.login}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                value={this.state.username}
                onChange={this.handleUserNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
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
        <Navbar isAuthenticated={this.state.isAuthenticated} />
        <div className="messages">
          <p className="success">You're logged in!</p>
        </div>
        <button className="btn btn-primary" onClick={this.whoami}>
          Who Am I?
        </button>
        <button className="btn btn-danger" onClick={this.logout}>
          Log Out
        </button>
      </div>
    );
  }
}

export default App;
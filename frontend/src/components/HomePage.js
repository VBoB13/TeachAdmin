import React, { Component } from "react";
import { render } from "react-dom";

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
    this.getSession = this.getSession.bind(this);
    this.account = this.account.bind(this);
    this.isResponseOK = this.isResponseOK.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.generate_content = this.generate_content.bind(this);

    this.state = {
      isAuthenticated: false,
      user: "",
      content_page: "",
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
        if (data.isAuthenticated) {
          this.setState({
            isAuthenticated: true,
            user: data.user,
          });
        } else {
          this.setState({
            isAuthenticated: false,
            user: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        console.error(err);
      });
  }

  account(event) {
    event.preventDefault();
    this.setState({ content_page: "accounts" });
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

  register(event) {
    event.preventDefault();
    this.setState({ content_page: "register" });
  }

  generate_content() {
    let content_page = null;
    if (this.state.content_page === "accounts") {
      content_page = <Accounts />;
    }
    return content_page;
  }

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div className="container-fluid">
          <Navbar isAuthenticated={this.state.isAuthenticated} />
          <RegisterForm isResponseOK={this.isResponseOK} />
          <h1 className="display-4">Login</h1>
          <form onSubmit={this.login}>
            <LoginForm />
            <LoginMessage error={this.state.error} />
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
          account={this.account}
          logout={this.logout}
        />
        <LoginMessage message="Welcome, awesome teacher!" />
        {this.generate_content()}
      </div>
    );
  }
}

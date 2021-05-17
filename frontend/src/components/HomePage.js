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
    this.account = this.account.bind(this);
    this.register = this.register.bind(this);
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
          <div className="container m-3">
            <Authenticate 
              isResponseOK={this.isResponseOK}
              login={this.login} 
              error={this.state.error} />
          </div>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <LoginMessage message="Welcome, awesome teacher!" />
        {this.generate_content()}
      </div>
    );
  }
}

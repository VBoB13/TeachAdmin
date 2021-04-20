import React, { Component } from "react";
import { render } from "react-dom";

import Cookies from "universal-cookie";

const cookies = new Cookies();

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
    // Register Component methods
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="form-content">
        <h1 className="display-4 m-3">Login</h1>
        <form onSubmit={this.props.login}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              value={this.state.username}
              onChange={this.handleUsernameChange}
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
          <input 
            type="submit" 
            className="btn btn-primary"
            value="Submit" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
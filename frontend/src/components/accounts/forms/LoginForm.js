import React, { Component } from "react";
import { render } from "react-dom";
import { login } from "../../../helpers/auth";

import TextField from "../forms/fields/TextField";

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
    this.login = this.login.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async login(event) {
    event.preventDefault();
    const loginObj = await login();
    this.props.login(loginObj);
  }

  render() {
    return (
      <div className="form-content">
        <form method="POST" className="rounded" onSubmit={this.login}>
          <TextField fieldName="username" />
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
          <input type="submit" className="standard-button" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;

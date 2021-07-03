import React, { Component } from "react";
import { render } from "react-dom";
import { login } from "../../../helpers/auth";

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

  login(event) {
    event.preventDefault();
    let loginObj = login(this.props.login);
  }

  render() {
    return (
      <div className="form-content">
        <form method="POST" className="rounded" onSubmit={this.login}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              autoFocus
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
          <input type="submit" className="standard-button" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;

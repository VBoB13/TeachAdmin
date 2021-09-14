import React, { Component } from "react";

import TextField from "../forms/fields/TextField";
import PasswordField from "../forms/fields/PasswordField";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    // Register Component methods
    this.login = this.login.bind(this);
  }

  login(event) {
    event.preventDefault();
    this.props.login();
  }

  render() {
    return (
      <div className="form-content">
        <form method="POST" className="rounded" onSubmit={this.login}>
          <TextField
            fieldname="username"
            id="username"
            fieldtype="text"
            autoFocus
          />
          <PasswordField
            fieldname="password"
            fieldtype="password"
            id="password"
            autoComplete="current-password"
          />
          <input type="submit" className="standard-button" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;

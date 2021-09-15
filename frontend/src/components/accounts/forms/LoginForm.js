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
            id="username"
            fieldname="username"
            fieldtype="text"
            required={true}
            autoComplete="username"
            autoFocus
          />
          <PasswordField
            id="password"
            fieldname="password"
            fieldtype="password"
            required={true}
            autoComplete="current-password"
          />
          <input type="submit" className="standard-button" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;

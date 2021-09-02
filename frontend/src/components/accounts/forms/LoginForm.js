import React, { Component } from "react";
import { render } from "react-dom";
import { login } from "../../../helpers/auth";

import TextField from "../forms/fields/TextField";
import PasswordField from "../forms/fields/PasswordField";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    // Register Component methods
    this.login = this.login.bind(this);
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
          />
          <input type="submit" className="standard-button" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;

import React, { Component } from "react";
import { useParams } from "react-router";

import TextField from "../forms/fields/TextField";
import PasswordField from "../forms/fields/PasswordField";

function LoginForm(props) {
  let { userName } = useParams();
  function login(event) {
    event.preventDefault();
    props.login();
  }
  return (
    <div className="form-content">
      <form method="POST" className="rounded" onSubmit={login}>
        <TextField
          id="username"
          fieldname="username"
          fieldtype="text"
          required={true}
          autoComplete="username"
          autoFocus
          value={userName ?? ""}
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

export default LoginForm;

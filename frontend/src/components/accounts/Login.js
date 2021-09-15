import React, { useState } from "react";
import { Link } from "react-router-dom";

import LoginForm from "./forms/LoginForm";
import ComputerAuthIcon from "./ComputerAuthIcon";

export default function Login(props) {
  return (
    <main className="container-main-center">
      <LoginForm login={props.login} />
      <ComputerAuthIcon />
    </main>
  );
}

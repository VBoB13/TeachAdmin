import React, { useState } from "react";
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";

import LoginForm from "./forms/LoginForm";
import ComputerAuthIcon from "./ComputerAuthIcon";

export default function Login(props) {
  let match = useRouteMatch();

  return (
    <main className="container-main-center">
      <Switch>
        <Route path={`${match.path}/:userName`}>
          <LoginForm login={props.login} />
        </Route>
        <Route path={`${match.path}`}>
          <LoginForm login={props.login} />
        </Route>
      </Switch>
      <ComputerAuthIcon />
    </main>
  );
}

import React, { Component } from "react";
import { render } from "react-dom";

import LoginMessage from "./accounts/messages/LoginMessage";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    // Registering (Component) class methods
  }

  render() {
    return (
      <div className="container-fluid">
        <LoginMessage message="Welcome, awesome teacher!" />
      </div>
    );
  }
}

import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import LoginMessage from "./accounts/messages/LoginMessage";

function AccountLinkButton(){
  return (
    <button className="btn btn-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-person-lines-fill"
        viewBox="0 0 16 16"
      >
        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
      </svg> Who am I?
    </button>
  );
}

export default function HomePage(props){
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <LoginMessage message="Welcome, awesome teacher!" />
        </div>
      </div>
      <div className="row p-1 my-1">
        <div className="col-4 p-2">
          <Link to={props.user_link}>
            <AccountLinkButton />
          </Link>
        </div>
      </div>
    </div>
  );
}

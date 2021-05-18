import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Navbar(props){
  if(props.isAuthenticated){
    return (
      <nav className="navbar position-sticky navbar-expand-lg navbar-dark navbar-bg rounded">
        <div className="container">
          <Link to="/">
            Home
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="" className="nav-link">
                Scores
              </a>
            </li>
            <li className="nav-item">
              <Link to={props.user_link}>Account [ {props.user} ]</Link>
            </li>
            <li className="nav-item">
              <a
                id="navbar_logout"
                href=""
                onClick={props.logout}
                align="center"
                className="nav-link"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar position-sticky navbar-expand-lg navbar-dark navbar-bg rounded">
      <div className="container">
        <a className="navbar-brand" href="">
          Home
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="" className="nav-link">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link">
              Register
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
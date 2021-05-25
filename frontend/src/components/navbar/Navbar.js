import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

function LogoutButton(props){
  return (
    <a
      id="navbar_logout"
      href=""
      onClick={props.logout}
      align="center"
      className="nav-link"
    >
      Logout
    </a>
  );
}

function Navbar(props){
  if(props.isAuthenticated){
    return (
      <nav className="navbar position-sticky navbar-expand-lg navbar-dark navbar-bg rounded">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/scores/"
                className="nav-link"
                activeClassName="nav-link active"
              >
                Scores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/account/"
                className="nav-link"
                activeClassName="nav-link active"
              >
                Account
              </NavLink>
            </li>
            <li className="nav-item">
              <LogoutButton logout={props.logout}/>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar position-sticky navbar-expand-lg navbar-dark navbar-bg rounded">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/login/"
              className="nav-link"
              activeClassName="navlink active"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/register/"
              className="nav-link"
              activeClassName="navlink active"
            >
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
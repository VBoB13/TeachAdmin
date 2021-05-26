import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import NavbarLink from "./NavbarLinks";

const navlinks = ["/scores/", "/curriculum/", "/observatory/", "/account/"];

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

function generateNavLinks(){
  let navlinks_list = navlinks.map(url_string => {
    return <NavbarLink url_string={url_string} />;
  });
  console.log(navlinks_list);
  return navlinks_list;
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
            {generateNavLinks()}
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
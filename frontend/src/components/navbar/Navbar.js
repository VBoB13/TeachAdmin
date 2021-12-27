import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import NavbarLink from "./NavbarLinks";

const NAVLINKS = ["/account", "/students", "/courses"];

function LogoutButton(props) {
  return (
    <button
      id="navbar_logout"
      href=""
      onClick={props.logout}
      className="standard-button"
    >
      Logout
    </button>
  );
}

// Implement code to check if the current URL matches the link's.
// If so, pass on a prop called 'isActive'.
// See <NavbarLink> for details.
function generateNavLinks() {
  let navlinks_list = NAVLINKS.map((url_string, index) => {
    return <NavbarLink key={index} url_string={url_string} />;
  });
  return navlinks_list;
}

function Navbar(props) {
  if (props.isAuthenticated) {
    return (
      <nav className="navlink-container">
        <Link to="/" className="logo-link">
          <span style={{ fontSize: 2 + "em" }}>T</span>each<br></br>
          <span style={{ fontSize: 2 + "em" }}>A</span>dmin
        </Link>
        <div className="dropdown-menu">
          <span className="dropdown-title">Menu</span>
          <div className="dropdown-content">{generateNavLinks()}</div>
        </div>
        <LogoutButton logout={props.logout} />
      </nav>
    );
  }
  return (
    <nav className="navlink-container">
      <Link to="/" className="logo-link">
        TeachAdmin
      </Link>
      <NavLink
        to="/about/"
        className="navigation-link"
        activeClassName="navigation-link-active"
      >
        About
      </NavLink>
      <NavLink
        to="/login/"
        className="navigation-link"
        activeClassName="navigation-link-active"
      >
        Login
      </NavLink>
      <NavLink
        id="register-button"
        to="/register/"
        className="navigation-button-link"
        activeClassName="navigation-button-link-active"
      >
        <button className="standard-button">Register</button>
      </NavLink>
    </nav>
  );
}

export default Navbar;

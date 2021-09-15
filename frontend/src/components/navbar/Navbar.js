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

const navlinks = ["/scores", "/curriculum", "/observatory", "/account"];

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

function toggle_dropdown(event) {
  event.preventDefault();
  let dropdown_content = document.querySelector(
    "div.dropdown-menu > div.dropdown-content"
  );
  if (dropdown_content.style.display === "block") {
    dropdown_content.style.display = "none";
  } else {
    dropdown_content.style.display = "block";
  }
}

function generateNavLinks() {
  let navlinks_list = navlinks.map((url_string, index) => {
    return (
      <NavLink
        to={url_string}
        className="navigation-link"
        activeClassName="navigation-link-active"
        key={index}
      >
        {url_string[1].toUpperCase() + url_string.slice(2)}
      </NavLink>
    );
  });
  return navlinks_list;
}

function Navbar(props) {
  if (props.isAuthenticated) {
    return (
      <nav className="navlink-container">
        <Link to="/" className="logo-link">
          TeachAdmin
        </Link>
        <div className="dropdown-menu" onClick={toggle_dropdown}>
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

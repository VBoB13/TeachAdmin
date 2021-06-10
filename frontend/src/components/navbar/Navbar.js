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
    <button 
      id="navbar_logout"
      href="" 
      onClick={props.logout} 
      className="standard-button">
        Logout
    </button>
  );
}

function generateNavLinks(){
  let navlinks_list = navlinks.map((url_string, index) => {
    return <NavbarLink url_string={url_string} key={index} />;
  });
  return navlinks_list;
}

function Navbar(props){
  if(props.isAuthenticated){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-xs-6">
            <Link to="/" className="logo-link">
              TeachAdmin
            </Link>
          </div>
          <div className="col-xl-8 col-lg-6 col-md-4 col-sm-4 col-xs-6">
            <div className="navlink-container">
              {generateNavLinks()}
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-xs-6">
            <LogoutButton logout={props.logout} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <nav>
        <div className="row align-items-center justify-content-center p-2">
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-xs-6">
            <Link to="/" className="logo-link">
              TeachAdmin
            </Link>
          </div>
          <div className="col-xl-8 col-lg-6 col-md-4 col-sm-4 col-xs-6">
            <div className="navlink-container">
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
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-xs-6">
            <NavLink
              to="/register/"
              className="navigation-button-link"
              activeClassName="navigation-button-link-active"
            >
              <button className="standard-button">Register</button>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
import React, { Component } from "react";
import { render } from "react-dom";

function Navbar(props){
  if(props.isAuthenticated){
    return (
      <nav className="navbar position-sticky navbar-expand-lg navbar-dark navbar-bg rounded">
        <div className="container">
          <a className="navbar-brand" href="">
            Home
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="" className="nav-link">
                Scores
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Account [ {props.user} ]
              </a>
            </li>
            <li className="nav-item">
              <a href="" align="center" className="nav-link">
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
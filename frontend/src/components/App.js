import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Cookies from "universal-cookie";

import Authenticator from "../helpers/auth";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import HomePage from "./homepage/HomePage";
import Register from "./accounts/Register";
import GuestHome from "./homepage/GuestHome";
import About from "./homepage/About";
import Login from "./accounts/Login";
import Accounts from "./accounts/Accounts";
import Students from "./students/students";
import Courses from "./courses/courses";

export const TeacherContext = React.createContext();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getSession = this.getSession.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      isAuthenticated: false,
      user: {},
      user_link: "",
      error: null,
    };
  }

  componentDidMount() {
    this.getSession();
  }

  async getSession() {
    let authObj = new Authenticator("/accounts/session/");
    const sessionData = await authObj.get_session();
    this.setState(sessionData);
  }

  async login() {
    let authObj = new Authenticator("/accounts/login/", "POST");
    const loginObj = await authObj.login();
    loginObj.error ? {} : loginObj["error"] === null;
    this.setState(loginObj);
  }

  async logout() {
    let authObj = new Authenticator("/accounts/logout/");
    const logoutObj = await authObj.logout();
    this.setState(logoutObj);
  }

  render() {
    if (this.state.isAuthenticated) {
      return (
        <div className="container-fluid">
          <TeacherContext.Provider value={this.state.user}>
            <div className="row justify-content-center align-items-center py-2">
              <Navbar
                isAuthenticated={this.state.isAuthenticated}
                logout={this.logout}
              />
            </div>
            <hr />
            <Routes>
              <Navigate from="/register" to="/" replace />
              <Navigate from="/login" to="/" replace />
              <Route path="/account" element={<Accounts />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/students" element={<Students />} />
              <Route path="/" element={<HomePage user={this.state.user.user} />} />
            </Routes>
            <hr />
            <Footer />
          </TeacherContext.Provider>
        </div>
      );
    } else if(this.state.error === null) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center py-2">
            <Navbar isAuthenticated={this.state.isAuthenticated} />
          </div>
          <hr />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login login={this.login} error={this.state.error} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<GuestHome />} />
            <Navigate to="/" />
          </Routes>
          <hr />
          <Footer />
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center py-2">
          <Navbar isAuthenticated={this.state.isAuthenticated} />
        </div>
        <hr />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login login={this.login} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<GuestHome />} />
          <Navigate to="/" />
        </Routes>
        <hr />
        <Footer />
      </div>
    );
  }
}

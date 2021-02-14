import React, { Component } from "react";
import { render } from "react-dom";

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);

        this.state = {
            "username": "",
            "password": ""
        }
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }
    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    render(){
        return (
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
          </div>
        );
    }
}

export default LoginForm;
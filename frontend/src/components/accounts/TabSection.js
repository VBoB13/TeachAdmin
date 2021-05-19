import React, { Component } from "react";

import ToggleButton from "./ToggleButton";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";

export default class TabSection extends Component {
    constructor(props){
        super(props);
        this.state = {toggleView: true};

        // Bind component methods
        this.handleToggle = this.handleToggle.bind(this);
        this.createToggleButton = this.createToggleButton.bind(this);
    }

    handleToggle(e){
        e.preventDefault();
        console.log(e);
        this.setState({
            toggleView: !this.state.toggleView
        });
    }

    createToggleButton(){
        let button = (
          <ToggleButton
            onClick={this.handleToggle}
            value={this.state.toggleView}
          />
        );
        return button;
    }

    render(){
        if(this.state.toggleView){
            return (
              <div>
                {this.createToggleButton()}
                <LoginForm
                    login={this.props.login}
                    error={this.props.error} />
              </div>
            );
        }
        return (
          <div>
            {this.createToggleButton()}
            <RegisterForm 
              isResponseOK={this.props.isResponseOK} />
          </div>
        );
        
    }
}